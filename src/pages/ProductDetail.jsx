import React from 'react'
import Detail from '../components/productDetail/Detail'
import ProductDesc from '../components/productDetail/ProductDesc'
import ProductReview from '../components/productDetail/ProductReview'
import ProductComment from '../components/productDetail/ProductComment'

const ProductDetail = () => {
  return (
    <div className='container'>
      <Detail />
      <ProductDesc />
      <ProductReview />
      <ProductComment />
    </div>
  )
}

export default ProductDetail
