
import { Stock } from '../types';
import { MOCK_STOCKS, FINNHUB_API_KEY, STOCK_SYMBOLS, INDIAN_STOCK_SYMBOLS } from '../constants';

// Using Finnhub API for quote data
const BASE_URL = 'https://finnhub.io/api/v1/quote';

// Finnhub response format
interface FinnhubQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
}

interface StockFetchResult {
    stocks: Stock[];
    isLive: boolean;
}

// Helper to generate simulated movement if API is down/limited
// This ensures the user still sees "moving" prices to practice with
const getSimulatedStocks = (): Stock[] => {
    return MOCK_STOCKS.map(stock => {
        // Random fluctuation between -0.8% and +0.8%
        // This simulates 'Previous Data' coming to life
        const fluctuation = (Math.random() * 0.016) - 0.008;
        const newPrice = stock.price * (1 + fluctuation);
        const prevClose = stock.price / (1 + (stock.changePercent / 100)); // approximate previous close
        
        return {
            ...stock,
            price: newPrice,
            change: newPrice - prevClose,
            changePercent: ((newPrice - prevClose) / prevClose) * 100
        };
    });
};

export const fetchRealTimeData = async (): Promise<StockFetchResult> => {
  // If no API key, return simulation
  if (!FINNHUB_API_KEY) {
      console.warn("No Finnhub API Key found. Using simulation.");
      return { stocks: getSimulatedStocks(), isLive: false };
  }

  // BATCHING STRATEGY
  // We have ~30 stocks. Finnhub limit is ~60 calls/min.
  // We cannot fetch all 30 instantly (burst limit might block us).
  // We split into chunks of 5, with a small delay between chunks.
  
  const CHUNK_SIZE = 5;
  const fetchedResults: { symbol: string, data: FinnhubQuote | null }[] = [];
  let isRateLimited = false;

  try {
      // Create chunks
      for (let i = 0; i < STOCK_SYMBOLS.length; i += CHUNK_SIZE) {
          const chunk = STOCK_SYMBOLS.slice(i, i + CHUNK_SIZE);
          
          // Process chunk in parallel
          const chunkPromises = chunk.map(async (symbol) => {
              // Logic: Only append .NS for Indian stocks
              const isIndian = INDIAN_STOCK_SYMBOLS.includes(symbol);
              const querySymbol = isIndian ? `${symbol}.NS` : symbol;
              
              const url = `${BASE_URL}?symbol=${querySymbol}&token=${FINNHUB_API_KEY}`;
              
              try {
                  const res = await fetch(url);
                  if (!res.ok) {
                      if (res.status === 429) { 
                          isRateLimited = true;
                          throw new Error('Rate Limit'); 
                      }
                      return null;
                  }
                  const data: FinnhubQuote = await res.json();
                  if (data.c === 0 && data.pc === 0) return null; // Invalid
                  return { symbol, data };
              } catch (e) {
                  return null;
              }
          });

          const chunkResults = await Promise.all(chunkPromises);
          
          // Collect valid results
          chunkResults.forEach(r => {
              if (r) fetchedResults.push(r);
          });

          // If rate limited, stop fetching remaining chunks to save API credits
          if (isRateLimited) break;

          // Small delay between chunks to be polite to the API
          if (i + CHUNK_SIZE < STOCK_SYMBOLS.length) {
              await new Promise(resolve => setTimeout(resolve, 800));
          }
      }

    // Check if we got mostly nulls or hit rate limit
    if (isRateLimited || fetchedResults.length === 0) {
        console.warn("Finnhub API: Rate Limited or No Data. Switching to Simulated Mode.");
        return { stocks: getSimulatedStocks(), isLive: false };
    }

    // Merge Real Data with Mock Fundamentals
    const updatedStocks = MOCK_STOCKS.map(mockStock => {
        const liveData = fetchedResults.find(r => r?.symbol === mockStock.symbol);
        
        if (liveData && liveData.data) {
            const q = liveData.data;
            // For US stocks, Finnhub returns price in USD. 
            // We should convert to INR or keep as USD. 
            // For simplicity in this simulator, we treat US prices purely numerically (or assume user understands currency diff)
            // However, to make it consistent with the "₹" symbol everywhere, 
            // we will multiply US stocks by ~83 to approximate INR if they are US stocks.
            // BUT, Finnhub might return mock stocks already in "approx INR" for the MOCK_STOCKS if I set them that way.
            // The MOCK_STOCKS for US are set in high INR numbers (e.g. Apple 14500). 
            // The LIVE price for Apple is ~$175. 
            // Logic: If price is < 1000 and it's a US stock, multiply by 83.
            
            let currentPrice = q.c;
            let prevClose = q.pc;
            let change = q.d;
            let high = q.h;
            let low = q.l;

            const isUS = !INDIAN_STOCK_SYMBOLS.includes(mockStock.symbol);
            if (isUS && currentPrice < 5000) { 
                 // Heuristic: Live price is likely USD. Convert to INR.
                 const USD_INR = 83.5;
                 currentPrice *= USD_INR;
                 prevClose *= USD_INR;
                 change *= USD_INR;
                 high *= USD_INR;
                 low *= USD_INR;
            }

            return {
                ...mockStock,
                price: currentPrice,
                change: change,
                changePercent: q.dp,
                high52: high > mockStock.high52 ? high : mockStock.high52, 
                low52: low < mockStock.low52 ? low : mockStock.low52,   
            };
        }
        // Fallback to simulation for this specific stock if live fetch failed
        const fluctuation = (Math.random() * 0.004) - 0.002; 
        const newPrice = mockStock.price * (1 + fluctuation);
        return { ...mockStock, price: newPrice };
    });

    return { stocks: updatedStocks, isLive: true };

  } catch (error) {
    console.error("Network/Fetch Error. Switching to Simulation Mode:", error);
    return { stocks: getSimulatedStocks(), isLive: false };
  }
};
