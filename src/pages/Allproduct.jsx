import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import useApi from '../components/api/Api';
import ProductCard from '../components/Product/ProductCard'

function Allproduct() {
    const {product1}=useApi();
  return (
    <div className='flex
    '>
        <Navbar />
       {product1.map(product => (
  <ProductCard key={product.id} data={product} />
))}



      all product display page
    </div>
  )
}

export default Allproduct
