import React from 'react'
import { useGlobalContext } from '../Context';
const TodoForm = () => {
    const { isEditing, currentTodo, setCurrentTodo, createTodo, cancelEdit, submitEdit} = useGlobalContext()
    return (
        <div className='todo-form-wrapper'>
            <input type="text" value={currentTodo} onChange={(e) => setCurrentTodo(e.target.value)} onKeyPress={(e) => {
                if (e.which === 13) {
                    createTodo()
                }
            }} />
            {
                isEditing ? <div className='btn-wrapper edit'>
                    <button onClick={()=>submitEdit()}>Update</button>
                    <button onClick={()=> cancelEdit()}>Cancel</button>
                </div>
                    :
                    <div className='btn-wrapper add'>
                        <button onClick={() => createTodo()} >Add</button>
                    </div>
            }
        </div>
    )
}

export default TodoForm