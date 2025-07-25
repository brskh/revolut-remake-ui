import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, CreditCard, ArrowUpDown, TrendingUp, Settings } from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Home', icon: Home, path: '/dashboard' },
  { id: 'cards', label: 'Cards', icon: CreditCard, path: '/cards' },
  { id: 'transfers', label: 'Transfers', icon: ArrowUpDown, path: '/transfers' },
  { id: 'exchange', label: 'Exchange', icon: TrendingUp, path: '/exchange' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50"
    >
      <div className="flex items-center justify-around h-20 px-2 safe-area-bottom">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[64px] tap-feedback ${
                isActive ? 'text-foreground' : 'text-muted-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative"
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Icon className="w-6 h-6" />
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 w-1 h-1 bg-foreground rounded-full"
                    style={{ x: '-50%' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
              <span className={`text-xs mt-1 font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNavigation;