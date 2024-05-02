import styled from "@emotion/styled";
import { DeleteForever, Edit, EditLocation } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';


const TaskItem = (props) => {
    const {task, tasks, setTasks, index} = props;
    const [taskName, setTaskName] = useState(task.name);
    const [editState, setEditState] = useState(false);

    const updateTask = async () => {
        const response = await fetch(`http://todocraft.ddev.site/tasks/${task.id}.json`, {method:"POST"});
        const tasks = await response.json();
        // if (tasks?.data) {
        //   setTasks(tasks.data);
        // }
        console.log("TASKS FRM API", tasks); 
      }

    const deleteItem = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];

        newTasks.splice(index, 1);

        setTasks(newTasks);
    }
    const saveItem = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];
        const newTask = {...newTasks[index]};

        newTask.name = taskName;
        newTasks[index] = newTask;

        setTasks(newTasks);
        setEditState(false);
    }

    const editItem = (e) => {
        e.preventDefault();
        setEditState(true);
    }

    const cancelItem = (e) => {
        e.preventDefault();
        setTaskName(task.name);
        setEditState(false);
    }
    const handleTaskNameOnChange = (e) => {
        const newTask = e.target.value;
        setTaskName(newTask);
    }

    if (!task) {
        return null;
    }

    return (
    <li>

    {editState ? (
        <>
        <EditTaskName type="text" value={taskName} onChange={(e) => handleTaskNameOnChange (e)} />
        <IconButton onClick={(e) => cancelItem(e)}>
        <CancelIcon color="error" />
    </IconButton>
    <IconButton onClick={(e) => saveItem(e)}>
        <SaveIcon color="success" />
    </IconButton>
        </>
    ) : (
        <>
        <TaskName>{task.name}</TaskName>
        <IconButton onClick={(e) => deleteItem(e)}>
        <DeleteForever color="error" />
    </IconButton>
    <IconButton onClick={(e) => editItem(e)}>
        <Edit color="success" />
    </IconButton>
        </>
    )}

    </li>
    );
}

export default TaskItem;

const TaskName = styled.div`
font-size: 14px;
`

const EditTaskName = styled.input`
font-size: 14px;
`