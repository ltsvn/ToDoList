import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, FormControlLabel, IconButton, List, ListItem} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Favorite, FavoriteBorder} from "@material-ui/icons";

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
    console.log("PROPS", props)

    const changeTaskTitle = (title: string, taskId: string) => {
        props.changeTaskTitle(taskId, title, props.todoListId)
    }

    const tasksItems = props.tasks.length
        ? props.tasks.map(task => <ListItem style={{padding: 0}} key={task.id} className={task.isDone ? "isDone" : ""}>
                {/*<Checkbox style={{color: 'hotpink'}} checked={task.isDone} onChange={(e) =>*/}
                {/*    props.changeStatus(task.id, e.currentTarget.checked, props.todoListId)}/>*/}
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"
                                       checked={task.isDone} onChange={(e) =>
                        props.changeStatus(task.id, e.currentTarget.checked, props.todoListId)}/>}
                    label=""
                />
                {/*<span>{task.title}</span>*/}
                <EditableSpan title={task.title} changeTitle={(title: string) => changeTaskTitle(title, task.id)}/>
                <IconButton style={{color: 'primary'}} onClick={() => props.removeTask(task.id, props.todoListId)}>
                    <HighlightOffIcon/>
                </IconButton>
            </ListItem>
        )

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
};

export default TodoList;