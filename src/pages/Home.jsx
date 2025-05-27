import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LeftHome from "../components/home/LeftHome";
import RightHome from "../components/home/RightHome";
import { useLocation } from "react-router-dom";

function Home() {
  const [showLoading, setShowLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromLogin) {
      setShowLoading(true);
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  if (showLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Loading Home...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={location.state?.fromLogin ? { opacity: 0, y: 50 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <section className="mt-[120px] grid grid-cols-12 gap-4 relative">
        <motion.div
          className="sticky top-0 sc h-[100vh] overflow-scroll col-span-3 max-lg:hidden"
          initial={location.state?.fromLogin ? { x: -100, opacity: 0 } : false}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mb20">
            <LeftHome />
          </div>
        </motion.div>

        <motion.div
          className="relative col-span-9 max-lg:col-span-full"
          initial={location.state?.fromLogin ? { x: 100, opacity: 0 } : false}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <RightHome />
        </motion.div>
      </section>
    </motion.div>
  );
}

export default Home;