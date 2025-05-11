import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites, clearFavorites } from '../../redux/favorite/favoriteSlice';
import { FaStar } from 'react-icons/fa';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdDeleteSweep } from "react-icons/md";
import { addItemToCart } from '../../redux/cart/cartSlice';

const FavoriteItem = () => {
  const dispatch = useDispatch();
  const { favoriteItems } = useSelector((state) => state.favorite);

  const handleRemoveFavorite = (itemId) => {
    dispatch(removeFromFavorites(itemId));
  };

  const handleClearFavorites = () => {
    if (favoriteItems.length > 0) {
      dispatch(clearFavorites());
    }
  };

  
  const handleAddToCart = (item) => {
    // Prepare the item data to add to cart
    const cartItem = {
      _id: item._id,
      name: item.name,
      image: item.image,
      desc: item.desc,
      price: parseFloat(item.sp.replace(',', '')), // Convert "1,099" to 1099
      available: item.available
    };
    dispatch(addItemToCart(cartItem));
  };

  return (
    <div className='container mx-auto px-4 mb30'>
      <div className='flex items-center justify-between mb-10 max-md:mb-6 max-sm:mb-4'>
        <h1 className='text1 text-[32px] max-lg:text-[24px] max-sm:text-[16px] font-bold'>Your Favorite Items ({favoriteItems.length})</h1>
        {favoriteItems.length > 0 && (
          <button 
            onClick={handleClearFavorites}
            className="py-2 px-4 max-sm:px-1 bg-[#EF4444] text-white text-[16px] max-sm:text-[12px] font-medium hover:bg-[#fff] hover:text-[#EF4444] hover:ease-in-out duration-500 border border-[#EF4444] rounded-[5px] flex items-center gap-2"
          >
            <MdDeleteSweep className='text-[22px]' />
            Remove All
          </button>
        )}
      </div>
      
      {favoriteItems.length === 0 ? (
        <div className='flex flex-col justify-center items-center gap-7'>
          <p className='text3 text-[18px] text-center'>Your favorites list is empty</p>
          <Link to={'/shop'} >
            <button className="py-2 px-12 bg-[#B8A38A] text-white text-[18px] font-medium hover:bg-[#fff] hover:text-[#B8A38A] hover:ease-in-out duration-500 border border-[#B8A38A] max-md:text-[16px] rounded-full">
              Add to Favorite...
            </button>
          </Link>
        </div>
      ) : (
        <section className='grid grid-cols-5 Gap max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mb20'>
          {favoriteItems.map((item, index) => (
            <div key={index} className='flex flex-col gap-[18px] rounded-[10px] p-3 shadow2 bg-white hover:shadow-md transition-all duration-200 max-sm:max-w-[350px] max-sm:w-full max-sm:m-auto'>
              <div className='relative'>
                <span 
                  className="absolute top-2 right-2 cursor-pointer text-2xl select-none"
                  onClick={() => handleRemoveFavorite(item._id)}
                >
                  <RiDeleteBin6Fill className='text-[#EF4444]' />
                </span>
                <img src={item.image} alt={item.desc} loading='lazy' className='w-full rounded-[5px] bg-white' />
              </div>
              <div className='flex flex-col gap-[7px]'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm text3 text-[11px]'>{item.category}</p>
                  <p className='text-sm text3 text-[11px]'>{item.gender}</p>
                </div>
                <h2 className='font-medium text1 text-[24px] truncate max-2xl:text-[21px] max-xl:text-[20px]'>{item.name}</h2>
                <p className='text3 text-[13px] truncate'>{item.desc}</p>
                <div className='flex items-center justify-between w-full'>
                  <span className='flex gap-1 text-yellow-400'><FaStar /><FaStar /><FaStar /></span>
                  <ul className='flex gap-2'>
                    <li className='text-[16px] max-lg:text-[14px] font-medium text5 cursor-pointer hover:underline'>${item.sp}</li>
                    <p className='text3 text-[14px] max-lg:text-[12px] line-through'>${item.cp}</p>
                  </ul>
                </div>
                <div className='text-[15px] text3 flex gap-[8px]'>Available items: <p className='font-semibold text1'>{item.available}</p></div>
              <button 
                className='productbtn w-full mt-2'
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default FavoriteItem;