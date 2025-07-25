import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/components/ui/theme-provider';
import { useAuthStore } from '@/store/auth';
import { Eye, EyeOff, Sun, Moon, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AppleLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [faceIdStep, setFaceIdStep] = useState(0);

  const { theme, setTheme } = useTheme();
  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value) validatePassword(value);
  };

  const simulateFaceId = () => {
    setFaceIdStep(1);
    setTimeout(() => setFaceIdStep(2), 1000);
    setTimeout(() => setFaceIdStep(3), 2000);
    setTimeout(async () => {
      setFaceIdStep(0);
      await handleSubmit();
    }, 3000);
  };

  const handleSubmit = async () => {
    setError('');
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const result = await register(email, password, email.split('@')[0]);
        if (!result) {
          setError('Registration failed. Email may already exist.');
          return;
        }
      } else {
        const result = await login(email, password);
        if (!result) {
          setError('Invalid email or password');
          return;
        }
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && password && !emailError && !passwordError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Theme Toggle */}
      <motion.button
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-colors"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="h-5 w-5 text-yellow-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="h-5 w-5 text-blue-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Back Button */}
      <Link to="/" className="absolute top-6 left-6">
        <motion.button
          className="p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </motion.button>
      </Link>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-auto p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Apple Logo */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-12 h-14 bg-foreground rounded-lg"></div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-apple-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.h1
            className="text-2xl font-sf-pro-display font-semibold text-center mb-2 text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {isSignUp ? 'Create Apple ID' : 'Sign in to Apple'}
          </motion.h1>

          <motion.p
            className="text-center text-apple-gray mb-8 font-sf-pro-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {isSignUp ? 'One Apple ID for everything Apple' : 'Use your Apple ID to access all Apple services'}
          </motion.p>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm text-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Label htmlFor="email" className="text-sm font-medium text-foreground font-sf-pro-text">
                Email
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`input-apple w-full px-4 py-3 rounded-lg border bg-white/5 backdrop-blur-sm text-foreground placeholder-apple-gray focus:bg-white/10 ${
                    emailError ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your email"
                />
                <AnimatePresence>
                  {emailError && (
                    <motion.p
                      className="mt-1 text-xs text-red-500 font-sf-pro-text"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {emailError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Label htmlFor="password" className="text-sm font-medium text-foreground font-sf-pro-text">
                Password
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className={`input-apple w-full px-4 py-3 pr-12 rounded-lg border bg-white/5 backdrop-blur-sm text-foreground placeholder-apple-gray focus:bg-white/10 ${
                    passwordError ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-apple-gray hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                <AnimatePresence>
                  {passwordError && (
                    <motion.p
                      className="mt-1 text-xs text-red-500 font-sf-pro-text"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {passwordError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`btn-apple w-full py-3 rounded-lg font-medium font-sf-pro-text transition-all ${
                  isFormValid 
                    ? 'bg-apple-blue hover:bg-apple-blue/90 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  isSignUp ? 'Create Apple ID' : 'Sign In'
                )}
              </Button>
            </motion.div>

            {/* Face ID Simulation */}
            {!isSignUp && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Button
                  type="button"
                  onClick={simulateFaceId}
                  disabled={!isFormValid || isLoading}
                  className="btn-apple w-full py-3 rounded-lg bg-white/10 border border-white/20 text-foreground hover:bg-white/20 font-sf-pro-text"
                >
                  <motion.div className="flex items-center justify-center">
                    <motion.div
                      className={`w-6 h-6 rounded-full border-2 mr-3 ${
                        faceIdStep === 0 ? 'border-apple-blue' :
                        faceIdStep === 1 ? 'border-yellow-500' :
                        faceIdStep === 2 ? 'border-green-500' :
                        'border-green-500 bg-green-500'
                      }`}
                      animate={faceIdStep > 0 ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    />
                    Sign in with Face ID
                  </motion.div>
                </Button>
              </motion.div>
            )}
          </form>

          {/* Demo Credentials */}
          <motion.div
            className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <p className="text-xs font-sf-pro-text text-blue-600 dark:text-blue-400 mb-2">
              Demo Account:
            </p>
            <p className="text-xs font-sf-pro-text text-blue-600 dark:text-blue-400">
              Email: demo@apple.com<br />
              Password: demo123
            </p>
          </motion.div>

          {/* Toggle Sign Up */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-apple-blue hover:underline font-sf-pro-text text-sm"
            >
              {isSignUp ? 'Already have an Apple ID? Sign in' : "Don't have an Apple ID? Create one"}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AppleLogin;