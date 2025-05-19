import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import Insights from './pages/Insights';
import Tips from './pages/Tips';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-bgLight font-sans text-dark">
        <Navbar />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/tips" element={<Tips />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;