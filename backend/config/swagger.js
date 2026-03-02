import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ProShop API",
      version: "1.0.0",
      description: "ProShop e-commerce API documentation",
    },
    servers: [
      {
        url: "/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            isAdmin: { type: "boolean" },
            token: { type: "string" },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            user: { type: "string" },
            name: { type: "string" },
            image: { type: "string" },
            brand: { type: "string" },
            category: { type: "string" },
            description: { type: "string" },
            reviews: {
              type: "array",
              items: { $ref: "#/components/schemas/Review" },
            },
            rating: { type: "number" },
            numReviews: { type: "number" },
            price: { type: "number" },
            countInStock: { type: "number" },
          },
        },
        Review: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            rating: { type: "number" },
            comment: { type: "string" },
            user: { type: "string" },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            user: { type: "string" },
            orderItems: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  qty: { type: "number" },
                  image: { type: "string" },
                  price: { type: "number" },
                  product: { type: "string" },
                },
              },
            },
            shippingAddress: {
              type: "object",
              properties: {
                address: { type: "string" },
                city: { type: "string" },
                postalcode: { type: "string" },
                country: { type: "string" },
              },
            },
            paymentMethod: { type: "string" },
            taxPrice: { type: "number" },
            shippingPrice: { type: "number" },
            totalPrice: { type: "number" },
            isPaid: { type: "boolean" },
            paidAt: { type: "string", format: "date-time" },
            isDelivered: { type: "boolean" },
            deliveredAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
