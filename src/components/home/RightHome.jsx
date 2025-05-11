import React, { useState, useEffect } from 'react';
import Hero from './right/Hero';
import ProductTitle from './right/ProductTitle';
import HomeProduct from './right/HomeProduct';
import Icons from '../Icons';
import NewItems from './right/NewItems';
import DividerLine from '../DividerLine';
import Banner from '../Banner';
// import { ImOffice, ImStumbleupon } from 'react-icons/im';

const RightHome = () => {
  return (
    <div className='mt-[55px]'>
      <Hero />
      <ProductTitle />
      <HomeProduct />
      <Icons />
      <NewItems />
      <DividerLine />
      <Banner />
    </div>
  );
};

export default RightHome;
