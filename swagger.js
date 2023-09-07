// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie API',
      version: '1.0.0',
      description: 'API documentation for Movies',
    },
  },
  apis: ['./routes/movieRoutes.js','./routes/genreRoutes.js'], // Đường dẫn tới các tệp route của bạn
};


const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
