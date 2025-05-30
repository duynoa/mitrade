import { subDays, formatISO } from 'date-fns';
import { getRandomElement } from '../lib/utils';

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: string;
  updatedAt: string;
  responses: SupportResponse[];
}

export interface SupportResponse {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  isStaff: boolean;
  content: string;
  createdAt: string;
}

const users = [
  { id: 'user1', name: 'Nguyễn Văn A' },
  { id: 'user2', name: 'Trần Thị B' },
  { id: 'user3', name: 'Lê Văn C' },
  { id: 'user4', name: 'Phạm Thị D' },
  { id: 'user5', name: 'Hoàng Văn E' },
];

const staff = [
  { id: 'staff1', name: 'Hỗ trợ viên 1' },
  { id: 'staff2', name: 'Hỗ trợ viên 2' },
  { id: 'staff3', name: 'Quản trị viên' },
];

const categories = [
  'Nạp tiền',
  'Rút tiền',
  'Vấn đề tài khoản',
  'Câu hỏi chung',
  'Báo lỗi',
  'Góp ý',
];

const priorities: Array<SupportTicket['priority']> = ['low', 'medium', 'high'];
const statuses: Array<SupportTicket['status']> = ['open', 'in_progress', 'resolved', 'closed'];

const supportTicketTitles = [
  'Không thể nạp tiền vào tài khoản',
  'Yêu cầu rút tiền bị từ chối',
  'Không đăng nhập được vào tài khoản',
  'Câu hỏi về phí giao dịch',
  'Không nhận được email xác nhận',
  'Cần hỗ trợ cập nhật thông tin cá nhân',
  'Gặp lỗi khi giao dịch',
  'Yêu cầu xác minh tài khoản',
  'Tài khoản bị khóa',
  'Góp ý cải thiện giao diện',
];

const supportTicketContents = [
  'Tôi đã thực hiện nạp tiền qua ngân hàng từ hôm qua nhưng đến giờ vẫn chưa thấy tiền vào tài khoản. Mã giao dịch: TX123456.',
  'Tôi đã yêu cầu rút tiền nhưng bị từ chối mà không có lý do cụ thể. Vui lòng kiểm tra giúp tôi.',
  'Tôi không thể đăng nhập vào tài khoản của mình mặc dù đã nhập đúng email và mật khẩu. Cần hỗ trợ gấp.',
  'Tôi muốn biết thêm về phí giao dịch khi rút tiền. Có mức phí cố định không hay tính theo phần trăm?',
  'Tôi đã đăng ký tài khoản mới nhưng không nhận được email xác nhận. Đã kiểm tra cả thư mục spam.',
  'Tôi muốn cập nhật số điện thoại mới trong tài khoản nhưng không tìm thấy chức năng này. Làm thế nào để thay đổi?',
  'Khi tôi thực hiện giao dịch mua, hệ thống báo lỗi và không hoàn thành được. Vui lòng kiểm tra.',
  'Tôi cần hỗ trợ xác minh tài khoản để nâng hạn mức giao dịch. Cần cung cấp những giấy tờ gì?',
  'Tài khoản của tôi bị khóa đột ngột. Làm thế nào để mở lại?',
  'Tôi thấy giao diện phần quản lý giao dịch hơi khó sử dụng, có thể cải thiện để dễ theo dõi hơn không?',
];

const supportResponseContents = [
  'Cảm ơn bạn đã liên hệ. Chúng tôi đã tiếp nhận yêu cầu và sẽ xử lý trong thời gian sớm nhất.',
  'Chúng tôi đã kiểm tra và xác nhận giao dịch của bạn. Vấn đề sẽ được giải quyết trong 24 giờ tới.',
  'Vui lòng cung cấp thêm thông tin để chúng tôi có thể hỗ trợ tốt hơn: số điện thoại và thời gian giao dịch.',
  'Chúng tôi đã giải quyết vấn đề cho bạn. Vui lòng kiểm tra lại và phản hồi nếu còn gặp khó khăn.',
  'Theo quy định, yêu cầu của bạn cần thời gian xử lý từ 1-3 ngày làm việc. Mong bạn thông cảm chờ đợi.',
];

function generateSupportResponse(ticketId: string, isStaff: boolean, createdAt: string): SupportResponse {
  const responseUser = isStaff ? getRandomElement(staff) : getRandomElement(users);
  
  return {
    id: `SR${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
    ticketId,
    userId: responseUser.id,
    userName: responseUser.name,
    isStaff,
    content: getRandomElement(supportResponseContents),
    createdAt: new Date(new Date(createdAt).getTime() + Math.random() * 86400000).toISOString(), // Add up to 24 hours
  };
}

function generateSupportTicket(id: number): SupportTicket {
  const user = getRandomElement(users);
  const daysAgo = Math.floor(Math.random() * 30);
  const createdAt = subDays(new Date(), daysAgo).toISOString();
  const status = getRandomElement(statuses);
  
  // Generate between 0 and 3 responses
  const responseCount = Math.floor(Math.random() * 4);
  const responses: SupportResponse[] = [];
  
  for (let i = 0; i < responseCount; i++) {
    // Alternate between staff and user responses
    const isStaff = i % 2 === 0;
    responses.push(generateSupportResponse(`ST${id.toString().padStart(6, '0')}`, isStaff, createdAt));
  }
  
  // Sort responses by creation date
  responses.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
  const lastResponse = responses.length > 0 ? responses[responses.length - 1].createdAt : createdAt;
  
  return {
    id: `ST${id.toString().padStart(6, '0')}`,
    userId: user.id,
    userName: user.name,
    title: getRandomElement(supportTicketTitles),
    content: getRandomElement(supportTicketContents),
    status,
    priority: getRandomElement(priorities),
    category: getRandomElement(categories),
    createdAt,
    updatedAt: lastResponse,
    responses,
  };
}

export function generateSupportTickets(count: number = 20): SupportTicket[] {
  return Array.from({ length: count }, (_, i) => generateSupportTicket(i + 1));
}

export function getSupportTicketsByStatus(
  status: SupportTicket['status'],
  tickets: SupportTicket[]
): SupportTicket[] {
  return tickets.filter((ticket) => ticket.status === status);
}

export function getSupportTicketsByUser(
  userId: string,
  tickets: SupportTicket[]
): SupportTicket[] {
  return tickets.filter((ticket) => ticket.userId === userId);
}

export function getSupportTicketsByCategory(
  category: string,
  tickets: SupportTicket[]
): SupportTicket[] {
  return tickets.filter((ticket) => ticket.category === category);
}

export function getSupportTicketStats(tickets: SupportTicket[]) {
  const total = tickets.length;
  
  const open = tickets.filter((ticket) => ticket.status === 'open').length;
  const inProgress = tickets.filter((ticket) => ticket.status === 'in_progress').length;
  const resolved = tickets.filter((ticket) => ticket.status === 'resolved').length;
  const closed = tickets.filter((ticket) => ticket.status === 'closed').length;
  
  const highPriority = tickets.filter((ticket) => ticket.priority === 'high').length;
  
  const categoryDistribution = categories.map((category) => {
    const count = tickets.filter((ticket) => ticket.category === category).length;
    return {
      name: category,
      value: count,
    };
  });
  
  return {
    total,
    open,
    inProgress,
    resolved,
    closed,
    highPriority,
    categoryDistribution,
  };
}