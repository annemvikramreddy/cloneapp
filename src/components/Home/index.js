import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {movies: [], count: 1, searchText: '', loader: false}

  componentDidMount() {
    this.MoviesAPI()
  }

  Increase = () => {
    const {count} = this.state
    if (count < 10) {
      this.setState(PrevState => ({count: PrevState.count + 1}), this.MoviesAPI)
    }
  }

  Decrease = () => {
    const {count} = this.state
    if (count >= 2) {
      this.setState(PrevState => ({count: PrevState.count - 1}), this.MoviesAPI)
    }
  }

  MoviesAPI = async () => {
    const {count} = this.state
    this.setState({
      loader: true,
    })
    const Token = localStorage.getItem('Token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Token ${Token}`,
      },
    }
    const response = await fetch(
      `https://demo.credy.in/api/v1/maya/movies/?page=${count}`,
      options,
    )
    const data = await response.json()
    console.log(data)
    const updatedData = data.results.map(each => ({
      uuid: each.uuid,
      description: each.description,
      title: each.title,
      genres: each.genres,
    }))

    console.log(updatedData)
    this.setState({movies: updatedData, loader: false})
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  change = event => {
    this.setState({searchText: event.target.value})
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {movies, count, searchText, loader} = this.state
    const searchResults = movies.filter(each =>
      each.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    return loader ? (
      this.renderLoader()
    ) : (
      <div className="background">
        <Header />
        <h1 className="head">Movies Cards</h1>
        <div className="search-bar">
          <input type="text" onChange={this.change} />
        </div>
        <div className="home-container">
          {searchResults.map(each => {
            const url = `https://ui-avatars.com/api/?name=${each.title}&background=random`
            const description = `${each.description}`.slice(0, 15)
            const title = `${each.title}`.slice(0, 15)
            console.log(description)
            return (
              <div className="card" key={each.uuid}>
                <div className="flex">
                  <img src={url} alt={each.title} className="icon" />
                  <p>{title}</p>
                </div>
                <p className="description">Description : {description}</p>
                <p className="genres">Genres : {each.genres}</p>
              </div>
            )
          })}
        </div>
        <div className="page-content">
          <button
            type="button"
            className="button-pagination"
            onClick={this.Decrease}
          >
            <FaLessThan />
          </button>
          <p>{count} of 10 </p>
          <button
            type="button"
            className="button-pagination"
            onClick={this.Increase}
          >
            <FaGreaterThan />
          </button>
        </div>
      </div>
    )
  }
}

export default Home
