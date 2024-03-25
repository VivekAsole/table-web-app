import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { ArrowUpward, ArrowDownward, SwapVert } from '@mui/icons-material';

const SortingOptions = ({ setSorting }) => {

  const column = ["id", "name", "category", "subcategory", "createdAt", "updatedAt", "price", "sale_price"]
  const [sortOptions, setSortOptions] = useState({});

  const handleSort = (column) => {
    const sort = { id: column, desc: column === sortOptions.id ? (sortOptions.desc ? false : true) : false }
    setSortOptions(sort)
    setSorting([sort])
  }

  return (
    <Box sx={{
      margin: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Typography>Sorting Options</Typography>
      {column.map(column => (
        <Button
        sx={{
          textTransform: 'none',
          color: 'black',
        }}
          variant='outlined'
          key={column}
          onClick={() => handleSort(column)}
          endIcon={
            sortOptions.desc === undefined ? <SwapVert /> : sortOptions.id === column && (
               sortOptions.desc ? <ArrowDownward /> : <ArrowUpward />
            )
            // <SwapVert />
          }
        >
          {column}
        </Button>
      ))}
      <Button
        variant='contained'
        onClick={() => {
          setSorting([])
          setSortOptions({})
        }}
      >Clear Sorting</Button>
    </Box>
  )
}

export default SortingOptions