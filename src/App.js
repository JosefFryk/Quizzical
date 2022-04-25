
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './components/Home';
import Questions from './components/Questions';


  
function App() {




return (
    <Router>
  
    <Routes>
        <Route  path='/'  element={<Home />} />
        <Route path='/questions' element={<Questions/>} />

    </Routes>
    </Router>
);
}
  
export default App;


////https://opentdb.com/api_config.php