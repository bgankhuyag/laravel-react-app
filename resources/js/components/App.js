import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import TodoItem from "./TodoItem";
import '../../css/App.css';

function App() {
    const [input, setInput] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
      axios.get('/get')
      .then(function (response) {
          console.log(response.data);
          setItems(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }, []);

    function addItem(event) {
        setItems(prevData => {
            return [...prevData, input];
        });

        setInput("");
    }

    function removeItem(id) {
        setItems(prevData => {
            return prevData.filter((item, index) => {
                return index !== id;
            })
        });
    }

    function handleChange(event) {
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

    function handleClick(event) {
      const removeId = event.target.getAttribute('itemID');
      console.log(removeId);
      const url = '/remove/' + removeId;
      axios.post(url, {})
      .then(function (response) {
          console.log(response.data);
          setItems(items.filter(item => item.id != removeId));
      })
      .catch(function (error) {
          console.log(error);
      });
    };

    function handleNewEnter(event) {
      if (event.key !== 'Enter') {
        return false;
      }
      handleNew(event);
    }

    function handleNew(event) {
      if (input == "") {
        alert("Input cannot be empty");
        return false;
      }
      axios.post('/add', {
        todo: input,
      })
      .then(function (response) {
        document.getElementById("new_item").value = "";
        // console.log(response.data, " new");
        setItems([...items, {id: response.data, todo: input, complete: 0}]);
        setInput('');
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    function handleNewInput(event) {
      // setNewTodo(event.target.value);
      setInput(event.target.value);
      console.log(input);
    }

    function handleCheck(event) {
      const checkId = event.target.getAttribute('checkid');
      const url = '/complete/' + checkId;
      axios.post(url, {})
      .then(function (response) {
          console.log(response.data);
          setItems(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    return (
      <div className="todolist">
          <div className="heading">
              <h1 className="title">To-Do List</h1>
          </div>
              <input
                  placeholder="Add to ToDo list"
                  id="new_item"
                  type="text"
                  value={input}
                  onChange={handleNewInput}
                  onKeyPress={handleNewEnter}
              />
              <button onClick={handleNew}>Add</button>

          <div className="items">
                {items.map((item, index) => (
                  <div key={item.id}>
                    <input type="checkbox" className="checkbox" checkid={item.id} checked={item.complete} onChange={handleCheck} style={{float: 'left', width: 16, display: 'inline-block'}} />
                    {(item.complete) ? (<input className="complete" id={item.id} onChange={handleChange} defaultValue={item.todo} />) :
                      (<input className="incomplete" id={item.id} onChange={handleChange} defaultValue={item.todo} />)
                    }
                    <button onClick={handleClick} className="removeitem" itemID={item.id}>X</button>
                  </div>
                    // <TodoItem
                    //     key={index}
                    //     id={index}
                    //     item={item}
                    //     onCheck={removeItem}
                    // />
                ))}
          </div>
      </div>
    );
}

export default App;

if (document.getElementById('todos')) {
  ReactDOM.render(<App />, document.getElementById('todos'));
}
