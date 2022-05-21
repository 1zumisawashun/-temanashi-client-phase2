import { createContext, useReducer } from "react";

interface Action {
  type: string;
  product?: Product;
  productId?: string;
}
interface State {
  cart: Array<Product>;
}
interface Product {
  id: string;
  title: string;
  price: number;
  priceIndex: string;
  quantity?: number;
  image: string;
}
interface CartContextInterface {
  cart: Array<Product>;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
  countUpProduct: (productId: string) => void;
  countDownProduct: (productId: string) => void;
}

export const CartContext = createContext<CartContextInterface>({
  cart: [],
  addProductToCart: (product) => {},
  removeProductFromCart: (productId) => {},
  countUpProduct: (productId) => {},
  countDownProduct: (productId) => {},
});

const addProductToCart = (product: Product, state: State) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );
  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    if (updatedItem.quantity) {
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }
  }
  return { ...state, cart: updatedCart };
};

const countUpProduct = (productId: string, state: State) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );
  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  if (updatedItem.quantity) {
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const countDownProduct = (productId: string, state: State) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );
  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  if (updatedItem.quantity) {
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }
  }
  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId: string, state: State) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );
  updatedCart.splice(updatedItemIndex, 1);
  return { ...state, cart: updatedCart };
};

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const COUNT_UP_PRODUCT = "COUNT_UP_PRODUCT";
export const COUNT_DOWN_PRODUCT = "COUNT_DOWN_PRODUCT";

export const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product as Product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId as string, state);
    case COUNT_UP_PRODUCT:
      return countUpProduct(action.productId as string, state);
    case COUNT_DOWN_PRODUCT:
      return countDownProduct(action.productId as string, state);
    default:
      return state;
  }
};

export const CartContextProvider = (props: any) => {
  const [cartState, dispatch] = useReducer(cartReducer, { cart: [] });
  const addProductToCart = (product: Product) => {
    setTimeout(() => {
      dispatch({ type: "ADD_PRODUCT", product: product }); // actionはdispatchの引数を指している;
    }, 300);
  };
  const countUpProduct = (productId: string) => {
    setTimeout(() => {
      dispatch({ type: COUNT_UP_PRODUCT, productId: productId });
    }, 300);
  };
  const countDownProduct = (productId: string) => {
    setTimeout(() => {
      dispatch({ type: COUNT_DOWN_PRODUCT, productId: productId });
    }, 300);
  };
  const removeProductFromCart = (productId: string) => {
    setTimeout(() => {
      dispatch({ type: REMOVE_PRODUCT, productId: productId });
    }, 300);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartState.cart,
        addProductToCart: addProductToCart,
        countUpProduct: countUpProduct,
        countDownProduct: countDownProduct,
        removeProductFromCart: removeProductFromCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
