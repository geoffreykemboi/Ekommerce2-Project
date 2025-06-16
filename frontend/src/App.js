import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/layout/Header";   // Import Header component
import Footer from "./components/layout/Footer";  // Import Footer component
import Home from "./components/Home"
import "./App.css";  // Import CSS styles

function App() {
  return (
    <Router>
      <div className="App">
      <Header/>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />   
      </Routes>   
      </div>

      <Footer/>
    </div>
    </Router>

  );
}

export default App;
