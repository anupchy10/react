//src/components/cart/CartInitializer.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCart } from '../../redux/cart/cartSlice';

const CartInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  return null;
};

export default CartInitializer;
