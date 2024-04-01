import {inc, dec, rnd} from '../actions'
import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  // useSelector автоматически получает state
  const counter = useSelector(state => state.counter)
  // useDispatch даёт возможноость использовать dispatch
  // Если собираешься передавать действие ниже по иерархии, то используй useCallback
  const dispatch = useDispatch();

  return (
    <div className="jumbotron">
      <h1>{counter}</h1>
      {/* Повторение так и оставлять, т.к. повторение кода минимально */}
      <button onClick={() => dispatch(dec())} className="btn btn-primary">DEC</button>
      <button onClick={() => dispatch(inc())} className="btn btn-primary">INC</button>
      <button onClick={() => dispatch(rnd())} className="btn btn-primary">RND</button>
    </div>
  )
}

export default Counter

// это селектор в редакса. Это ф-ия, которая 
//    получает кусочек store и даёт эту информацию компоненту
// const mapStateToProps = (state: stateType) => {
//   return {
//     counter: state.value
//   }
// }

// export default connect(mapStateToProps, actions)(Counter);