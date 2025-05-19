import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LeftHome from "../components/home/LeftHome";
import RightHome from "../components/home/RightHome";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <section className="grid grid-cols-12 gap-4 relative">
        <motion.div
          className="col-span-3 max-lg:hidden sticky bottom-0 self-end h-[calc(100vh-120px)] mb-20"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <LeftHome />
        </motion.div>

        <motion.div
          className="col-span-9 max-lg:col-span-full mt-[67px]"
          initial={{ x: 100, opacity: 0 }}
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
