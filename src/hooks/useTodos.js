// hooks/useTodos.js
import { useQuery } from "@tanstack/react-query";
import apiService from "../service/apiService.js";

export const useTodos = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: apiService.getAllTodos,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError, error };
};