import React, { useState } from 'react';
import { Wallet, ArrowDown, ArrowUp, CreditCard, Search, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/table';
import { StatusBadge } from '../../components/ui/status-badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import { generateTransactions, Transaction } from '../../mock-data/transactions';

export function CashierPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(generateTransactions(20));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
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
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };
  
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Giao dịch tiền</h2>
        <p className="text-gray-500 mt-1">Quản lý nạp và rút tiền.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowDown className="mr-2 h-5 w-5 text-success-500" />
              Nạp tiền
            </CardTitle>
            <CardDescription>Thêm tiền vào tài khoản khách hàng</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="primary" className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              Tạo giao dịch nạp tiền
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowUp className="mr-2 h-5 w-5 text-error-500" />
              Rút tiền
            </CardTitle>
            <CardDescription>Xử lý yêu cầu rút tiền của khách hàng</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="primary" className="w-full">
              <Wallet className="mr-2 h-4 w-4" />
              Tạo yêu cầu rút tiền
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giao dịch</CardTitle>
          <CardDescription>Danh sách các giao dịch nạp/rút tiền gần đây</CardDescription>
          
          <div className="mt-4 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo ID, tên..."
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
                filteredTransactions.map((transaction) => (
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
                      <Button variant="ghost" size="sm">
                        <FileText size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}