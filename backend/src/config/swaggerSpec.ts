import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Apply App API',
            version: '1.0.0',
        },
        components: {
            schemas: {
                ApplyForm: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
