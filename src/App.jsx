import React, { useState, useReducer, useEffect } from "react";
import Todos from "./Todos";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "remove":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

const init = () => {
  const saved = localStorage.getItem("myTodos");
  return saved ? JSON.parse(saved) : [];
};

export default function App() {
  const [todos, dispatch] = useReducer(reducer, [], init);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: "add", payload: text });
    setText("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yangi todo yozing"
        />
        <button type="submit">Qo‘shish</button>
      </form>

      <Todos todos={todos} dispatch={dispatch} />
    </div>
  );
}
