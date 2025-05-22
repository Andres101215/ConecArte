import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 50,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:5001/usuarios/login'; 
  const payload = JSON.stringify({
    correo: 'andres.puentesl2@user.com',
    contraseña: 'user12345',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(url, payload, params);

  check(res, {
    'status es 200': (r) => r.status === 200,
    'tiempo < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
