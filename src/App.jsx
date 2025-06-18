// App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import PrivateRoute from './components/private/PrivateRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Enter from './pages/enter/Enter';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import CartInitializer from './components/cart/CartInitializer';
import FavoriteList from './pages/FavoriteList';
import ProductDetail from './pages/ProductDetail';
import MenuButton from './components/navbar/MenuButton';
import Profile from './pages/Profile';
import AdminUsers from '../public/AdminUsers'; // NOTE: This will now render without Navbar/Footer
import ScrollToTop from './components/ScrollToTop';
import LeftHome from './components/home/LeftHome';
import { motion } from "framer-motion";
import Breadcrumbs from './components/navbar/Breadcrumbs';

function AppContent() {
  const location = useLocation();
  const isAuthRoute = ['/login', '/signup', '/'].includes(location.pathname);

  // Check if route is Admin (no header/footer)
  const isAdminPage = location.pathname.startsWith('/admin/users');

  // Routes where LeftHome should NOT appear
  const hideLeftHomeRoutes = ['/about', '/item/', '/cart', '/admin/users'];
  const shouldHideLeftHome = hideLeftHomeRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  if (isAdminPage) {
    return (
      <Routes>
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    );
  }

  return (
    <>
      {!isAuthRoute && (
        <div className='allCenter flex-col w-full'>
          <div className='fixed top-0 z-50 w-full'>
            <Navbar />
            <Breadcrumbs />
          </div>
          <main className='container mt-[150px] max-sm:mt-[190px]'>
            {shouldHideLeftHome ? (
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/about" element={<About />} />
                  <Route path="/item/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                </Route>
              </Routes>
            ) : (
              <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-3 max-lg:hidden'>
                  <motion.div
                    className="sticky top-0 sc h-[100vh] overflow-scroll col-span-3 max-lg:hidden"
                    initial={location.state?.fromLogin ? { x: -100, opacity: 0 } : false}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="mb20">
                      <LeftHome />
                    </div>
                  </motion.div>
                </div>
                <div className='col-span-9 max-lg:col-span-full'>
                  <Routes>
                    <Route element={<PrivateRoute />}>
                      <Route path="/home" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/favorite" element={<FavoriteList />} />
                      <Route path='/profile' element={<Profile />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/home" />} />
                  </Routes>
                </div>
              </div>
            )}
          </main>
          <Footer />
          <MenuButton />
        </div>
      )}

      {isAuthRoute && (
        <Routes>
          <Route path='/' element={<Enter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartInitializer />
      <AppContent />
    </Router>
  );
}

export default App;
