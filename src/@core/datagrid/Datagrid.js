import { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { fetchDataSet } from '../../../utils/fetchQueries'

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    minWidth: 150,
    hide: true
  },
  { field: 'comment', headerName: 'Comments', minWidth: 150 },
  { field: 'toxic', headerName: 'Toxic', minWidth: 150 },
  { field: 'severe_toxic', headerName: 'Severe Toxic', minWidth: 150 },
  { field: 'obscene', headerName: 'Obscene', minWidth: 150 },
  { field: 'threat', headerName: 'Threat', minWidth: 150 },
  { field: 'insult', headerName: 'Insult', minWidth: 150 },
  { field: 'identity_hate', headerName: 'Identity Hate', minWidth: 150 }
]

export default function DataSetTable() {
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(100)
  const [data, setData] = useState([])

  const handlePageSize = number => {
    setPageSize(number)
  }
  const handlePage = number => {
    setPageNo(number)
  }

  useEffect(() => {
    fetchDataSet(setData, pageNo, pageSize)
  }, [pageSize, pageNo])

  return (
    <Box
      sx={{
        height: 500,
        maxHeight: 500,
        margin: '1rem auto',
        width: '90%'
      }}
    >
      <DataGrid
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        rows={data?.docs ? data?.docs : []}
        //loading={isLoading || isFetching}
        //error={error?.data?.title}
        onPageSizeChange={number => handlePageSize(number)}
        onPageChange={number => handlePage(number + 1)}
        rowCount={data?.totalPages * pageSize || 1}
        rowsPerPageOptions={[10000, 50000, 100000]}
        pageSize={pageSize}
        page={pageNo - 1}
        editMode='row'
        getRowId={row => row._id}
        //onRowClick={(params, e, details) => setSelectedRow(params.row)}
      />
    </Box>
  )
}
