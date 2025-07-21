// Todos.jsx
import React from "react";
import "./App.css";

export default function Todos({ todos, dispatch }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li key={todo.id} style={{ marginBottom: "10px" }}>
          <span
            onClick={() => dispatch({ type: "toggle", payload: todo.id })}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => dispatch({ type: "remove", payload: todo.id })}>
            O‘chirish
          </button>
        </li>
      ))}
    </ul>
  );
}
