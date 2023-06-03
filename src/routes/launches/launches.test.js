const request = require("supertest");
const app = require('../../app');
const { mongoConnect, mongoDisconnect  } = require("../../services/mongo");
const { loadPlanetsData } = require("../../models/planets.model");


describe('Testing launches API', ()=>{
  beforeAll(async ()=>{
    jest.setTimeout(10000);
    await mongoConnect();
    await loadPlanetsData();

  })

  afterAll(async()=>{
    await mongoDisconnect();
  })

  describe('Test GET /v1/launches',()=>{
    test('It should respond with 200 success', async ()=>{
      await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    })
  })

  describe('Test POST /v1/launches', ()=>{
    const launchDate = new Date('January 28, 2030');
    const data = {
      mission: 'USS Enterprice',
      target: 'Kepler-296 A f',
      rocket: 'Rocket',
      launchDate: 'January 28, 2030'
    }
    const dataWithoutDate = {
      mission: 'USS Enterprice',
      target: 'Kepler-296 A f',
      rocket: 'Rocket',
    }
    const dataWithInvalidDate = {
      mission: 'USS Enterprice',
      target: 'Kepler-296 A f',
      rocket: 'Rocket',
      launchDate: 'inodnf'

    }

    test('It should respond with 201 created', async ()=>{
      const response = await request(app)
        .post('/v1/launches')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(201);

      const responseLaunchDate = new Date(response.body.launchDate);
      expect(responseLaunchDate).toStrictEqual(launchDate);

      expect(response.body).toMatchObject(dataWithoutDate);
    })

    test('It should catch missing required properties', async ()=>{
      const response = await request(app)
        .post('/v1/launches')
        .send(dataWithoutDate)
        .expect(400);
      expect(response.body).toStrictEqual(
        {
          error: "Missing required launch property"
        }
      )
    })
    test('It should catch invalid dates', async ()=>{
      const response = await request(app)
        .post('/v1/launches')
        .send(dataWithInvalidDate)
        .expect(400);

      expect(response.body).toStrictEqual(
        {
          error: "Invalid launch date"
        }
      )
    })
  })
}
)

