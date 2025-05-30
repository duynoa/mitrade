import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { StatCard } from '../../components/ui/stat-card';
import { AreaChart } from '../../components/charts/area-chart';
import { BarChart as BarChartComponent } from '../../components/charts/bar-chart';
import { PieChart } from '../../components/charts/pie-chart';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { formatCurrency } from '../../lib/utils';
import { 
  generateSystemStats, 
  generateCurrencyPairs,
  generateVisitorData,
  getProfitDistribution,
  generateMonthlyProfits
} from '../../mock-data/dashboard';

export function DashboardPage() {
  const [stats, setStats] = useState(generateSystemStats());
  const [currencyPairs, setCurrencyPairs] = useState(generateCurrencyPairs());
  const [visitorData, setVisitorData] = useState(generateVisitorData());
  const [profitDistribution, setProfitDistribution] = useState(getProfitDistribution(currencyPairs));
  const [monthlyProfits, setMonthlyProfits] = useState(generateMonthlyProfits());
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Tổng quan hệ thống</h2>
        <p className="text-gray-500 mt-1">Thống kê và hoạt động của hệ thống.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng số thành viên"
          value={stats.totalMembers.toLocaleString('vi-VN')}
          icon={<Users size={20} className="text-primary-600" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        
        <StatCard
          title="Lượt truy cập hôm qua"
          value={stats.visitorsYesterday.toLocaleString('vi-VN')}
          icon={<TrendingUp size={20} className="text-secondary-600" />}
          trend={{ value: 3.1, isPositive: true }}
        />
        
        <StatCard
          title="Lượt truy cập hôm nay"
          value={stats.visitorsToday.toLocaleString('vi-VN')}
          icon={<TrendingUp size={20} className="text-secondary-600" />}
          trend={{ value: 1.8, isPositive: false }}
        />
        
        <StatCard
          title="Tổng lợi nhuận"
          value={formatCurrency(stats.totalProfit, 'USD')}
          icon={<DollarSign size={20} className="text-success-600" />}
          trend={{ value: 12.5, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Lợi nhuận theo tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={monthlyProfits.map(mp => ({
                name: mp.month,
                value: mp.profit
              }))}
              dataKey="value"
              xAxisKey="name"
              color="#0c89e9"
              height={300}
              yAxisFormatter={v => formatCurrency(v, 'USD')}
              tooltipFormatter={v => formatCurrency(v, 'USD')}
            />
          </CardContent>
        </Card>
        
      
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <Card>
          <CardHeader>
            <CardTitle>Phân bổ lợi nhuận theo cặp tiền tệ</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <PieChart 
              data={profitDistribution} 
              height={300} 
              innerRadius={60}
              outerRadius={90}
            />
          </CardContent>
        </Card> 
      <Card>
        <CardHeader>
          <CardTitle>Lợi nhuận theo cặp tiền tệ</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cặp tiền tệ</TableHead>
                <TableHead>Lợi nhuận</TableHead>
                <TableHead>Khối lượng</TableHead>
                <TableHead>Thay đổi</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currencyPairs.map((pair) => (
                <TableRow key={pair.id}>
                  <TableCell className="font-medium">{pair.name}</TableCell>
                  <TableCell>{formatCurrency(pair.profit, 'USD')}</TableCell>
                  <TableCell>{pair.volume.toLocaleString('vi-VN')}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {pair.change > 0 ? (
                        <ArrowUpRight className="mr-1 h-4 w-4 text-success-500" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4 text-error-500" />
                      )}
                      <span 
                        className={pair.change > 0 ? 'text-success-600' : 'text-error-600'}
                      >
                        {Math.abs(pair.change).toFixed(2)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={pair.change > 0 ? 'success' : 'error'}
                    >
                      {pair.change > 0 ? 'Tăng' : 'Giảm'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </div>
      
    </div>
  );
}