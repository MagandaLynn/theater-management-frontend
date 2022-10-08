import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import taskList from '../data/taskList'


const Tasks = () => {
  const [columns, setColumns] = useState([])
  const [tasks, setTasks] =  useState(JSON.parse(localStorage.getItem('tasks'))||[...taskList])
  
  useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks)) 
  }, [tasks])

  useEffect(()=>{
    setColumns([
        {text: 'Task', completed: false, inProgress: false}, 
        {text: 'In Progress', completed: false, inProgress: true}, 
        {text: 'Completed', completed: true, inProgress: false}
    ])
  },[])  
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  const onDragEnd = (result) =>{
    if(result.destination.droppableId==='0'){
      tasks[result.draggableId].inProgress=false;
      tasks[result.draggableId].completed=false;
    }
    if(result.destination.droppableId==='1'){
      tasks[result.draggableId].inProgress=true;
      tasks[result.draggableId].completed=false;
    }
    
    if(result.destination.droppableId==='2'){
      tasks[result.draggableId].inProgress=false;
      tasks[result.draggableId].completed=true;
    }
    // setTasks(tasks)
    console.log(result)
    
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
      <DragDropContext onDragEnd={result=>{onDragEnd(result)}}>
        {columns.map((column, columnIndex)=>{
          return (
            <Droppable droppableId={`${columnIndex}`} key={columnIndex}>
              {(provided, snapshot)=>{
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                      padding: 4,
                      margin: 5,
                      width: 250,
                      minHeight: 500
                    }}
                  >
                  {column.text}
                    {tasks.map((task, index)=>(
                      column.completed===task.completed && column.inProgress===task.inProgress 
                        ?(
                        <Draggable
                          key={task.id}
                          draggableId = {`${task.id}`}
                          index={index}
                        >
                          {(provided,snapshot)=>{
                            
                            return(
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  padding: 16,
                                  margin: '0 0 8px 0',
                                  minHeight: '50px',
                                  backgroundColor: snapshot.isDragging ? '#263d4b' : '#456D86',
                                  color: 'white',
                                  ...provided.draggableProps.style
                                }}
                              >
                                 <p>{task.task}</p>
                                
                              </div>
                            )
                          }}

                        </Draggable>)
                      :(<></>)
                    ))}
                    {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
          )
        })}
      </DragDropContext>
      
    </div>
  )
}

export default Tasks
