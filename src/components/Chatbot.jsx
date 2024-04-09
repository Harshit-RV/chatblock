import { useState, useEffect } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import nlp from 'compromise';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



// const API_KEY= "AIzaSyCZK0cVfQTrS5YFQfS3rayg5v93djtqGRE"
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);




// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = "RULES TO FOLLOW: Explain things like you're talking to a customer as a chatbot for a blockchain app. You must talk to them like you're talking to a customer. You are the support chatbot here, so talk like one. Keep every single one of your responses to maximum of 150 words. If you need to explain something, break it into parts."

// const systemMessage = "We'll role play today: I will play the role of a customer and you will play as a support chatbot for a blockchain based finance app. Don't even tell me you're starting, just start. I have attached the chat history in this message, we'll continue the game from there. In case there is no history, Just introduce yourself and let's start the game. 3, 2, 1. I'm no more me. I'm a customer now and you are a chatbot."

function Chatbot() {
  const [ paymail, setPaymail ] = useState();
  const [ amount, setAmount ] = useState();
  const [ note, setNote ] = useState();
  const [ paymentMode, setPaymentMode ] = useState(false);
  const [ somethingWentWrongMsg, setSomethingWentWrongMsg ] = useState(false);
  const [ invalidCredentialMsg, setInvalidCredentialMsg ] = useState(false);
  const [ paySuccessMsg, setPaySuccessMsg ] = useState(false);
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      message: "Hello there! I'm your ChatBlock assistant, here to assist you with solving queries and carrying out tasks. Feel free to ask me anything or give me commands like 'send money', 'check my balance', 'check wallet balance', or 'transactions'. How can I assist you today?",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);


  useEffect(() => {
    setTimeout(() => {
      setSomethingWentWrongMsg(false);
    }, 5000);
  }, [somethingWentWrongMsg]);

  useEffect(() => {
    setTimeout(() => {
      setInvalidCredentialMsg(false);
    }, 5000);
  }, [invalidCredentialMsg]);

  useEffect(() => {
    if (paySuccessMsg == true) {
      setTimeout(() => {
          setPaySuccessMsg(false);
          setPaymentMode(false);
        }, 5000);
    }
  }, [paySuccessMsg]);


  // var values = [null, null, null];
  
  
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {

    const doc = nlp(message);
    console.log(doc);

    if(doc.match('send money').found){
       const userMessage = {
        message: message, 
        sender: "user"
      };

      setMessages([...messages, userMessage]);
      setIsTyping(true);
      sendMoney(messages);

      setPaymentMode(true) 
    }
      else if(doc.match('(check balance |check my balance)').found){

        const text = "I will redirect you to the page that checks your balance";
  
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
  
        setTimeout(()=>{
        navigate('/wallets');
        },4000);
  
  }
  
  else if(doc.match('(check wallet list |check wallet balance)').found){
  
    const text = "I will redirect you to the page that returns your wallet list";
  
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
  
    setTimeout(()=>{
    navigate('/wallets');
    },4000);
  
  }
  
  else if(doc.match('(transactions)').found){
  
    const text = "I will redirect you to the page that returns your previous transactions";
  
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
  
    setTimeout(()=>{
    navigate('/transactions');
    },4000);

  } else {
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
    }
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

  function sendMoney(){
    const text = "Give me the wallet ID and account number";
    console.log(text);

    const chatGPTReply = {
      message: text,
      sender: "ChatGPT"
    };
  
    setMessages(prevMessages => [...prevMessages, chatGPTReply]);

    setIsTyping(false);
  }

  const chatGPTMessageStyle = {
    // backgroundColor: '#e0e0e0',
    padding: '8px',
    borderRadius: '8px',
    marginBottom: '4px',
  };

  const userMessageStyle = {
    color: '#fff',
    padding: '8px',
    borderRadius: '8px',
    marginBottom: '4px',
  };


  const payByPaymail = async (paymail, amount, note) => {
    setSomethingWentWrongMsg(false)
    setInvalidCredentialMsg(false)
    const jwtKey = localStorage.getItem('jwt');
    try {
      const response = await axios.post('https://dev.neucron.io/v1/tx/spend', {
        outputs: [
          {
            address: paymail,
            amount: parseInt(amount),
            note: note
          }
        ]
      }, {
        headers: {
          'accept': 'application/json',
          'Authorization': jwtKey,
          'Content-Type': 'application/json'
        }
      })

      setPaySuccessMsg(true)

      console.log(response)
    } catch (error) {
        if (error.response.status == 400) {
            setInvalidCredentialMsg(true)
        } else {
            setSomethingWentWrongMsg(true)
        }
    }
  }

  return (
    <div className='h-[90vh] w-[88%] mt-5'>
        <MainContainer className='md:col-span-4 rounded-xl pt-5'>
          <div className='flex w-full flex-col-reverse w-relative'>

            <ChatContainer>
              <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="Chatbot is typing" /> : null}>
                {messages.map((message, i) => {
                  return <Message style={message.sender == "user" ? userMessageStyle : chatGPTMessageStyle}  key={i} model={message} sender={message.sender} />;
                })}
              </MessageList>
              <MessageInput placeholder="Type message here" onSend={handleSend} />
            </ChatContainer>
          {paymentMode == true ? <div className='w-full items-center flex flex-col'>
            <input onChange={(e) => setPaymail(e.target.value)} placeholder="luke@dev.neucron.io" required type="email" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
            <input onChange={(e) => setAmount(e.target.value)} placeholder="1000" required type="text" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>
            <input onChange={(e) => setNote(e.target.value)} placeholder="yoda-is-op" required type="text" id="first_name" className="w-80 my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"/>

            {somethingWentWrongMsg === true ? <div className="text-red-500 mt-2">Something went wrong. Please try again</div> : <p></p>}
            {invalidCredentialMsg === true ? <div className="text-red-500 mt-2">Please recheck the input</div> : <p></p>}
            {paySuccessMsg === true ? <div className="text-green-500 mt-2">Payment Successful. It will reflect in your account soon.</div> : <p></p>}
        

            <button type="button" onClick={() => payByPaymail(paymail, amount, note)} className=" w-60 py-2.5 px-5 mt-4 text-sm font-medium  rounded-lg border  focus:z-10 focus:ring-4 focus:ring-gray-100 bg-gray-800 text-white border-gray-600  hover:bg-gray-700">
            Pay
          </button>
          </div> : <div></div>}
          </div>

          </MainContainer>
      <div className='md:col-span-1'></div>
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