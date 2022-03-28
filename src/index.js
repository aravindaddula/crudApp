import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class MainApp extends Component{
    state = {
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
    }
    //-----------------------------------
    reload = ()=>{
        axios
        .get("https://crudserver.aravindaddula.repl.co/")
        .then(res => this.setState({ heroeslist : res.data}))
        .catch(err => console.log("Error : ", err))
    }
    componentDidMount(){
        this.reload();
    }
    //-----------------------------------
    editHandler = (heroid)=>{
        axios
        .get("https://crudserver.aravindaddula.repl.co/"+heroid)
        .then(res=>{
            this.setState({
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
    //-----------------------------------
    addHeroHandler = (evt)=>{
        evt.preventDefault();
        axios
        .post("https://crudserver.aravindaddula.repl.co/",{
            firstname : this.state.nhfirstname,
            lastname : this.state.nhlastname,
            email : this.state.nhemail,
            city : this.state.nhcity
        })
        .then((res)=>{
            this.reload();
            this.setState({
                nhfirstname : '',
                nhlastname : '',
                nhemail : "",
                nhcity : ''
            });
        })
        .catch(err=>console.log("Error : ", err))
    }
    //-----------------------------------
    deleteHandler = (heroid)=>{
        axios
        .delete("https://crudserver.aravindaddula.repl.co/"+heroid)
        .then(res=>{
            alert(JSON.stringify(res.data));
            this.reload();
        })
        .catch(err=>console.log("Error : ", err))
    }
    //-----------------------------------
    changeHandler = (evt)=>{
        if(evt.target.id === 'hfname'){ this.setState({ nhfirstname : evt.target.value }) }
        else if(evt.target.id === 'hlname'){  this.setState({ nhlastname : evt.target.value }) }
        else if(evt.target.id === 'hemail'){  this.setState({ nhemail : evt.target.value }) }
        else{ this.setState({ nhcity : evt.target.value }) }
    }
    updateInfoHandler = (evt)=>{
        if(evt.target.id === 'e_hfname'){ this.setState({ edit_hfirstname : evt.target.value }) }
        else if(evt.target.id === 'e_hlname'){  this.setState({ edit_hlastname : evt.target.value }) }
        else if(evt.target.id === 'e_hemail'){  this.setState({ edit_hemail : evt.target.value }) }
        else{ this.setState({ edit_hcity : evt.target.value }) }
    }
    //-------------------------
    updateHeroHandler = (evt)=>{
        evt.preventDefault();
        axios
        .post("https://crudserver.aravindaddula.repl.co/"+this.state.edit_hid,{
            firstname : this.state.edit_hfirstname,
            lastname : this.state.edit_hlastname,
            email : this.state.edit_hemail,
            city : this.state.edit_hcity
        })
        .then((res)=>{
            this.reload();
            this.setState({
                edit_hfirstname : '',
                edit_hlastname : '',
                edit_hemail : "",
                edit_hcity : '',
                edit_hid : '',
                show : true
            });
        })
        .catch(err=>console.log("Error : ", err))
    }
    //-----------------------------------
    cancelHandler = ()=>{
        this.setState({
            edit_hfirstname : '',
            edit_hlastname : '',
            edit_hemail : "",
            edit_hcity : '',
            edit_hid : '',
            show : true
        });
    }
    //-----------------------------------
    render(){
        return <div className='container'>
                    <h1> { this.state.title } </h1>
                    { this.state.show && <div className='row'>
                        <h1>Add User</h1>
                              <form>
                                <div className="mb-3">
                                    <label htmlFor="hfname" className="form-label">First Name</label>
                                    <input onChange={ this.changeHandler } className="form-control" id="hfname" value={ this.state.nhfirstname }/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="hlname" className="form-label">Last Name</label>
                                    <input onChange={ this.changeHandler } className="form-control" id="hlname" value={ this.state.nhlastname }/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="hemail" className="form-label">email</label>
                                    <input onChange={ this.changeHandler } type="email" className="form-control" id="hemail" value={ this.state.nhemail }/>
                                </div> 
                                <div className="mb-3">
                                    <label htmlFor="hcity" className="form-label">City</label>
                                    <input onChange={ this.changeHandler } className="form-control" id="hcity" value={ this.state.nhcity }/>
                                </div> 
                                <button onClick={this.addHeroHandler} type="submit" className="btn btn-primary">Add Hero</button>
                            </form>
                        </div>}

                    <hr/>
                    {/* <ol>{ this.state.heroeslist.map(hero => <li key={ hero._id }>{ hero.firstname +' '+hero.lastname }</li>)}</ol> */}
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
                        <tbody>{ this.state.heroeslist.map((hero, idx) => <tr key={ hero._id }>
                                        <th>{ idx + 1 }</th>
                                        <td>{ hero.firstname }</td>
                                        <td>{ hero.lastname }</td>
                                        <td>{ hero.email }</td>
                                        <td>{ hero.city }</td>
                                        <td> <button onClick={()=> this.editHandler( hero._id )} className='btn btn-warning'>Edit </button> </td>
                                        <td> <button onClick={()=> this.deleteHandler( hero._id )} className='btn btn-danger'>Delete </button> </td>
                                        </tr>)
                            }</tbody>
                        </table>
                       {/*  <ul>
                            <li>Firstname : { this.state.nhfirstname }</li>
                            <li>Lastname : { this.state.nhlastname }</li>
                            <li>email : { this.state.nhemail }</li>
                            <li>City : { this.state.nhcity }</li>
                        </ul> */}
                        { !this.state.show && <div className='row'>
                            <h1>Edit Selected Hero's Information</h1>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="e_hfname" className="form-label">First Name</label>
                                    <input onChange={ this.updateInfoHandler } className="form-control" id="e_hfname" value={ this.state.edit_hfirstname }/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="e_hlname" className="form-label">Last Name</label>
                                    <input onChange={ this.updateInfoHandler } className="form-control" id="e_hlname" value={ this.state.edit_hlastname }/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="e_hemail" className="form-label">email</label>
                                    <input onChange={ this.updateInfoHandler } type="email" className="form-control" id="e_hemail" value={ this.state.edit_hemail }/>
                                </div> 
                                <div className="mb-3">
                                    <label htmlFor="e_hcity" className="form-label">City</label>
                                    <input onChange={ this.updateInfoHandler } className="form-control" id="e_hcity" value={ this.state.edit_hcity }/>
                                </div> 
                                <button onClick={this.updateHeroHandler} type="submit" className="btn btn-primary me-3">Update Hero</button>
                                <button onClick={this.cancelHandler} type="submit" className="btn btn-success">Cancel</button>
                            </form>
                            </div>}
                      {/*  <ul>
                            <li>Firstname : { this.state.edit_hfirstname }</li>
                            <li>Lastname : { this.state.edit_hlastname }</li>
                            <li>email : { this.state.edit_hemail }</li>
                            <li>City : { this.state.edit_hcity }</li>
                            <li>Heri id : { this.state.edit_hid }</li>
                        </ul> */}
               </div>
    }
}

ReactDOM.render(<MainApp/>, document.getElementById("root"));
