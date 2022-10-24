import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

// /*export type RemoveTodoListAT = {
//     type: 'REMOVE-TODOLIST'
//     todolistId: string
// }
// export type AddTodoListAT = {
//     type: 'ADD-TODOLIST'
//     title: string
//     todolistId: string
// }
// type ChangeToDoListFilterAT = {
//     type: 'CHANGE-TODOLIST-FILTER'
//     filter: FilterValueType
//     todoListId: string
// }
// type ChangeToDoListTitleAT = {
//     type: 'CHANGE-TODOLIST-TITLE'
//     title: string
//     todoListId: string
// }*/
export type RemoveTodoListAT = ReturnType<typeof RemoveTodoListAC>
export type AddTodoListAT = ReturnType<typeof AddTodoListAC>
type ChangeToDoListFilterAT = ReturnType<typeof ChangeTodoListFilterAC>
type ChangeToDoListTitleAT = ReturnType<typeof ChangeTodoListTitleAC>

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeToDoListFilterAT | ChangeToDoListTitleAT

const initialState: Array<TodoListType> = []

export const todolistsReducer = (state = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodoListId: string = v1()
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}]

        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.todoListId ? {
                ...tl,
                filter: action.payload.filter
            } : tl)

        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.title} : tl)

        default:
            return state
    }
}


export const RemoveTodoListAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId: id
    } as const
}

export const AddTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolistId: v1(), title}
    } as const
}

export const ChangeTodoListFilterAC = (filter: FilterValueType, todoListId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            filter,
            todoListId
        }
    } as const
}

export const ChangeTodoListTitleAC = (title: string, todoListId: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            title,
            todoListId
        }
    } as const
}