import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./Reducers/task-reducer";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, RemoveTodoListAC,
    todolistsReducer
} from "./Reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Reducers/store";

//CLI
//GUI => CreateReadUpdateD
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType

}

export type TasksStateType = {
    [todoListId: string]: TaskType[]
}

function AppWithRedux() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

//task CRUD
    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }

//todoLists CRUD
    const changeToDoListFilter = (filter: FilterValueType, todoListId: string) => {
        dispatch(ChangeTodoListFilterAC(filter, todoListId))
    }

    const changeToDoListTitle = (title: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleAC(title, todoListId))
    }

    const addTodoList = (title: string) => {
        dispatch(AddTodoListAC(title))
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(RemoveTodoListAC(todoListId))
    }

    //UI:
    const getTasksRorToDoList = (todolist: TodoListType) => {
        console.log('TL', todolist)
        switch (todolist.filter) {
            case "active":
                return tasks[todolist.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todolist.id].filter(t => t.isDone)
            default:
                return tasks[todolist.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        const tasks = getTasksRorToDoList(tl)
        return <Grid item key={tl.id}>
            <Paper elevation={8} style={{padding: '20px'}}>
                <TodoList
                    title={tl.title}
                    tasks={tasks || []}
                    removeTask={removeTask}
                    changeFilter={changeToDoListFilter}
                    addTask={addTask}
                    changeStatus={changeTaskStatus}
                    filter={tl.filter}
                    todoListId={tl.id}
                    key={tl.id}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeToDoListTitle={changeToDoListTitle}
                />
            </Paper>
        </Grid>
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
