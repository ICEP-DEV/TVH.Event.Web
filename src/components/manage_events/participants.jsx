import {QRCodeSVG} from 'qrcode.react';
import { useState } from 'react';
import api from '../../APIs/API';
import axios from 'axios';

const AllParticipantsComponent = ({attendees, event, config})=>{
    const [isQROpen, setIsQROpen] = useState(false);
    const [searchParticipant, setSearchParticipant] = useState('')

    const [participantsList, setParticipantsList]  = useState(attendees)

    
    const removeParticipant = async(participant)=>{

        const index = participantsList.findIndex(
            (a) => a.registration_id === participant.registration_id
        );
        if(index !== -1){
            await axios.delete(
                api + 'attendee/events/' + participant.registration_id,
                config
            ).catch((error) =>{
                console.log(error)
                return; 
            })
        }
        const newParticipants = [...participantsList];
        newParticipants[index].successful = 0; 
        setParticipantsList(newParticipants); 
    }

    return <div className="container-fluid">
        {
            isQROpen === true ?
            <div className='col-6 d-flex flex-column rounded-3' style={{
                position : 'absolute',
                background:'#eee',
                zIndex: 1,
                left : '25%',
                top : '25%',
                }}>
                <button onClick={()=>{setIsQROpen(false)}} className='col-1 btn btn-danger align-self-end'>Close</button>
                <p className='text-center'>
                    Scan the QR Code to register your attendence
                </p>
                <div className='align-self-center pb-3'>
                    <QRCodeSVG 
                        value={
                            JSON.stringify(
                                {
                                    "api" : "/attendee/events/" + event.event_id,
                                }
                            )
                        }   
                        //scale={150} 
                        size={450}
                    />
                </div>
            </div>
            :<></>
        }
        <div className="d-flex">
            <div className="col-6 my-2">
                <input 
                    type="search" 
                    className="form-control" 
                    placeholder="Search participant"
                    value={searchParticipant}
                    onChange={(e)=>setSearchParticipant(e.target.value.toLowerCase())}    
                />
            </div>
            <div className="col-3 align-self-center">
                <button className="btn btn-success" onClick={()=>{setIsQROpen(true)}}>QR Code</button>
            </div>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Date</th>
                    <th>Remove Participant</th>
                    <th>Reponses</th>
                </tr>
            </thead>
            <tbody>
                {   
                    participantsList.filter((participant)=>
                        participant.first_name.toLowerCase().includes(searchParticipant) ||
                        participant.last_name.toLowerCase().includes(searchParticipant) ||
                        participant.email.toLowerCase().includes(searchParticipant) 
                    ).map((participant)=>(
                        participant.successful === 1 ?
                        <tr key={participant.registration_id}>
                            <td>{participant.first_name}</td>
                            <td>{participant.last_name}</td>
                            <td>{participant.email}</td>
                            <td>{participant.submitted_at.replace('T',' ').split('.')[0]}</td>
                            <td>
                                <div className="btn btn-danger" onClick ={()=>{removeParticipant(participant)}}>
                                    Remove Participant
                                </div>
                            </td>
                            <td><div className="btn btn-success">View Responses</div></td>
                        </tr>
                        : null
                    ))
                }
            </tbody>
        </table>

        
    </div>

}




export default AllParticipantsComponent;