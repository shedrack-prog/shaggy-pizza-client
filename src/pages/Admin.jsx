import Sidebar from '../components/admin/sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../actions/getData';
import { toast } from 'react-toastify';

const Admin = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      const response = await getCurrentUser();
      console.log('response', response);

      if (response?.user?.role !== 'admin') {
        navigate('/admin/login');
        toast.error('Not authorized');
      }
    };
    func();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <AdminHeader />
        <div className="ml-[300px] px-[0px] mt-[50px] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
