import { useState, useEffect } from 'react';
import apiService from '../service/apiService';

const useCompletedTodos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await apiService.getCompletedTodos();
        setTodos(response.todoList);
      } catch (err) {
        setError(err); // 에러 발생 시 에러 상태 저장
        console.error("완료된 할 일 불러오기 실패:", err);
      }
    };
    fetchTodos();
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

  return { todos, error };
};

export default useCompletedTodos;