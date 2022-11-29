import { Box } from '@mui/material'
import React, { useState } from 'react'
import { ITruyXuatNguonGoc } from '../../../../../model/tracking-tracing'
import RiceInformation from './components/RiceInformation'
import RiceTimeLine from './components/RiceTimeLine'

const TrackingPage = () => {

  const [data, setData] = useState<ITruyXuatNguonGoc>()

  return (
    <Box width='80%' m='0 auto'>
      <RiceInformation product={data?.giaodichmubanlua}></RiceInformation>
      <RiceTimeLine></RiceTimeLine>
    </Box>
  )
}

export default TrackingPage