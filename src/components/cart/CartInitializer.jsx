import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadCart } from '../../redux/cart/cartSlice';

const CartInitializer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(loadCart());
      setIsLoading(false);
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default CartInitializer;