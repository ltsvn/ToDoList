import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input value={title}
                   onChange={changeTitle}
                   onKeyDown={onKeyDownAddTask}
                   className={error ? 'error' : ""}
            />
            <button onClick={addItem}>+</button>
            {userMessage}
        </div>
    );
};

export default AddItemForm;