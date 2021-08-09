import {Component} from 'react'
import './index.css'

class Cards extends Component {
  Toggle = () => {
    const {movies, toggle} = this.props
    const {uuid} = movies
    toggle(uuid)
  }

  render() {
    const {movies} = this.props
    const {uuid, genres} = movies
    const url = `https://ui-avatars.com/api/?name=${movies.title}&background=random`
    const description = `${movies.description}`.slice(0, 15)
    const title = `${movies.title}`.slice(0, 15)
    return (
      <div className="card" key={uuid}>
        <div className="flex">
          <img src={url} alt={movies.title} className="icon" />
          <p>{title}</p>
        </div>
        <p onClick={this.Toggle} className="description">
          Description : {description}
        </p>
        <p className="genres">Genres : {genres}</p>
      </div>
    )
  }
}

export default Cards
