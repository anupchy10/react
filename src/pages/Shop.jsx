import React from 'react';
import Filter from '../components/shop/Filter';
import Items from '../components/shop/Items';
import Icons from '../components/Icons';
import NewItems from '../components/home/right/NewItems';
import Banner from '../components/Banner';
import ProductTitle from '../components/home/right/ProductTitle';

const Shop = () => {
  return (
    <div className='mt-[120px]'>
      <Filter />
      <ProductTitle />
      <Items />
      <Icons />
      <NewItems />
      <Banner />
    </div>
  );
};

export default Shop;
