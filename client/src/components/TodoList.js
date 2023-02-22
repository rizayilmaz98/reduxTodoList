import {useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux";
import {selectFilterTodo,getTodosAsync,patchTodoAsync,deleteTodoAsync} from '../redux/todos/todosSlice';

function TodoList() {
  const dispatch = useDispatch();
  const filterTodos = useSelector(selectFilterTodo)
  useEffect(()=>{
    dispatch(getTodosAsync())
  },[dispatch])
  const isLoading = useSelector(state => state.todos.isLoading)
  const error = useSelector(state => state.todos.error);
  const handleDelete = async (id) => {
    if(window.confirm("Do you really want to delete ???")){
      await dispatch(deleteTodoAsync(id))
    }
  }
  const handlePatch = async (id,completed) => {
    await dispatch(patchTodoAsync({id,data:{completed}}))
  }
  if(error){
    return <div className='errorText'>Error : {error} !!!</div>
  }
  if(isLoading){
   return <div className='loadingText'>Loading Todo ...</div>
  }
  return (
    <ul className="todo-list">
        {
          filterTodos.map((item)=>{
           return <li key={item.id} className={item.completed===true ? "completed":""}>
              <div className="view">
                <input className="toggle" checked={item.completed} type="checkbox" onChange={()=>{handlePatch(item.id,!item.completed)}} />
                <label >{item.title}</label>
                <button className="destroy" onClick={()=>handleDelete(item.id)}></button>
              </div>
            </li>
          })
        }
      </ul>
  )
}

export default TodoList