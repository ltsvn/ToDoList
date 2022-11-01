import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, FormControlLabel, IconButton, List, ListItem} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import {Task} from "./Task";

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


const TodoList = memo((props: TodoListPropsType) => {
    console.log('TodoList')

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const handlerCreator = (filter: FilterValueType, todoListId: string) => {
        return () => props.changeFilter(filter, todoListId)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeToDoListTitle(title, props.todoListId)
    }

    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }

    const tasksItems = props.tasks.length ? tasksForTodolist.map(task => <Task key={task.id} changeStatus={} task={}
                                                                               removeTask={} changeTaskTitle={}/>) :
        <span>Tasks list is empty</span>


    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton color='primary'
                            onClick={() => props.removeTodoList(props.todoListId)}><HighlightOffIcon/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksItems}
            </List>
            <ButtonGroup variant='contained' size='small' disableElevation>
                <Button
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    // className={props.filter === 'all' ? 'btn-active btn' : 'btn'}
                    onClick={handlerCreator('all', props.todoListId)}>All
                </Button>
                <Button
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    //className={props.filter === 'active' ? 'btn-active btn' : 'btn'}
                    onClick={handlerCreator('active', props.todoListId)}>Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    //className={props.filter === 'completed' ? 'btn-active btn' : 'btn'}
                    onClick={handlerCreator('completed', props.todoListId)}>Completed
                </Button>
            </ButtonGroup>
        </div>
    );
});

export default TodoList;