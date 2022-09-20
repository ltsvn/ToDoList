import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (filter: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeToDoListTitle: (title: string, todoListId: string) => void
}


const TodoList = (props: TodoListPropsType) => {

    const tasksItems = props.tasks.length
        ? props.tasks.map(task => {
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
            return (
                <li key={task.id} className={task.isDone ? "isDone" : ""}>
                    <input type="checkbox" checked={task.isDone} onChange={(e) =>
                        props.changeStatus(task.id, e.currentTarget.checked, props.todoListId)}
                    />
                    {/*<span>{task.title}</span>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <button onClick={() => props.removeTask(task.id, props.todoListId)}>x</button>

                </li>
            )
        })
        : <span>Tasks list is empty</span>


    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    const handlerCreator = (filter: FilterValueType, todoListId: string) => {
        return () => props.changeFilter(filter, todoListId)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeToDoListTitle(title, props.todoListId)
    }

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={() => props.removeTodoList(props.todoListId)}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator('all', props.todoListId)}>All
                </button>
                <button className={props.filter === 'active' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator('active', props.todoListId)}>Active
                </button>
                <button className={props.filter === 'completed' ? 'btn-active btn' : 'btn'}
                        onClick={handlerCreator('completed', props.todoListId)}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;