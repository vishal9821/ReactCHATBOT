import React from 'react'
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';
import config from "./configs";
import MessageParser from "./Messageparser";
import ActionProvider from "./Actionprovider";
import './App.css'


function App() {
  return (
    <div className="App">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      <footer></footer>
    </div>
)
}
export default App
