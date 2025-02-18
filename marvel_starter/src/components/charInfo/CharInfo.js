import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import PropTypes from 'prop-types';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.updateChar()
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar()
    }
  }

  componentDidCatch(err, info) {
    console.log(err, info)
    this.setState({
      error: true
    })
  }

  updateChar = () => {
    const {charId} = this.props
    if (!charId) {
      return
    }

    this.onCharLoading()
    this.marvelService.getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    })
  }

  onCharLoading = () => {
    this.setState({
      loading: true,
      error: false,
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  render() {
    const {char, loading, error} = this.state

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
      <div className="char__info">
          {skeleton}
          {errorMessage}
          {spinner}
          {content}
      </div>
    )
  }
}

const View = ({char}) => {
  const {name, description, thumbnail, homepage, wiki, comics} = char
  let imgStyle = {'objectFit': 'cover'}
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = {"objectFit": 'contain'}
  }

  return (
    <>
      <div className="char__basics">
          <img style={imgStyle} src={thumbnail} alt={name}/>
          <div>
              <div className="char__info-name">{name}</div>
              <div className="char__btns">
                  <a href={homepage} className="button button__main">
                      <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                      <div className="inner">Wiki</div>
                  </a>
              </div>
          </div>
      </div>
      <div className="char__descr">
          {description}
      </div>
      <div className="char__comics">{comics.length > 0 ? 'Comics:': 'Comics not found'}</div>
      <ul className="char__comics-list">
          {
            comics.map((item, i) => {
              if (i < 10) {
                return (
                  <li key = {i} className="char__comics-item">
                      {item.name}
                  </li>
                )
              }
            })
          }
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo;