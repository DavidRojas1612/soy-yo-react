import React from 'react'
import logo from './logo.svg'
import './App.css'
import {soyYoApi} from './utils/'

function App() {
  const onceRun = React.useRef(false)
  const startConfig = async () => {
    const form = {
      entityId: '28',
      processType: 'ENR',
      documentType: 'CC',
      identificationNumber: '1152461323',
      phoneIndicative: '57',
      phoneNumber: '3023297769',
      email: 'david.elnrego+1@yopmail.com',
      appIdentifier: 'pocwompinuxt.vercel.app',
      channel: 'WEB_CLIENT',
    }
    await soyYoApi.onSubmit(form)
  }

  React.useEffect(() => {
    if (!onceRun.current) {
      console.log('props', soyYoApi)
      startConfig()
      onceRun.current = true
    }
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
