import { create } from 'zustand';

interface Account {
  id: string;
  currency: string;
  balance: number;
  name: string;
}

interface Card {
  id: string;
  type: 'physical' | 'virtual';
  last4: string;
  expiry: string;
  currency: string;
  balance: number;
  status: 'active' | 'blocked' | 'expired';
  color: string;
  name: string;
}

interface Transaction {
  id: string;
  type: 'payment' | 'transfer' | 'exchange' | 'topup' | 'withdrawal';
  amount: number;
  currency: string;
  description: string;
  merchant?: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  category: string;
  icon: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isRevolutUser: boolean;
}

interface FinancialState {
  accounts: Account[];
  cards: Card[];
  transactions: Transaction[];
  contacts: Contact[];
  exchangeRates: Record<string, number>;
  getAccountBalance: (currency: string) => number;
  getTotalBalance: () => number;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  updateExchangeRates: () => void;
}

// Mock data
const mockAccounts: Account[] = [
  { id: '1', currency: 'USD', balance: 2543.67, name: 'US Dollar' },
  { id: '2', currency: 'EUR', balance: 1890.23, name: 'Euro' },
  { id: '3', currency: 'GBP', balance: 756.89, name: 'British Pound' },
  { id: '4', currency: 'CHF', balance: 234.56, name: 'Swiss Franc' },
];

const mockCards: Card[] = [
  {
    id: '1',
    type: 'physical',
    last4: '4829',
    expiry: '12/27',
    currency: 'USD',
    balance: 2543.67,
    status: 'active',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    name: 'Primary Card',
  },
  {
    id: '2',
    type: 'virtual',
    last4: '7392',
    expiry: '08/26',
    currency: 'EUR',
    balance: 1890.23,
    status: 'active',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    name: 'Shopping Card',
  },
  {
    id: '3',
    type: 'physical',
    last4: '1057',
    expiry: '03/25',
    currency: 'GBP',
    balance: 756.89,
    status: 'blocked',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    name: 'Travel Card',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'payment',
    amount: -12.50,
    currency: 'USD',
    description: 'Starbucks Coffee',
    merchant: 'Starbucks',
    date: new Date('2024-01-20T10:30:00'),
    status: 'completed',
    category: 'Food & Drink',
    icon: '☕',
  },
  {
    id: '2',
    type: 'transfer',
    amount: 500.00,
    currency: 'USD',
    description: 'From John Smith',
    date: new Date('2024-01-19T15:45:00'),
    status: 'completed',
    category: 'Transfer',
    icon: '💸',
  },
  {
    id: '3',
    type: 'payment',
    amount: -85.99,
    currency: 'USD',
    description: 'Amazon Purchase',
    merchant: 'Amazon',
    date: new Date('2024-01-19T09:15:00'),
    status: 'completed',
    category: 'Shopping',
    icon: '📦',
  },
  {
    id: '4',
    type: 'exchange',
    amount: -200.00,
    currency: 'USD',
    description: 'USD → EUR Exchange',
    date: new Date('2024-01-18T14:20:00'),
    status: 'completed',
    category: 'Exchange',
    icon: '💱',
  },
  {
    id: '5',
    type: 'topup',
    amount: 1000.00,
    currency: 'USD',
    description: 'Bank Transfer',
    date: new Date('2024-01-17T11:00:00'),
    status: 'completed',
    category: 'Top Up',
    icon: '💳',
  },
];

const mockContacts: Contact[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', isRevolutUser: true },
  { id: '2', name: 'Emma Wilson', email: 'emma@example.com', isRevolutUser: true },
  { id: '3', name: 'Michael Brown', email: 'michael@example.com', isRevolutUser: false },
  { id: '4', name: 'Sarah Davis', email: 'sarah@example.com', isRevolutUser: true },
];

export const useFinancialStore = create<FinancialState>((set, get) => ({
  accounts: mockAccounts,
  cards: mockCards,
  transactions: mockTransactions,
  contacts: mockContacts,
  exchangeRates: {
    'USD': 1.0,
    'EUR': 0.85,
    'GBP': 0.73,
    'CHF': 0.92,
  },

  getAccountBalance: (currency: string) => {
    const account = get().accounts.find(acc => acc.currency === currency);
    return account ? account.balance : 0;
  },

  getTotalBalance: () => {
    const { accounts, exchangeRates } = get();
    return accounts.reduce((total, account) => {
      return total + (account.balance * (exchangeRates[account.currency] || 1));
    }, 0);
  },

  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date(),
    };
    set(state => ({
      transactions: [newTransaction, ...state.transactions],
    }));
  },

  updateExchangeRates: () => {
    // Simulate real-time exchange rate updates
    const fluctuation = () => 1 + (Math.random() - 0.5) * 0.02;
    set(state => ({
      exchangeRates: {
        'USD': 1.0,
        'EUR': 0.85 * fluctuation(),
        'GBP': 0.73 * fluctuation(),
        'CHF': 0.92 * fluctuation(),
      },
    }));
  },
}));