import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFinancialStore } from '@/store/financial';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, ArrowUpDown, Users, QrCode, Search } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const Transfers = () => {
  const { contacts, accounts } = useFinancialStore();
  const [amount, setAmount] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [transferType, setTransferType] = useState<'send' | 'request'>('send');

  const quickAmounts = [10, 25, 50, 100];
  const recentContacts = contacts.slice(0, 4);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
            <h1 className="text-2xl font-bold">Transfers</h1>
            <p className="text-muted-foreground">Send and request money</p>
          </div>
          <Button size="icon" variant="ghost" className="rounded-full">
            <QrCode className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Transfer Type Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-2">
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={transferType === 'send' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 tap-feedback"
                onClick={() => setTransferType('send')}
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
              <Button
                variant={transferType === 'request' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 tap-feedback"
                onClick={() => setTransferType('request')}
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Request
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Amount Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Card className="p-6">
            <div className="text-center space-y-4">
              <Label className="text-sm text-muted-foreground">
                {transferType === 'send' ? 'Amount to send' : 'Amount to request'}
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="text-center text-3xl font-bold h-16 bg-transparent border-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Available: {formatCurrency(accounts[0]?.balance || 0, 'USD')}
              </p>
            </div>
          </Card>

          {/* Quick Amounts */}
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                size="sm"
                className="tap-feedback"
                onClick={() => setAmount(quickAmount.toString())}
              >
                ${quickAmount}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent</h3>
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {recentContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card 
                  className={`p-4 tap-feedback cursor-pointer transition-all ${
                    selectedContact === contact.id 
                      ? 'ring-2 ring-success shadow-medium' 
                      : 'hover:shadow-medium'
                  }`}
                  onClick={() => setSelectedContact(
                    selectedContact === contact.id ? null : contact.id
                  )}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-premium to-success rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {contact.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-sm">{contact.name}</p>
                      <div className="flex items-center justify-center mt-1">
                        {contact.isRevolutUser && (
                          <div className="w-2 h-2 bg-success rounded-full mr-1" />
                        )}
                        <p className="text-xs text-muted-foreground">
                          {contact.isRevolutUser ? 'Revolut' : 'External'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold">All contacts</h3>
          <div className="space-y-2">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <Card 
                  className={`p-4 tap-feedback cursor-pointer transition-all ${
                    selectedContact === contact.id 
                      ? 'ring-2 ring-success shadow-medium' 
                      : 'hover:shadow-medium'
                  }`}
                  onClick={() => setSelectedContact(
                    selectedContact === contact.id ? null : contact.id
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-premium to-success rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {contact.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {contact.isRevolutUser && (
                        <div className="w-2 h-2 bg-success rounded-full" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {contact.isRevolutUser ? 'Instant' : 'Bank transfer'}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Send Button */}
        {selectedContact && amount && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 left-6 right-6"
          >
            <Button 
              className="w-full h-14 btn-revolut bg-foreground text-background hover:bg-foreground/90"
              size="lg"
            >
              {transferType === 'send' ? 'Send' : 'Request'} ${amount}
            </Button>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-muted-foreground" />
              </div>
              <h4 className="font-semibold">Split bill</h4>
              <p className="text-sm text-muted-foreground">Share expenses with friends</p>
            </div>
          </Card>
          <Card className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                <QrCode className="w-6 h-6 text-muted-foreground" />
              </div>
              <h4 className="font-semibold">QR payment</h4>
              <p className="text-sm text-muted-foreground">Pay with QR code</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Transfers;