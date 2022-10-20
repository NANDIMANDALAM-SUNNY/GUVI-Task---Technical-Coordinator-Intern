import React,{useState,createContext, } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Profile from './components/Profile';
import './App.css'

// creating a global store using context api
export const store = createContext();

function App() {
  const [token,setToken] = useState(localStorage.getItem('token'));
  const [data,setData] = useState("")
  return (
    <>
      <store.Provider value={{token,setToken,data,setData}}>   
        <Router>
            <Navbar />
          <Routes>
              <Route exact path='/login' element={<Login /> } />
              <Route exact path='/register' element={<Register /> } />
              <Route exact path='/' element={<Dashboard /> } />
              <Route exact path='/profile' element={<Profile /> } />
          </Routes>
          </Router>
      </store.Provider>
    </>
  );
}

export default App;
