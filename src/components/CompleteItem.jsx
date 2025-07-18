import './CompleteItem.css'

const CompleteItem = ({todo}) => {

  return (
      <li className={"CompleteItem"}>
        <div className={"content"}>
          {todo.content}
        </div>
        <div className={"date"}>{new Date(todo.completedAt).toLocaleTimeString('ko-KR')}</div>
        {/*<button onClick={onDelete}>삭제</button>*/}
      </li>
  )
}
export default CompleteItem;