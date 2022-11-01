import React, {ChangeEvent, memo} from 'react';
import {Checkbox, FormControlLabel, IconButton, ListItem} from "@material-ui/core";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import EditableSpan from "./EditableSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {TaskType} from "./TodoList";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = memo(({task, changeTaskTitle, changeStatus, removeTask}: TaskPropsType) => {

    const changeTaskTitleHnd = (title: string, taskId: string) => {
        changeTaskTitle(taskId, title)
    }

    const removeTaskHandler = () => removeTask(task.id)

    const onTitleChangeHandler = (title: string) => changeTaskTitleHnd(title, task.id)

    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeStatus(task.id, e.currentTarget.checked)


    return (
        <ListItem style={{padding: 0}} key={task.id} className={task.isDone ? "isDone" : ""}>
            <FormControlLabel control={<Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"
                                                 checked={task.isDone} onChange={onStatusChangeHandler}/>} label=""
            />
            <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
            <IconButton style={{color: 'primary'}} onClick={removeTaskHandler}>
                <HighlightOffIcon/>
            </IconButton>
        </ListItem>
    );
});

