import { createContext, useReducer, useMemo } from 'react'
import { ProductItem } from '../../@types/dashboard'

interface Action {
  type: string
  products: Array<ProductItem>
}
interface State {
  products: Array<ProductItem>
}

interface RandomContextInterface {
  products: Array<ProductItem>
  addProductWithRandom: (products: Array<ProductItem>) => void
}

export const RandomContext = createContext<RandomContextInterface>({
  products: [],
  addProductWithRandom: (products) => {}
})

const addProductWithRandom = (products: Array<ProductItem>, state: State) => {
  // NOTE:2重でrandomの更新をしているのでここで追加しなくても良いかもしれない
  const results = products.map((product, index) => {
    return {
      ...product,
      random: index
    }
  })
  return { ...state, products: results }
}

export const ADD_PRODUCT = 'ADD_PRODUCT'

export const randomReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductWithRandom(action.products, state)
    default:
      return state
  }
}

export const RandomContextProvider: React.VFC<
  React.PropsWithChildren<React.ReactNode>
> = (props) => {
  const [randomState, dispatch] = useReducer(randomReducer, { products: [] })
  const addProductWithRandom = (products: Array<ProductItem>) => {
    dispatch({ type: ADD_PRODUCT, products })
  }

  const randomValue = useMemo(
    () => ({
      products: randomState.products,
      addProductWithRandom
    }),
    [randomState]
  )

  const { children } = props

  return (
    <RandomContext.Provider value={randomValue}>
      {children}
    </RandomContext.Provider>
  )
}
