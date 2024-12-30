import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addToCart: (Product: CartProduct) => void;
  getTotalItems: () => number;
  upDateQuanity: (product: CartProduct, quantity: number ) => void;
  deleteItem: (product:CartProduct ) => void
  clearCart: () => void
  summaryCart: () => {
    subTotal: number;
    tax: number;
    total: number;
    totalItems: number;
}
  //removeFromCart
  //clearCart
}

export const useCartStore = create<State>()(
  //Esto dará problemas con la rehidratacion de la app (En el carrito creo)
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product: CartProduct) => {
        const { cart } = get();

        //1 Revisar si el producto ya existe en el carrito
        const productInCar = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCar) {
          //Si no esta en el carrito lo añado
          set({ cart: [...cart, product] });
          return;
        }

        //2- Se que el producto existe por talla... tengo que incrementtarlo
        const updateProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });

        set({ cart: updateProduct });
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
         
      },

      upDateQuanity: (product: CartProduct, quantity: number) => {
        const { cart } = get()  
        const updateCart = cart.map((item) => {
          if(item.id === product.id && item.size === product.size && item.quantity + quantity <= 0) {
            return item
          }

          if(item.id === product.id && item.size === product.size){
            return {...item, quantity: item.quantity + quantity}
          }
          return item
        })
        set({ cart: updateCart })
      },

      deleteItem: (product: CartProduct) => {
        //! ERROR BORRA TODA LA MISMA TALLA
       const { cart } = get()
       const updatedCart = cart.filter((item) => item.id !== product.id || item.size !== product.size)

       set({ cart: updatedCart })
      },

      summaryCart: () => {
        const { cart } = get();

        const subTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        
        return { subTotal, tax, total, totalItems };
      },
      clearCart: () => {
        set({cart:[]})
      }
    }),
    { name: "shopping-cart" }
  )
);
