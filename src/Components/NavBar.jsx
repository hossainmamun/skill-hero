import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { authContext } from '../context/authContext.jsx';

const NavBar = () => {
   const [open, setOpen] = useState(false);
   const { user, dispatch } = useContext(authContext);
   const logout = () => {
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
   };

   return (
      <div className='bg-[#023047] w-full flex justify-between items-center py-8 fixed z-50'>
         <div className='ml-6 sm:ml-16 md:ml-20 lg:ml-36 lx:ml-48 2xl:ml-60'>
            <Link to='/'>
               <strong className='text-md sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#fdffb6]'>
                  SKILL HERO
               </strong>
            </Link>
         </div>

         <div
            onClick={() => setOpen(!open)}
            className='md:hidden mr-6 sm:mr-16 md:mr-20 lg:mr-36 xl:mr-48 2xl:mr-60'>
            <strong className='text-[#fdffb6] text-3xl cursor-pointer'>
               {open ? <MdClose /> : <MdMenu />}
            </strong>
         </div>

         <div
            className={
               open
                  ? `md:flex md:items-center md:space-x-6 md:w-auto w-full md:relative absolute md:top-0 top-20 md:bg-transparent bg-[#023047] md:text-start text-center mr-6 sm:mr-16 md:mr-20 lg:mr-36 xl:mr-48 2xl:mr-60 ${
                       open && 'shadow-xl'
                    }`
                  : `md:flex md:items-center md:space-x-6 md:w-auto w-full md:relative absolute md:top-0 top-24 md:bg-transparent bg-[#023047] md:text-start text-center mr-6 sm:mr-16 md:mr-20 lg:mr-36 xl:mr-48 2xl:mr-60 hidden ${
                       open && 'shadow-xl'
                    }`
            }>
            {!user ? (
               <>
                  <li className='my-8 md:my-0 list-none'>
                     <NavLink
                        to='/user/login'
                        className='text-white md:text-[#fdffb6] md:border md:border-[#fdffb6] md:px-6 md:py-4 md:rounded-xl md:hover:text-black md:hover:bg-[#fdffb6] duration-150'>
                        LOGIN
                     </NavLink>
                  </li>
                  <li className='my-8 md:my-0 list-none'>
                     <NavLink
                        to='/user/sign-up'
                        className='text-white md:text-black md:border md:border-[#fdffb6] md:px-6 md:py-4 md:rounded-xl md:bg-[#fdffb6] md:hover:text-[#fdffb6] md:hover:bg-transparent duration-150'>
                        SIGN UP
                     </NavLink>
                  </li>
               </>
            ) : (
               <>
                  <button
                     onClick={() => setOpen(!open)}
                     className='relative space-y-3'>
                     <div className='flex justify-between items-center capitalize space-x-1'>
                        <AiOutlineUser className='text-xl text-[#fdffb6]' />
                        <span className='text-[#fdffb6]'>{user?.userName}</span>
                        <span className='text-[#fdffb6]'>
                           <MdKeyboardArrowDown />
                        </span>
                     </div>

                     {open && (
                        <div className='absolute top-full min-w-full w-max bg-[#fdffb6] rounded-md text-black'>
                           <ul className='list-none space-y-1 text-start'>
                              <li>
                                 <Link
                                    to='/dashboard'
                                    className='hover:bg-black hover:text-[#fdffb6] px-2 py-1 block rounded-t-md duration-100'>
                                    Dashboard
                                 </Link>
                              </li>
                              <li>
                                 <Link
                                    to='/dashboard/profile'
                                    className='hover:bg-black hover:text-[#fdffb6] px-2 py-1 block duration-100'>
                                    Profile
                                 </Link>
                              </li>
                              <li
                                 onClick={() => logout()}
                                 className='hover:bg-black hover:text-[#fdffb6] px-2 py-1 block rounded-b-md duration-100'>
                                 Logout
                              </li>
                           </ul>
                        </div>
                     )}
                  </button>
               </>
            )}
         </div>
      </div>
   );
};

export default NavBar;
