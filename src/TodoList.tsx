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

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    // const handlerCreator = (filter: FilterValueType, todoListId: string) => {
    //     return () => props.changeFilter(filter, todoListId)
    // }

    const removeTodolist = () => props.removeTodoList(props.todoListId)

    const changeTodoListTitle = (title: string) => {
        props.changeToDoListTitle(title, props.todoListId)
    }

    let tasksForTodolist = props.tasks;
///////////////////////////
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }
/////////////////////////////////////
    const changeTaskTitle = useCallback((title: string, taskId: string) => {
        props.changeTaskTitle(taskId, title, props.todoListId)
    }, [props.changeTaskTitle, props.todoListId])
    const removeTaskHandler = useCallback((taskId: string) => props.removeTask(taskId, props.todoListId), [props.removeTask, props.todoListId])
    const changeTaskStatus = useCallback((taskId: string, status: boolean) => props.changeStatus(taskId, status, props.todoListId), [props.changeStatus, props.todoListId])


    const tasksItems = props.tasks.length ? tasksForTodolist.map(task => <Task key={task.id}
                                                                               changeTaskStatus={changeTaskStatus}
                                                                               task={task}
                                                                               removeTask={removeTaskHandler}
                                                                               changeTaskTitle={changeTaskTitle}/>) :
        <span>Tasks list is empty</span>
//////////////////////////////
    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todoListId), [props.changeFilter, props.todoListId])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todoListId), [props.changeFilter, props.todoListId])
    const onCompleteClickHandler = useCallback(() => props.changeFilter('completed', props.todoListId), [props.changeFilter, props.todoListId])

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton color='primary'
                            onClick={removeTodolist}><HighlightOffIcon/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksItems}
            </List>
            <ButtonGroup variant='contained' size='small' disableElevation>
                <ButtonExample
                    filter='all'
                    color={'inherit'}
                    // className={props.filter === 'all' ? 'btn-active btn' : 'btn'}
                    onClickHandler={onAllClickHandler}
                    active={props.filter}
                />
                <ButtonExample
                    filter='active'
                    //className={props.filter === 'active' ? 'btn-active btn' : 'btn'}
                    onClickHandler={onActiveClickHandler}
                    color={'primary'}
                    active={props.filter}
                />
                <ButtonExample
                    filter='completed'
                    //className={props.filter === 'completed' ? 'btn-active btn' : 'btn'}
                    onClickHandler={onCompleteClickHandler}
                    color={'secondary'}
                    active={props.filter}
                />
            </ButtonGroup>
        </div>
    );
});


type ButtonExamplePropsType = {
    filter: FilterValueType
    onClickHandler: () => void
    color: 'inherit' | 'primary' | 'secondary'
    active: string
}

const ButtonExample = memo((props: ButtonExamplePropsType) => {
    return <Button
        variant={props.filter === props.active ? 'outlined' : 'text'}
        color={props.color}
        onClick={props.onClickHandler}>{props.filter}
    </Button>
})

export default TodoList;