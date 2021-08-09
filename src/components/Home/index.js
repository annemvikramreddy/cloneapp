import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'
import Header from '../Header'
import Cards from '../Cards'
import './index.css'

class Home extends Component {
  state = {
    movies: [],
    count: 1,
    searchText: '',
    loader: false,
    modal: false,
    Data: '',
  }

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

  toggle = uuid => {
    const {movies} = this.state
    console.log(uuid)
    const filteredData = movies.filter(each => each.uuid === uuid)

    this.setState(prevState => ({
      modal: !prevState.modal,
      Data: filteredData,
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
    const {movies, count, searchText, loader, modal, Data} = this.state

    if (modal === true) {
      const {title, description, genres} = Data[0]
      this.title = title
      this.description = description
      this.genres = genres
    }

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
          {searchResults.map(each => (
            <Cards toggle={this.toggle} movies={each} key={each.uuid} />
          ))}
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
        {modal && (
          <div className="modal">
            <div className="overlay">
              <div className="modal-content">
                <h1 className="head">{this.title}</h1>
                <p>{this.description}</p>
                <p>{this.genres}</p>
                <button
                  type="button"
                  className="close-modal"
                  onClick={this.toggle}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Home
