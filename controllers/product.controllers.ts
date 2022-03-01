import { Request, Response } from 'express';
import {Product} from '../models/product.models';

const test=(req: Request, res:Response)=>{
    res.send('Test controller is running!');
}

const getProduct = (req: Request, res: Response) => {
    const id={_id: req.params.id}
    Product.findOne(id)
    .then((result: any)=>{
        res.status(200).json(result);
    }).catch((err: any)=>{
        res.status(500).json({ "error" :  "Error in retrieving the product"});
    });
};

const getProducts= ( req: Request, res: Response )=> {
    Product.find().then((result: object)=>{
        res.send(result);
    }).catch((err: any)=>{
        res.status(500).send('Error in retrieving products')
    });
};


const createProduct = (req: Request, res: Response) => {

    const product={
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    }

    // console.log("asd" ,article);
    

    Product.create(product)
    .then( ( result : any ) => {
        res.status(201).json(product)
    })
    .catch( (err: any) => {
        res.status(400).json({"error": "Error in creating the product"});
    });
    
}

const updateProduct= (req: Request, res:Response)=>{
    const id={_id: req.params.id};
    Product.findOne(id).then((result: any)=>{
        if(!result){
            return res.status(400).json({"error": "Incorrect ID"});
        }
        else{
            const newProduct: Product= req.body as Product
            if(req.body.name) newProduct.name = req.body.name; 
            if(req.body.price) newProduct.price = req.body.price;
            if(req.body.quantity) newProduct.quantity = req.body.quantity;

            Product.updateOne({_id: id}, {$set: newProduct})
            .then((result: any)=>{
                res.status(200).json(result)
            })
            .catch((err: any)=>{
                res.status(500).send("Error in updating the product");
            })
                

    }



}).catch((err: any)=>{
    res.status(500).send("error in updating the product");
})
}

const deleteProduct= (req:Request, res:Response)=>{
    const id=req.params.id;

    Product.findOne({_id: id})
    .then((result: any)=>{
        if(!result){
            res.status(400).send("Failed to remove Product");
        }
        else{
            Product.deleteOne({_id: id})
            .then( (result: any)=>{
                res.status(200).json({result});
            })
            .catch((err: any)=>{
                res.status(500).send("Error in deleting the product");
            })
            

        }
    }).catch((err: any)=>{
        res.status(500).send("Error in deleting the product");
    })
    
}

export const productController={
    test,
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};



