import './Complete.css'
import Header from "../components/Header.jsx";
import CompleteList from "../components/CompleteList.jsx";
import {useEffect, useState} from "react";
import apiService from "../service/apiService.js";

const getDateKey = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  return date.toISOString().split('T')[0];
};

const Complete = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await apiService.getCompletedTodos();
      setTodos(response.todoList);
    };
    fetchTodos();
  }, []);

  const sortedCompletedTodos = [...todos].sort((a, b) => {
    if (!a.completedAt || !b.completedAt) {
      return 0;
    }

    if (a.completedAt !== b.completedAt) {
      return b.completedAt - a.completedAt;
    }

    return a.order - b.order;
  });

  const groupedTodosByDate = sortedCompletedTodos.reduce((acc, todo) => {
    const dateKey = getDateKey(todo.completedAt);

    if (!dateKey) return acc;

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(todo);
    return acc;
  }, {});

  const sortedDateKeys = Object.keys(groupedTodosByDate).sort((a, b) => b.localeCompare(a));

  return (
      <div className={"Complete"}>
        <Header/>
        <div className={"CompleteWrapper"}>
          {sortedDateKeys.length > 0 ? (
              sortedDateKeys.map((dateKey) => (
                  <CompleteList
                      key={dateKey}
                      date={dateKey}
                      todos={groupedTodosByDate[dateKey]}
                  />
              ))
          ) : (
              <p className="no-completed-todos">완료된 할 일이 없습니다.</p>
          )}
        </div>
      </div>
  )
}
export default Complete