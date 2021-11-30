import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isEmpty, size } from 'lodash';
import { addDocument, deleteDocument, getColecction, updateDocument } from './actions';



function App(){

  const [task, setTask ] = useState("")
  const [task1, setTask1 ] = useState("")
  const [task2, setTask2 ] = useState("")
  const [nombre,setNombre]=useState("")
  const [año,setAño]=useState("")
  const [placasA,setPlacasA]=useState("")
  const [placasB,setPlacasB]=useState("")
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
    const result=await addDocument("tasks",{Correo: task,Nombre:nombre, MarcaVehiculo: task1, Modelo: task2,Año:año,PlacasA:placasA,PlacasB:placasB})
    if(!result.statusResponse){
      setError(result.error)
      return
    }

    setTasks([...tasks, {id:result.data.id, Correo:task,Nombre:nombre,MarcaVehiculo:task1,Modelo:task2,Año:año,PlacasA:placasA,PlacasB:placasB}])
    setTask("")
    setTask1("")
    setTask2("")
    setNombre("")
    setAño("")
    setPlacasA("")
    setPlacasB("")
    setId("")

  }

  const saveTask=async(e)=>{
    e.preventDefault()
    if(isEmpty(task)){
      console.log("Task Vacio")
      return
    }
    const result=await updateDocument("tasks",id, {Correo:task,Nombre:nombre,MarcaVehiculo:task1,Modelo:task2,Año:año,PlacasA:placasA,PlacasB:placasB})
    if(!result.statusResponse){
      setError(result.error)
      return
    }

    const editedTasks=tasks.map(item => item.id === id ? {id, Correo:task,Nombre:nombre,MarcaVehiculo:task1,Modelo:task2,Año:año,PlacasA:placasA,PlacasB:placasB}:item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setTask1("")
    setTask2("")
    setNombre("")
    setAño("")
    setPlacasA("")
    setPlacasB("")
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
    
      setTask(tarea.Correo)
      setNombre(tarea.Nombre)
      setTask1(tarea.MarcaVehiculo)
      setTask2(tarea.Modelo)
      setAño(tarea.Año)
      setPlacasA(tarea.PlacasA)
      setPlacasB(tarea.PlacasB)
      setEditMode(true)
      setId(tarea.id)
    
    
    
  }




  return(
    <>
    

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
                  {tasks.map((task)=>(
                    <li className="list-group-item" key={task.id}>
                      {task.Correo},
                      {task.Nombre},
                      {task.MarcaVehiculo},
                      {task.Modelo},
                      {task.Año},
                      {task.PlacasA},
                      {task.PlacasB}
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
              <input type="text" className="form-control mb-2" placeholder="Ingresa tu nombre completo" onChange={(text)=>setNombre(text.target.value)} value={nombre}/>
              <input type="text" className="form-control mb-2" placeholder="Ingresa Marca del Vehiculo" onChange={(text)=>setTask1(text.target.value)} value={task1}/>
              <input type="text" className="form-control mb-2" placeholder="Ingresa tipo de auto" onChange={(text)=>setTask2(text.target.value)} value={task2}/>
              <input type="text" className="form-control mb-2" placeholder="Ingresa el año del vehiculo" onChange={(text)=>setAño(text.target.value)} value={año}/>
              <input type="text" className="form-control mb-2" placeholder="Ingresa las placas del vehiculo" onChange={(text)=>setPlacasA(text.target.value)} value={placasA}/>
              <input type="text" className="form-control mb-2" placeholder="Ingresa las placas del vehiculo" onChange={(text)=>setPlacasB(text.target.value)} value={placasB}/>
              <button className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} type="submit">{editMode ? "Guardar":"Agregar"} </button>
            </form>
          </div>
        </div>

    </div>
</>


  )

}

export default App;