import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Home from '../Home'

const ProtectedRoute = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return <Route exact pacth="/" component={Home} />
}

export default ProtectedRoute
