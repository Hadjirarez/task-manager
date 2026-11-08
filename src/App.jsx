
import './App.css'
import {useState , useEffect} from 'react'

function App() {


  const [task , setTask] = useState("")
  const [tasks , setTasks] = useState( ()=>{ const savedTasks = localStorage.getItem("tasks") 
    if(savedTasks=== null) return ([]); else{return( JSON.parse(savedTasks))}})
  const[isWarning , setIsWarning] = useState(false)
  const[editedTask , setEditedTask] = useState(null)
  const [btn , setBtn] = useState("Add")
  const [searchedTask , setSearchedTask] = useState("")


 useEffect(()=>{
const localedTasks = JSON.stringify(tasks)
 localStorage.setItem("tasks" , localedTasks)

  } , [tasks])
 


const getInput =(event)=>{
  
setTask(event.target.value) 
setIsWarning(false)

}

 const handler=(event)=>{
  if(task.trim()===""){(setIsWarning(true))} 
  else if(editedTask === null){
  
 
  setTasks([...tasks , task]) 
  setTask("")}

 
 else {setTasks((tasks.map((existingTask , index) =>(index === editedTask ? task : existingTask))))
  setTask("")
  setEditedTask(null)
setBtn("Add")}
 }



const deleteTask=(indexToDelete)=>{

setTasks(tasks.filter((task , index)=>(index != indexToDelete)))
}



const editTask=(indexOfEditing)=>{
  setEditedTask(indexOfEditing)
 setTask(tasks[indexOfEditing])
 setBtn("Save")
}


const indexTask = tasks.map((task , index)=>({
  task : task ,
  originalIndex : index
 }))
  
const foundTasks = indexTask.filter((item)  =>  {
 
return(
 item.task.toLowerCase().includes(searchedTask.toLowerCase()))
  

}

  
  
 
 
)

const searchTasks=(event) =>{
setSearchedTask(event.target.value)


}

const clearedTasks =()=>{
 setTasks([])
}

  return (
    <div className='container'>
      <h1>MY TO DO LIST</h1>
      <div id='searchDiv'>
   <label htmlFor="">Search Tasks :</label>
      <input id='searchBar' onChange={searchTasks} type="text" placeholder='enter a task to search' />
      </div>
   
      <div className='formContainer'>
        <form id='form' action="">
          <input value = {task} onChange={getInput} id='taskTxt' type="text" placeholder='Enter your task' />
          <button type='button' onClick={handler} id='mainBtn'>{btn}</button>
          <button type='button' onClick={clearedTasks} id='mainBtn'>Clear All</button>
       
        </form>

      </div>
      <p>My Tasks</p>
  {  isWarning ? <p id='warningTxt'>fill this input</p> : null}
  
 { <ul id='tasksList'>{  foundTasks.map((item) =>(
  <li key={item.originalIndex}>{item.task} <button onClick={()=>deleteTask(item.originalIndex)} >Delete</button> <button onClick={()=>editTask(item.originalIndex)}>Edit</button> </li>
 ))}
  </ul>

  
  } 
  
    </div>
  )
}

export default App
