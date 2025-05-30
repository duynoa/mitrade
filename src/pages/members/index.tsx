import React, { useState } from 'react';
import { Search, Filter, UserPlus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import { generateMembers, Member } from '../../mock-data/members';

export function MembersPage() {
  const [members, setMembers] = useState<Member[]>(generateMembers(200));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust as needed
  
  const filteredMembers = members.filter((member) => {
    // Apply search filter
    const matchesSearch = 
      member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery);
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };
  
  const statusBadgeVariant = {
    active: 'success',
    inactive: 'error',
    pending: 'warning',
  };
  
  const statusLabel = {
    active: 'Hoạt động',
    inactive: 'Không hoạt động',
    pending: 'Chờ duyệt',
  };
  
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredMembers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const renderPageButtons = () => {
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Quản lý thành viên</h2>
          <p className="text-gray-500 mt-1">Quản lý thông tin và trạng thái của thành viên.</p>
        </div>
        <Button variant="primary">
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm thành viên
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Danh sách thành viên</CardTitle>
          
          <div className="mt-4 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <div className="relative sm:w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo ID, tên, email hoặc số điện thoại..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-9"
              />
            </div>
            
            <Select
              options={[
                { value: 'all', label: 'Tất cả trạng thái' },
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Không hoạt động' },
                { value: 'pending', label: 'Chờ duyệt' },
              ]}
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="sm:w-48"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Số dư</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    Không có thành viên nào phù hợp với điều kiện tìm kiếm
                  </TableCell>
                </TableRow>
              ) : (
                currentMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.id}</TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(member.balance)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={statusBadgeVariant[member.status] as any}
                      >
                        {statusLabel[member.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(member.createdAt)}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit2 size={16} />
                      </Button>
                      {member.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="sm" className="text-success-600">
                            <CheckCircle size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-error-600">
                            <XCircle size={16} />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Hiển thị {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredMembers.length)} của 65,451 kết quả
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Trước
              </Button>
              {renderPageButtons()}
              <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredMembers.length / itemsPerPage)}>
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}