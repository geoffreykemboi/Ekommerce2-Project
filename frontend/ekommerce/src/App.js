import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import { Toaster } from 'react-hot-toast';

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
            
            {/* This is your existing route */}
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

