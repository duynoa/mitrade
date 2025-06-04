import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Download, Wallet, ArrowDown, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/table';
import { StatusBadge } from '../../components/ui/status-badge';
import { AreaChart } from '../../components/charts/area-chart';
import { formatCurrency, formatDate } from '../../lib/utils';
import { 
  generateTransactions, 
  Transaction, 
  getTransactionStats,
  getTransactionChartData
} from '../../mock-data/transactions';

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(generateTransactions(200));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [chartData, setChartData] = useState(getTransactionChartData(transactions));
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const itemsPerPage = 10; // Adjust as needed
  
  const stats = getTransactionStats();
  
  // Cập nhật dữ liệu biểu đồ mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(getTransactionChartData(transactions));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [transactions]);
  
  const filteredTransactions = transactions.filter((transaction) => {
    // Apply search filter
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    // Apply type filter
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };
  
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
  };
  
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredTransactions.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const renderPageButtons = () => {
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const pageButtons = [];
    const offset = 2; // Number of pages to show before and after the current page

    for (let i = Math.max(1, currentPage - offset); i <= Math.min(totalPages, currentPage + offset); i++) {
      pageButtons.push(
        <Button
          key={i}
          variant="outline"
          size="sm"
          className={i === currentPage ? 'bg-primary-50 text-primary-700' : ''}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Button>
      );
    }

    return pageButtons;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Quản lý Giao dịch</h2>
        <p className="text-gray-500 mt-1">Theo dõi và quản lý tất cả các giao dịch.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng nạp tiền</p>
                <h4 className="mt-2 text-2xl font-bold text-gray-900">
                  {formatCurrency(320865)}
                </h4>
              </div>
              <div className="p-2 bg-success-50 rounded-full">
                <ArrowDown className="h-5 w-5 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng rút tiền</p>
                <h4 className="mt-2 text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalWithdrawals)}
                </h4>
              </div>
              <div className="p-2 bg-error-50 rounded-full">
                <ArrowUp className="h-5 w-5 text-error-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Nạp tiền chờ duyệt</p>
                <h4 className="mt-2 text-2xl font-bold text-gray-900">
                  {stats.pendingDeposits}
                </h4>
              </div>
              <div className="p-2 bg-warning-50 rounded-full">
                <Wallet className="h-5 w-5 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Rút tiền chờ duyệt</p>
                <h4 className="mt-2 text-2xl font-bold text-gray-900">
                  {stats.pendingWithdrawals}
                </h4>
              </div>
              <div className="p-2 bg-warning-50 rounded-full">
                <Wallet className="h-5 w-5 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Thống kê giao dịch 24 giờ qua (Cập nhật realtime)</CardTitle>
          <CardDescription>Dữ liệu được cập nhật mỗi 5 giây</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-primary"></div>
                <span className="text-sm text-gray-500">Nạp tiền</span>
              </div>
              {showWithdrawal && (
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-error-500"></div>
                  <span className="text-sm text-gray-500">Rút tiền</span>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowWithdrawal(!showWithdrawal)}
            >
              {showWithdrawal ? 'Ẩn rút tiền' : 'Hiện rút tiền'}
            </Button>
          </div>
          <AreaChart 
            data={chartData}
            dataKey="deposit"
            secondaryDataKey={showWithdrawal ? "withdrawal" : undefined}
            secondaryColor="#f43f5e"
            xAxisKey="name"
            height={300}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giao dịch</CardTitle>
          <CardDescription>Danh sách tất cả các giao dịch nạp/rút tiền</CardDescription>
          
          <div className="mt-4 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm kiếm giao dịch..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-9"
              />
            </div>
            
            <Select
              options={[
                { value: 'all', label: 'Tất cả trạng thái' },
                { value: 'pending', label: 'Đợi xử lý' },
                { value: 'processing', label: 'Đang xử lý' },
                { value: 'completed', label: 'Hoàn thành' },
                { value: 'failed', label: 'Thất bại' },
              ]}
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="sm:w-48"
            />
            
            <Select
              options={[
                { value: 'all', label: 'Tất cả loại' },
                { value: 'deposit', label: 'Nạp tiền' },
                { value: 'withdrawal', label: 'Rút tiền' },
              ]}
              value={typeFilter}
              onChange={handleTypeFilterChange}
              className="sm:w-36"
            />
            
            <div className="ml-auto flex items-center">
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Lọc theo ngày
              </Button>
              <Button variant="outline" className="ml-2 flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Xuất Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    Không có giao dịch nào phù hợp với điều kiện tìm kiếm
                  </TableCell>
                </TableRow>
              ) : (
                currentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {transaction.type === 'deposit' ? (
                          <ArrowDown className="mr-1.5 h-4 w-4 text-success-500" />
                        ) : (
                          <ArrowUp className="mr-1.5 h-4 w-4 text-error-500" />
                        )}
                        {transaction.type === 'deposit' ? 'Nạp tiền' : 'Rút tiền'}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>{transaction.userName}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                    <TableCell>
                      <StatusBadge status={transaction.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredTransactions.length)} của 235,654 kết quả
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Trước
              </Button>
              {renderPageButtons()}
              <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredTransactions.length / itemsPerPage)}>
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}