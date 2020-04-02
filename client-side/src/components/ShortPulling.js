import React, { useState, useEffect } from "react";
import axios from "axios";

const ShortPulling = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    setInterval(
      () =>
        axios.get("http://localhost:3000/messages").then(res => {
          setMessages(res.data);
        }),
      10 * 1000
    );
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/messages", {
        content: input,
        name
      })
      .then(() => {});
  };
  const handleChange = e => {
    const {
      target: { value }
    } = e;
    setInput(value);
  };
  const SetName = e => {
    const {
      target: { value }
    } = e;
    setName(value);
  };
  return (
    <div>
      <h1>Short Pulling</h1>
      <form id="form">
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={SetName}
          placeholder="name..."
        />
        <input
          id="content"
          type="text"
          name="content"
          onChange={handleChange}
          value={input}
          placeholder="message..."
        />
      </form>
      <button type="submit" onClick={handleSubmit}>
        Send
      </button>
      <div>
        {messages.map(m => (
          <div key={m.content}>
            <span>
              <p>
                {m.name}: {m.content}
              </p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortPulling;
