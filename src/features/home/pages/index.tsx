import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePageHeader from '../components/header/HomePageHeader'
import HomePage from './home-page/HomePage'
import ProductPage from './product'
import TrackingPage from './product/tracking'
import RicePage from './rice'
import TracingPricePage from './rice/tracing'

const index = () => {
  return (
    <>
      <HomePageHeader></HomePageHeader>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/rice' element={<RicePage></RicePage>}></Route>
        <Route path='/product' element={<ProductPage></ProductPage>}></Route>
        <Route path='/rice/tracing/:id' element={<TracingPricePage></TracingPricePage>}></Route>
        <Route path='/product/tracking/:id' element={<TrackingPage></TrackingPage>}></Route>
      </Routes>
    </>
  )
}

export default index