import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import { Toaster } from 'react-hot-toast';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import UserLayout from "./components/user/UserLayout";
import UpdateProfile from "./components/user/UpdateProfile";

import './App.css';
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center"/>
        <Header />

        <div className="container mt-4">
          <Routes>
            {/* ADD THIS LINE for your homepage */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me/profile" element={<UserLayout><Profile /></UserLayout>} />
            <Route path="/me/update_profile" element={<UpdateProfile/>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

