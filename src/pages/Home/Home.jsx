import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Navbar/Footer'
import Hero from '../../components/parts/Hero'
import Body from '../../components/parts/body'

function Home() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Body/>
        <Footer/>

      <h2>this is the home page</h2>
    </div>
  )
}

export default Home
