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
    this.getProducts()
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
    if (response.ok === true) {
      // we have response.ok — if it's true, that means the API call was success
      const fetchedData = await response.json() //  It converts the API response (which is in JSON format) into a JavaScript object so that you can use the data easily in your code.
      // whatever data we got from the backend will be in snake case; for frontend, we need it as camel case
      const updatedData = fetchedData.products.map(i => ({
        title: i.title,
        brand: i.brand,
        price: i.price,
        id: i.id,
        imageUrl: i.image_url,
        rating: i.rating,
      }))

      this.setState({productsList: updatedData})
    }
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
