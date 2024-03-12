import express from 'express'
import controller from '../controller/cart.js'
const router = express.Router()

router
    .route('/')
            .get(controller.getCartItems)
            // .post(controller.addProduct)
         

// router
//     .route('/:id')
//             .delete(controller.deleteProduct )
//             .patch(controller.editProduct)
//             .get(controller.getProduct)

export default router