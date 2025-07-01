import { BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Toaster } from 'react-hot-toast';
import useUserRoutes from './components/routes/userRoutes';
import useAdminRoutes from './components/routes/adminRoutes';
import useAuthInit from './hooks/useAuthInit';

function App() {

  // Initialize authentication state from localStorage
  useAuthInit();

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

