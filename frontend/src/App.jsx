import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import RegisterSeller from './pages/RegisterSeller';
import Pasarela from './pages/Pasarela';
import PanelAdmin from './pages/panelAdmin';
import PanelUser from './pages/panelUser';
import PanelSeller from './pages/panelSeller';
import WompiRespuesta from './pages/wompi-respuesta';
import ProductoDetalle from './pages/ProductoDetalle';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { AuthProvider } from './Contexts/AuthContext';

function App() {
  return (
    
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-seller" element={<RegisterSeller />} />
          <Route path="/pasarela" element={<Pasarela />} />
          <Route path="/wompi-respuesta" element={<WompiRespuesta />} />
          <Route path="/panelAdmin" element={<PanelAdmin />} />
          <Route path="/panelUser" element={<PanelUser />} />
          <Route path="/panelSeller" element={<PanelSeller />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


