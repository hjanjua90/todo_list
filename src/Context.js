import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState('');
  const [editId, setEditId] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

  const UpdateLocalStorage = (obj) => {
    let items = JSON.parse(localStorage.getItem("tasks"));
    if (items) {
      items.push(obj);
      localStorage.setItem("tasks", JSON.stringify(items));
    } else {
      localStorage.setItem("tasks", JSON.stringify([obj]));
    }
  };
  const getPreviousData = () => {
    let items = JSON.parse(localStorage.getItem("tasks"));
    if (items) {
      setTodos(items);
    }
  };
  const showAlertMessage = (msg) => {
    setShowAlert(true);
    setAlertMessage(msg);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }
  const createTodo = () => {
    let isTodoExist = todos.find((ele)=>{
      return ele.name === currentTodo
    })
    if (isTodoExist ) {
      showAlertMessage('todo already exist')
      return false;
    }
    if (!currentTodo){
      showAlertMessage("Please enter a value")
      return false;
    }
    let obj = {
      id: new Date(),
      name: currentTodo,
      isImp: false,
    }
    setTodos((prev) => {
      return [...prev, obj]
    })
    setCurrentTodo("");
    UpdateLocalStorage(obj);
  };

  const impTodo = (id) =>{
    let prevState = todos.find((ele) => ele.id === id);
    let updatedTodo = todos.map((el) => {
      if (el.id === prevState.id) {
        return { ...el, isImp: !prevState.isImp };
      }
      return el;
    });
    setTodos(updatedTodo);
    localStorage.setItem("tasks", JSON.stringify(updatedTodo));
  }

  const handleDelete = (id) =>{
    const delTodo = todos.filter((to)=> to.id !== id);
    setTodos([...delTodo]);
    localStorage.setItem("tasks", JSON.stringify(delTodo));
    cancelEdit();
  };
  const enableEdit = (id) =>{
    setIsEditing(true);
    setEditId(id)
    let obj = todos.find((to)=> to.id === id);
    setCurrentTodo(obj.name);
  };
  const cancelEdit = () =>{
    setIsEditing(false);
    setCurrentTodo("");
    setEditId("");
  };
  const submitEdit = () => {
    let removeEditTask = todos.filter((ele) => ele.id !== editId);
    let isExist = removeEditTask.find((ele) => ele.task === currentTodo);
    if (isExist) {
      showAlertMessage("Task exists");
      return false;
    };

    const updatedTodo = todos.map((el) => {
      if (el.id === editId) {
        return { ...el, name: currentTodo };
      }
      return el;
    });
    setTodos(updatedTodo)
    localStorage.setItem("tasks", JSON.stringify(updatedTodo));
  }


  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
        isEditing,
        setIsEditing,
        currentTodo,
        setCurrentTodo,
        createTodo,
        UpdateLocalStorage,
        getPreviousData,
        handleDelete,
        enableEdit,
        cancelEdit,
        submitEdit,
        impTodo,
        showAlert,
        alertMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };