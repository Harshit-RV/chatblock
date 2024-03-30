import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import nlp from 'compromise';



const API_KEY= "AIzaSyCZK0cVfQTrS5YFQfS3rayg5v93djtqGRE"

const genAI = new GoogleGenerativeAI(API_KEY);




// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = "STRICT RULES TO FOLLOW: Explain things like you're talking to a customer as a chatbot for a blockchain app. Read the chat thoroughly and respond to the latest question. You must talk to them like you're talking to a customer."

function Chatbot() {

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {

    const doc = nlp(message);
    console.log(doc);

   

    if(doc.match('send money').found){
       const text = "Give me the wallet ID";

       



       console.log(text);
       const userMessage = {
        message: message, 
        sender: "user"
      };


      
      
      setMessages([...messages, userMessage]);
      
      
      setIsTyping(true);
      
      
      //running backend api
      setTimeout(() => {
        const chatGPTReply = {
          message: text,
          sender: "ChatGPT"
        };
      
        setMessages(prevMessages => [...prevMessages, chatGPTReply]);
      
        setIsTyping(false);
      }, 1000);

     }
    

    else if(doc.match('(thank you sir|thanks sir)').found){

      const text = "You're welcome";
console.log(text);

const userMessage = {
  message: message, 
  sender: "user"
};


setMessages([...messages, userMessage]);


setIsTyping(true);


//running backend api
setTimeout(() => {
  const chatGPTReply = {
    message: text,
    sender: "ChatGPT"
  };

  setMessages(prevMessages => [...prevMessages, chatGPTReply]);

  setIsTyping(false);
}, 1000); }



    else {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);}
  };

  async function processMessageToChatGPT(chatMessages) {

    console.log('starting starting')
   
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    console.log(apiMessages.toString)



    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = systemMessage + apiMessages.toString()
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    setMessages([...chatMessages, {
        message: text,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);



    
  }



  

  

  const chatGPTMessageStyle = {
    // backgroundColor: '#e0e0e0',
    padding: '8px',
    borderRadius: '8px',
    marginBottom: '8px',
  };

  const userMessageStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px',
    borderRadius: '8px',
    marginBottom: '8px',
  };

 
 

  return (
    <div className="App">
    <div className='h-[95vh] grid md:grid-cols-6 mt-5'>
      <div className='md:col-span-1'></div>
    <MainContainer className='md:col-span-4 rounded-xl'>
        <ChatContainer>
          <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
            {messages.map((message, i) => {
              if (message.sender === "ChatGPT") {
                
                return <Message style={chatGPTMessageStyle} key={i} model={message} sender={message.sender} />;
              } else {
                // Render user's messages differently
                return <Message style= {userMessageStyle} key={i} model={message} sender={message.sender} />;
              }
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
      <div className='md:col-span-1'></div>
    </div>
  </div>
  )
}

export default Chatbot



    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    // const apiRequestBody = {
    //   "model": "gpt-3.5-turbo",
    //   "messages": [
    //     systemMessage,  // The system message DEFINES the logic of our chatGPT
    //     ...apiMessages // The messages from our chat with ChatGPT
    //   ]
    // }

    // await fetch("https://api.openai.com/v1/chat/completions", 
    // {
    //   method: "POST",
    //   headers: {
    //     "Authorization": "Bearer " + API_KEY,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(apiRequestBody)
    // }).then((data) => {
    //   return data.json();
    // }).then((data) => {
    //   console.log(data);
    //   setMessages([...chatMessages, {
    //     message: data.choices[0].message.content,
    //     sender: "ChatGPT"
    //   }]);
    //   setIsTyping(false);
    // });