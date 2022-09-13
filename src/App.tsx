import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

//CLI
//GUI => CreateReadUpdateD
export type FilterValueType = 'all' | 'active' | 'completed'
type TodoListType = {
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
//
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

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        // const todoListsTasks = tasks[todoListId]
        // const updatedTasks = todoListsTasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        // const copyTask = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? t : {...t, isDone: isDone})})
    }

    const changeFilter = (filter: FilterValueType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))

        // setFilter(filter)
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
    }

    const getTasksRorToDoList = (todilist: TodoListType) => {
        switch (todilist.filter) {
            case "active":
                return tasks[todilist.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todilist.id].filter(t => t.isDone)
            default:
                return tasks[todilist.id]

        }
    }


    //UI:

    // let tasksForToDoList = tasks
    // if (filter === 'active') {
    //     tasksForToDoList = tasks.filter(t => !t.isDone)
    // }
    // if (filter === 'completed') {
    //     tasksForToDoList = tasks.filter(t => t.isDone)
    // }

    const todoListsComponents = todoLists.map(tl => {
        const tasks = getTasksRorToDoList(tl)
        return (
            <TodoList
                title={tl.title}
                tasks={tasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={tl.filter}
                todoListId={tl.id}
                key={tl.id}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
