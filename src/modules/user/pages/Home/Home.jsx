import React from 'react'
import Navbar from '../../../../components/common/Navbar';
import Footer from '../../../../components/common/Footer';
import Hero from '../../components/HomeHero'
import Body from '../../components/HomeBody'

function Home() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Body/>
        <Footer/>
    </div>
  )
}

export default Home
