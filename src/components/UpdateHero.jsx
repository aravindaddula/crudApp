export default function UpdateHero(){
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
    //-------------------------
    updateHeroHandler = (evt)=>{
        evt.preventDefault();
        axios
        .post("http://localhost:5050/edit/"+this.state.edit_hid,{
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
    updateInfoHandler = (evt)=>{
        if(evt.target.id === 'e_hfname'){ this.setState({ edit_hfirstname : evt.target.value }) }
        else if(evt.target.id === 'e_hlname'){  this.setState({ edit_hlastname : evt.target.value }) }
        else if(evt.target.id === 'e_hemail'){
              this.setState({ edit_hemail : evt.target.value }) 
            }
        else{ this.setState({ edit_hcity : evt.target.value }) }
    }

    return (
        <div>
            { !state.show && <div className='row'>
                        <h1>Edit Selected Hero's Information</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="e_hfname" className="form-label">First Name</label>
                                <input onChange={ updateInfoHandler } className="form-control" id="e_hfname" value={ state.edit_hfirstname }/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="e_hlname" className="form-label">Last Name</label>
                                <input onChange={ updateInfoHandler } className="form-control" id="e_hlname" value={ state.edit_hlastname }/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="e_hemail" className="form-label">email</label>
                                <input onChange={ updateInfoHandler } type="email" className="form-control" id="e_hemail" value={ state.edit_hemail }/>
                            </div> 
                            <div className="mb-3">
                                <label htmlFor="e_hcity" className="form-label">City</label>
                                <input onChange={ updateInfoHandler } className="form-control" id="e_hcity" value={ state.edit_hcity }/>
                            </div> 
                            <button onClick={updateHeroHandler} type="submit" className="btn btn-primary me-3">Update Hero</button>
                            <button onClick={cancelHandler} type="submit" className="btn btn-success">Cancel</button>
                        </form>
                    </div>
                }
        </div>
    )
}