import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const ENDPOINT = "http://127.0.0.1:8080/gs-guide-websocket";

function App() {

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    //https://medium.com/practo-engineering/websockets-in-react-the-component-way-368730334eef
    const socket = SockJS(ENDPOINT);
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/greetings', (data) => {
        console.log(data);
      });
    });
    setStompClient(stompClient);
  }, []);

  return (
    <div> 
      <a href='#' onClick={() => {
        stompClient.send('/app/hello', {}, JSON.stringify({
          name: 'hi'
        }))
      }}>Send message</a>
    </div>
  )

}

export default App;