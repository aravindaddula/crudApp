import React, { useEffect, useState } from "react"
import axios from 'axios';

export default function DisplayHeros(){
    const [state,setState] = useState({
                                        title : "Admin Dashboard",
                                        heroeslist : [],
                                        nhfirstname : '',
                                        nhlastname : '',
                                        nhemail : "",
                                        nhcity : '',
                                        edit_hfirstname : '',
                                        edit_hlastname : '',
                                        edit_hemail : "",
                                        edit_hcity : '',
                                        edit_hid : '',
                                        show : true
                                   });

   let editHandler = (heroid)=>{
        axios
        .get("http://localhost:5050/edit/"+heroid)
        .then(res=>{
            setState({
                edit_hfirstname : res.data.firstname,
                edit_hlastname : res.data.lastname,
                edit_hemail : res.data.email,
                edit_hcity : res.data.city,
                edit_hid : res.data._id,
                show : false
            })
        })
        .catch(err=>console.log("Error : ", err))
    }
        //-----Table had to be rerendered after deletion of an item from an array
        let deleteHandler = (heroid)=>{
            axios.delete("http://localhost:5050/delete/"+heroid)
                .then(res=>{
                    alert(JSON.stringify(res.data));
                })
                .catch(err=>console.log("Error : ", err))
        }
        //Load data into heroslist array when app loads.
        useEffect(()=>{
            axios.get("http://localhost:5050/data")
                 .then(res => setState({ heroeslist : res.data}))
                 .catch(err => console.log("Error : ", err))
        },[])

    return(
            <div className='container'>
                <h1> { state.title } </h1>
                
                <hr/>
                {/* <ol>{ state.heroeslist.map(hero => <li key={ hero._id }>{ hero.firstname +' '+hero.lastname }</li>)}</ol> */}
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">email</th>
                        <th scope="col">City</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>{ state.heroeslist.map((hero, idx) => 
                                <tr key={ hero._id }>
                                    <th>{ idx + 1 }</th>
                                    <td>{ hero.firstname }</td>
                                    <td>{ hero.lastname }</td>
                                    <td>{ hero.email }</td>
                                    <td>{ hero.city }</td>
                                    <td> <button onClick={()=> editHandler( hero._id )} className='btn btn-warning'>Edit </button> </td>
                                    <td> <button onClick={()=> deleteHandler( hero._id )} className='btn btn-danger'>Delete </button> </td>
                                </tr>)
                        }</tbody>
                    </table>
           </div>)
}