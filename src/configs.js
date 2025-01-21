import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [createChatBotMessage(`Hi! i'm Jarvis , How can i assist you Today!`)],
  botName:"Jarvis",
  customStyles: {
    botMessageBox: {
      backgroundColor: "orangered"
    },
    chatButton: {
      backgroundColor: 'orangered'
    }
  }
};

export default config;