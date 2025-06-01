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
import { div } from 'framer-motion/client';
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const isAuthRoute = ['/login', '/signup', '/'].includes(location.pathname);

  return (
    <>
      {!isAuthRoute && (
        <div className='allCenter flex-col w-full'>
          <Navbar />
          <main className='container max-sm:mt-7'>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/favorite" element={<FavoriteList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path='/profile' element={<Profile />} />
                <Route path="/item/:id" element={<ProductDetail />} />
              </Route>
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
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