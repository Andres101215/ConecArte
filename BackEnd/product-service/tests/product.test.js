require('dotenv').config();

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('API /productos', () => {
    it('debe devolver un array (inicialmente vacío o con productos)', async () => {
        const res = await request(app).get('/productos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('debe permitir crear un nuevo producto con todos los atributos', async () => {
        const nuevoProducto = {
            id_artesano: "67db715830d0a6bed5b34a7e",
            nombre: "Escultura en arcilla",
            descripcion: "Escultura tallada a mano con detalles en barniz.",
            precio: 150000,
            cantidad: 10,
            ubicacion: "Bogotá, Colombia",
            fecha_creacion: "2025-04-04T12:00:00.000Z",
            id_categoria: "67db699f30d0a6bed5b349f6"
        };

        const res = await request(app)
            .post('/productos')
            .send(nuevoProducto)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject({
            id_artesano: "67db715830d0a6bed5b34a7e",
            nombre: "Escultura en arcilla",
            descripcion: "Escultura tallada a mano con detalles en barniz.",
            precio: 150000,
            cantidad: 10,
            ubicacion: "Bogotá, Colombia",
            fecha_creacion: "2025-04-04T12:00:00.000Z",
            id_categoria: "67db699f30d0a6bed5b349f6"
        });
        expect(res.body).toHaveProperty('_id'); // en caso de usar MongoDB
    });
});
