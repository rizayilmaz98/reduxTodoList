import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () =>{
    const res = await axios(`${process.env.REACT_APP_API_URL}/todos`);
    return res.data;
});
export const setTodoAsync = createAsyncThunk('todos/setTodoAsync',async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/todos`,data);
      return res.data;
});
export const patchTodoAsync = createAsyncThunk('todos/patchTodoAsync',async ({id,data}) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_URL}/todos/${id}`,data);
    return res.data;
});
export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async(id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`);
    return id;
})
export const allDeleteTodoAsync = createAsyncThunk('todos/allDeleteTodoAsync',async() => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/todos`);
    return res.data;
})

export const todosSlice = createSlice({
    name:'todos',
    initialState:{
        items:[],
        isLoading:false,
        error:null,
        filterStatus:localStorage.getItem("filterStatus"),
        addisLoading: false,
        addError: null
    },
    reducers:{
        changeFilterStatus : (state,action) => {
            state.filterStatus = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTodosAsync.pending,(state) => {
            state.isLoading=true
        });
        builder.addCase(getTodosAsync.fulfilled,(state,action) => {
            state.items = action.payload;
            state.isLoading =false
        });
        builder.addCase(getTodosAsync.rejected,(state,action) => {
            state.isLoading = false;
            state.error = action.error.message
        });
        builder.addCase(setTodoAsync.pending,(state) => {
            state.addisLoading=true;
        });
        builder.addCase(setTodoAsync.fulfilled,(state,action) => {
            state.items.push(action.payload)
            state.addisLoading= false;
        });
        builder.addCase(setTodoAsync.rejected,(state,action) => {
            state.addisLoading= false;
            state.addError = action.error.message
        });
        builder.addCase(patchTodoAsync.fulfilled,(state,action) => {
            const {id,completed}= action.payload;
            const index = state.items.findIndex(item => item.id ===id);
            state.items[index].completed=completed;
        });
        builder.addCase(deleteTodoAsync.fulfilled,(state,action) => {
            const id = action.payload;
            const index = state.items.findIndex(item => item.id ===id);
            state.items.splice(index,1);
        })
        builder.addCase(allDeleteTodoAsync.fulfilled,(state) => {
            const completed = state.items.filter(item => item.completed ===false);
            state.items = completed
        })
    }
})
export const selectTodos = (state) => state.todos.items;
export const selectFilterStatus = (state) => state.todos.filterStatus;
export const selectFilterTodo = (state) => {
    if(state.todos.filterStatus ==="all"){
        return state.todos.items;
      }
      else if(state.todos.filterStatus ==="active"){
        return state.todos.items.filter(item => item.completed===false)
      }
      else if(state.todos.filterStatus ==="completed"){
        return state.todos.items.filter(item => item.completed===true)
      }
}
export const {changeFilterStatus} = todosSlice.actions;
export default todosSlice.reducer;