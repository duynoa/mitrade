import React, { useState } from 'react';
import { Search, MessageSquare, Send, Filter, Calendar, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { TextArea } from '../../components/ui/text-area';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { formatDate } from '../../lib/utils';
import { generateSupportTickets, SupportTicket } from '../../mock-data/support';

export function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(generateSupportTickets());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  
  const filteredTickets = tickets.filter((ticket) => {
    // Apply search filter
    const matchesSearch = 
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    // Apply category filter
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };
  
  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value);
  };
  
  const handleNewTicketMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTicketMessage(e.target.value);
  };
  
  const handleSubmitNewTicket = () => {
    if (newTicketMessage.trim()) {
      // In a real app, this would submit the ticket to the backend
      setNewTicketMessage('');
      alert('Yêu cầu hỗ trợ đã được gửi thành công!');
    }
  };
  
  const statusBadgeVariant = {
    open: 'warning',
    in_progress: 'primary',
    resolved: 'success',
    closed: 'error',
  };
  
  const statusLabel = {
    open: 'Mở',
    in_progress: 'Đang xử lý',
    resolved: 'Đã giải quyết',
    closed: 'Đã đóng',
  };
  
  const priorityBadgeVariant = {
    low: 'default',
    medium: 'warning',
    high: 'error',
  };
  
  const priorityLabel = {
    low: 'Thấp',
    medium: 'Trung bình',
    high: 'Cao',
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Hỗ trợ và Yêu cầu</h2>
        <p className="text-gray-500 mt-1">Gửi và theo dõi các yêu cầu hỗ trợ.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách yêu cầu hỗ trợ</CardTitle>
              
              <div className="mt-4 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <div className="relative sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-9"
                  />
                </div>
                
                <Select
                  options={[
                    { value: 'all', label: 'Tất cả trạng thái' },
                    { value: 'open', label: 'Mở' },
                    { value: 'in_progress', label: 'Đang xử lý' },
                    { value: 'resolved', label: 'Đã giải quyết' },
                    { value: 'closed', label: 'Đã đóng' },
                  ]}
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="sm:w-40"
                />
                
                <Select
                  options={[
                    { value: 'all', label: 'Tất cả danh mục' },
                    { value: 'Nạp tiền', label: 'Nạp tiền' },
                    { value: 'Rút tiền', label: 'Rút tiền' },
                    { value: 'Vấn đề tài khoản', label: 'Vấn đề tài khoản' },
                    { value: 'Câu hỏi chung', label: 'Câu hỏi chung' },
                    { value: 'Báo lỗi', label: 'Báo lỗi' },
                    { value: 'Góp ý', label: 'Góp ý' },
                  ]}
                  value={categoryFilter}
                  onChange={handleCategoryFilterChange}
                  className="sm:w-40"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Độ ưu tiên</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                        Không có yêu cầu hỗ trợ nào phù hợp với điều kiện tìm kiếm
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{ticket.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{ticket.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={priorityBadgeVariant[ticket.priority] as any}>
                            {priorityLabel[ticket.priority]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusBadgeVariant[ticket.status] as any}>
                            {statusLabel[ticket.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MessageSquare size={16} />
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
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Gửi yêu cầu hỗ trợ mới</CardTitle>
              <CardDescription>Điền thông tin để gửi yêu cầu hỗ trợ đến bộ phận chăm sóc khách hàng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Danh mục"
                options={[
                  { value: 'Nạp tiền', label: 'Nạp tiền' },
                  { value: 'Rút tiền', label: 'Rút tiền' },
                  { value: 'Vấn đề tài khoản', label: 'Vấn đề tài khoản' },
                  { value: 'Câu hỏi chung', label: 'Câu hỏi chung' },
                  { value: 'Báo lỗi', label: 'Báo lỗi' },
                  { value: 'Góp ý', label: 'Góp ý' },
                ]}
              />
              
              <Input
                label="Tiêu đề"
                placeholder="Nhập tiêu đề yêu cầu"
              />
              
              <TextArea
                label="Nội dung"
                placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
                value={newTicketMessage}
                onChange={handleNewTicketMessageChange}
                rows={4}
              />
              
              <Select
                label="Độ ưu tiên"
                options={[
                  { value: 'low', label: 'Thấp' },
                  { value: 'medium', label: 'Trung bình' },
                  { value: 'high', label: 'Cao' },
                ]}
              />
            </CardContent>
            <CardFooter>
              <Button 
                variant="primary" 
                className="w-full"
                onClick={handleSubmitNewTicket}
                disabled={!newTicketMessage.trim()}
              >
                <Send className="mr-2 h-4 w-4" />
                Gửi yêu cầu
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Trợ giúp nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-primary-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <HelpCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-primary-800">
                      Các câu hỏi thường gặp
                    </h3>
                    <div className="mt-2 text-sm text-primary-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Làm thế nào để nạp tiền?</li>
                        <li>Thời gian xử lý rút tiền?</li>
                        <li>Cách thay đổi thông tin cá nhân?</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                <p className="font-medium text-gray-700 mb-1">Liên hệ trực tiếp:</p>
                <p>Hotline: 1900 1234</p>
                <p>Email: support@mitrade.com</p>
                <p>Giờ làm việc: 8:00 - 18:00 (T2-T6)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}