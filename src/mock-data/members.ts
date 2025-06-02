import { subDays, subMonths, addDays, formatISO } from 'date-fns';
import { getRandomElement } from '../lib/utils';

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  balance: number;
  createdAt: string;
  lastLogin?: string;
}

const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
const middleNames = ['Văn', 'Thị', 'Hữu', 'Đình', 'Minh', 'Quang', 'Thanh', 'Anh', 'Tuấn', 'Hoàng', 'Thành', 'Phương', 'Hải', 'Công', 'Thị'];
const lastNames = ['An', 'Bình', 'Chung', 'Dũng', 'Em', 'Giang', 'Hà', 'Hùng', 'Lan', 'Long', 'Minh', 'Nam', 'Phong', 'Quang', 'Sơn', 'Thành', 'Tùng', 'Uyên', 'Xuân', 'Yến'];

const foreignFirstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Olivia', 'James', 'Sophia', 'William', 'Ava', 'Ethan', 'Mia', 'Michael', 'Emily', 'David', 'Olivia', 'James', 'Sophia', 'William', 'Ava'];
const foreignLastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

const statuses: Array<Member['status']> = ['active', 'inactive', 'pending'];
const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];

function generateEmail(name: string): string {
  const normalizedName = name
    .toLowerCase()
    .replace(/\s+/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  const randomNumber = Math.floor(Math.random() * 1000);
  const domain = getRandomElement(domains);
  
  return `${normalizedName}${randomNumber}@${domain}`;
}

function generatePhone(): string {
  const prefixes = ['03', '05', '07', '08', '09'];
  const prefix = getRandomElement(prefixes);
  const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  
  return `${prefix}${number}`;
}

function generateName(): string {
  const firstName = getRandomElement(firstNames);
  const middleName = getRandomElement(middleNames);
  const lastName = getRandomElement(lastNames);
  
  return `${firstName} ${middleName} ${lastName}`;
}

function generateForeignName(): string {
  const firstName = getRandomElement(foreignFirstNames);
  const lastName = getRandomElement(foreignLastNames);
  return `${firstName} ${lastName}`;
}

function generateMember(id: number): Member {
  const name = Math.random() > 0.5 ? generateName() : generateForeignName();
  const createdAt = formatISO(subDays(new Date(), Math.floor(Math.random() * 365)));
  const status = getRandomElement(statuses);
  const lastLogin = Math.random() > 0.2 ? formatISO(subDays(new Date(), Math.floor(Math.random() * 30))) : undefined;
  
  return {
    id: `M${id.toString().padStart(6, '0')}`,
    name,
    email: generateEmail(name),
    phone: generatePhone(),
    status,
    balance: Math.floor(Math.random() * 1000000),
    createdAt,
    lastLogin,
  };
}

export function generateMembers(count: number = 100): Member[] {
  return Array.from({ length: count }, (_, i) => generateMember(i + 1));
}

export function getMembersStats(members: Member[]) {
  const total = members.length;
  
  const active = members.filter((member) => member.status === 'active').length;
  const inactive = members.filter((member) => member.status === 'inactive').length;
  const pending = members.filter((member) => member.status === 'pending').length;
  
  const newThisMonth = members.filter((member) => {
    const memberDate = new Date(member.createdAt);
    const oneMonthAgo = subMonths(new Date(), 1);
    return memberDate >= oneMonthAgo;
  }).length;
  
  const totalBalance = members.reduce((sum, member) => sum + member.balance, 0);
  
  return {
    total,
    active,
    inactive,
    pending,
    newThisMonth,
    totalBalance,
  };
}

export function getMemberGrowthData(members: Member[], months: number = 6) {
  const result = [];
  const now = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const monthDate = subMonths(now, i);
    const monthYear = `${monthDate.getMonth() + 1}/${monthDate.getFullYear().toString().slice(2)}`;
    
    // Count members registered before or during this month
    const membersCount = members.filter((member) => {
      const memberDate = new Date(member.createdAt);
      return memberDate <= addDays(monthDate, 0);
    }).length;
    
    result.push({
      name: monthYear,
      members: membersCount,
    });
  }
  
  return result;
}

export function getMembersByStatus(status: Member['status'], members: Member[]): Member[] {
  return members.filter((member) => member.status === status);
}

export function searchMembers(query: string, members: Member[]): Member[] {
  const lowercaseQuery = query.toLowerCase();
  
  return members.filter((member) => 
    member.name.toLowerCase().includes(lowercaseQuery) ||
    member.email.toLowerCase().includes(lowercaseQuery) ||
    member.phone.includes(query) ||
    member.id.toLowerCase().includes(lowercaseQuery)
  );
}