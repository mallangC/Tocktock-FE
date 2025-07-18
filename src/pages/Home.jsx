import './Home.css'
import Header from "../components/Header.jsx";
import Editor from "../components/Editor.jsx";
import TodoList from "../components/TodoList.jsx";
import {useEffect, useState} from "react";
import {ListContext} from "../util/ListContext.jsx";
import apiService from "../service/apiService.js";
import {useAuth} from "../contexts/AuthContext.jsx";


const Home = () => {
  const [todos, setTodos] = useState([]);
  const { isLoggedIn, loadingAuth } = useAuth();

  useEffect(() => {
    if(!isLoggedIn && !loadingAuth) {
      console.log("로그인 후 서비스를 이용해주세요")
      window.location.href = '/login';
    }
    const fetchTodos = async () => {
      const response = await apiService.getAllTodos();
      setTodos(response);
    };
    fetchTodos();
  }, []);


  const onCreate = (response) => {
    const newTodo = {
      id: response.id,
      isDone: false,
      content: response.content,
      todoOrder: response.todoOrder,
      createdAt: response.createdAt,
    }

    const newTodos = todos.map(todo => {
      return {
        ...todo,
        todoOrder: todo.todoOrder + 1
      };
    });

    const tmpTodos = [newTodo, ...newTodos];
    setTodos(tmpTodos);
    console.log(tmpTodos)
  }

  const onUpdateCheckbox = async (targetId, isDone) => {
    const response = await apiService.updateTodoCheckbox(targetId, !isDone)
    setTodos(response);
    console.log(response);
  }


  const onUpdateContent = async (targetId, newContent) => {
    const response = await apiService.updateTodoContent(targetId, newContent);
    setTodos(response);
  }

  const onDelete = async (targetId) => {
    const response = await apiService.deleteTodo(targetId);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== targetId));
    console.log(response);
  }

//--------------------------------------------------------------------------------
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, todo) => {
    setDraggedItem(todo);
    console.log(todo.id);
    if (!todo) {
      console.log("Error: 'todo' is undefined in handleDragStart.");
      return;
    }
    e.dataTransfer.setData('text/plain', todo.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetTodo) => {
    e.preventDefault();

    if (!draggedItem) {
      return;
    }

    const response = await apiService.updateTodoOrder(draggedItem.id, targetTodo.id);

    setTodos(response);
    setDraggedItem(null); // 드래그 상태 초기화
  };

  const handleDragEnd = () => {
    setDraggedItem(null); // 드래그 끝났을 때 상태 초기화
  };

  return (<ListContext.Provider value={[onUpdateCheckbox, onUpdateContent, onDelete, handleDragStart, handleDragOver, handleDrop, handleDragEnd]}>
        <div className={"Home"}>
          <Header/>
          <Editor onCreate={onCreate}/>
          <TodoList todos={todos}/>
        </div>
      </ListContext.Provider>
  )
}
export default Home