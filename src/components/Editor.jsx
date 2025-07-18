import './Editor.css'
import getCustomDateString from "../util/getCustomDateString.js";
import {useRef, useState} from "react";
import apiService from "../service/apiService.js";

const Editor = ({onCreate}) => {

  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  }


  const onSubmit = async () => {
    if (content.trim() === "") {
      contentRef.current.focus();
      return;
    }
    const addedTodo = await apiService.addTodo(content.trim());
    onCreate(addedTodo);
    setContent("");
  }

  return (
      <div className={"EditorAll"}>
        <h1>{getCustomDateString(new Date())}</h1>
        <div className={"Editor"}>
          <input onKeyDown={onKeyDown} ref={contentRef} value={content} onChange={onChangeContent}
                 placeholder={"새로운 할 일을  적어주세요"}/>
          <button onClick={onSubmit}>추가</button>
        </div>
      </div>
  )
}

export default Editor;