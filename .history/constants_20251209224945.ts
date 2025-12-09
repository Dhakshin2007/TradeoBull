import { Stock } from './types';

// API Configuration
export const FINNHUB_API_KEY: string = 'd4s4dk9r01qvsjbff9u0d4s4dk9r01qvsjbff9ug'; 

export const INITIAL_BALANCE = 100000; // ₹1,00,000

export const CONTACT_INFO = {
  name: "Dhakshin Kotha",
  email: "dhakshinkotha2007@gmail.com"
};

export const ONBOARDING_STEPS = [
  {
    target: 'nav-explore',
    title: 'Market Explorer',
    content: 'Start here! View live market data, trending stocks, and global indices.'
  },
  {
    target: 'search-bar',
    title: 'Smart Search',
    content: 'Search for any stock symbol (e.g., RELIANCE) to see detailed analysis.'
  },
  {
    target: 'nav-investments',
    title: 'Your Portfolio',
    content: 'Track your holdings, profit/loss, and net worth in real-time here.'
  },
  {
    target: 'nav-learn',
    title: 'TradeoBull Guide',
    content: 'New to trading? Read our comprehensive guide to understand the basics.'
  }
];

export const LEGAL_CONTENT = {
  terms: `
    <strong style="color: #22c55e;">1. Acceptance of Terms</strong><br/>
    By accessing and using TradeoBull ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use immediately. The Platform is owned and operated by Dhakshin Kotha.<br/><br/>

    <strong style="color: #22c55e;">2. Educational Purpose Only (Simulation)</strong><br/>
    TradeoBull is strictly a stock market simulator. All currency used on the platform is <strong style="color: #22c55e;">virtual</strong> or <strong style="color: #22c55e;">paper money</strong> and has no real-world monetary value. No actual securities, stocks, or financial instruments are bought, sold, or held on your behalf.<br/><br/>

    <strong style="color: #22c55e;">3. No Financial Advice</strong><br/>
    Content, AI predictions, and market data provided on the Platform are for educational and entertainment purposes only. They do <strong style="color: #22c55e;">not constitute financial, investment, or legal advice</strong>. You should consult a certified financial advisor before making real-world investment decisions.<br/><br/>

    <strong style="color: #22c55e;">4. Data Accuracy</strong><br/>
    While we strive to provide real-time market data via third-party APIs (e.g., Finnhub, Twelve Data), we cannot guarantee the accuracy, timeliness, or completeness of any data. Market feeds may be delayed or simulated. TradeoBull is <strong style="color: #22c55e;">not liable</strong> for any discrepancies.<br/><br/>

    <strong style="color: #22c55e;">5. User Conduct</strong><br/>
    You agree not to:<br/>
    - Use the platform for any illegal purpose.<br/>
    - Attempt to manipulate the virtual market mechanics.<br/>
    - Use automated bots, scrapers, or scripts to access the Platform.<br/>
    - Harass other users or the developer.<br/><br/>

    <strong style="color: #22c55e;">6. Limitation of Liability</strong><br/>
    TradeoBull and its developer (Dhakshin Kotha) shall <strong style="color: #22c55e;">not be held liable</strong> for any damages, loss of profits, or data loss arising from your use of the Platform. Since this is a simulator, no real financial loss is possible within the app, but we are not responsible for actions you take in real financial markets based on your experience here.<br/><br/>

    <strong style="color: #22c55e;">7. Account Termination</strong><br/>
    We reserve the right to suspend or terminate your account at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.<br/><br/>

    <strong style="color: #22c55e;">8. Governing Law</strong><br/>
    These Terms shall be governed by the laws of India. Any disputes arising from these terms shall be resolved in the courts of India.
  `,
  privacy: `
    <br/><br/>

    <strong style="color: #22c55e;">1. Information We Collect</strong><br/>
    - <strong style="color: #22c55e;">Personal Information:</strong> We collect your Email Address and Name when you register to create a unique user profile and sync your progress.<br/>
    - <strong style="color: #22c55e;">Usage Data:</strong> We track your virtual trading history, portfolio holdings, and interaction with the app features to improve the simulation experience.<br/>
    - <strong style="color: #22c55e;">Device Information:</strong> We may collect information about the device and browser you use to access TradeoBull for optimization purposes.<br/><br/>

    <strong style="color: #22c55e;">2. How We Use Your Information</strong><br/>
    - To provide and maintain the Service.<br/>
    - To notify you about changes to our Service.<br/>
    - To allow you to participate in interactive features (e.g., Leaderboards).<br/>
    - To provide customer support.<br/>
    - To monitor the usage of the Service.<br/><br/>

    <strong style="color: #22c55e;">3. Data Security</strong><br/>
    The security of your data is important to us. We use standard encryption (SSL) and secure database storage (Supabase). However, <strong style="color: #22c55e;">no method of transmission over the Internet is 100% secure</strong>. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.<br/><br/>

    <strong style="color: #22c55e;">4. Third-Party Services</strong><br/>
    We use third-party services for specific functionality:<br/>
    - <strong style="color: #22c55e;">Supabase:</strong> For authentication and database storage.<br/>
    - <strong style="color: #22c55e;">Finnhub / Twelve Data:</strong> For stock market data APIs.<br/>
    - <strong style="color: #22c55e;">Google Gemini API:</strong> For AI-powered market insights.<br/>
    These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.<br/><br/>

    <strong style="color: #22c55e;">5. Cookies</strong><br/>
    We use cookies and similar tracking technologies to track the activity on our Service and hold certain information (e.g., keeping you logged in). You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.<br/><br/>

    <strong style="color: #22c55e;">6. Children's Privacy</strong><br/>
    Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.<br/><br/>

    <strong style="color: #22c55e;">7. Contact Us</strong><br/>
    If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:dhakshinkotha2007@gmail.com" class="text-blue-500 hover:underline">dhakshinkotha2007@gmail.com</a>.
  `
};

export const GUIDE_STEPS = [
  {
  title: "1. What is the Stock Market?",
  content: "Imagine a giant supermarket, but instead of buying groceries, you are buying small pieces of companies. These pieces are called <strong style=\"color: #22c55e;\">Shares</strong> or <strong style=\"color: #22c55e;\">Stocks</strong>. When you buy a stock, you become a partial owner of that company. The NSE (National Stock Exchange) and BSE (Bombay Stock Exchange) are the markets where this buying and selling happens in India."
  },
  {
  title: "2. How do I make money?",
  content: "The goal is simple: <strong style=\"color: #22c55e;\">Buy Low, Sell High</strong>. \n\nExample: You buy a stock of Reliance at ₹2400. If the price goes up to ₹2500, you make a profit of ₹100 per share. However, if the price drops to ₹2300, you lose ₹100. This is called <strong style=\"color: #22c55e;\">Capital Appreciation</strong>."
  },
  {
  title: "3. Market vs Limit Orders",
  content: "<strong style=\"color: #22c55e;\">Market Order:</strong> You want to buy the stock IMMEDIATELY at whatever price is available right now. It guarantees execution but not the exact price.\n\n<strong style=\"color: #22c55e;\">Limit Order:</strong> You set a specific price (e.g., Buy Reliance ONLY if it drops to ₹2350). The trade will only happen if the market hits your price."
  },
  {
  title: "4. Bull vs Bear Market",
  content: "<strong style=\"color: #22c55e;\">Bull Market (Green):</strong> When the economy is doing well, prices are going up, and investors are optimistic.\n\n<strong style=\"color: #22c55e;\">Bear Market (Red):</strong> When prices are falling, the economy is slowing down, and there is fear in the market."
  },
  {
  title: "5. Risk Management (Stop Loss)",
  content: "Never risk more than you can afford to lose. A <strong style=\"color: #22c55e;\">Stop Loss</strong> is a safety net. If you buy at ₹100, you might decide to sell automatically if it hits ₹95 to prevent further loss. In TradeoBull, practice cutting your losses early!"
  },
  {
  title: "6. Market Hours",
  content: "The Indian Stock Market is open from <strong style=\"color: #22c55e;\">9:15 AM to 3:30 PM</strong>, Monday to Friday. You cannot trade on weekends or public holidays. In TradeoBull, the market is simulated 24/7 so you can practice anytime!"
  }
];

// List of Indian Stocks for API logic (Needs .NS suffix)
export const INDIAN_STOCK_SYMBOLS = [
  'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK',
  'SBIN', 'BHARTIARTL', 'HINDUNILVR', 'LT', 'ASIANPAINT',
  'BAJFINANCE', 'DMART', 'MARUTI', 'TATAMOTORS', 'NTPC'
];

// Full List for App
export const STOCK_SYMBOLS = [
  'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 
  'SBIN', 'BHARTIARTL', 'HINDUNILVR', 'LT', 'ASIANPAINT',
  'BAJFINANCE', 'DMART', 'MARUTI', 'TATAMOTORS', 'NTPC',
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 
  'TSLA', 'META', 'NFLX', 'JPM', 'V',
  'JNJ', 'KO', 'MCD', 'BRK.A', 'DIS'
];

export const MOCK_STOCKS: Stock[] = [
  // --- INDIA ---
  {
  symbol: 'RELIANCE',
  name: 'Reliance Industries',
  price: 2450.50,
  change: 12.50,
  changePercent: 0.51,
  sector: 'Energy',
  description: 'Reliance Industries Limited is an Indian multinational conglomerate. Its businesses include energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.',
  marketCap: '₹16.5T', peRatio: 24.5, pbRatio: 2.1, roe: 9.8, divYield: 0.3, high52: 2630.00, low52: 2180.00
  },
  {
  symbol: 'TCS',
  name: 'Tata Consultancy Svcs',
  price: 3450.00,
  change: -25.00,
  changePercent: -0.72,
  sector: 'Technology',
  description: 'Tata Consultancy Services is an Indian multinational information technology services and consulting company.',
  marketCap: '₹12.8T', peRatio: 29.8, pbRatio: 12.4, roe: 38.5, divYield: 1.2, high52: 3890.00, low52: 3100.00
  },
  {
  symbol: 'HDFCBANK',
  name: 'HDFC Bank',
  price: 1620.75,
  change: 8.20,
  changePercent: 0.51,
  sector: 'Financials',
  description: 'HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai.',
  marketCap: '₹9.2T', peRatio: 19.2, pbRatio: 3.5, roe: 17.2, divYield: 1.1, high52: 1750.00, low52: 1380.00
  },
  {
  symbol: 'INFY',
  name: 'Infosys',
  price: 1420.30,
  change: 5.50,
  changePercent: 0.39,
  sector: 'Technology',
  description: 'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.',
  marketCap: '₹6.1T', peRatio: 22.1, pbRatio: 7.8, roe: 28.9, divYield: 2.4, high52: 1670.00, low52: 1210.00
  },
  {
  symbol: 'ICICIBANK',
  name: 'ICICI Bank',
  price: 940.10,
  change: 10.40,
  changePercent: 1.12,
  sector: 'Financials',
  description: 'ICICI Bank Limited is an Indian multinational bank and financial services company headquartered in Mumbai.',
  marketCap: '₹6.5T', peRatio: 17.5, pbRatio: 2.9, roe: 16.8, divYield: 0.8, high52: 1050.00, low52: 820.00
  },
  {
  symbol: 'SBIN',
  name: 'State Bank of India',
  price: 580.20,
  change: 4.10,
  changePercent: 0.71,
  sector: 'Financials',
  description: 'State Bank of India is an Indian multinational public sector bank and financial services statutory body.',
  marketCap: '₹5.1T', peRatio: 9.8, pbRatio: 1.4, roe: 16.5, divYield: 1.8, high52: 620.00, low52: 490.00
  },
  {
  symbol: 'BHARTIARTL',
  name: 'Bharti Airtel',
  price: 860.00,
  change: -2.00,
  changePercent: -0.23,
  sector: 'Telecommunications',
  description: 'Bharti Airtel Limited is an Indian multinational telecommunications services company based in New Delhi.',
  marketCap: '₹4.8T', peRatio: 65.2, pbRatio: 4.8, roe: 10.2, divYield: 0.5, high52: 950.00, low52: 740.00
  },
  {
  symbol: 'HINDUNILVR',
  name: 'Hindustan Unilever',
  price: 2550.00,
  change: -5.00,
  changePercent: -0.20,
  sector: 'Consumer Goods',
  description: 'Hindustan Unilever Limited is a consumer goods company based in Mumbai.',
  marketCap: '₹5.9T', peRatio: 55.4, pbRatio: 11.2, roe: 20.5, divYield: 1.5, high52: 2780.00, low52: 2350.00
  },
  {
  symbol: 'LT',
  name: 'Larsen & Toubro',
  price: 2900.00,
  change: 35.00,
  changePercent: 1.22,
  sector: 'Construction',
  description: 'Larsen & Toubro Limited is an Indian multinational conglomerate company, with business interests in engineering, construction, manufacturing, technology and financial services.',
  marketCap: '₹4.1T', peRatio: 35.4, pbRatio: 3.8, roe: 14.5, divYield: 0.8, high52: 3100.00, low52: 2100.00
  },
  {
  symbol: 'ASIANPAINT',
  name: 'Asian Paints',
  price: 3200.00,
  change: 15.00,
  changePercent: 0.47,
  sector: 'Materials',
  description: 'Asian Paints Limited is an Indian multinational paint company.',
  marketCap: '₹3.1T', peRatio: 68.5, pbRatio: 18.2, roe: 24.5, divYield: 0.8, high52: 3580.00, low52: 2800.00
  },
  {
  symbol: 'BAJFINANCE',
  name: 'Bajaj Finance',
  price: 7200.00,
  change: -80.00,
  changePercent: -1.10,
  sector: 'Financials',
  description: 'Bajaj Finance Limited is an Indian non-banking financial company.',
  marketCap: '₹4.3T', peRatio: 35.8, pbRatio: 8.5, roe: 22.5, divYield: 0.4, high52: 7800.00, low52: 5600.00
  },
  {
  symbol: 'DMART',
  name: 'Avenue Supermarts',
  price: 3800.00,
  change: -12.00,
  changePercent: -0.31,
  sector: 'Retail',
  description: 'Avenue Supermarts Limited, doing business as DMart, is an Indian retail corporation that operates a chain of hypermarkets.',
  marketCap: '₹2.5T', peRatio: 105.8, pbRatio: 14.5, roe: 16.5, divYield: 0.0, high52: 4200.00, low52: 3300.00
  },
  {
  symbol: 'MARUTI',
  name: 'Maruti Suzuki',
  price: 9800.00,
  change: 150.00,
  changePercent: 1.55,
  sector: 'Automobile',
  description: 'Maruti Suzuki India Limited is an Indian subsidiary of Japanese automaker Suzuki Motor Corporation.',
  marketCap: '₹2.9T', peRatio: 28.5, pbRatio: 4.5, roe: 12.5, divYield: 0.9, high52: 10500.00, low52: 8200.00
  },
  {
  symbol: 'TATAMOTORS',
  name: 'Tata Motors',
  price: 640.00,
  change: 12.00,
  changePercent: 1.91,
  sector: 'Automobile',
  description: 'Tata Motors Limited is an Indian multinational automotive manufacturing company.',
  marketCap: '₹2.1T', peRatio: 18.5, pbRatio: 3.5, roe: 11.5, divYield: 0.0, high52: 700.00, low52: 400.00
  },
  {
  symbol: 'NTPC',
  name: 'NTPC',
  price: 240.00,
  change: 1.50,
  changePercent: 0.63,
  sector: 'Energy',
  description: 'NTPC Limited is an Indian central public sector undertaking under the ownership of the Ministry of Power.',
  marketCap: '₹2.3T', peRatio: 12.5, pbRatio: 1.5, roe: 12.5, divYield: 3.5, high52: 260.00, low52: 160.00
  },

  // --- USA ---
  {
  symbol: 'AAPL', name: 'Apple Inc.', price: 14500.00, change: 120.00, changePercent: 0.83, sector: 'Technology',
  description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories.',
  marketCap: '₹240T', peRatio: 28.5, pbRatio: 45.2, roe: 160.5, divYield: 0.5, high52: 15800.00, low52: 12500.00
  },
  {
  symbol: 'MSFT', name: 'Microsoft Corp', price: 28000.00, change: 250.00, changePercent: 0.90, sector: 'Technology',
  description: 'Microsoft Corporation produces software, consumer electronics, personal computers, and related services.',
  marketCap: '₹230T', peRatio: 35.2, pbRatio: 12.5, roe: 38.5, divYield: 0.8, high52: 30000.00, low52: 24000.00
  },
  {
  symbol: 'GOOGL', name: 'Alphabet (Google)', price: 11500.00, change: -80.00, changePercent: -0.69, sector: 'Technology',
  description: 'Alphabet Inc. is an American multinational technology conglomerate holding company and is the parent company of Google.',
  marketCap: '₹150T', peRatio: 25.8, pbRatio: 6.5, roe: 23.5, divYield: 0.0, high52: 12500.00, low52: 9500.00
  },
  {
  symbol: 'AMZN', name: 'Amazon.com', price: 10800.00, change: 150.00, changePercent: 1.41, sector: 'Consumer Cyclical',
  description: 'Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, and digital streaming.',
  marketCap: '₹140T', peRatio: 60.5, pbRatio: 8.5, roe: 15.5, divYield: 0.0, high52: 12000.00, low52: 9000.00
  },
  {
  symbol: 'NVDA', name: 'NVIDIA Corp', price: 38500.00, change: 1200.00, changePercent: 3.22, sector: 'Technology',
  description: 'NVIDIA Corporation is a multinational technology company known for designing graphics processing units (GPUs).',
  marketCap: '₹180T', peRatio: 75.5, pbRatio: 35.5, roe: 45.5, divYield: 0.03, high52: 40000.00, low52: 25000.00
  },
  {
  symbol: 'TSLA', name: 'Tesla Inc.', price: 18000.00, change: -400.00, changePercent: -2.17, sector: 'Automobile',
  description: 'Tesla, Inc. is an American multinational automotive and clean energy company.',
  marketCap: '₹60T', peRatio: 45.5, pbRatio: 12.5, roe: 20.5, divYield: 0.0, high52: 22000.00, low52: 14000.00
  },
  {
  symbol: 'META', name: 'Meta Platforms', price: 24500.00, change: 300.00, changePercent: 1.24, sector: 'Technology',
  description: 'Meta Platforms, Inc. doing business as Meta, and formerly named Facebook, Inc., is an American multinational technology conglomerate.',
  marketCap: '₹80T', peRatio: 28.5, pbRatio: 6.5, roe: 25.5, divYield: 0.0, high52: 28000.00, low52: 18000.00
  },
  {
  symbol: 'NFLX', name: 'Netflix Inc.', price: 35000.00, change: 500.00, changePercent: 1.45, sector: 'Communication Services',
  description: 'Netflix, Inc. is an American subscription video on-demand over-the-top streaming service and production company.',
  marketCap: '₹18T', peRatio: 32.5, pbRatio: 8.5, roe: 22.5, divYield: 0.0, high52: 38000.00, low52: 28000.00
  },
  {
  symbol: 'JPM', name: 'JPMorgan Chase', price: 12500.00, change: 80.00, changePercent: 0.64, sector: 'Financials',
  description: 'JPMorgan Chase & Co. is an American multinational financial services firm.',
  marketCap: '₹35T', peRatio: 10.5, pbRatio: 1.5, roe: 15.5, divYield: 2.5, high52: 13500.00, low52: 10500.00
  },
  {
  symbol: 'V', name: 'Visa Inc.', price: 19800.00, change: 120.00, changePercent: 0.61, sector: 'Financials',
  description: 'Visa Inc. is an American multinational financial services corporation.',
  marketCap: '₹38T', peRatio: 28.5, pbRatio: 14.5, roe: 45.5, divYield: 0.8, high52: 21000.00, low52: 17500.00
  },
  {
  symbol: 'JNJ', name: 'Johnson & Johnson', price: 13200.00, change: -20.00, changePercent: -0.15, sector: 'Healthcare',
  description: 'Johnson & Johnson is an American multinational pharmaceutical, biotechnology, and medical technologies company.',
  marketCap: '₹32T', peRatio: 15.5, pbRatio: 4.5, roe: 25.5, divYield: 2.8, high52: 14500.00, low52: 12500.00
  },
  {
  symbol: 'KO', name: 'Coca-Cola', price: 4800.00, change: 10.00, changePercent: 0.21, sector: 'Consumer Goods',
  description: 'The Coca-Cola Company is an American multinational corporation founded in 1892.',
  marketCap: '₹20T', peRatio: 22.5, pbRatio: 10.5, roe: 40.5, divYield: 3.1, high52: 5200.00, low52: 4500.00
  },
  {
  symbol: 'MCD', name: "McDonald's", price: 23500.00, change: 150.00, changePercent: 0.64, sector: 'Consumer Goods',
  description: "McDonald's Corporation is an American multinational fast food chain.",
  marketCap: '₹18T', peRatio: 24.5, pbRatio: 18.5, roe: 120.5, divYield: 2.2, high52: 25000.00, low52: 21000.00
  },
  {
  symbol: 'BRK.A', name: 'Berkshire Hathaway', price: 445000.00, change: 2500.00, changePercent: 0.56, sector: 'Financials',
  description: 'Berkshire Hathaway Inc. is an American multinational conglomerate holding company.',
  marketCap: '₹60T', peRatio: 18.5, pbRatio: 1.4, roe: 8.5, divYield: 0.0, high52: 480000.00, low52: 400000.00
  },
  {
  symbol: 'DIS', name: 'Walt Disney', price: 8500.00, change: -120.00, changePercent: -1.39, sector: 'Communication Services',
  description: 'The Walt Disney Company is an American multinational mass media and entertainment conglomerate.',
  marketCap: '₹12T', peRatio: 38.5, pbRatio: 1.8, roe: 6.5, divYield: 0.0, high52: 10000.00, low52: 7500.00
  }
];
