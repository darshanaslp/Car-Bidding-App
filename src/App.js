import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom'; // Import Routes and Navigate
import store from './redux/store'; // Import your Redux store
import Home from './component/Home'; // Import your Home component
import Footer from './component/Footer';
import Header from './component/Header';
import Bid from './component/Bid';
import VehicleDetails from './component/VehicleDetails';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header/>
          <main className="mt-4">
            <div className="container">
            <ToastContainer />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bid" element={<Bid />} />
                <Route path="/vehicle/:vehicleId" element={<VehicleDetails />} />
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to Home if unknown path */}
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;