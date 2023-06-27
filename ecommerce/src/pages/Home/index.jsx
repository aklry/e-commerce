import React from 'react'
import Header from './Header'
import SwiperComponent from './Swiper'
import HotProduct from './HotProduct'
import Types from './Types'
import TabBars from '../../component/TabBar'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="content">
        <SwiperComponent />
        <HotProduct />
        <Types />
      </div>
      <TabBars />
    </div>
  )
}

