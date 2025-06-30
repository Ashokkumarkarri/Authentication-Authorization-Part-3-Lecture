
# ✅ Commit 1: Router Switch

## 1. Router Switch

The `Switch` component can have any React component inside it:

- `Route`
- User-defined Component
- `Redirect`

Till now we only put `Route` inside `Switch`, but we can also put other components inside it.

---

### ✅ User-defined Component inside Switch

```js
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)
export default App
```

- We can also write it like below. The switch will go line by line, and if nothing matches, it will render `<NotFound />`.

```js
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/cart" component={Cart} />
      <NotFound />
    </Switch>
  </BrowserRouter>
)
// here the  <NotFound />  is a user-defined component, we can place user-defined components like this inside Switch
export default App
```

> 🔁 But for best practice, we write the NotFound component like this: `<Route component={NotFound} />`

---

### ✅ Redirect inside Switch

```js
// First we need to import "Redirect" component from 'react-router-dom' 
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom' 

<Route exact path="/not-found" component={NotFound} />
<Redirect to="/not-found" /> 
```

- The switch will check each route line by line.
- If nothing matches, it will render the last one, which is the redirect.

```js
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)
export default App
```

📦 In the next commit, we will continue with our E-commerce App.

---

