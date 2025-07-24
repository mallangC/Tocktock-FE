import './CompleteItem.css'

const CompleteItem = ({todo}) => {
const options = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
}

  return (
      <li className={"CompleteItem"}>
        <div className={"content"}>
          {todo.content}
        </div>
        <div className={"date"}>{new Date(todo.completedAt).toLocaleTimeString('ko-KR',options)}</div>
      </li>
  )
}
export default CompleteItem;