import {useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import { changeFilterStatus,selectFilterStatus,selectTodos,allDeleteTodoAsync } from "../redux/todos/todosSlice";

function ContentFooter() {
  
  const items = useSelector(selectTodos)
  const activeTodoCount = items.filter(item => item.completed===false).length
  const filterStatus = useSelector(selectFilterStatus);
  useEffect(()=>{
    localStorage.setItem("filterStatus",filterStatus)
  },[filterStatus])
  const dispatch = useDispatch();
  const handleDeleteAll = () => {
    if(window.confirm("Are you serious ? ")){
      dispatch(allDeleteTodoAsync())
    }
    
  }
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong>
        item{activeTodoCount>1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a href="#/"className={filterStatus==="all" ?"selected":""} onClick={()=>dispatch(changeFilterStatus("all"))}>
            All
          </a>
        </li>
        <li>
          <a href="#/" className={filterStatus==="active" ?"selected":""} onClick={()=>dispatch(changeFilterStatus("active"))}>Active</a>
        </li>
        <li>
          <a href="#/" className={filterStatus==="completed" ?"selected":""} onClick={()=>dispatch(changeFilterStatus("completed"))}>Completed</a>
        </li>
      </ul>

      <button className="clear-completed" onClick={()=>handleDeleteAll()}>Clear completed</button>
    </footer>
  );
}

export default ContentFooter;
