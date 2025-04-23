import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import SupportedByCompanies from './components/SupportedByCompanies';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import Packages from './components/Packages';
// import Testimonials from './components/Testimonials';
import Login from './components/Login';
import Register from './components/Register';
import VisaCard from './components/VisaCard';
<<<<<<< HEAD
// import RegisterOTP from './components/RegisterOTP'; // Component file not found
import ContactPage from './components/Contact';
import AboutPage from './components/AboutPage';
import Checkout from './components/Checkout';
import InvoicesPage from './Dashboard/invoices/invoice';
import TransactionsPage from './Dashboard/transaction/transaction';
import TransferPage from './Dashboard/transfer/transaction';
import NotFoundPage from './components/404'; // Import the 404 page

// Simple auth context if you don't have one yet
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  
  if (!isAuthenticated) {
    // Redirect logic would go here
    return <div>Please log in to access this page</div>;
  }
  
  return children;
};

// Custom handler to block API access attempts
const ApiBlocker = () => {
  React.useEffect(() => {
    // Log unauthorized attempt
    console.warn("Unauthorized attempt to access API endpoint directly");
  }, []);
  
  return <NotFoundPage />;
};

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header/>
                <HeroBanner/>
                <SupportedByCompanies/>
                <Packages/>
                <VisaCard/>
                <Newsletter/>
                <Footer/>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/otp" element={<RegisterOTP />} /> */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Dashboard routes - protected */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Header />
              <InvoicesPage />
              <TransactionsPage />
              <TransferPage />
              <Footer />
            </ProtectedRoute>
          } />
          
          {/* Block direct API access */}
          <Route path="/api/*" element={<ApiBlocker />} />
          
          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </AuthProvider>
=======
import RegisterOTP from './components/registrerOTP';
import AdminDashboard from './admin/Dashboard';
import ProtectedRoute from './admin/protectedroute';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header/>
              <HeroBanner/>
              <SupportedByCompanies/>
              <Packages/>
              <VisaCard/>
              <Testimonials/>
              <Newsletter/>
              <Footer/>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<RegisterOTP/>} />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
>>>>>>> 4c9952fde4d6f3fc2b896440a7343ba447aff29c
  );
}

export default App;