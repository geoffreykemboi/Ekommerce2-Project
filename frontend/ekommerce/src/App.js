import { BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Toaster } from 'react-hot-toast';
import useUserRoutes from './components/routes/userRoutes';
import useAdminRoutes from './components/routes/adminRoutes';

function App() {

  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();

  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container mt-4">
          <Routes>
           {userRoutes}
           {adminRoutes}
            {/* Add more routes as needed */}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

