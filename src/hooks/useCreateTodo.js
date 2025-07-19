import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "../service/apiService.js";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: apiService.addTodo,
    onSuccess: (createdTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos) => {
        const currentTodos = oldTodos || [];

        const newTodos = currentTodos.map(todo => {
          return {
            ...todo,
            todoOrder: todo.todoOrder + 1
          };
        });
        return [createdTodo, ...newTodos];
      });
    },
    onError: (error) => {
      console.error("투두 생성 실패:", error);
      alert('투두 생성에 실패했습니다.');
    }
  });

  const onCreate = (content) => {
    createTodoMutation.mutate(content);
  };

  return { onCreate, ...createTodoMutation };
};