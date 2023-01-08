import { Outlet } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar.jsx';

const Dashboard = () => {
   return (
      <div className='flex justify-start min-h-screen w-full bg-white'>
         <Sidebar />
         <Outlet />
      </div>
   );
};

export default Dashboard;
