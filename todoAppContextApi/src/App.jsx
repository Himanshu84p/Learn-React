import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";
function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    console.log("prev todos", todos);
    console.log("added todo", todo);
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((currTodo) => (currTodo.id === id ? todo : currTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((currTodo) => currTodo.id != id));
  };

  const completeTodo = (id) => {
    setTodos((prev) => 
      prev.map((currTodo) =>
        currTodo.id === id
          ? { ...currTodo, completed: !currTodo.completed }
          : currTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, completeTodo }}
    >
      <h1 className="bg-orange-500 text-white text-3xl p-4 rounded-t-lg cursor-default select-none">
        Today's Todo
      </h1>
      <div className="bg-[#172842] min-h-screen py-8 rounded-b-lg">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => {
              return (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
