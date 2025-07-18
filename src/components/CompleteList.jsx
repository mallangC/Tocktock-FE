import './CompleteList.css'
import CompleteItem from "./CompleteItem.jsx";

const CompleteList = ({date, todos}) => {
  return (<div className={"CompleteList"}>
        <h4>{date}</h4>
        {todos.map(todo =>
            <CompleteItem key={todo.id} todo={todo}/>)}
      </div>

  )
}

export default CompleteList