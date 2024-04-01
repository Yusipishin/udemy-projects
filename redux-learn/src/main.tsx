// Чистые функции

//Должны возвращать одни и те же значения при одних и тех же входных данных
//Не должны вызывать внутри себя какие-либо побочные эффекты (в том числе и console.log !)
//Входящие параметры не должны быть модифицированы.

//Connect быстрее useSelector

import React from 'react'
import ReactDOM from 'react-dom/client'
import reducer from './reducer'

import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux'

import './index.css'

import App from './Components/App'

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)

// всё происходит с помощью Provider
// update()
// subscribe(update);