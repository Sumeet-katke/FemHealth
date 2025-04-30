// src/Landing/JSX/ChatBotSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../CSS/ChatBotSection.module.css';

const ChatBotSection = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');

    // Simulate bot response after user message
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: "Thanks for your query! We'll assist you shortly." }
      ]);
    }, 1000);
  };

  return (
    <motion.div 
      className={styles.chatContainer}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.heading}>FemHealth Assistant 🤖</h2>
      
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'bot' ? styles.botMessage : styles.userMessage}>
            {msg.text}
          </div>
        ))}
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