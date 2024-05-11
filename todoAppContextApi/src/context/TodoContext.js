import { useContext, createContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id:1,
            todo: "Read 20 pages of 'Deep Work'",
            completed: false
        },
    ],
    addTodo: (todo) => {},
    updateTodo:(todo, id) => {},
    deleteTodo: (id) => {},
    completeTodo: (id) => {}
})

export const TodoProvider = TodoContext.Provider

export default function useTodo() {
    return useContext(TodoContext)
}