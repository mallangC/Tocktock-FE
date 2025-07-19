import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "../service/apiService.js";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: apiService.deleteTodo,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['todos'], (oldTodos) => {
        const currentTodos = oldTodos || [];
        return currentTodos.filter(todo => todo.id !== deletedId);
      });
    },
    onError: (error) => {
      console.error("투두 삭제 실패:", error);
      alert('투두 삭제에 실패했습니다.');
    }
  });

  const onDelete = (targetId) => {
    deleteTodoMutation.mutate(targetId);
  };

  return { onDelete, ...deleteTodoMutation };
};