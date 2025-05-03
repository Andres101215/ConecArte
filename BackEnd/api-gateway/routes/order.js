const { createProxyMiddleware } = require('http-proxy-middleware');
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;

module.exports = (app) => {
  app.use('/api/facturaciones', createProxyMiddleware({
    target: ORDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/facturaciones': '' }
  }));
};
