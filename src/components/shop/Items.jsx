// shop/Items.jsx
import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initializeItems, goToPage, nextPage, prevPage } from '../../redux/pagination/paginationSlice';
import { applyCategoryFilter, goToCategoryPage, nextCategoryPage, prevCategoryPage } from '../../redux/category/categoryPaginationSlice';
import { addItemToCart } from '../../redux/cart/cartSlice';
import { items as allItems } from '../../assets/assets';
import { FaHeart, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { addToFavorites, removeFromFavorites } from '../../redux/favorite/favoriteSlice';
// import { setSelectedItem } from '../../redux/detail/detailSlice';

const Items = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { activeGender } = useSelector((state) => state.gender);
  const { refreshCount } = useSelector((state) => state.refresh);
  const { favoriteItems } = useSelector((state) => state.favorite);
  
  // Get state from both pagination slices
  const { 
    currentPage, 
    itemsPerPage, 
    randomizedItems 
  } = useSelector((state) => state.pagination);
  
  const { 
    categoryFilteredItems, 
    currentCategoryPage, 
    itemsPerCategoryPage,
    activeCategory 
  } = useSelector((state) => state.categoryPagination);

  useEffect(() => {
    dispatch(initializeItems(allItems));
    dispatch(applyCategoryFilter({ items: allItems, category: null }));
  }, [dispatch, activeGender, refreshCount]);

  // ===== CATEGORY SEPARATION LOGIC =====
  // Use category filtered items if a category is active, otherwise use regular randomized items
  const itemsToUse = activeCategory ? categoryFilteredItems : randomizedItems;
  
  // Apply gender filter if active
  const filteredItems = activeGender
    ? itemsToUse.filter(item => item.gender === activeGender)
    : itemsToUse;

  // Determine which pagination to use based on whether category is active
  const currentPageToUse = activeCategory ? currentCategoryPage : currentPage;
  const itemsPerPageToUse = activeCategory ? itemsPerCategoryPage : itemsPerPage;

  const startIdx = (currentPageToUse - 1) * itemsPerPageToUse;
  const endIdx = startIdx + itemsPerPageToUse;
  const paginatedItems = filteredItems.slice(startIdx, endIdx);

  const maxPage = Math.ceil(filteredItems.length / itemsPerPageToUse);
  // ===== END CATEGORY SEPARATION LOGIC =====

  const handlePageChange = (pageNum) => {
    if (activeCategory) {
      dispatch(goToCategoryPage(pageNum));
    } else {
      dispatch(goToPage(pageNum));
    }
  };

  const handleNextPage = () => {
    if (activeCategory) {
      dispatch(nextCategoryPage());
    } else {
      dispatch(nextPage());
    }
  };

  const handlePrevPage = () => {
    if (activeCategory) {
      dispatch(prevCategoryPage());
    } else {
      dispatch(prevPage());
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

  // const handleItemClick = (item) => {
  //   dispatch(setSelectedItem(item));
  //   navigate(`/item/${item._id}`);
  // };

  return (
    <div className='mb30'>
      <section className='grid grid-cols-5 Gap max-2xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mb20'>
        {paginatedItems.map((item, index) => (
          <div 
          key={index} 
          className='flex flex-col gap-[18px] rounded-[10px] p-3 shadow2 bg-white hover:shadow-md transition-all duration-200 max-sm:max-w-[350px] max-sm:w-full max-sm:m-auto'>
            <div className='relative'>
              <span 
                className="absolute top-2 right-2 cursor-pointer text-2xl select-none"
                onClick={() => handleFavoriteToggle(item)}
              >
                <FaHeart className={isItemInFavorites(item._id) ? 'text-[#ff4081]' : 'text-[#CCCCCC]'} />
              </span>
              <img src={item.image} alt={item.desc} loading='lazy' className='w-full bg-white rounded-[5px]' />
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

      {/* Pagination Controls */}
      <section>
        <div className='flex items-end justify-center Gap'>
          {currentPageToUse > 1 && (
            <button onClick={handlePrevPage}
              className="allCenter h-[40px] w-[40px] rounded-full font-semibold text-white hover:border-[#EB7C1B] bg-[#B8A38A] cursor-pointer">
              <FaArrowLeft />
            </button>
          )}

          <ul className='allCenter gap-1'>
            {[...Array(maxPage)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === currentPageToUse;

              // show first, last, current, and dots
              if (
                pageNum === 1 ||
                pageNum === maxPage ||
                Math.abs(currentPageToUse - pageNum) <= 1
              ) {
                return (
                  <li key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`h-[40px] w-[40px] rounded-full font-semibold text-white allCenter cursor-pointer mx-1 
                        ${isActive ? 'bg-[#B98C59] border-[#EB7C1B]' : 'bg-[#B8A38A] border-[#B8A38A]'}`}>
                    {pageNum}
                  </li>
                );
              } else if (
                (pageNum === currentPageToUse - 2 || pageNum === currentPageToUse + 2)
              ) {
                return <li key={pageNum} className='flex gap-4 items-center justify-end mt-5'>
                  <span className='w-3 h-3 rounded-full bg-[#B8A38A]'></span>
                  <span className='w-3 h-3 rounded-full bg-[#B8A38A]'></span>
                  <span className='w-3 h-3 rounded-full bg-[#B8A38A]'></span>
                </li>;
              }
              return null;
            })}
          </ul>

          {currentPageToUse < maxPage && (
            <button onClick={handleNextPage}
              className="allCenter h-[40px] w-[40px] rounded-full font-semibold text-white hover:border-[#EB7C1B] bg-[#B8A38A] cursor-pointer">
              <FaArrowRight />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Items;