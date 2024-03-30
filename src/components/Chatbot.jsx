import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { GoogleGenerativeAI } from "@google/generative-ai";


const API_KEY= "AIzaSyCZK0cVfQTrS5YFQfS3rayg5v93djtqGRE"

const genAI = new GoogleGenerativeAI(API_KEY);


// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = "RULES TO FOLLOW: Explain things like you're talking to a customer as a chatbot for a blockchain app. You must talk to them like you're talking to a customer. You are the support chatbot here, so talk like one. Keep every single one of your responses to maximum of 150 words. If you need to explain something, break it into parts."

// const systemMessage = "We'll role play today: I will play the role of a customer and you will play as a support chatbot for a blockchain based finance app. Don't even tell me you're starting, just start. I have attached the chat history in this message, we'll continue the game from there. In case there is no history, Just introduce yourself and let's start the game. 3, 2, 1. I'm no more me. I'm a customer now and you are a chatbot."

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
    await processMessageToChatGPT(newMessages);
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

    const prompt = `${systemMessage} + ${chatMessages.length == 0 ? "no chat history" : `previous chat: ${apiMessages.toString()}`}`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    setMessages([...chatMessages, {
        message: text,
        sender: "user",
        direction: 'incoming'
      }]);
      setIsTyping(false);
  }

  const chatGPTMessageStyle = {
    backgroundColor: '#e0e0e0',
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
    <div style={{ position: "relative", height: "100vh" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="Chatbot is typing" /> : null}>
            {messages.map((message, i) => {
              return <Message  key={i} model={message} sender={message.sender} />;
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
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