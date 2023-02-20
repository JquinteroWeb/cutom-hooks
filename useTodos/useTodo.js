
import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const initialState = [];

const init = () => {
    return JSON.parse(localStorage.getItem('todo') || []);
}
export const useTodo = () => {

    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todos) || []);
    }, [todos]);

    const handleNewTodo = (todo) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        }
        dispatchTodo(action);
    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: 'Delete Todo',
            payload: id
        }
        dispatchTodo(action)
    };
    const handleToggleTodo = (id) => {
        console.log(id);
        const action = {
            type: 'Toggle Todo',
            payload: id
        }
        dispatchTodo(action)
    };
    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todoCount:todos.length,
        pendingTodoCount:todos.filter(todo => !todo.done).length
    }
}

