# planets-project-api
The api is designed to serve planets application
The frontend https://github.com/Valeriya2022/planets-project-front-react.git

The api is published to
http://54.145.161.60:8000/v1/launches
http://54.145.161.60:8000/v1/planets

## NodeJs ExpressJs application 
### The project follows MVC architecture
### Tests are written in jest, supertest
### Database is stored in MongoDB with mongoose as object modeling tool

### Other libraries 
1) cors
2) csv-parse
3) morgan
4) pm2 
5) helmet
6) axios

To run the project in your terminal run
```npm install```, then,
add .env with your atlas MONGO_URL,
```npm start``` to run one instance or
```npm run cluster``` to run multiple instances of the application
