import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isEmpty, size } from 'lodash';
import { addDocument, deleteDocument, getColecction, updateDocument } from './actions';



function App(){

  const [task, setTask ] = useState("")
  const [task1, setTask1 ] = useState("")
  const [task2, setTask2 ] = useState("")
  const [tasks, setTasks]=useState([])
  const [editMode,setEditMode]=useState(false)
  const[id,setId]=useState("")

  const [error,setError]=useState(null)

  useEffect(()=>{
    (async()=>{
      const result = await getColecction("tasks")
      console.log(result)
      if(result.statusResponse){
        setTasks(result.data)
      }
    }) ()
  },[])

  const addTask=async(e)=>{
    e.preventDefault()
    if(isEmpty(task)){
      console.log("Task Vacio")
      return
    }
    const result=await addDocument("tasks",{name: task, subtitulo: task1, descripcion: task2})
    if(!result.statusResponse){
      setError(result.error)
      return
    }

    setTasks([...tasks, {id:result.data.id, name:task,subtitulo:task1,descripcion:task2}])
    setTask("")
    setTask1("")
    setTask2("")
    setId("")

  }

  const saveTask=async(e)=>{
    e.preventDefault()
    if(isEmpty(task)){
      console.log("Task Vacio")
      return
    }
    const result=await updateDocument("tasks",id, {name:task,subtitulo:task1,descripcion:task2})
    if(!result.statusResponse){
      setError(result.error)
      return
    }

    const editedTasks=tasks.map(item => item.id === id ? {id, name:task,subtitulo:task1,descripcion:task2}:item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setTask1("")
    setTask2("")
    setId("")
  }

  const deleteTask=async(id)=>{
    const result=await deleteDocument("tasks",id)
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    const filteredTasks=tasks.filter(task=>task.id !==id)
    setTasks(filteredTasks)

  }
  const editTask=(tarea)=>{
    
      setTask(tarea.name)
      setTask1(tarea.subtitulo)
      setTask2(tarea.descripcion)
      setEditMode(true)
      setId(tarea.id)
    
    
    
  }




  return(
    <>
    

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <img id="logo" src="./img/lOGOSCEV.jpg" alt="adf"/> 
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <img id="logoauto" src="./img/pngwing.com.png" alt="auto"/>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Vehiculos
            </a>
          </li>
         
          <li class="nav-item">
            <a class="nav-link" href="reporte.html">Reporte</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Ver más
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Sobre nosotros</a></li>
              <li><a class="dropdown-item" href="#">Ingresa tu ubicacion</a></li>
              <li><hr class="dropdown-divider"/></li>
              <li><a class="dropdown-item" href="#">Contactanos</a></li>
            </ul>
          </li> 
        </ul>
        
      </div>
      <form class="d-flex">
        <input class="form-control me-5" type="search" placeholder="Buscar" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>
    </div>
  </nav>

    <div className="container mt-5">
        <h1>Registro de Automoviles</h1>
        <hr/>
        <div className="row align-items-start">
          <div className="col-8">
            <h4 className="text-center">Estacionamiento</h4>
            {
              size(tasks)===0 ?(
                <h5 className="text-center">Aun no hay espacios ocupados</h5>
              ):(
                <ul className="list-group">
                  {tasks.map((task,task1,task2)=>(
                    <li className="list-group-item" key={task.id}>
                      {task.name},
                      {task.subtitulo},
                      {task.descripcion}
                      <button className="btn btn-danger btn-sm float-right mx-2" onClick={()=>deleteTask(task.id)}>Eliminar</button>
                      <button className="btn btn-warning btn-sm float-right" onClick={()=>editTask(task)}>Editar</button>
                    </li>
                  ))}
                </ul>
              )
            }
          </div>

          <div className="col-4">
            <h4 className="text-center">{editMode ? "Modificar tarea" : "Nuevo Auto-Park"} </h4>
            <form onSubmit={editMode ? saveTask:addTask}>
              <input type="text" className="form-control mb-2" placeholder="Ingresa tu correo" onChange={(text)=>setTask(text.target.value)} value={task}/>
              <input type="text" className="form-control mb-2" placeholder="Ingresa tu nombre completo" onChange={(text)=>setTask1(text.target.value)} value={task1}/>
              <input type="text" className="form-control mb-2" placeholder="Ingresa tipo de auto" onChange={(text)=>setTask2(text.target.value)} value={task2}/>
              <button className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} type="submit">{editMode ? "Guardar":"Agregar"} </button>
            </form>
          </div>
        </div>

    </div>
</>


  )

}

export default App;