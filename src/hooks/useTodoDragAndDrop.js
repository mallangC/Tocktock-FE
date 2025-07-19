import { useState } from 'react';
import { useUpdateTodoOrder } from './useUpdateTodo.js';

export const useTodoDragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const { updateTodoOrderMutation } = useUpdateTodoOrder();

  const handleDragStart = (e, todo) => {
    setDraggedItem(todo);
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

    if (!draggedItem || !targetTodo) {
      return;
    }

    // 같은 아이템 위에 드롭하는 경우 제외
    if (draggedItem.id === targetTodo.id) {
      setDraggedItem(null);
      return;
    }

    updateTodoOrderMutation.mutate({ draggedId: draggedItem.id, targetId: targetTodo.id });
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  };
};