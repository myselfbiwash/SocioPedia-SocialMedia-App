import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './components/state/store'; // import your store and persistor
import App from './App';

const root = document.getElementById('root');
const appRoot = ReactDOM.createRoot(root);

appRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById('root')): This line is using the createRoot method from the ReactDOM library to create a root React 
// component attached to the HTML element with the id 'root'. This is typically a <div> element in your HTML file.
//  .render(): This method is used to render a React element into the root DOM node. In other words, it's where your React app starts and where it 
//  will be inserted in the DOM.
//  <React.StrictMode>: This is a wrapper component that checks for potential problems in the app during development. It does not render 
//   any visible UI. It activates additional checks and warnings for its descendants.
//  <App />: This is the main component of your React application. All other components will likely be descendants of this component.
//  So, in summary, this code is creating a root React component, and rendering your <App /> component inside of it, with additional checks and 
//  warnings activated by <React.StrictMode>