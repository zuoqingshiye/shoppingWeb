import { ShoppingCart } from './shopping-cart';

export class Order{
    datePlaced: number;
    items: any[];
    shipping: {};

    constructor(public userId: string, shipping: any, cart:ShoppingCart ){
        this.datePlaced = new Date().getTime();
        this.shipping = shipping;

        this.items = cart.items.map(i=>{
            return{
              product:{
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity:i.quantity,
              totalPrice: i.totalPrice
            };
          })
    }
}