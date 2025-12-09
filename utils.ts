import { ChartDataPoint } from './types';

export const formatCurrency = (val: number) => {
    return '₹' + val.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
};

export const generateChartData = (basePrice: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let price = basePrice;
  const now = new Date();
  for (let i = 50; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const change = (Math.random() - 0.5) * (basePrice * 0.01); 
    price += change;
    data.push({ time, price });
  }
  return data;
};