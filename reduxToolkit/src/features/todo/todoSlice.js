import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {editingTodoText: ''},
    {
      id: 1,
      text: "Hello Himanshu",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), text: action.payload };
      action.payload && +state.todos.push(todo)
    },
    removeTodo: (state, action) => {
      
        state.todos = state.todos.filter((todo) => todo.id != action.payload)
    },
    updateTodo: (state , action) => {
      console.log("todo deleted", action.payload)
      state.editingTodoText = action.payload.text
      console.log("editing todo text", state.editingTodoText)
        const updatedTodo = {
            id:action.payload.id,
            text : action.payload.text
        } 
        state.todos.map((prevTodo) => 
            prevTodo.id === action.payload.id ? prevTodo = updatedTodo : prevTodo )
    },
    completedTodo: (state, action) => {

    }
  },
});

// exporting individual actions 
export const {addTodo, removeTodo, updateTodo,completedTodo} = todoSlice.actions

export default todoSlice.reducer
