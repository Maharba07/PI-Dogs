import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './landing/landing.components';
import Home from './home/home.components';
import Detail from './detail/detail.components';
import Create from './create/create.components';
import Error404 from './notFound/notFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/*" element={<Error404/>}/>
      </Routes>
    </div>
  );
}

export default App;
