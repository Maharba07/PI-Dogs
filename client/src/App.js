import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './landing/landing.components';
import Home from './home/home.components';
import Detail from './detail/detail.components';
import Create from './create/create.components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
        <Route path="/create" element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;
