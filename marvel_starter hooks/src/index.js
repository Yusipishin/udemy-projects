import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import './style/style.scss';

//18 версия
ReactDOM
        .createRoot(document.getElementById('root'))
        .render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        )

//17я версия
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

