import React, { useState, useEffect } from 'react';
import './App.css';
//importing components
import Form from './components/Form';
import TodoList from './components/TodoList';


function App() {
  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setfFilterTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  //USE EFFECT
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos, status]);

  //Functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setfFilterTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setfFilterTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setfFilterTodos(todos);
        break;
    }
  };

  //Save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Alex's Todo List</h1>
      </header>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList 
        filteredTodos={filteredTodos} 
        setTodos={setTodos} 
        todos={todos} 
      />
    </div>
  );
}

export default App;
