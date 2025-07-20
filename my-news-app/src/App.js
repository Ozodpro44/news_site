
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Lenta from './pages/Lenta';
import Settings from './pages/Settings';
import PopupCookie from './components/PopupCookie';
import BottomBar from './components/BottomBar';
import SearchResult from "./pages/SearchResult";

// import { useEffect } from "react";


function App() {
  // const [darkMode] = localStorage.getItem('darkMode') ? [localStorage.getItem('darkMode') === 'true'] : [false];

  // useEffect(() => {
  //   if (darkMode) document.body.classList.add('dark-mode');
  //   else document.body.classList.remove('dark-mode');
  // }, [darkMode]);

  return (
    <BrowserRouter>
        <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lenta" element={<Lenta />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/search" element={<SearchResult />} />
            </Routes> 
      <PopupCookie />
      <BottomBar />
    </BrowserRouter>
  );
}

export default App;
