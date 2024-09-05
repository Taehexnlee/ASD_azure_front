import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import AddUser from './users/AddUser';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Edituser from './users/Edituser';
import ViewUser from './users/ViewUser';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/'element={<Home/>} />
          <Route exact path='/adduser'element={<AddUser/>} />
          <Route exact path='/edituser/:id'element={<Edituser/>} />
          <Route exact path='/viewuser/:id'element={<ViewUser/>} />

        </Routes>
      </Router>
   
    </div>
  );
}

export default App;
