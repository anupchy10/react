// shop/Detail.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { items as allItems } from '../../assets/assets';
import { FaHeart, FaStar, FaArrowLeft } from 'react-icons/fa';
import { addItemToCart } from '../../redux/cart/cartSlice';
import { addToFavorites, removeFromFavorites } from '../../redux/favorite/favoriteSlice';
import { setSelectedItem, clearSelectedItem } from '../../redux/detail/detailSlice';

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedItem } = useSelector((state) => state.detail);
  const { favoriteItems } = useSelector((state) => state.favorite);

  useEffect(() => {
    if (!selectedItem) {
      // If page is refreshed, find the item from allItems
      const item = allItems.find(item => item._id === id);
      if (item) {
        dispatch(setSelectedItem(item));
      } else {
        navigate('/shop'); // Redirect if item not found
      }
    }
    
    return () => {
      dispatch(clearSelectedItem());
    };
  }, [dispatch, id, selectedItem, navigate]);

  const isItemInFavorites = (itemId) => {
    return favoriteItems.some(item => item._id === itemId);
  };

  const handleFavoriteToggle = (item) => {
    if (isItemInFavorites(item._id)) {
      dispatch(removeFromFavorites(item._id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  const handleAddToCart = (item) => {
    const cartItem = {
      _id: item._id,
      name: item.name,
      image: item.image,
      desc: item.desc,
      price: parseFloat(item.sp.replace(',', '')),
      available: item.available
    };
    dispatch(addItemToCart(cartItem));
  };

  if (!selectedItem) return <div className="allCenter h-screen">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-[#B8A38A] hover:text-[#EB7C1B] transition-colors"
      >
        <FaArrowLeft /> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow2 p-4">
          <div className="relative">
            <span 
              className="absolute top-2 right-2 cursor-pointer text-2xl select-none z-10"
              onClick={() => handleFavoriteToggle(selectedItem)}
            >
              <FaHeart className={isItemInFavorites(selectedItem._id) ? 'text-[#ff4081]' : 'text-[#CCCCCC]'} />
            </span>
            <img 
              src={selectedItem.image} 
              alt={selectedItem.desc} 
              className="w-full h-auto rounded-[5px] object-contain max-h-[500px]"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow2 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className='text-sm text3 text-[11px]'>{selectedItem.category}</p>
            <p className='text-sm text3 text-[11px]'>{selectedItem.gender}</p>
          </div>

          <h1 className='font-medium text1 text-[32px] mb-2'>{selectedItem.name}</h1>
          <p className='text3 text-[16px] mb-6'>{selectedItem.desc}</p>

          <div className='flex items-center gap-2 mb-6'>
            <span className='flex gap-1 text-yellow-400'>
              <FaStar /><FaStar /><FaStar />
            </span>
            <span className="text-[#B8A38A]">(24 reviews)</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <p className='text-[24px] font-bold text5'>${selectedItem.sp}</p>
            <p className='text3 text-[18px] line-through'>${selectedItem.cp}</p>
            <span className="bg-[#FFE1E1] text-[#FF6B6B] px-2 py-1 rounded text-sm">
              15% OFF
            </span>
          </div>

          <div className='text-[16px] text3 flex gap-[8px] mb-8'>
            Available items: <p className='font-semibold text1'>{selectedItem.available}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              className='productbtn flex-1 min-w-[200px]'
              onClick={() => handleAddToCart(selectedItem)}
            >
              Add to Cart
            </button>
            <button className='bg-[#B8A38A] hover:bg-[#B98C59] text-white py-3 px-6 rounded transition-colors flex-1 min-w-[200px]'>
              Buy Now
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Product Details</h3>
            <ul className="space-y-2">
              <li className="flex">
                <span className="text3 w-32">Category</span>
                <span className="text1">{selectedItem.category}</span>
              </li>
              <li className="flex">
                <span className="text3 w-32">Gender</span>
                <span className="text1">{selectedItem.gender}</span>
              </li>
              <li className="flex">
                <span className="text3 w-32">Availability</span>
                <span className="text1">{selectedItem.available} items in stock</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;