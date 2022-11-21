import { Box } from '@mui/material'
import React from 'react'
import RiceInformation from './components/RiceInformation'
import RiceTimeLine from './components/RiceTimeLine'

const TracingPricePage = () => {
  return (
    <Box width='80%' m='0 auto'>
      <RiceInformation></RiceInformation>
      <RiceTimeLine></RiceTimeLine>
    </Box>
  )
}

export default TracingPricePage