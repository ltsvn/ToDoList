import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState<string>(' ')

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }
    const [error, setError] = useState<boolean>()

    const userMessage =
        error
            ? <div style={{color: 'hotpink'}}>Title is required!</div>
            : <div>Please, create list item!</div>

    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <TextField
                size={'small'}
                variant={'standard'}
                value={title}
                onChange={changeTitle}
                onKeyDown={onKeyDownAddTask}
                error={error}
                label={'Title'}
                helperText={error && 'Title is required!'}
            />
            <IconButton onClick={addItem}>
                <AddCircleOutlineIcon style={{color: 'hotpink'}}/>
            </IconButton>
            {/*{userMessage}*/}
        </div>
    );
};

export default AddItemForm;