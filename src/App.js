import React, {useState, useEffect} from 'react';
import "./App.css";
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useGlobalContext } from './Context';

const App = () => {
  const { todos,setTodos, getPreviousData, showAlert, alertMessage} = useGlobalContext()
  const[todo, setTodo] = useState("");
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    getPreviousData()
  }, [])
  

  const handleDelete = (id) =>{
    const delTodo = todos.filter((to)=> to.id !== id);
    setTodos([...delTodo])
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i)=> i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
        <p className= {`alertMessage ${!showAlert ? 'hide' : ''}`}>
          {alertMessage}
        </p>
      <div className='container'>
        <h1>ToDo List App</h1>
          <TodoForm />
          <TodoList 
          todos={todos} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App
