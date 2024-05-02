import {useState} from "react";
import logo from './logo.svg';
import './App.css';
import {TextField, Button, Grid} from "@mui/material";
import styled from "@emotion/styled";
import TaskItem from "./Components/taskitem";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

function App() {

  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const [taskName, setTaskName] = useState("");

  const fetchTasks = async () => {
    const response = await fetch("http://todocraft.ddev.site/tasks.json");
    const tasks = await response.json();
    if (tasks?.data) {
      setTasks(tasks.data);
    }
    console.log("TASKS FRM API", tasks); 
  }

  useEffect (() => {
    fetchTasks();
  }, []);

  const valueChange = (event) => {
    const newValue = event.target.value;
    setTaskName(newValue);
  }

  const handleAddTask = (e, task) => {
    e.preventDefault();
    const newTasks = [...tasks];

    newTasks.unshift({
      id: uuidv4(),
      name: task,
    });

    setTasks(newTasks);
    setTaskName("");
  }

  
  return (
    <div className="App">
      <div id="todo-app">
        <form>
          <Grid container justifyContent={"center"}>
            <Grid item>
            <TextField 
            size="small"
            type="text" 
            id="new-task" 
            placeholder="Enter a new task" 
            value={taskName} 
            onChange={valueChange} 
            />
            </Grid>
            <Grid item>
            <StyledButton 
            size="large"
            id="add-task" 
            onClick={(e) => handleAddTask(e, taskName)}
            >Create Task</StyledButton>
            </Grid>
          </Grid>


        <ul id="task-list">
          {tasks.map((task, index) => {
            return (
              <TaskItem key={`task-${task.id}-${index}`} task={task} tasks={tasks} setTasks={setTasks} index={index} />
              )
          })} 
        </ul> 
      </form>
    </div>
  </div>
)};

export default App;

const StyledButton = styled(Button)`
color: darkblue;
`;