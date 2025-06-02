import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock data for the financial analysis
const financialData = {
  currentYear: {
    totalProfit: 180394,
    positiveProfit: 110023,
    negativeProfit: -40478,
    quarterlyData: [
      { quarter: 'Q1/2025', profit: 567676, positive: 285000, negative: -76565 }
    ],
  },
  lastYear: {
    totalProfit: 980000,
    positiveProfit: 780000,
    negativeProfit: -200000,
    quarterlyData: [
      { quarter: 'Q1/2024', profit: 646464, positive: 675676, negative: -65767 },
      { quarter: 'Q2/2024', profit: 464609, positive: 767688, negative: -87997 },
      { quarter: 'Q3/2024', profit: 324244, positive: 986868, negative: -23233 },
      { quarter: 'Q4/2024', profit: 234234, positive: 677575, negative: -43545 },
    ],
  },
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const calculateGrowth = (current: number, previous: number) => {
  return ((current - previous) / Math.abs(previous)) * 100;
};

export function AnalyzePage() {
  const growth = calculateGrowth(
    financialData.currentYear.totalProfit,
    financialData.lastYear.totalProfit
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Phân tích tài chính</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Tổng lợi nhuận</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(financialData.currentYear.totalProfit)}
            </p>
            <span className={`ml-2 flex items-baseline text-sm font-semibold ${
              growth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {growth >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              81,64%
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            so với {formatCurrency(financialData.lastYear.totalProfit)} năm ngoái
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Lợi nhuận dương</h3>
          <p className="mt-2 text-2xl font-semibold text-green-600">
            {formatCurrency(financialData.currentYear.positiveProfit)}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {((financialData.currentYear.positiveProfit / financialData.currentYear.totalProfit) * 100).toFixed(1)}% tổng lợi nhuận
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Lợi nhuận âm</h3>
          <p className="mt-2 text-2xl font-semibold text-red-600">
            {formatCurrency(financialData.currentYear.negativeProfit)}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {((Math.abs(financialData.currentYear.negativeProfit) / financialData.currentYear.totalProfit) * 100).toFixed(1)}% tổng lợi nhuận
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Phân tích lợi nhuận theo quý</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                ...financialData.currentYear.quarterlyData.map(item => ({ ...item, year: '2024' })),
                ...financialData.lastYear.quarterlyData.map(item => ({ ...item, year: '2025' }))
              ]}
              margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `${label} ${label.includes('2024') ? '2024' : '2025'}`}
              />
              <Legend />
              <Bar dataKey="positive" name="Lợi nhuận dương" fill="#10B981" />
              <Bar dataKey="negative" name="Lợi nhuận âm" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 