import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          className="text-6xl font-bold text-muted-foreground mb-6"
        >
          404
        </motion.div>
        
        <h1 className="text-2xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex gap-3 justify-center">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="tap-feedback"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back
          </Button>
          <Button 
            onClick={() => navigate("/")}
            className="tap-feedback bg-foreground text-background hover:bg-foreground/90"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
