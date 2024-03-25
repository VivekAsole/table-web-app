import {
  MRT_ShowHideColumnsButton,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import data from "../data/data"
import ColumnGroups from './ColumnGroups';
import SidePanel from './SidePanel';
import Filters from './Filters';
import SortingOptions from './SortingOptions';

import moment from 'moment';

import { FilterList, Layers, SwapVert } from '@mui/icons-material';
import { Box, Button, Tooltip } from '@mui/material';

import { useState } from 'react';

const columns = [
  {
    accessorKey: 'id',
    header: 'id',
    size: 50
  },
  {
    accessorKey: 'name',
    header: 'name',
    filterVariant: 'text'
  },
  {
    accessorKey: 'category',
    header: 'category',
    filterVariant: 'multi-select'
  },
  {
    accessorKey: 'subcategory',
    header: 'subcategory',
    filterVariant: 'multi-select',

  },
  {
    accessorFn: (originalRow) => new Date(moment(originalRow.createdAt).format("MM/DD/YYYY")),
    accessorKey: 'createdAt',
    header: 'createdAt',
    filterVariant: 'date-range',
    filterFn: 'between',
    Cell: ({ cell }) => moment(cell.getValue()).format("DD-MMM-YY"),
  },
  {
    accessorFn: (originalRow) => new Date(moment(originalRow.createdAt).format("MM/DD/YYYY")),
    accessorKey: 'updatedAt',
    header: 'updatedAt',
    filterVariant: 'date-range',
    filterFn: 'between',
    Cell: ({ cell }) => moment(cell.getValue()).format("DD-MMM-YY")
  },
  {
    accessorKey: 'price',
    header: 'price',
    size: 100,
    filterVariant: 'range-slider',
    filterFn: 'betweenInclusive',
    muiFilterSliderProps: {
      valueLabelFormat: (value) => value
    },
  },
  {
    accessorKey: 'sale_price',
    header: 'sale_price',
    size: 100,
    filterVariant: 'range-slider',
    filterFn: 'betweenInclusive',
    muiFilterSliderProps: {
      valueLabelFormat: (value) => value
    },
  },
];

const AdvancedTable = () => {

  const [groupedColumn, setGroupedColumn] = useState([]);
  const [sidePanel, setSidePanel] = useState(false)
  const [component, setComponent] = useState()
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [showfilter, setShowFilter] = useState(false)

  const table = useMaterialReactTable({
    columns,
    data,
    renderToolbarInternalActions: (() => <>
      <MRT_ShowHideColumnsButton table={table} />
      <Tooltip title="sorting">
        <Button
          onClick={() => {
            setSidePanel(prev => !prev)
            setComponent(<SortingOptions setSorting={setSorting} />)
          }}
        >
          <SwapVert sx={{ color: 'gray' }} />
        </Button>
      </Tooltip>
      <Tooltip title="Filters">
        <Button
          onClick={() => {
            setSidePanel(prev => !prev)
            setShowFilter(true)
          }}
        >
          <FilterList sx={{ color: 'gray' }} />
        </Button>
      </Tooltip>
      <Tooltip title="Column Group">
        <Button
          onClick={() => {
            setComponent(<ColumnGroups setGroupedColumn={setGroupedColumn} />)
            setSidePanel(prev => !prev)
          }}
        >
          <Layers sx={{ color: 'gray' }} />
        </Button>
      </Tooltip>
    </>),

    initialState: {
      density: 'compact',
      expanded: true,
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
    },

    state: {
      columnFilters,
      sorting,
      grouping: groupedColumn,
    },

    muiPaginationProps: {
      showRowsPerPage: false,
      variant: 'outlined',
      showFirstButton: false,
      showLastButton: false,
      shape: 'rounded'
    },

    paginationDisplayMode: 'pages',
    enableFilters: true,
    enableDensityToggle: false,
    enableFullScreenToggle: true,
    enableColumnActions: false,
    enableGrouping: true,
    columnFilterDisplayMode: 'custom',
    muiFilterTextFieldProps: ({ column }) => ({
      label: `Filter by ${column.columnDef.header}`,
    }),
    enableFacetedValues: true,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <Box
      style={{
        position: 'fixed',
        top: "50%",
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minHeight: 500,
        height: "min-content",
        width: 'min-content',
        border: '2px solid black',
      }}
    >
      {
        sidePanel &&
        <SidePanel
          open={sidePanel}
          onClose={() => {
            setShowFilter(false)
            setSidePanel(false)
            setComponent()
          }}
        >{showfilter ? <Filters table={table} setColumnFilters={setColumnFilters} /> : component}</SidePanel>
      }
      <MaterialReactTable table={table} />
    </Box>)
}

export default AdvancedTable;
