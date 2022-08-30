import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

//CLI
//GUI => CreateReadUpdateD
export type FilterValueType = 'all' | 'active' | 'completed'

function App() { //class components
    console.log(v1())
    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS&TS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID)) //10ms
        // console.log(tasks) //працює асинхронно
    }

    const addTask = (title: string) => {
        setTasks([{
            id: v1(), title: title, isDone: false
        }, ...tasks])
    }


    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    // const getTasksRorToDoList = () => {
    //     switch (filter){
    //         case "active":
    //             return tasks.filter(t => !t.isDone)
    //         case "completed":
    //             return tasks.filter(t => t.isDone)
    //         default:
    //             return tasks
    //
    //     }

    let tasksForToDoList = tasks
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }


    //UI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
