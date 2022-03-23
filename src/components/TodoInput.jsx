import axios from "axios"
import { useEffect, useState } from "react"
import "../App.css"

export const Todo = () =>{
    const [text,setText] = useState("")
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
    const [todo,setTodo] = useState([])


    useEffect(()=>{
        getData()
    },[])

    const getData =() =>{
        axios.get("http://localhost:3001/TodoData")
        .then((res)=>{
           setTodo(res.data)
        })
    }

    const handle = (num) => {

        axios.delete(`http://localhost:3001/TodoData/${num}`)
        .then((res)=>{
            getData()
        })

    };

    const toogle = (num) => {
        for(var i = 0 ;i<todo.length;i++){
           if(todo[i].id === num){
            axios.patch(`http://localhost:3001/TodoData/${num}` , {
                text:todo[i].text,
                date :todo[i].date,
                time:todo[i].time,
                status:true
            })
            .then(()=>{
                getData()
            })
           }  
        }
        


    };
    return (
        <div className="dj">
            <input onChange={(e)=>{
                setText(e.target.value)
            }} type="text" placeholder ="Enter Todo"/>

            <input type="date" onChange={(e)=>{
                setDate(e.target.value)
            }} />
            <input type="time" onChange={(e)=>{
                setTime(e.target.value)
            }} />

            <button onClick={()=>{
                var todoData = {
                    text,
                    date,
                    time,
                    status:false,
                }               
                axios.post("http://localhost:3001/TodoData" , todoData)
                .then(()=>{
                    getData()
                })
            }}>Add Todo</button>

             <div>
             {todo.map((e) => (
                 <>
              <div key={e.id} className="Deepak">
                    <div>Task :- {e.text}</div>
                    <div>Time :- {e.time}</div>
                    <div>Date :- {e.date}</div>

                    <button onClick={()=>{
                        toogle(e.id)
                    }}>{e.status ? "Done" : "Not Done"}</button>
                     <button  onClick={()=>{
                        handle(e.id)
                     }}>Delete Task</button>
             </div>           
             </> 
                ))}
                <div>
                     <button onClick={(e)=>{
                         for(var i = 0 ;i<todo.length;i++){
                            axios.delete(`http://localhost:3001/TodoData/${todo[i].id}`)
                            .then(()=>{
                                getData()
                            })
                         }
                
             }}>Clear All</button>
                     </div>
             </div>
        </div>
    )
}