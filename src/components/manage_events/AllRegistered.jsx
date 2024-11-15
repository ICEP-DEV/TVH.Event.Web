import axios from "axios";
import api from "../../APIs/API";
import { useEffect, useState } from "react";




const AllRegisteredComponent = ({event_id})=>{
    console.log(event_id)
    const [registered, setRegistered] = useState([]);
    
    useEffect(()=>{
        const fetchRegister = async()=>{
            await axios.get(
                api + 'register/attendee/' + event_id
            ).then((response) =>{
                setRegistered(response.data.results)
            })
        }
        fetchRegister();
    },[])



    return <div className="container-fluid mt-2" style={{minHeight: "70vh"}}>
        <table className="table">
            <thead>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Date</th>
                <th>Reponses</th>
            </thead>
            <tbody>
                {
                    registered.map((attendee)=>(
                        <tr>
                            <td>{attendee.first_name}</td>
                            <td>{attendee.last_name}</td>
                            <td>{attendee.email}</td>
                            <td>{attendee.submitted_at.replace('T',' ').split('.')[0]}</td>
                            <td><div className="btn btn-primary">View Responses</div></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>

}



export default AllRegisteredComponent;