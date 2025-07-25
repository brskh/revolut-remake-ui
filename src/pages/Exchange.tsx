import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFinancialStore } from '@/store/financial';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUpDown, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const Exchange = () => {
  const { accounts, exchangeRates, updateExchangeRates } = useFinancialStore();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromAmount, setFromAmount] = useState('100');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'CHF'];

  useEffect(() => {
    if (fromAmount && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      const converted = (parseFloat(fromAmount) * rate).toFixed(2);
      setToAmount(converted);
    }
  }, [fromAmount, fromCurrency, toCurrency, exchangeRates]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
  };

  const handleRefreshRates = async () => {
    setIsLoading(true);
    updateExchangeRates();
    setTimeout(() => setIsLoading(false), 1000);
  };

  const getAccountBalance = (currency: string) => {
    return accounts.find(acc => acc.currency === currency)?.balance || 0;
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getCurrentRate = () => {
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      return exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    }
    return 0;
  };

  const getCurrencyFlag = (currency: string) => {
    const flags = {
      USD: '🇺🇸',
      EUR: '🇪🇺',
      GBP: '🇬🇧',
      CHF: '🇨🇭',
    };
    return flags[currency] || '💱';
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
            <h1 className="text-2xl font-bold">Exchange</h1>
            <p className="text-muted-foreground">Convert your money</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={handleRefreshRates}
            disabled={isLoading}
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </motion.div>

        {/* Exchange Rate Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-success to-success/80 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getCurrencyFlag(fromCurrency)}</span>
                <span className="font-semibold">{fromCurrency}</span>
                <ArrowUpDown className="w-4 h-4 mx-2" />
                <span className="text-2xl">{getCurrencyFlag(toCurrency)}</span>
                <span className="font-semibold">{toCurrency}</span>
              </div>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <p className="text-white/80 text-sm">Current rate</p>
              <p className="text-2xl font-bold">
                1 {fromCurrency} = {getCurrentRate().toFixed(4)} {toCurrency}
              </p>
              <p className="text-white/80 text-sm">
                Updated just now • Great rate!
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Exchange Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* From Currency */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>From</Label>
                <p className="text-sm text-muted-foreground">
                  Available: {formatCurrency(getAccountBalance(fromCurrency), fromCurrency)}
                </p>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-4">
                {currencies.map((currency) => (
                  <Button
                    key={currency}
                    variant={fromCurrency === currency ? 'default' : 'outline'}
                    size="sm"
                    className="tap-feedback"
                    onClick={() => setFromCurrency(currency)}
                  >
                    <span className="mr-1">{getCurrencyFlag(currency)}</span>
                    {currency}
                  </Button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">
                  {getCurrencyFlag(fromCurrency)}
                </span>
                <Input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="pl-12 h-14 text-xl font-semibold"
                  placeholder="0.00"
                />
              </div>
            </div>
          </Card>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full w-12 h-12 tap-feedback"
              onClick={handleSwapCurrencies}
            >
              <ArrowUpDown className="w-5 h-5" />
            </Button>
          </div>

          {/* To Currency */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>To</Label>
                <p className="text-sm text-muted-foreground">
                  Available: {formatCurrency(getAccountBalance(toCurrency), toCurrency)}
                </p>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-4">
                {currencies.map((currency) => (
                  <Button
                    key={currency}
                    variant={toCurrency === currency ? 'default' : 'outline'}
                    size="sm"
                    className="tap-feedback"
                    onClick={() => setToCurrency(currency)}
                  >
                    <span className="mr-1">{getCurrencyFlag(currency)}</span>
                    {currency}
                  </Button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground">
                  {getCurrencyFlag(toCurrency)}
                </span>
                <Input
                  type="number"
                  value={toAmount}
                  readOnly
                  className="pl-12 h-14 text-xl font-semibold bg-muted/50"
                  placeholder="0.00"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Exchange Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            className="w-full h-14 btn-revolut bg-foreground text-background hover:bg-foreground/90"
            size="lg"
            disabled={!fromAmount || parseFloat(fromAmount) <= 0}
          >
            Exchange {fromAmount ? formatCurrency(parseFloat(fromAmount), fromCurrency) : '0'} to {toCurrency}
          </Button>
        </motion.div>

        {/* Rate History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold">Recent rates</h3>
          <div className="space-y-2">
            {currencies.filter(c => c !== fromCurrency).map((currency, index) => {
              const rate = exchangeRates[currency] / exchangeRates[fromCurrency];
              const isUp = Math.random() > 0.5; // Mock trend
              
              return (
                <motion.div
                  key={currency}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getCurrencyFlag(currency)}</span>
                        <div>
                          <p className="font-semibold">{fromCurrency}/{currency}</p>
                          <p className="text-sm text-muted-foreground">
                            1 {fromCurrency} = {rate.toFixed(4)} {currency}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isUp ? (
                          <TrendingUp className="w-4 h-4 text-success" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        )}
                        <span className={`text-sm font-medium ${isUp ? 'text-success' : 'text-destructive'}`}>
                          {isUp ? '+' : '-'}0.{Math.floor(Math.random() * 99).toString().padStart(2, '0')}%
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Exchange Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h4 className="font-semibold">Rate alerts</h4>
              <p className="text-sm text-muted-foreground">Get notified of favorable rates</p>
            </div>
          </Card>
          <Card className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-premium/10 rounded-full flex items-center justify-center mx-auto">
                <RefreshCw className="w-6 h-6 text-premium" />
              </div>
              <h4 className="font-semibold">Auto exchange</h4>
              <p className="text-sm text-muted-foreground">Set up automatic conversions</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Exchange;