import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFinancialStore } from '@/store/financial';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Eye, EyeOff, Lock, Unlock, Settings, MoreVertical } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const Cards = () => {
  const { cards } = useFinancialStore();
  const [showBalances, setShowBalances] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getCardTypeLabel = (type: string) => {
    return type === 'physical' ? 'Physical Card' : 'Virtual Card';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'blocked':
        return 'text-destructive';
      case 'expired':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
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
            <h1 className="text-2xl font-bold">Cards</h1>
            <p className="text-muted-foreground">Manage your cards</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowBalances(!showBalances)}
            className="rounded-full"
          >
            {showBalances ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </motion.div>

        {/* Add New Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 border-dashed border-2 tap-feedback cursor-pointer hover:shadow-medium transition-all">
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold">Add new card</h3>
                <p className="text-sm text-muted-foreground">Create a virtual card instantly</p>
              </div>
              <Button className="btn-revolut">
                Create virtual card
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Cards List */}
        <div className="space-y-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              <motion.div
                className="card-revolut cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
              >
                {/* Card Front */}
                <Card className="p-6 relative overflow-hidden" style={{ background: card.color }}>
                  <div className="text-white space-y-6">
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-sm">{getCardTypeLabel(card.type)}</p>
                        <p className="font-semibold">{card.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/80 text-sm">Balance</p>
                        <p className="font-bold">
                          {showBalances ? formatCurrency(card.balance, card.currency) : '••••••'}
                        </p>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="font-mono text-lg tracking-wider">
                      •••• •••• •••• {card.last4}
                    </div>

                    {/* Card Details */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-xs">VALID THRU</p>
                        <p className="font-semibold">{card.expiry}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          card.status === 'active' 
                            ? 'bg-white/20 text-white' 
                            : 'bg-red-500/20 text-red-200'
                        }`}>
                          {card.status}
                        </div>
                        {card.status === 'active' ? (
                          <Unlock className="w-4 h-4" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Revolut Logo Placeholder */}
                  <div className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>

                  {/* Card Pattern */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full" />
                </Card>
              </motion.div>

              {/* Card Actions */}
              <AnimatePresence>
                {selectedCard === card.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Card className="p-4 mt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" size="sm" className="tap-feedback">
                          <Eye className="w-4 h-4 mr-2" />
                          View PIN
                        </Button>
                        <Button variant="outline" size="sm" className="tap-feedback">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Button 
                          variant={card.status === 'active' ? 'destructive' : 'default'} 
                          size="sm" 
                          className="w-full tap-feedback"
                        >
                          {card.status === 'active' ? (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Block card
                            </>
                          ) : (
                            <>
                              <Unlock className="w-4 h-4 mr-2" />
                              Unblock card
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" className="w-full tap-feedback">
                          <MoreVertical className="w-4 h-4 mr-2" />
                          More options
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Card Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold">Card features</h3>
          <div className="grid grid-cols-1 gap-3">
            <Card className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <span className="text-success">🔒</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Security controls</h4>
                  <p className="text-sm text-muted-foreground">Manage card limits and security</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-premium/10 rounded-full flex items-center justify-center">
                  <span className="text-premium">💎</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Premium benefits</h4>
                  <p className="text-sm text-muted-foreground">Unlock exclusive card perks</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Cards;