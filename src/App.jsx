import React, { Children, useContext } from 'react'
import Navbar from './component/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import ManageItem from './Pages/ManageItem'
import Managecategory from './Pages/Managecategory'
import ManageUser from './Pages/ManageUser'
import Explore from './Pages/Explore'
import { Toaster } from 'react-hot-toast'
import Login from './Pages/Login'
import Register from './Pages/Register'
import OrderHistory from './Pages/OrderHistory'
import { Appcontext } from './Pages/AppContextProvider'
import Notfound from './Pages/Notfound'
import AddStock from './Pages/AddStock'
import Setting from './Pages/Setting'

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { setauth, auth } = useContext(Appcontext)
  if (!auth.token) {
    return <Navigate to={"/login"} />
  }
  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    return <Navigate to={"/dashboard"} />
  }
  return element;
}

const LoginRoute = ({ element }) => {
  const { setauth, auth } = useContext(Appcontext)
  if (auth && auth.token) {
    return <Navigate to={"/"} />
  }
  return element;
}

const App = () => {
  const location = useLocation();
  const { setauth, auth } = useContext(Appcontext)
  // console.log(auth);

  return (
    <div className=''>
      {location.pathname != "/login" && location.pathname != "/register" && <Navbar />}
      <Toaster />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} allowedRoles={["ADMIN"]} />} />
        <Route path='/explore' element={<ProtectedRoute element={<Explore />}/>} />
        <Route path='/addStock' element={<ProtectedRoute element={<AddStock />} allowedRoles={["ADMIN"]} />}/>

        <Route path='/manageItem' element={<ProtectedRoute element={<ManageItem />} allowedRoles={["ADMIN"]} />} />
        <Route path='/manageCategory' element={<ProtectedRoute element={<Managecategory />} allowedRoles={["ADMIN"]} />} />
        <Route path='/manageUser' element={<ProtectedRoute element={<ManageUser />} allowedRoles={["ADMIN"]} />} />

        <Route path='/orderHistory' element={<ProtectedRoute element={<OrderHistory />}/>} />
        <Route path='/setting' element={<ProtectedRoute element={<Setting />}/>} />
        <Route path='/login' element={<LoginRoute element={<Login />} />} />
        <Route path='/register' element={<LoginRoute element={<Register />} />} />
        <Route path='*' element={<Notfound/>}/>
      </Routes>
    </div>
  )
}

export default App
