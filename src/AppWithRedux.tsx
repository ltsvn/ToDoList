import React, {useCallback, useEffect, useMemo, useReducer, useState} from 'react';
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
    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }, [dispatch])

//todoLists CRUD
    const changeToDoListFilter = useCallback((filter: FilterValueType, todoListId: string) => {
        dispatch(ChangeTodoListFilterAC(filter, todoListId))
    }, [dispatch])

    const changeToDoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleAC(title, todoListId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodoListAC(title))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(RemoveTodoListAC(todoListId))
    }, [dispatch])

    //UI:
    const getTasksRorToDoList = (todolist: TodoListType) => {
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
