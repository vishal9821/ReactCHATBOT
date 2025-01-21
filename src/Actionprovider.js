class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage,
   ) 
   {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
   }
     
   emptymessagehandler = ()=>{
          const message = this.createChatBotMessage("Please provide some input so that i can process it !");
          this.setchatbotmessage(message)
     }

     setchatbotmessage = (message) =>{
         this.setState(state=>({...state,messages:[...state.messages,message]}))
     }

     responsehandler = async (usermessage)=>{
      try{
        const options = {
             method:'POST',
             body:JSON.stringify({data:usermessage}),
             headers:{
              'Content-Type':'application/json'
             }
        }
        const response = await fetch('http://localhost:3000/gemini',options)
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const botmessage =  await response.json();
        this.setchatbotmessage(this.createChatBotMessage(botmessage.responseServer));
      }catch(error){
          console.error("Error in responsehandler:", error);
          const message = this.createChatBotMessage("Somthing went wrong Please Try Again Later!");
          this.setchatbotmessage(message)
        }
      }
     }
 
 export default ActionProvider;