import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodoAsync } from "../redux/todos/todosSlice";
function Form() {
  const [title,setTitle] = useState("");
  const dispatch = useDispatch();
  const addisLoading = useSelector(state => state.todos.addisLoading)
  const addError = useSelector(state => state.todos.addError)
  const handleSubmit = async (e) => {
    if(!title) return;
    e.preventDefault();
    await dispatch(setTodoAsync({title}));
    setTitle("")
  }
  if(addError !=null){
    alert(addError)
  }
  
  return (
    <form className="inputForm" onSubmit={handleSubmit}>
      <input
        className="new-todo"
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        placeholder="What needs to be done?"
        autoFocus
      />
      {addisLoading===true ? <span className="loader">
      </span> :""}
      
      
    </form>
  );
}

export default Form;
