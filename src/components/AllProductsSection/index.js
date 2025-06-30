import {Component} from 'react'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
  }

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

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
