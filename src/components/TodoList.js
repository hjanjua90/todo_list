import React, {useState} from 'react';
import { useGlobalContext } from '../Context';
import {HiPencil} from 'react-icons/hi';
import {BsFillTrashFill} from 'react-icons/bs';
import {AiFillStar,AiOutlineStar} from 'react-icons/ai';

const TodoList = ({ todos}) => {
    const {enableEdit, handleDelete, impTodo} = useGlobalContext()
    const [isAll, setisAll] = useState (true);

    const filterData = (val) => {
        if (val.value === "all") {
            setisAll(true)
        }else {
            setisAll(false)
        }
    }
    return (
        <>
        <select  className ='dropDown' onChange={(e)=>filterData(e.target)}>
            <option value="all"> All </option>
            <option value="Important">Important</option>
        </select>
        <ul className='allTodos'>
            {
                todos.map((ele,index) => (
                    <li className={`singleTodo ${!isAll && !ele.isImp ? 'hide' : ""}`} data-imp={ele.isImp} key={index}><span className='todoText'>{ele.name}</span>
                        <button onClick={()=>impTodo(ele.id)}>
                            {
                                ele.isImp ? <AiFillStar/> : <AiOutlineStar/>
                            }
                        </button>
                        <button className='editBtn' onClick={() => enableEdit(ele.id)}><HiPencil/></button>
                        <button className='deleteBtn' onClick={() => handleDelete(ele.id)}>< BsFillTrashFill/></button>
                    </li>
                ))
            }
        </ul>
        </>
        
    )
}

export default TodoList