import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './Redux/Reducers/indexReducer.js'
import './index.css'
import App from './App'

const store = configureStore({reducer:reducers})
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
