import { createContext, useReducer } from "react";

interface Action {
  type: string;
  products: Array<Product>;
}
interface State {
  products: Array<Product>;
}
interface Product {
  id: string;
  name: string;
  random: number;
  image: string;
}
interface RandomContextInterface {
  products: Array<Product>;
  addProductWithRandom: (products: Array<Product>) => void;
}

export const RandomContext = createContext<RandomContextInterface>({
  products: [],
  addProductWithRandom: (products) => {},
});

const addProductWithRandom = (products: Array<Product>, state: State) => {
  // NOTE:2重でrandomの更新をしているのでここで追加しなくても良いかもしれない
  const results = products.map((product, index) => {
    return {
      ...product,
      random: index,
    };
  });
  return { ...state, products: results };
};

export const ADD_PRODUCT = "ADD_PRODUCT";

export const randomReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductWithRandom(action.products, state);
    default:
      return state;
  }
};

export const RandomContextProvider: React.VFC<
  React.PropsWithChildren<React.ReactNode>
> = (props) => {
  const [randomState, dispatch] = useReducer(randomReducer, { products: [] });
  const addProductWithRandom = (products: Array<Product>) => {
    dispatch({ type: ADD_PRODUCT, products: products });
  };

  return (
    <RandomContext.Provider
      value={{
        products: randomState.products,
        addProductWithRandom: addProductWithRandom,
      }}
    >
      {props.children}
    </RandomContext.Provider>
  );
};

export default RandomContextProvider;
