import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}


const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>(' ')
    const tasksItems = props.tasks.length
        ? props.tasks.map(task => {
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>

                </li>
            )
        })
        : <span>Tasks list is empty</span>
    const changeTitle = ((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value))
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const handlerCreator = (filter: FilterValueType) => {
        return () => props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={changeTitle}
                       onKeyDown={onKeyDownAddTask}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={handlerCreator('all')}>All</button>
                <button onClick={handlerCreator('active')}>Active</button>
                <button onClick={handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;