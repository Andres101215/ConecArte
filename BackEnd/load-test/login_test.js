import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 50, // usuarios virtuales simultáneos
  duration: '30s', // duración de la prueba
};

export default function () {
  const url = 'http://localhost:3000/api/auth/login';
  const payload = JSON.stringify({
    email: 'usuario@ejemplo.com',
    password: '123456',
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

  sleep(1); // simula tiempo entre interacciones
}
