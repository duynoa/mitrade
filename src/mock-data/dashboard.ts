import { subDays, format } from 'date-fns';
import { getRandomElement } from '../lib/utils';

export interface SystemStats {
  totalMembers: number;
  activeMembers: number;
  visitorsYesterday: number;
  visitorsToday: number;
  totalVisitors: number;
  totalProfit: number;
}

export interface CurrencyPair {
  id: string;
  name: string;
  profit: number;
  volume: number;
  change: number;
}

export interface VisitorData {
  date: string;
  count: number;
}

export interface MonthlyProfit {
  month: string;
  profit: number;
}

const currencyPairs = [
  { id: 'btc-usdt', name: 'BTC/USDT' },
  { id: 'eth-usdt', name: 'ETH/USDT' },
  { id: 'bnb-usdt', name: 'BNB/USDT' },
  { id: 'sol-usdt', name: 'SOL/USDT' },
  { id: 'doge-usdt', name: 'DOGE/USDT' },
];

export function generateSystemStats(): SystemStats {
  return {
    totalMembers: 728027,
    activeMembers: Math.floor(728000 * 0.75),
    visitorsYesterday: 376096,
    visitorsToday: 303055,
    totalVisitors: 1500000,
    totalProfit: 2068005,
  };
}

export function generateMonthlyProfits(): MonthlyProfit[] {
  return [
    { month: '02/2024', profit: 5380120 },
    { month: '03/2024', profit: 3082994 },
    { month: '04/2024', profit: 4803839 },
    { month: '05/2024', profit: -5024660 },
    { month: '06/2024', profit: 4930002 },
    { month: '07/2024', profit: 6930832 },
    { month: '08/2024', profit: -2048049 },
    { month: '09/2024', profit: -1893777 },
    { month: '10/2024', profit: 7304899 },
    { month: '11/2024', profit: 5800801 },
    { month: '12/2024', profit: 5939022 },
    { month: '01/2025', profit: 6839039 },
    { month: '02/2025', profit: 4930090 },
    { month: '03/2025', profit: 4142296 },
    { month: '04/2025', profit: 5142296 }, 
    { month: '05/2025', profit: 6142296 },
  ];
}

export function generateCurrencyPairs(): CurrencyPair[] {
  return currencyPairs.map((pair) => {
    const profit = Math.floor(Math.random() * 5000000) + 1000000;
    const volume = Math.floor(Math.random() * 10000) + 5000;
    const change = Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1);
    
    return {
      ...pair,
      profit,
      volume,
      change,
    };
  });
}

export function generateVisitorData(days: number = 7): VisitorData[] {
  const result = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dateString = format(date, 'dd/MM');
    const baseCount = 300000;
    const randomVariation = Math.floor(Math.random() * 100000);
    
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const count = isWeekend 
      ? Math.floor((baseCount + randomVariation) * 0.7) 
      : baseCount + randomVariation;
    
    result.push({
      date: dateString,
      count,
    });
  }
  
  return result;
}

export function getProfitDistribution(currencyPairs: CurrencyPair[]) {
  const totalProfit = currencyPairs.reduce((sum, pair) => sum + pair.profit, 0);
  
  return currencyPairs.map((pair) => ({
    name: pair.name,
    value: pair.profit,
    percentage: (pair.profit / totalProfit) * 100,
  }));
}

export function getVolumeDistribution(currencyPairs: CurrencyPair[]) {
  const totalVolume = currencyPairs.reduce((sum, pair) => sum + pair.volume, 0);
  
  return currencyPairs.map((pair) => ({
    name: pair.name,
    value: pair.volume,
    percentage: (pair.volume / totalVolume) * 100,
  }));
}