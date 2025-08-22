import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//Note from Martha: Retrieves the DOM element with the ID of 'root', where the React application will be mounted.
// Note from Martha: initializes a new root for rendering, rendering it to specify.
ReactDOM.createRoot(document.getElementById('root')).render(
  // Note from Martha: helping developers to find early issues in the app.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
