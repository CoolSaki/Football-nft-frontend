import React from 'react'
import MRoutes from '@navigation/routes'
import '@assets/css/global/Style.css'
import '@assets/css/global/Font.css'
import store from '@root/store/store'
import { Provider as ReduxProvider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <ReduxProvider store={store}>
        <MRoutes />
      </ReduxProvider>
    </div>
  )
}

export default App
