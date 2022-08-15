import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    //BLL:
    const todoListTitle_1: string = "What to learn"
    const todoListTitle_2: string = "What to buy"
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS&TS", isDone: true},
        {id: 3, title: "REACT", isDone: false}
    ]
    const tasks_2: Array<TaskType> = [
        {id: 4, title: "REACT", isDone: false},
        {id: 5, title: "TS", isDone: false},
        {id: 6, title: "JS", isDone: false}
    ]

    //UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle_1}
            tasks={tasks_1}/>
            {/*//TodoList({title: 'What to learn'})*/}
            <TodoList title={todoListTitle_2}
                      tasks={tasks_2}/>

        </div>
    );
}

export default App;
