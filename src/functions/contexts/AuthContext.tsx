import { createContext, useReducer, useEffect, useMemo } from 'react'
import { firebase, projectAuth } from '../libs/firebase'

interface Action {
  type: string
  payload: firebase.User | null
}
interface State {
  user: firebase.User | null
  authIsReady?: boolean
}
interface AuthContextInterface {
  dispatch: (value: Action) => void // dispatch: React.Dispatch<Action>;
  user: firebase.User | null
  authIsReady?: boolean
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
)

export const authReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider: React.VFC<
  React.PropsWithChildren<React.ReactNode>
> = (props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({
        type: 'AUTH_IS_READY',
        payload: user
      })
      unsub()
    })
  }, [])

  /**
   * react/jsx-no-constructed-context-values;
   * 上記のリントでメモ化が必須になっている
   */
  const userValue = useMemo(
    () => ({
      ...state,
      dispatch
    }),
    [state]
  )

  const { children } = props
  return (
    <AuthContext.Provider value={userValue}>{children}</AuthContext.Provider>
  )
}
