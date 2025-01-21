class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message)
      if(message == ""){
        this.actionProvider.emptymessagehandler();
      }else{ 
        this.actionProvider.responsehandler(message);
      }
    }
  }
  
  export default MessageParser;