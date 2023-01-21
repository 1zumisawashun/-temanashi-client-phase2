import { Route, Switch, Redirect } from 'react-router-dom'
import styled from '@emotion/styled'
import { lazyImport } from '../functions/utilities'

const { Cart } = lazyImport(() => import('../pages/Cart'), 'Cart')
const { Complete } = lazyImport(
  () => import('../pages/StripeComplete'),
  'Complete'
)
const { Create } = lazyImport(() => import('../pages/Create'), 'Create')
const { Dashboard } = lazyImport(
  () => import('../pages/Dashboard'),
  'Dashboard'
)
const { Diagnose } = lazyImport(() => import('../pages/Diagnose'), 'Diagnose')
const { Error } = lazyImport(() => import('../pages/StripeError'), 'Error')
const { Login } = lazyImport(() => import('../pages/Login'), 'Login')
const { Product } = lazyImport(() => import('../pages/Product'), 'Product')
const { Signup } = lazyImport(() => import('../pages/Signup'), 'Signup')
const { User } = lazyImport(() => import('../pages/User'), 'User')
const { Component } = lazyImport(
  () => import('../pages/Component'),
  'Component'
)

const AppContainer = styled('div')`
  display: flex;
  min-height: 100vh;
`

export const AppRoute: React.VFC = () => {
  return (
    <AppContainer>
      <Switch>
        <Route path="/error" component={Error} />
        <Route path="/complete" component={Complete} />
        <Route exact path="/" component={Dashboard} />
        <Route path="/diagnose" component={Diagnose} />
        <Route path="/create/product" component={Create} />
        <Route path="/products/:id" component={Product} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/users/:id" component={User} />
        <Route path="/cart" component={Cart} />
        <Route path="/component" component={Component} />
        <Route path="*">
          <Redirect to="/error" />
        </Route>
      </Switch>
    </AppContainer>
  )
}
