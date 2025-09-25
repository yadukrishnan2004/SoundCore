import React, {  useEffect, useState } from 'react'
import axios from "axios";


function useApi() {
    const [product1,setproduct1]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/products').then(res=>setproduct1(res.data)).catch(err=>console.error("An Error"))
    }
    )


  return {product1}
}

export default useApi
