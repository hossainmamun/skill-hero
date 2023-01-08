import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import NavBar from '../Components/NavBar.jsx';
import { loginValidation } from '../Validation/Validation.js';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import swal from 'sweetalert';
import { authContext } from '../context/authContext.jsx';
import axios from 'axios';

const Login = () => {
   const [loading, setLoading] = useState(null);
   const { dispatch } = useContext(authContext);
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      resolver: yupResolver(loginValidation),
   });

   const onSubmit = async (data) => {
      const { email, password } = data;
      setLoading(true);

      try {
         const response = await axios.post(
            'http://localhost:1000/api/user/login',
            {
               email,
               password,
            }
         );

         if (response.status === 200) {
            swal({
               title: `Welcome back ${response.data?.userName}`,
               text: 'Login successful',
               icon: 'success',
               button: 'Ok',
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch({ type: 'LOGIN', payload: response.data });
            reset();
            setLoading(false);
            navigate('/', { replace: true });
         }
      } catch (error) {
         swal({
            title: 'Sorry!',
            text: error.response.data.error,
            icon: 'warning',
            button: 'Ok',
         });
         setLoading(false);
      }
   };

   return (
      <div className='bg-white'>
         <NavBar />
         <div className='flex items-center justify-center min-h-screen mx-6 sm:mx-10 md:mx-16 lg:mx-32 xl:mx-40 2xl:mx-60'>
            <div className='space-y-10'>
               <div className='space-y-1 text-center mt-[150px] lg:mt-0'>
                  <img
                     src='https://www.coffed.coop/images/login.png'
                     className='w-56 m-auto'
                     alt=''
                  />
                  <h3 className='uppercase font-extrabold text-xl lg:text-2xl'>
                     login
                  </h3>
               </div>

               <div className='lg:flex lg:justify-between items-center lg:space-x-44'>
                  <div className='w-full h-auto'>
                     <img
                        src='https://i.ibb.co/fr9PWTy/login-removebg-preview.png'
                        className='lg:w-[800px] lg:h-auto md:m-auto'
                        alt=''
                     />
                  </div>

                  {/* form start */}
                  <div className='space-y-4 w-full'>
                     <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                        <div className='flex justify-center'>
                           <div className='mb-3 w-full'>
                              <label className='form-label inline-block mb-2 text-gray-700'>
                                 User Email
                              </label>
                              <input
                                 type='email'
                                 name='email'
                                 className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                                 placeholder='Enter Email'
                                 {...register('email')}
                              />
                              <p className='text-[#d00000]'>
                                 {errors.email?.message}
                              </p>
                           </div>
                        </div>

                        <div className='flex justify-center'>
                           <div className='mb-3 w-full'>
                              <label className='form-label inline-block mb-2 text-gray-700'>
                                 User Password
                              </label>
                              <input
                                 type='password'
                                 name='password'
                                 className='form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0'
                                 placeholder='Enter Password'
                                 {...register('password')}
                              />
                              <p className='text-[#d00000]'>
                                 {errors.password?.message}
                              </p>
                           </div>
                        </div>

                        <div className='mt-4'>
                           <input
                              type='submit'
                              className='border-2 border-[#3a0ca3] bg-[#3a0ca3] text-white font-semibold rounded-lg px-4 py-2 hover:bg-transparent hover:text-[#3a0ca3] duration-150 cursor-pointer'
                              value={loading ? 'wait...' : 'LOGIN'}
                              disabled={loading}
                           />
                        </div>
                     </form>

                     <div className='flex justify-start sm:justify-center items-center space-x-3'>
                        <p className='capitalize'>don't have an account ?</p>
                        <Link to='/user/sign-up'>
                           <span className='px-2 cursor-pointer capitalize font-semibold text-[#3a0ca3]'>
                              sign up
                           </span>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
