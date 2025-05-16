 import { Link } from 'react-router-dom';

 function panelUser() {
 return (
      <div>
        <h1>Bienvenido Usuario</h1>
           <Link to="/pasarela">Pruebas Pasarela</Link>
      </div>
    );
}
  
export default panelUser;