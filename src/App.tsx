import React from 'react'
import logo from './logo.svg'
import './App.css'
import {soyYoApi} from './utils/'

function App() {
  const startConfig = async () => {
    const form = {
      entityId: '28',
      processType: 'ENR',
      documentType: 'CC',
      identificationNumber: '1152461322',
      phoneIndicative: '57',
      phoneNumber: '3023297768',
      email: 'david.elnrego@yopmail.com',
      appIdentifier: 'pocwompinuxt.vercel.app',
      channel: 'WEB_CLIENT',
    }
    await soyYoApi.onSubmit(form)
  }

  React.useEffect(() => {
    console.log('props', soyYoApi)

    startConfig()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
