import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

// Import pages
import Home from '@/pages/Home';
import AppleLogin from '@/pages/AppleLogin';
import NotFound from '@/pages/NotFound';

// Import layout
import AppleLayout from '@/components/layout/AppleLayout';

// Import stores
import { useAuthStore } from '@/store/auth';

// Create a client
const queryClient = new QueryClient();

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="apple-theme">
        <TooltipProvider>
          <Router>
            <div className="min-h-screen">
              <Routes>
                {/* Home route */}
                <Route 
                  path="/" 
                  element={
                    <AppleLayout>
                      <Home />
                    </AppleLayout>
                  } 
                />
                
                {/* Login route */}
                <Route path="/login" element={<AppleLogin />} />
                
                {/* Product routes */}
                <Route path="/store" element={
                  <AppleLayout>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-4xl font-sf-pro-display">Store - Coming Soon</h1>
                    </div>
                  </AppleLayout>
                } />
                <Route path="/mac" element={
                  <AppleLayout>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-4xl font-sf-pro-display">Mac - Coming Soon</h1>
                    </div>
                  </AppleLayout>
                } />
                <Route path="/ipad" element={
                  <AppleLayout>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-4xl font-sf-pro-display">iPad - Coming Soon</h1>
                    </div>
                  </AppleLayout>
                } />
                <Route path="/iphone" element={
                  <AppleLayout>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-4xl font-sf-pro-display">iPhone - Coming Soon</h1>
                    </div>
                  </AppleLayout>
                } />
                <Route path="/watch" element={
                  <AppleLayout>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-4xl font-sf-pro-display">Watch - Coming Soon</h1>
                    </div>
                  </AppleLayout>
                } />
                <Route path="/airpods" element={
                  <AppleLayout>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-4xl font-sf-pro-display">AirPods - Coming Soon</h1>
                    </div>
                  </AppleLayout>
                } />
                <Route path="/tv-home" element={
                  <AppleLayout>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-4xl font-sf-pro-display">TV & Home - Coming Soon</h1>
                    </div>
                  </AppleLayout>
                } />
                <Route path="/support" element={
                  <AppleLayout>
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-4xl font-sf-pro-display">Support - Coming Soon</h1>
                    </div>
                  </AppleLayout>
                } />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;