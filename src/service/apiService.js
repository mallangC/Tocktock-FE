import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.tock-tock.com";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.error('인증되지 않은 요청입니다. 로그인 상태를 확인하세요.');
            window.location.href = '/login';
        } else {
            console.error('API 요청 중 오류 발생:', error);
        }
        return Promise.reject(error)
    }
)

const apiService = {
    getProfile: async () => {
        const response = await api.get('/member/profile');
        return response.data;
    },

    getAllTodos: async () => {
        const response = await api.get('/todolist');
        return response.data;
    },

    getCompletedTodos: async () => {
        const response = await api.get('/todolist/complete');
        return response.data;
    },

    addTodo: async (content) => {
        const response = await api.post('/todolist', {content});
        return response.data;
    },

    updateTodoCheckbox: async ({id, isDone}) => {
        const response = await api.patch('/todolist/checkbox', {id, isDone});
        return response.data;
    },

    updateTodoContent: async ({id, content}) => {
        const response = await api.patch('/todolist/content', {id, content});
        return response.data;
    },

    updateTodoOrder: async ({draggedId, targetId}) => {
        const response = await api.patch('/todolist/order', {draggedId, targetId});
        return response.data;
    },

    deleteTodo: async (id) => {
        const response = await api.delete(`/todolist/${id}`);
        return response.data;
    },

    logout: async () => {
        await api.get(`/logout`);
    },

    deleteMember: async () => {
        await api.delete(`/member`);
    }
};

export default apiService;