import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import { useFinancialStore } from '@/store/financial';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Eye, EyeOff, Bell, Search } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { accounts, transactions, cards, getTotalBalance, updateExchangeRates } = useFinancialStore();
  const [showBalance, setShowBalance] = React.useState(true);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(updateExchangeRates, 30000);
    return () => clearInterval(interval);
  }, [updateExchangeRates]);

  const totalBalance = getTotalBalance();
  const primaryAccount = accounts.find(acc => acc.currency === 'USD');
  const recentTransactions = transactions.slice(0, 5);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold">Good morning</h1>
            <p className="text-muted-foreground">{user?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" className="rounded-full">
              <Search className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-foreground to-foreground/90 text-background shadow-heavy">
            <div className="flex items-center justify-between mb-4">
              <span className="text-background/70">Total balance</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowBalance(!showBalance)}
                className="text-background/70 hover:text-background hover:bg-background/10"
              >
                {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </Button>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">
                {showBalance ? formatCurrency(totalBalance, 'USD') : '••••••'}
              </h2>
              <p className="text-background/70 text-sm">
                Primary account • {primaryAccount?.currency}
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/10 text-background border-background/20 hover:bg-background/20"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add money
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/10 text-background border-background/20 hover:bg-background/20"
              >
                Send
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
            <div className="text-2xl mb-2">💳</div>
            <h3 className="font-semibold">Cards</h3>
            <p className="text-sm text-muted-foreground">{cards.length} active</p>
          </Card>
          <Card className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
            <div className="text-2xl mb-2">💱</div>
            <h3 className="font-semibold">Exchange</h3>
            <p className="text-sm text-muted-foreground">Best rates</p>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent activity</h3>
            <Button variant="ghost" size="sm">
              See all
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
                        {transaction.icon}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(transaction.date)} • {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                        {transaction.amount > 0 ? '+' : ''}
                        {formatCurrency(Math.abs(transaction.amount), transaction.currency)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Accounts Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold">Your accounts</h3>
          <div className="grid grid-cols-2 gap-4">
            {accounts.slice(0, 4).map((account) => (
              <Card key={account.id} className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{account.currency}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {account.name}
                    </span>
                  </div>
                  <p className="font-semibold">
                    {showBalance ? formatCurrency(account.balance, account.currency) : '••••••'}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;