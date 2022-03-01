import express from 'express';

import {productController} from '../controllers/product.controllers';

export const router= express.Router();




    router.get('/test', productController.test);
    router.get('/allproducts', productController.getProducts);
    router.get('/:id', productController.getProduct);
    router.post('/create', productController.createProduct);
    router.put('/:id/update', productController.updateProduct);
    router.delete('/:id/delete', productController.deleteProduct);


