
import './App.css'
import {useState} from 'react'

function App() {


  const [task , setTask] = useState("")
  const [tasks , setTasks] = useState([])
  const[isWarning , setIsWarning] = useState(false)
  const[editedTask , setEditedTask] = useState(null)


const getInput =(event)=>{
  
setTask(event.target.value) 
setIsWarning(false)

}

 const handler=(event)=>{
  if(task.trim()===""){(setIsWarning(true))} 
  else if(editedTask === null){
  
 
  setTasks([...tasks , task]) 
  setTask("")}

 
 else  {setTasks((tasks.map((existingTask , index) =>(index === editedTask ? task : existingTask))))
  setTask("")
  setEditedTask(null)}
 }



const deleteTask=(indexToDelete)=>{

setTasks(tasks.filter((task , index)=>(index != indexToDelete)))
}



const editTask=(indexOfEditing)=>{
  setEditedTask(indexOfEditing)
 setTask(tasks[indexOfEditing])
}


  return (
    <div className='container'>
      <h1>MY TO DO LIST</h1>
      <div className='formContainer'>
        <form id='form' action="">
          <input value = {task} onChange={getInput} id='taskTxt' type="text" placeholder='Enter your task' />
          <button type='button' onClick={handler} id='mainBtn'>Add</button>
       
        </form>

      </div>
      <p>My Tasks</p>
  {  isWarning ? <p id='warningTxt'>fill this input</p> : null}
 { <ul id='tasksList'>{tasks.map((task , index) =>(
  <li key={index}>{task} <button onClick={()=>deleteTask(index)} >Delete</button> <button onClick={()=>editTask(index)}>Edit</button> </li>
 ))}
  </ul>

  
  } 
  
    </div>
  )
}

export default App
