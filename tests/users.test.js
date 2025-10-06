const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');

beforeAll(async () => {
  await db.migrate.latest();  
  await db('users').del();    
});

afterAll(async () => {
  await db.destroy();
});

test('POST /users cria um usuário', async () => {
  const res = await request(app)
    .post('/users')
    .send({ name: 'Felipe', email: 'felipe@example.com' });

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('id');
  expect(res.body.name).toBe('Felipe');
  expect(res.body.email).toBe('felipe@example.com');
});

test('GET /users lista usuários', async () => {
  const res = await request(app).get('/users');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThanOrEqual(1);
});

test('POST /users falha se email duplicado', async () => {
  await request(app).post('/users').send({ name: 'X', email: 'dup@example.com' });
  const res = await request(app).post('/users').send({ name: 'Y', email: 'dup@example.com' });
  expect(res.status).toBe(409);
});
