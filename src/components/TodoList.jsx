import './TodoList.css'
import TodoItem from "./TodoItem.jsx";

const TodoList = ({todos}) => {

  return (
      <div className={"TodoList"}>
        {todos?.map((todo) => {
          return <TodoItem key={todo.id} todo={todo}/>
        })}
      </div>
  )
}

export default TodoList;