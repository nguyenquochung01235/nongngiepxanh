import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePageHeader from '../components/header/HomePageHeader'
import HomePage from './home-page/HomePage'
import HTXDeatailPage from './htx/detail'
import RicePage from './rice'
import TracingPricePage from './rice/tracing'

const index = () => {
  return (
    <>
      <HomePageHeader></HomePageHeader>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/htx' element={<RicePage></RicePage>}></Route>
        <Route path='/htx/:id' element={<HTXDeatailPage></HTXDeatailPage>}></Route>
        <Route path='/htx/lohang/:id' element={<TracingPricePage></TracingPricePage>}></Route>
      </Routes>
    </>
  )
}

export default index