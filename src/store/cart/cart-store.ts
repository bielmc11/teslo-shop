import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";

interface State{
    cart: CartProduct[]
    addTocart?: (Product: CartProduct) => void
    //removeFromCart
    //clearCart
}

export const useCartStore = create<State>(
    
    (set, get) =>({

    cart: [],

    addTocart: (product : CartProduct) => {
        const { cart } = get()

        //1 Revisar si el producto ya existe en el carrito
        const productInCar = cart.some(item => item.id === product.id && item.size === product.size)

        if(!productInCar){ //Si no esta en el carrito lo añado 
            set({cart: [...cart, product]})
            return
        }

        //2- Se que el producto existe por talla... tengo que incrementtarlo
        const updateProduct = cart.map((item) =>{
            if(item.id === product.id && item.size === product.size){
                return {...item, quantity: item.quantity + 1}
            }
            return item
        })

        set({cart: updateProduct})
    }
}))