import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login Page/Login';
import ChatsPage from './Chats Page/ChatsPage';
import './App.css';

import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route path="/chats" element={<ChatsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
