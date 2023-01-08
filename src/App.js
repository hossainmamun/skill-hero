import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import AllCourses from './pages/AllCourses.jsx';
import Dashboard from './pages/DashboardPages/Dashboard.jsx';
import EditBanner from './pages/DashboardPages/EditBanner.jsx';
import EditFoundationCourse from './pages/DashboardPages/EditFoundationCourse.jsx';
import EditPopularCourse from './pages/DashboardPages/EditPopularCourse.jsx';
import ManageContent from './pages/DashboardPages/ManageContent.jsx';
import Profile from './pages/DashboardPages/Profile.jsx';
import UploadBanner from './pages/DashboardPages/UploadBanner.jsx';
import UploadFoundationCourse from './pages/DashboardPages/UploadFoundationCourse.jsx';
import UploadPopularCourse from './pages/DashboardPages/UploadPopularCourse.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import FoundationCourseDetail from './pages/FoundationCourseDetail.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import PopularCourseDetail from './pages/PopularCourseDetail.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
   return (
      <div>
         <Layout>
            <Routes>
               <Route path='/' element={<HomePage />} />
               <Route path='user/login' element={<Login />} />
               <Route path='user/sign-up' element={<SignUp />} />
               <Route path='all-courses' element={<AllCourses />} />
               <Route path='foundation-course-detail' element={<FoundationCourseDetail />} />
               <Route path='popular-course-detail/:courseId' element={<PopularCourseDetail/>} />

               {/* dashboard */}
               <Route path='dashboard' element={<Dashboard />}>
                  <Route path='manage-content' element={<ManageContent />} />
                  <Route path='upload-banner' element={<UploadBanner />} />
                  <Route
                     path='upload-popularCourse'
                     element={<UploadPopularCourse />}
                  />
                  <Route
                     path='upload-foundationCourse'
                     element={<UploadFoundationCourse />}
                  />

                  <Route
                     path='edit-banner/:bannerId'
                     element={<EditBanner />}
                  />
                  <Route
                     path='edit-popularCourse/:courseId'
                     element={<EditPopularCourse />}
                  />
                  <Route
                     path='edit-foundationCourse/:courseId'
                     element={<EditFoundationCourse />}
                  />
                  <Route path='profile' element={<Profile/>} />
               </Route>

               <Route path='*' element={<ErrorPage />} />
            </Routes>
         </Layout>
      </div>
   );
}

export default App;
