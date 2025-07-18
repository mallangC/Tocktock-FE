import './TodoList.css'
import TodoItem from "./TodoItem.jsx";
import {ListContext} from "../util/ListContext.jsx";
import {useContext} from "react";

const TodoList = ({todos}) => {

  return (
      <div className={"TodoList"}>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo}/>
        })}
      </div>
  )
}

export default TodoList;