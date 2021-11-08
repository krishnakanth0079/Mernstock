import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import "./TodoList.css"

 function TodoList() {
    const [data, setData] = useState([])
    const [bool, setBool] = useState(true)
    const [updte, setUpdte] = useState({fn:"", ln:""})
    const [change, setChange] = useState({fname:"", lname:"", age:"", study:""})
    useEffect(()=>{
        axios.get("http://localhost:8000/").then(res=>{
            setData(res.data)
        })
    }, [])

    const studentAdd =() =>{
        axios.post("http://localhost:8000/studentadd", change).then(res=>{
            setData(res.data)
        })
    }

    const deleteStudent = (fname, lname, age,study) =>{
        axios.delete('http://localhost:8000/deleteStudent', { data: { fname: fname, 
        lname: lname, age: age , study:study} }).then(res => setData(res.data))
    }

    const editStudent = (fstname, lstname, st_age , st_study) =>{
        // console.log("edit", fstname, lstname, st_age , st_study)

        document.getElementById("fname").value = fstname
        document.getElementById("lname").value = lstname
        document.getElementById("age").value = st_age
        document.getElementById("study").value = st_study
        setUpdte({...updte, fn:fstname, ln:lstname})
        setBool(false)
    }
    const studentEdit = () =>{
        // console.log("update", firstName, lastName, Stud_age, Study_field )
        let f= document.getElementById("fname").value
        let l = document.getElementById("lname").value
        let a= document.getElementById("age").value
        let s= document.getElementById("study").value

        axios.put("http://localhost:8000/editstudent", {updte, edited:{fname:f, lname:l, age:a, study:s}}).then(res=>
        setData(res.data))
        setBool(true)

    }

    return (
        <div class="container">

            <h2>College Management</h2>
            <div className="boxer">
            <input type="text" id="fname" placeholder="Enter First Name" onChange={(e)=>setChange({ ...change, fname:e.target.value})}/>
            <input type="text" id="lname" placeholder="Enter Last Name" onChange={(e)=>setChange({...change, lname:e.target.value})}/>
            <input type="number" id="age" placeholder="Enter Age " onChange={(e)=> setChange({...change, age:e.target.value})}/>
            <select id="study" onChange={(e)=> setChange( {...change, study:e.target.value})}>
                <option>ECE</option>
                <option>CSE</option>
                <option>ME</option>
                <option>EEE</option>
            </select>

            { bool===true ? <button onClick={studentAdd}>Submit</button> :  <button onClick={studentEdit}>update</button> }
            </div>
            <br/>
            <table>
              <thead>
                  
                  <th>Serial No.</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Field of Study</th>
                  <th>Edit</th>
                  <th>Delect</th>
                  
              </thead>
              <tbody>
              {data.map((item, index) =>{
                  return(
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.fname}</td>
                          <td>{item.lname}</td>
                          <td>{item.age}</td>
                          <td>{item.study}</td>
                          <td className="edit"><button onClick={()=>{editStudent( item.fname, item.lname, item.age, item.study )}}>edit</button></td>
                          <td className="delete"><button onClick={()=>{deleteStudent( item.fname, item.lname, item.age,item.study )}} >delete</button></td>
                      </tr>
                      
                  )
              })}
              </tbody>
          </table>
        </div>
    )
}

export default TodoList;
