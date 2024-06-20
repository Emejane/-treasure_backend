// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Treasure Caching Project',
      version: '1.0.0',
      description: 'Treasure Caching backend',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the user',
            },
            username: {
              type: 'string',
              description: 'The username of the user',
            },
            password: {
              type: 'string',
              description: 'The password of the user',
            },
          },
          example: {
            id: '60d21b4667d0d8992e610c85',
            username: 'johndoe',
            password: 'password123',
          },
        },
        NFT: {
          type: 'object',
          required: ['name', 'description', 'image'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the NFT',
            },
            name: {
              type: 'string',
              description: 'The name of the NFT',
            },
            description: {
              type: 'string',
              description: 'The description of the NFT',
            },
            image: {
              type: 'string',
              description: 'The image URL of the NFT',
            },
          },
          example: {
            id: '60d21b4667d0d8992e610c85',
            name: 'CryptoPunk',
            description: 'A unique digital asset on the Ethereum blockchain',
            image: 'https://example.com/image.png',
          },
        },
        Collection: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the collection',
            },
            name: {
              type: 'string',
              description: 'The name of the collection',
            },
            description: {
              type: 'string',
              description: 'The description of the collection',
            },
            image: {
              type: 'string',
              description: 'The image URL of the collection',
            },
          },
          example: {
            id: '60d21b4967d0d8992e610c87',
            name: 'Art Collection',
            description: 'A unique collection of digital art',
            image: 'https://example.com/image.png',
          },
        },
      },},
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
