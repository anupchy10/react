import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

function AppContent() {
  const location = useLocation();
  const isAuthRoute = ['/login', '/signup', '/'].includes(location.pathname);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    // Only show skeleton if coming from login
    if (location.state?.fromLogin) {
      setShowSkeleton(true);
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  if (showSkeleton && !isAuthRoute) {
    return (
      <div className='allCenter flex-col w-full'>
        {/* Navbar Skeleton */}
        <div className="w-full bg-white shadow-sm">
          <div className="container h-16 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="hidden md:flex space-x-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <main className='container'>
          <div className="grid grid-cols-12 gap-4 relative mt-8">
            <div className="col-span-3 max-lg:hidden sticky bottom-0 self-end h-[calc(100vh-120px)] mb-20">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="col-span-9 max-lg:col-span-full">
              <div className="animate-pulse space-y-6">
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Skeleton */}
        <div className="w-full bg-gray-100 mt-8">
          <div className="container py-8">
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isAuthRoute && (
        <div className='allCenter flex-col w-full'>
          <Navbar />
          <main className='container'>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ProductDetail />} />
                <Route path="/favorite" element={<FavoriteList />} />
                <Route path="/cart" element={<Cart />} />
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
      <CartInitializer />
      <AppContent />
    </Router>
  );
}

export default App;