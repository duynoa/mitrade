import { format, subDays } from 'date-fns';
import { getRandomElement } from '../lib/utils';

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  currency: string;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

const paymentMethods = [
  'Chuyển khoản ngân hàng',
  'Thẻ tín dụng',
  'Ví điện tử',
  'Tiền mặt',
];

const statuses = ['pending', 'processing', 'completed', 'failed'];

const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
const middleNames = ['Văn', 'Thị', 'Hữu', 'Đình', 'Minh', 'Quang', 'Thanh', 'Anh', 'Tuấn', 'Hoàng', 'Thành', 'Phương', 'Hải', 'Công', 'Thị'];
const lastNames = ['An', 'Bình', 'Chung', 'Dũng', 'Em', 'Giang', 'Hà', 'Hùng', 'Lan', 'Long', 'Minh', 'Nam', 'Phong', 'Quang', 'Sơn', 'Thành', 'Tùng', 'Uyên', 'Xuân', 'Yến'];

const foreignFirstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Olivia', 'James', 'Sophia', 'William', 'Ava', 'Ethan', 'Mia', 'Michael', 'Emily', 'David', 'Olivia', 'James', 'Sophia', 'William', 'Ava'];
const foreignLastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
//generate random name
function generateVietnameseName(): string {
  const firstName = getRandomElement(firstNames); 
  const middleName = getRandomElement(middleNames);
  const lastName = getRandomElement(lastNames);
  return `${firstName} ${middleName} ${lastName}`;
}
//generate foreign name
function generateForeignName(): string {
  const firstName = getRandomElement(foreignFirstNames);
  const lastName = getRandomElement(foreignLastNames);
  return `${firstName} ${lastName}`;
}
//generate 200 users vietnamese and foreign
const users = Array.from({ length: 200 }, (_, i) => ({
  id: `user${i + 1}`,
  name: i % 3 === 0 ? generateForeignName() : generateVietnameseName(),
}));


export function getTransactionStats() {
  return {
    totalDeposits: 320865,
    totalWithdrawals: 57289,
    pendingDeposits:  27,
    pendingWithdrawals: 16
  };
}

function generateTransaction(id: number): Transaction {
  const type = Math.random() > 0.5 ? 'deposit' : 'withdrawal';
  const amount = type === 'deposit' 
    ? Math.floor(Math.random() * 50000) + 10000
    : Math.floor(Math.random() * 20000) + 5000;
  const daysAgo = Math.floor(Math.random() * 30);
  const createdAt = subDays(new Date(), daysAgo).toISOString();
  const user = getRandomElement(users);
  
  return {
    id: `TR${id.toString().padStart(6, '0')}`,
    type,
    amount,
    currency: 'USD',
    paymentMethod: getRandomElement(paymentMethods),
    status: getRandomElement(statuses) as 'pending' | 'processing' | 'completed' | 'failed',
    userId: user.id,
    userName: user.name,
    createdAt,
    updatedAt: createdAt,
  };
}

export function generateTransactions(count: number = 50): Transaction[] {
  return Array.from({ length: count }, (_, i) => generateTransaction(i + 1));
}

export function getTransactionsByDateRange(
  startDate: Date,
  endDate: Date,
  transactions: Transaction[]
): Transaction[] {
  return transactions.filter((transaction) => {
    const txDate = new Date(transaction.createdAt);
    return txDate >= startDate && txDate <= endDate;
  });
}

export function getTransactionsByStatus(
  status: Transaction['status'],
  transactions: Transaction[]
): Transaction[] {
  return transactions.filter((transaction) => transaction.status === status);
}

export function getTransactionsByUser(
  userId: string,
  transactions: Transaction[]
): Transaction[] {
  return transactions.filter((transaction) => transaction.userId === userId);
}

export function getTransactionsByType(
  type: Transaction['type'],
  transactions: Transaction[]
): Transaction[] {
  return transactions.filter((transaction) => transaction.type === type);
}

export function getTransactionChartData(transactions: Transaction[], days: number = 7) {
  const now = new Date();
  const result = [];
  
  const depositsList = [
    1839020,
    -3380099,
    -870000,
    1038928,
    2033089,
    -1278400,
    2893033
  ];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(now, i);
    const dateString = format(date, 'dd/MM');
    
    const dayTransactions = transactions.filter((tx) => {
      const txDate = new Date(tx.createdAt);
      return (
        txDate.getDate() === date.getDate() &&
        txDate.getMonth() === date.getMonth() &&
        txDate.getFullYear() === date.getFullYear()
      );
    });

    const withdrawals = dayTransactions
      .filter((tx) => tx.type === 'withdrawal')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    result.push({
      name: dateString,
      deposit: depositsList.reverse()[i] || 0,
      withdrawal: 0,
    });
  }
  
  return result;
}