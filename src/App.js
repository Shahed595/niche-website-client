import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import AddAProducts from './pages/DashBoard/AddAProduct/AddAProducts';
import DashBoard from './pages/DashBoard/DashBoard/DashBoard';
import MakeAdmin from './pages/DashBoard/MakeAdmin/MakeAdmin';
import ManageAllOrders from './pages/DashBoard/ManageAllOrders/ManageAllOrders';
import ManageProducts from './pages/DashBoard/ManageProducts/ManageProducts';
import MyOrders from './pages/DashBoard/MyOrders/MyOrders';
import Pay from './pages/DashBoard/Pay/Pay';
import Review from './pages/DashBoard/Review/Review';
import Explore from './pages/Explore/Explore/Explore';
import Home from './pages/Home/Home/Home';
import Login from './pages/Login/Login/Login';
import PrivateRoute from './pages/Login/Login/PrivateRoute/PrivateRoute';
import Register from './pages/Login/Register/Register';
import PurchasePage from './pages/PurchasePage/PurchasePage/PurchasePage';
import "slick-carousel/slick/slick.css";
 import "slick-carousel/slick/slick-theme.css";
import AdminRoute from './pages/Login/Login/AdminRoute/AdminRoute';
import UpdateProduct from './pages/DashBoard/DashBoard/UpdateProduct/UpdateProduct';
import Navigation from './pages/Shared/Navigation/Navigation';
import Footer from './pages/Shared/Footer/Footer';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="home" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/explore" element={<PrivateRoute><Explore></Explore></PrivateRoute>}></Route>
        {/* DashBoard Nested Routing Starta */}
        <Route path="/dashboard" element={<DashBoard/>}>
          <Route path={`/dashboard/myOrders`} element={<MyOrders/>}></Route>
          <Route path={`/dashboard/pay`} element={<Pay/>}></Route>
          <Route path={`/dashboard/review`} element={<Review/>}></Route>
          <Route path={`/dashboard/manageAllOrders`} element={<AdminRoute><ManageAllOrders/></AdminRoute>}></Route>
          <Route path={`/dashboard/AddaProduct`} element={<AdminRoute><AddAProducts/></AdminRoute>}></Route>
          <Route path={`/dashboard/makeAdmin`} element={<AdminRoute><MakeAdmin/></AdminRoute>}></Route>
          <Route path={`/dashboard/manageProducts`} element={<AdminRoute><ManageProducts/></AdminRoute>}></Route>
        </Route>
         {/* DashBoard Nested Routing Starta */}
         <Route path="/purchasePage/:productId" element={<PurchasePage/>}></Route>
         <Route path="/manageProduct/updataProduct/:id" element={<AdminRoute><UpdateProduct/></AdminRoute>}></Route>
      </Routes>
      <Footer></Footer>
      </AuthProvider>  
    </div>
  );
}

export default App;
