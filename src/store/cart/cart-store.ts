import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addToCart: (Product: CartProduct) => void;
  getTotalItems: () => number;
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
         
      }
    }),
    { name: "shopping-cart" }
  )
);
