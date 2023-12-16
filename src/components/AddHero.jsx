export default function AddHero(){
    const state = {
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
    addHeroHandler = (evt)=>{
        evt.preventDefault();
        axios.post("http://localhost:5050/data",{
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
    changeHandler = (evt)=>{
        if(evt.target.id === 'hfname'){ this.setState({ nhfirstname : evt.target.value }) }
        else if(evt.target.id === 'hlname'){  this.setState({ nhlastname : evt.target.value }) }
        else if(evt.target.id === 'hemail'){  this.setState({ nhemail : evt.target.value }) }
        else{ this.setState({ nhcity : evt.target.value }) }
    }

    return(
        <div className="container">
           {state.show &&
                <div className='row'>
                    <h1>Add User</h1>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="hfname" className="form-label">First Name</label>
                            <input onChange={ changeHandler } className="form-control" id="hfname" value={ state.nhfirstname } />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hlname" className="form-label">Last Name</label>
                            <input onChange={ changeHandler } className="form-control" id="hlname" value={ state.nhlastname } />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hemail" className="form-label">email</label>
                            <input onChange={ changeHandler } type="email" className="form-control" id="hemail" value={ state.nhemail } />
                        </div> 
                        <div className="mb-3">
                            <label htmlFor="hcity" className="form-label">City</label>
                            <input onChange={ changeHandler } className="form-control" id="hcity" value={ state.nhcity } />
                        </div> 
                        <button onClick={addHeroHandler} type="submit" className="btn btn-primary">Add Hero</button>
                    </form>
                </div>}
        </div>
    )
}

