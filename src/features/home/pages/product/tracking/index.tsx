import { Box } from '@mui/material'
import React from 'react'
import RiceInformation from './components/ProductInformation'
import RiceTimeLine from './components/ProductTimeLine'

const TrackingPage = () => {
  return (
    <Box width='80%' m='0 auto'>
      <RiceInformation></RiceInformation>
      <RiceTimeLine></RiceTimeLine>
    </Box>
  )
}

export default TrackingPage