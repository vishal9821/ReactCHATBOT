import React from 'react'
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';
import config from "./configs";
import MessageParser from "./Messageparser";
import ActionProvider from "./Actionprovider";
import './App.css'

var date = new Date;
date = date.getFullYear();

function App() {
  return (
    <div className="App">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      <footer className='footer'>
      <p> &copy; {date} <a href="https://vishal9821.github.io/vishal-aagwani/">Vishal Aagwani</a></p>
      </footer>
    </div>

)
}
export default App
