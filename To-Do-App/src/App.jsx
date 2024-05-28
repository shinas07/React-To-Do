import { useState } from 'react';
import { useEffect } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';


function App(){
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos){
      try{
        return JSON.parse(savedTodos);
      }catch(e){
        localStorage.removeItem("todos");
      }
    }
    return [];
  });
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");


// Save to-dos to localStorage whenever 'todos' state changes
    useEffect(() =>{
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

  function handleSubmit(e){
    e.preventDefault()
    if (newItem.trim() === ""){
      setMessage("Pleace enter an item before adding.")
      return;
    }
    setTodos((currentTodos) => {
      return [
       {id:crypto.randomUUID(), title:newItem, completed:false},
           ...currentTodos,
      ]
    }
    )
    setNewItem("");
    setMessage("");
  }

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo =>{
        if (todo.id === id){
          return { ...todo, completed}
        }

        return todo
      })
    })
  }


  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todos => todos.id !== id)
    })
  }

  function startEditing(id, title) {
    setEditingId(id);
    setEditedTitle(title);
  }

  function handleEdit(id) {
    if(editedTitle.trim() === ""){
      setMessage("Pleace enter an item before adding.")
      return;
    }
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: editedTitle } : todo
      )
    );
    setEditingId(null);
    setEditedTitle("");
    setMessage("");
  }



  return (
    <>
      <h1 className="app-heading">To-do List Manager</h1>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          ></input>
        </div>
        <button className="btn">Add</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h1 className="header">To-do List</h1>

      <ul className="list">
        {todos.filter((todo) => !todo.completed).map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={() => handleEdit(todo.id)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleEdit(todo.id);
                  }}
                />
                <button
                  onClick={() => handleEdit(todo.id)}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <label className={todo.completed ? "completed" : ""}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) =>
                      toggleTodo(todo.id, e.target.checked)
                    }
                  />
                  {todo.title}
                </label>
                <button
                  onClick={() => startEditing(todo.id, todo.title)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}

          {todos.filter((todo) => todo.completed).map((todo) => (
            <li key={todo.id}>
              {editingId === todo.id ? (
                <>
                  <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={() => handleEdit(todo.id)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleEdit(todo.id);
                    }}
                  />
                  <button
                    onClick={() => handleEdit(todo.id)}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <label className={todo.completed ? "completed" : ""}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={(e) =>
                        toggleTodo(todo.id, e.target.checked)
                      }
                    />
                    {todo.title}
                  </label>
                  <button
                    onClick={() => startEditing(todo.id, todo.title)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
        ))}
      </ul>

    </>
  );
}

export default App
