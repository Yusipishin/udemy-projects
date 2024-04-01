import {Component, useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';


// class Slider extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }

//     componentDidMount() {
//       document.title = `Slide: ${this.state.slide}`
//     }

//     componentDidUpdate() {
//       document.title = `Slide: ${this.state.slide}`
//     }

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }





const countTotal = (num) => {
  console.log('counting...')
  return num + 10
}

const Slider = (props) => {

  const [slide, setSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(false)

  const getSomeImages = useCallback(() => {
    console.log('fetching')
    return [
      'https://i.pinimg.com/originals/8a/a7/83/8aa7831e22f8d5c74aecfe0c0e6953e3.jpg',
      'https://w.forfun.com/fetch/dd/dd1e9dd0f6f574a32280a8e21fe7c4c6.jpeg'
    ]
  }, [slide])

  useEffect(() => {
    document.title = `Slide: ${slide}`
  }, [slide])

  function changeSlide(i) {
    setSlide(slide => slide + i) //передаём колбек ф-ию если новое состояние зависит от старого
  }

  function toggleAutoplay() {
    setAutoplay(autoplay => !autoplay)
  }

  const total = useMemo(() => {
    return countTotal(slide)
  }, [slide])

  const style = useMemo(() => ({
    color: slide > 4 ? 'red': 'black'
  }), [slide])

  useEffect(() => {
    console.log('styles!')
  }, [style])

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <Slide getSomeImages={getSomeImages}/>
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Count of slides: {total}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    setImages(getSomeImages())
  }, [getSomeImages])

  return (
    <>
      {images.map((url,i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
    </>
  )
}

function App() {
  const [slider, setSlider] = useState(true)

  return (
    <>
        <button onClick={() => setSlider(false)}>Click!</button>
        {slider ? <Slider/>:null}
    </>
  );
}

export default App;