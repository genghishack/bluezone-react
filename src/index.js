import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from './redux/store/configureStore';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(<Provider store={store} ref={(inst) => exportRootReference(inst)}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

function exportRootReference(inst) {
  window.sMap = inst;
}
