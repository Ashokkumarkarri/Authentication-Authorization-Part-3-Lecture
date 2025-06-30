
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


# ✅ Commit 2: Redirection Logic

## 🔁 Redirection Logic
- If user is not authenticated and trying to access Home route, redirect to Login route.
- If user did not log in and tries to access Products or Cart routes, we also want to redirect to Login route.

We already wrote the logic in the Home component to check whether the user is authenticated. If not, we redirected them to the Login page. Here's how we did it:

```js
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const Home = () => {
  const jwt = Cookies.get('jwt_token')
  if (jwt === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
          <img
          ...
          ...
          ...
          ..
```

Now we need to write the same logic for Products, Cart, etc.  
👉 Instead of copying the same logic again and again, we use a concept called **"Wrapper Component"**.

---

## 🔐 Wrapper Component

Redirection logic can be reused by creating a reusable component.  
This is called a **Wrapper Component** — it wraps around a route and handles common logic.

### ✅ Protected Route

`ProtectedRoute` is our wrapper component. It will handle the authentication check and return the route component only if the user is logged in.

📄 File: `src/components/ProtectedRoute/index.js`

For now, focus only on the logic. Later, we’ll make it reusable for all routes.

```js
// File: ./components/ProtectedRoute/index.js

import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Home from '../Home'

const ProtectedRoute = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return <Route exact path="/" component={Home} />
}

export default ProtectedRoute
```

---

### 🔗 Using ProtectedRoute in App

```js
// File: App.js

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute' // imported ProtectedRoute
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute />                                    // this is what we added 
      <Route exact path="/products" component={Products} />
      <Route exact path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
```

✅ When it comes to the Home route, the `ProtectedRoute` will check whether the user is authenticated. If not, it will redirect to the Login page, if user is authenticated it will redirect to home route.

For now, just focus on understanding the logic. In the next commit, we’ll make this reusable for other routes like Products and Cart.

📦 In the next commit, we will make this `Wrapper Component` reusable for rest of  the routes.

---

# ✅ Commit 3: Reusable Wrapper Component

In this commit, we will make our wrapper component reusable for all the routes like Home, Products, and Cart.

---

## 🛠️ Old `ProtectedRoute` (Not Reusable)

In the old version, `ProtectedRoute` was hardcoded to only protect the Home route.

```js
// Old ProtectedRoute
import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Home from '../Home'

const ProtectedRoute = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return <Route exact path="/" component={Home} />
}

export default ProtectedRoute
```

This is not reusable because the route (`/`) and the component (`Home`) are hardcoded inside.

---

## 🔁 New `ProtectedRoute` (Reusable)

In the new version, we pass props like `path`, `component`, and `exact` from `App.js` to make this component reusable.

```js
// New ProtectedRoute
import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}

export default ProtectedRoute
```

With `{...props}`, we are spreading all the props (like `path`, `exact`, and `component`) into the `<Route />`.

---

## 🧾 App.js

### ❌ Old Code (Before Using Reusable `ProtectedRoute`)

```js
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute />
      <Route exact path="/products" component={Products} />
      <Route exact path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
```

Only Home was protected and that too without passing any route info.

---

### ✅ New Code (Reusable `ProtectedRoute` Used Everywhere)

Now we pass the route path and component as props to the `ProtectedRoute`.  
This allows it to work for multiple routes like `/`, `/products`, and `/cart`.

```js
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/products" component={Products} />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
```

✅ Now `ProtectedRoute` can be reused for all routes that need protection!

📦 In the next commit: we will integrate more API's to our app

---
# ✅ Commit 4: Implementing APIs

In Amazon, we have exclusive **Prime Deals** which are only for *Prime users*,  
whereas **All Products** are for both *Prime* and *Non-Prime* users.

---

## We have two APIs:
1. **Get Products**: This API gives all the products (visible to both Prime and Non-Prime users).
2. **Get Exclusive Prime Deals**: Only for Prime users.

---

### Now let’s work with **Get Products API** first:

We will do an HTTP request with `GET` method to the following URL:

https://apis.ccbp.in/products



From this API, we will get a list of all the product details.

---

### Who can access this API?
✅ Both Prime and Non-Prime users who are authenticated (logged in) can access the `Get Products API`.

❌ This API is only available to authenticated users.  
So how does the API know whether the user is authenticated?

🔐 Answer: By using the **JWT Token**.

---

### 🔐 JWT in API Request

The client (our app) must send the JWT token in the **Authorization header** while making API requests.

Format of the header should be:
Authorization: Bearer jwt_token



---

## 🧩 File Structure

We have a file called:
AllProductsSection/index.js



This file already has the prefilled product UI code.

✅ Now all we need to do is:
- Call the API
- Integrate the data into the UI

---

## ✅ Where to call the API?

We call the API inside the `componentDidMount()` method because it's a lifecycle method in React Class Component.

### Code:
```js
componentDidMount() {
  // componentDidMount is a life cycle method
  this.getProducts(0)
}

getProducts = async () => {
  const apiUrl = 'https://apis.ccbp.in/products'
  const jwtToken = Cookies.get('jwt_token')
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }
  const response = await fetch(apiUrl, options)
  console.log(response)
}
In the next commit, we will render the data we received from the API to the UI.


```


in the next commit we will render the data to Ui 

---

# ✅ Commit 5: Updating to UI

In this commit, we will update the **UI with the actual data** from the API.

When we get data from the API, it comes in **snake_case**.  
But in the frontend (React), we prefer using **camelCase**.

So first, we will convert the data from snake_case to camelCase,  
then we will update the component state with that formatted data.

---

### ✅ Example Code:

```js
if (response.ok === true) {
  // response.ok — if it's true, that means the API call was successful
  const fetchedData = await response.json()
  // It converts the API response (which is in JSON format) into a JavaScript object
  // so that you can use the data easily in your code.

  // The data we get from the backend will be in snake_case;
  // for the frontend, we need it as camelCase
  const updatedData = fetchedData.products.map(i => ({
    title: i.title,
    brand: i.brand,
    price: i.price,
    id: i.id,
    imageUrl: i.image_url,
    rating: i.rating,
  }))

  // Now we update the component's state with this formatted data
  this.setState({productsList: updatedData})
}

```

---