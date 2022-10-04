import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

//CLI
//GUI => CreateReadUpdateD
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType

}

type TasksStateType = {
    [todoListId: string]: TaskType[]
}

function App() { //class components
    // const todoListTitle: string = "What to learn"
    //
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS&TS", isDone: true},
    //     {id: v1(), title: "REACT", isDone: false},
    // ])

    const [filter, setFilter] = useState<FilterValueType>('all')

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: "What to learn today", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
        // const todoListsTasks = tasks[todoListId]
        // const updatedTasks = todoListsTasks.filter(t => t.id !== taskId)
        // const copyTask = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
        // setTasks(tasks.filter(t => t.id !== taskID)) //10ms
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}

        // const todoListsTasks = tasks[todoListId]
        // const updatedTasks = [newTask, ...todoListsTasks]
        // const copyTask = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)
        //
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        //
        // setTasks([{
        //     id: v1(), title, isDone: false
        // }, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const todoListsTasks = tasks[todoListId]
        const updatedTasks = todoListsTasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        const copyTask = {...tasks}
        copyTask[todoListId] = updatedTasks
        setTasks(copyTask)
        //
        // setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? t : {...t, isDone: isDone})})
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)})
    }

//todoLists CRUD
    const changeToDoListFilter = (filter: FilterValueType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))

        // setFilter(filter)
    }
    const changeToDoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
        // setFilter(filter)
    }
    const addTodoList = (title: string) => {
        const newTodoListId: string = v1()
        setTodoLists([...todoLists, {id: newTodoListId, title: title, filter: 'all'}])
        setTasks({...tasks, [newTodoListId]: []})
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    }

    // useEffect(() => {
    //     console.log(todoLists)
    // }, [todoLists])


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
                    tasks={tasks}
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

export default App;
