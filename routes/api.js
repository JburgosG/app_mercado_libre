const { Router } = require('express');
const messages = require('../config/messages');
const { products, getProduct } = require('../controllers/search');

const router = Router();

/* Validate online service */
router.get('/', (request, response, next) => {  
    return response.status(200).json({
        code: 200,        
        message: messages.products.online
    });
});

router.get('/items', products);
router.get('/items/:id', getProduct);

module.exports = router;