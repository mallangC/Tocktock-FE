import './TodoItem.css'
import {ListContext} from "../util/ListContext.jsx";
import {useContext, useState} from "react";

const TodoItem = ({todo}) => {
  const [onUpdateCheckbox, onUpdateContent, onDelete, handleDragStart, handleDragOver, handleDrop, handleDragEnd] = useContext(ListContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(todo.content);

  const onChangeCheckbox = () => {
    onUpdateCheckbox(todo.id, todo.isDone);
  }
  const onClickDeleteButton = () => {
    onDelete(todo.id)
  }
  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  }
  const onChangeEditedContent = (e) => {
    setEditedContent(e.target.value);
  }
  const onBlurEditedContent = () => {
    if (editedContent.trim() === "") {
      alert("내용을 입력해주세요");
      setEditedContent(todo.content);
      setIsEditing(false);
      return;
    } else if (editedContent !== todo.content) {
      onUpdateContent(todo.id, editedContent);
    }
    setIsEditing(false);
  }
  const onKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      onBlurEditedContent();
    }
  }


  return (
      <li className={"TodoItem"}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, todo)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, todo)}
          onDragEnd={handleDragEnd}>
        <input onChange={onChangeCheckbox} checked={todo.isDone} type={"checkbox"}/>
        {isEditing ? (
                <input
                    type={"text"}
                    value={editedContent}
                    onChange={onChangeEditedContent}
                    onBlur={onBlurEditedContent}
                    onKeyDown={onKeyDownEnter}
                    className={"content_input"}
                    autoFocus
                />
            ) :
            (
                <div className={`content content_${todo.isDone}`} onClick={toggleIsEditing}>{todo.content}</div>
            )}
        <div className={"date"}>{new Date(todo.createdAt).toLocaleDateString()}</div>
        <button onClick={onClickDeleteButton}>삭제</button>
      </li>
  )
}

export default TodoItem;