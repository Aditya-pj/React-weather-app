const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
    target: 'https://dataservice.accuweather.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // remove /api prefix when forwarding to target
    },
}));

app.listen(5000, () => {
    console.log('Proxy server is running on http://localhost:5000');
});
