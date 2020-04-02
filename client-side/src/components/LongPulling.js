import React, { useState, useEffect } from "react";
import axios from "axios";

const id = Math.ceil(Math.random() * 100000);

const LongPulling = props => {
  const [messages, setMassages] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  const subscribe = messages => {
    axios.post(`http://localhost:3000/subscribers`, { id }).then(res => {
      setMassages(messages.concat(res.data));
      subscribe(messages.concat(res.data));
    });
  };

  useEffect(() => {
    subscribe(messages);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/subscribers/message", {
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
      <h1>Long Pulling</h1>
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

export default LongPulling;
