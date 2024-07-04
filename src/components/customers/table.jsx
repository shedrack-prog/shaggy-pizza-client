import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import { getAllCustomers } from '../../actions/getData';
// import TableActions from './tableActions';
import { CiEdit } from 'react-icons/ci';
import { useAppContext } from '../../context/appContext';

const CustomerTable = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setEditPizza } = useAppContext();

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        width: 140,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 200,
      },
      {
        field: 'image',
        headerName: 'Picture',
        width: 65,
        // height: 60,
        renderCell: (params) => (
          <div className="flex items-center justify-center  ">
            <img
              src={params.row.image}
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
        width: 150,
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
        width: 150,
        renderCell: (params) =>
          moment(params.row.updatedAt).format('YYYY-MM-DD'),
      },
      {
        field: '_id',
        headerName: 'Id',
        width: 180,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => (
          <span
            className="cursor-pointer px-[10px] py-[10px] hover:bg-gray-200 rounded-full"
            onClick={() => {
              setEditPizza(params.row._id);
              navigate('/admin/create');
            }}
          >
            <CiEdit className="" size={20} />
          </span>
        ),
      },
      // {
      //   field: 'actions',
      //   headerName: 'Actions',
      //   type: 'actions',
      //   renderCell: (params) => (
      //     <TableActions {...{ params, rowId, setRowId }} />
      //   ),
      // },
    ],
    [rowId]
  );

  useEffect(() => {
    const getData = async () => {
      const data = await getAllCustomers();
      setData(data);
    };
    getData();
  }, []);
  console.log(data);

  return (
    <div className="min-w-[calc(100vw- )] flex  flex-col mt-[20px] ">
      <h3 className="text-[35px] text-gray-800 font-medium mb-[1rem] px-2">
        All Customers
      </h3>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
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

export default CustomerTable;
