import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiService from "../service/apiService.js";

export const useUpdateTodoCheckbox = () => {
  const queryClient = useQueryClient();

  const updateTodoCheckboxMutation = useMutation({
    mutationFn: apiService.updateTodoCheckbox,
    onSuccess: (updatedTodoList) => {
      queryClient.setQueryData(['todos'], updatedTodoList);
    },
    onError: (error) => {
      console.error("체크박스 업데이트 실패:", error);
      alert('체크박스 업데이트에 실패했습니다.');
    }
  });

  const onUpdateCheckbox = (targetId, isDone) => {
    updateTodoCheckboxMutation.mutate({id: targetId, isDone: !isDone});
  };

  return { onUpdateCheckbox, ...updateTodoCheckboxMutation };
};

export const useUpdateTodoContent = () => {
  const queryClient = useQueryClient();

  const updateTodoContentMutation = useMutation({
    mutationFn: apiService.updateTodoContent,
    onSuccess: (updatedTodoList) => {
      queryClient.setQueryData(['todos'], updatedTodoList);
    },
    onError: (error) => {
      console.error("투두 내용 업데이트 실패:", error);
      alert('투두 내용 업데이트에 실패했습니다.');
    }
  });

  const onUpdateContent = (targetId, newContent) => {
    updateTodoContentMutation.mutate({id: targetId, content: newContent});
  };

  return { onUpdateContent, ...updateTodoContentMutation };
};

export const useUpdateTodoOrder = () => {
  const queryClient = useQueryClient();

  const updateTodoOrderMutation = useMutation({
    mutationFn: apiService.updateTodoOrder,
    onSuccess: (updatedTodoList) => {
      queryClient.setQueryData(['todos'], updatedTodoList);
    },
    onError: (error) => {
      console.error("투두 순서 업데이트 실패:", error);
      alert('투두 순서 업데이트에 실패했습니다.');
    }
  });

  return { updateTodoOrderMutation }; // mutate 함수와 상태 객체만 반환하여 드래그 앤 드롭 훅에서 사용
};