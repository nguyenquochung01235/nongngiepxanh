import { Pagination, Stack } from '@mui/material';
import React from 'react'

const CustomPagination = () => {

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} mb={4}>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  )
}

export default CustomPagination
