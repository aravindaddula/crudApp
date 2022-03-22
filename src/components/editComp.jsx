import React from 'react'
export default class EditHandler extends React.Component{
    render(){
        return <div>
            {

                editHandler = (heroid)=>{
                    axios
                    .get("http://localhost:5050/edit/" + heroid)
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

            }
        </div>
    }
}

