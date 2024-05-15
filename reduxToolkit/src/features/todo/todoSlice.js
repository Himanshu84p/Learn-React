import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  editingTodoText: "",
  editingTodoId: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), text: action.payload, isCompleted: false };
      action.payload && state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload);
    },
    setInputField: (state, action) => {
      const { id, text } = action.payload;
      state.editingTodoText = text;
      state.editingTodoId = id;
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;

      const todoIndex = state.todos.findIndex((todo) => todo.id === id);

      // If the todo exists, update it immutably
      if (todoIndex !== -1) {
        state.todos[todoIndex] = { id, text };
      }
    },
    completedTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if(todo) {
        todo.isCompleted = !todo.isCompleted
      }
    },
  },
});

// exporting individual actions
export const { addTodo, removeTodo, updateTodo, completedTodo, setInputField } =
  todoSlice.actions;

export default todoSlice.reducer;
