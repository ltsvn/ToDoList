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

function AppWithReducer() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListId_1, title: "What to learn today", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS&TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Fish", isDone: false},
        ]
    })


//task CRUD
    const removeTask = (taskId: string, todoListId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
    }

//todoLists CRUD
    const changeToDoListFilter = (filter: FilterValueType, todoListId: string) => {
        dispatchToTodoLists(ChangeTodoListFilterAC(filter, todoListId))
    }

    const changeToDoListTitle = (title: string, todoListId: string) => {
        dispatchToTodoLists(ChangeTodoListTitleAC(title, todoListId))
    }

    const addTodoList = (title: string) => {
        let action = AddTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const removeTodoList = (todoListId: string) => {
        let action = RemoveTodoListAC(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
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

export default AppWithReducer;
