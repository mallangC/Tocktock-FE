import './Home.css'
import Header from "../components/Header.jsx";
import Editor from "../components/Editor.jsx";
import TodoList from "../components/TodoList.jsx";
import {ListContext} from "../util/ListContext.jsx";
import apiService from "../service/apiService.js";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useTodos} from "../hooks/useTodos.js";
import {useTodoDragAndDrop} from "../hooks/useTodoDragAndDrop.js";
import {useCreateTodo} from "../hooks/useCreateTodo.js";
import {useUpdateTodoCheckbox, useUpdateTodoContent} from "../hooks/useUpdateTodo.js";


const Home = () => {
  const queryClient = useQueryClient();

  const {
    data: todolist,
  } = useTodos();

  const deleteTodoMutation = useMutation({
    mutationFn: apiService.deleteTodo
  })

  const {onCreate} = useCreateTodo();
  const {onUpdateCheckbox} = useUpdateTodoCheckbox();
  const {onUpdateContent} = useUpdateTodoContent();

  const onDelete =  (targetId) => {
    deleteTodoMutation.mutate(targetId);
    const newTodolist = prevTodos => prevTodos.filter(todo => todo.id !== targetId);
    queryClient.setQueryData(['todos'], newTodolist);
  }

  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useTodoDragAndDrop();

  return (<ListContext.Provider
          value={[onUpdateCheckbox,
            onUpdateContent,
            onDelete,
            handleDragStart,
            handleDragOver,
            handleDrop,
            handleDragEnd]}>
        <div className={"Home"}>
          <Header/>
          <Editor onCreate={onCreate}/>
          <TodoList todos={todolist}/>
        </div>
      </ListContext.Provider>
  )
}
export default Home