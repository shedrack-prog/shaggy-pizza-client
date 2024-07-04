import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { getAllCustomers, getAllOrders } from '../../actions/getData';
// import TableActions from './tableActions';
import { CiEdit } from 'react-icons/ci';
import { useAppContext } from '../../context/appContext';
import TableActions from './table-actions';
import { ClipLoader } from 'react-spinners';

const OrderTable = ({ data }) => {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        field: 'userName',
        headerName: 'Name',
        width: 120,
      },
      {
        field: 'userEmail',
        headerName: 'Email',
        width: 130,
      },
      {
        field: 'productName',
        headerName: 'Product',
        width: 160,
      },
      {
        field: 'paid',
        headerName: 'Paid',
        width: 90,
      },
      {
        field: 'productImage',
        headerName: 'Image',
        width: 65,
        // height: 60,
        renderCell: (params) => (
          <div className="flex items-center justify-center  ">
            <img
              src={params.row.productImage}
              className="object-cover w-[100%] relative rounded-full "
            />
          </div>
        ),

        sortable: false,
        filterable: false,
      },

      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 120,
        renderCell: (params) =>
          moment(params.row.createdAt).format('YYYY-MM-DD'),

        // type: 'singleSelect',
        // valueOptions: ['pending', 'in the kitchen', 'dispatched', 'delivered'],
        // editable: true,
        // type: 'boolean', for input type checkbox
        // editable: true, for input type check box
        // renderCell: (params) => (
        //   <select
        //     value={params.row.status}
        //     onChange={(e) => handleStatusChange(e, params.row._id)}
        //   >
        //     <option value="pending">Pending</option>
        //     <option value="in the kitchen">In the Kitchen</option>
        //     <option value="dispatched">Dispatched</option>
        //     <option value="delivered">Delivered</option>
        //   </select>
        // ),
      },
      {
        field: 'updatedAt',
        headerName: 'Updated At',
        width: 120,
        renderCell: (params) =>
          moment(params.row.updatedAt).format('YYYY-MM-DD'),
      },
      {
        field: 'size',
        headerName: 'Size',
        width: 100,
      },

      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) =>
          loading ? (
            <ClipLoader color="green" size={'24px'} />
          ) : (
            <TableActions
              {...{
                params,
                rowId,
                setRowId,
                loading,
                setLoading,
                dbStatus: params.row.status,
              }}
            />
          ),
      },
    ],
    [rowId]
  );

  return (
    <div className="min-w-[calc(100vw- )] flex  flex-col mt-[20px] overflow-x-scroll ">
      <h3 className="text-[35px] text-gray-800 font-medium mb-[1rem] px-2">
        All Orders
      </h3>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 20, 30]}
        pageSize={pageSize}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </div>
  );
};

export default OrderTable;
