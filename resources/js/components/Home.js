import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios.get('/get')
    .then(function (response) {
        console.log(response.data);
        setTodos(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
  }, []);

  const handleChange = (event) => {
    if (event.target.value == "") {
      alert("Item cannot be empty");
      return false;
    }
    const id = event.target.getAttribute('id');
    const url = '/edit/' + id;
    axios.post(url, {
        todo: event.target.value,
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  const handleClick = (event) => {
    const removeId = event.target.getAttribute('todoid');
    console.log(removeId);
    const url = '/remove/' + removeId;
    axios.post(url, {})
    .then(function (response) {
        console.log(response.data);
        setTodos(todos.filter(todo => todo.id != removeId));
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  const handleNew = (event) => {
    if (newTodo == "") {
      alert("Input cannot be empty");
      return false;
    }
    axios.post('/add', {
      todo: newTodo,
    })
    .then(function (response) {
      document.getElementById("setTodo").value = "";
      // console.log(response.data, " new");
      setTodos([...todos, {id: response.data, todo: newTodo}]);
      setNewTodo('');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleNewInput = (event) => {
    setNewTodo(event.target.value);
  }

  const todosDiv = todos.map(todo => (
    <div key={todo.id}>
      <input className="todo" id={todo.id} onChange={handleChange} defaultValue={todo.todo} />
      <button onClick={handleClick} className="removeTodo" todoid={todo.id}>Remove</button>
    </div>
  ));

  return (
    <div>
      <input className="newTodo" id="setTodo" placeholder="Add to ToDo list" onChange={handleNewInput} />
      <button type="submit" className="addTodo" onClick={handleNew}>Add</button>
     {todosDiv}
    </div>
  );
}

export default Todo;

// if (document.getElementById('todos')) {
//   ReactDOM.render(<Todo />, document.getElementById('todos'));
// }
