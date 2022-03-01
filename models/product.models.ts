import { ObjectId } from "mongodb";
import { model, Schema, Model, Document } from 'mongoose';

/*export default class Product {
    constructor(public name: string, public price: number, public quantity: number, public id?: ObjectId) {}

    get selling_price(){
        return this.price*this.quantity;
    }
} */

export interface Product extends Document {
  name: string;
  price: number;
  quantity: number;
}

const Productschema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
})


export const Product: Model<Product> = model('Product', Productschema);



        

    

