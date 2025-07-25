import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import { useAppStore } from '@/store/app';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun,
  ChevronRight,
  LogOut,
  HelpCircle,
  FileText,
  Heart
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

const Settings = () => {
  const { user, logout } = useAuthStore();
  const { 
    theme, 
    language, 
    currency, 
    notificationsEnabled, 
    biometricsEnabled,
    toggleTheme,
    toggleNotifications,
    toggleBiometrics
  } = useAppStore();

  const handleLogout = () => {
    logout();
  };

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Personal details',
          description: 'Name, email, phone number',
          action: () => {},
        },
        {
          icon: Shield,
          label: 'Security',
          description: 'Password, PIN, biometrics',
          action: () => {},
        },
        {
          icon: CreditCard,
          label: 'Cards & payments',
          description: 'Manage your cards and payment methods',
          action: () => {},
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Push notifications and alerts',
          toggle: true,
          value: notificationsEnabled,
          action: toggleNotifications,
        },
        {
          icon: theme === 'light' ? Sun : Moon,
          label: 'Theme',
          description: `${theme === 'light' ? 'Light' : 'Dark'} mode`,
          toggle: true,
          value: theme === 'dark',
          action: toggleTheme,
        },
        {
          icon: Shield,
          label: 'Biometric login',
          description: 'Use fingerprint or face ID',
          toggle: true,
          value: biometricsEnabled,
          action: toggleBiometrics,
        },
        {
          icon: Globe,
          label: 'Language & region',
          description: `${language.toUpperCase()} • ${currency}`,
          action: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help center',
          description: 'FAQs and support articles',
          action: () => {},
        },
        {
          icon: FileText,
          label: 'Terms & Privacy',
          description: 'Legal documents',
          action: () => {},
        },
        {
          icon: Heart,
          label: 'Rate the app',
          description: 'Share your feedback',
          action: () => {},
        },
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-premium to-success rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm text-success">Verified account</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="tap-feedback">
                Edit
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + groupIndex * 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">{group.title}</h3>
            <div className="space-y-2">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + groupIndex * 0.1 + itemIndex * 0.05 }}
                  >
                    <Card 
                      className="p-4 tap-feedback cursor-pointer hover:shadow-medium transition-all"
                      onClick={item.action}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        
                        {item.toggle ? (
                          <Switch 
                            checked={item.value}
                            onCheckedChange={item.action}
                          />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Card className="p-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto bg-foreground rounded-2xl flex items-center justify-center">
                <span className="text-background font-bold text-lg">R</span>
              </div>
              <h4 className="font-semibold">Revolut Clone</h4>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              <p className="text-xs text-muted-foreground">
                Built with React & Tailwind CSS
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            variant="destructive"
            className="w-full h-12 btn-revolut"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign out
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center pb-6"
        >
          <p className="text-xs text-muted-foreground">
            This is a demo app for educational purposes only
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Settings;