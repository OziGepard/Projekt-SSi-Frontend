
import './App.css';
import { LoginPanel } from './components/LoginPanel/LoginPanel';
import { RegisterPanel } from './components/RegisterPanel/RegisterPanel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
    <div style={{width:'100vw', height:'100vh', display:'flex'}}>
      <Routes>
       <Route path='/login' element={<LoginPanel/>}/>
       <Route path='/register' element={<RegisterPanel/>}/>
       <Route path='/' element={<HomePage/>}/>
      </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
