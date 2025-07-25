import React from 'react';
import { motion } from 'framer-motion';
import BottomNavigation from './BottomNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 pb-20"
      >
        {children}
      </motion.main>
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;