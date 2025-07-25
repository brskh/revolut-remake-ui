import React from 'react';
import AppleNavbar from './AppleNavbar';

interface AppleLayoutProps {
  children: React.ReactNode;
}

const AppleLayout = ({ children }: AppleLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AppleNavbar />
      <main className="pt-12">
        {children}
      </main>
    </div>
  );
};

export default AppleLayout;