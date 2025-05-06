import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import styles from '../CSS/ChatBotSection.module.css';
import { useFemHealth } from '../../../../contexts/FemHealthContext';

const ChatBotSection = () => {
  const { isAuthenticated, accessToken, refreshToken, email, password } = useFemHealth();
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! How can I assist you today?' }]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Ensure the WebSocket URL includes the token as a query parameter
    const socketUrl = `ws://localhost:8000/ws/chatbot/?token=${accessToken}`; // Use the accessToken here

    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      const fullText = Array.isArray(data.message) ? data.message[0] : data.message;

      setIsTyping(true);

      let currentText = '';
      for (let i = 0; i < fullText.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20)); // typing speed
        currentText += fullText[i];
        setMessages(prev => [...prev.slice(0, -1), { sender: 'bot', text: currentText }]);
      }

      setIsTyping(false);
    };

    socketRef.current.onopen = () => console.log('Connected to chatbot WebSocket');
    socketRef.current.onerror = (error) => console.error('WebSocket error:', error);
    socketRef.current.onclose = () => console.log('WebSocket connection closed');

    return () => {
      socketRef.current.close();
    };
  }, [accessToken]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const message = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: message }, { sender: 'bot', text: '' }]);
    socketRef.current.send(JSON.stringify({ message }));
    setInput('');
  };

  return (
    <motion.div className={styles.chatContainer} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <h2 className={styles.heading}>FemHealth Assistant 🤖</h2>

      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${msg.sender === 'bot' ? styles.botMessage : styles.userMessage} ${
              isTyping && msg.sender === 'bot' && idx === messages.length - 1 ? styles.typing : ''
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}

        {isTyping && (
          <div className={`${styles.botMessage} ${styles.typing}`}>
            <div className={styles.typingIndicator}>
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Ask me anything about your health..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.sendButton}>Send</button>
      </div>
    </motion.div>
  );
};

export default ChatBotSection;