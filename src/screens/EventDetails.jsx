import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import axios from "axios";
import api from "../APIs/API";
//import ParticipantsComponent from "../components/manage_events/allParticipants";
import AllRegisteredComponent from "../components/manage_events/AllRegistered";
import SurveyComponent from "../components/manage_events/Survey";
import AllParticipantsComponent from "../components/manage_events/participants";



const EventDetails = () =>{

    const loc = useLocation();
    const { event } = loc.state || {};
    const navigate = useNavigate()
    const [register, setRegister] = useState([])
    const [controller, setController] = useState("")

    //Register Form
    const [questions, setQuestions] = useState([]); 
    const [showAdditionalQuestions, setShowAdditionalQuestions] = useState(false); 

    // Edit event
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [image, setImage] = useState(null)

    // manage events
    const [manageController, setManageController] = useState("")

    const handleEditEvent = async() => {
        
    }

    const addQuestion = () => {
        setShowAdditionalQuestions(true); // Show additional question fields
        setQuestions([...questions, ""]); // Add a new empty input field
    };

    const handleChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index] = e.target.value;
        setQuestions(newQuestions);
    };

    const handleRegisterSave = async(e) =>{
        try{
            e.preventDefault()
            const response = await axios.post(
                api + 'register/create',
                {
                    event_id : event.event_id,
                    questionair : questions 
                }
            );
            if(response.data.message === "Successfully Created"){
                Navigate({to : "/event/details", state : event });
            }
        }catch(error){

        }
        
    }


    useEffect(() => {
        setTitle(event.title)
        setTime(event.time)
        setDescription(event.description)
        setLocation(event.location)
        setEnd_date(event.end_date)
        setStart_date(event.start_date)
        setImage(event.image)
        setController('')
        const getRegister = async()=>{
            await axios.get(api + 'register/' + event.event_id)
            .then((response)=>{
                setRegister(response.data.results)
            }).catch((error)=>{
                setRegister([])
            })
        }

        getRegister()

    }, [event]);


    const controllerStyle = (ctrl) =>(
        
        controller === ctrl ? {
            backgroundColor : "var(--blue)"
        } : {
            backgroundColor : "white",
            color : "black",
        }
    )

    const manageStyles = (ctrl) =>(
        manageController === ctrl ? {
            backgroundColor : "var(--grey)"
        } : {
            backgroundColor : "white"
        }
    )

    return (
        <div className="container-fluid">
            <NavBar/>
            <div className="row">
                <SideBar />
                <div className="col">
                    <div className="d-flex container-fluid">
                        <div className="col-1">
                            <button className="btn" onClick={()=>{navigate("/event")}}>
                                Back
                            </button>
                        </div>
                        <div className="btn-group container-fluid  justify-self-center">
                            <button className="btn btn-primary" onClick={()=>{setController("")}} style={controllerStyle("")}>
                                Registration Form
                            </button>
                            <button className="btn btn-primary" onClick={()=>{setController("view")}} style={controllerStyle("view")}>
                                Manage Event
                            </button>
                            <button className="btn btn-primary" onClick={()=>{setController("edit")}} style={controllerStyle("edit")}>
                                Edit Event
                            </button>
                        </div>
                    </div>
                    <div className="container-fluid">
                        {
                            controller === "view" ? 
                                register.length === 0 ?
                                <div>
                                    <h3 className="pt-5">Registration Form </h3> 
                                    <form onSubmit={handleRegisterSave}>
                                        <input type="text" className="form-control mt-3" value="Name" readOnly/>
                                        <input type="text" className="form-control mt-3" value="Surname" readOnly/>
                                    {showAdditionalQuestions &&
                                        questions.slice(1).map((question, index) => (
                                            <div key={index + 1} className="question-set">
                                            <input
                                                type="text"
                                                name={`question-${index + 1}`}
                                                value={question}
                                                onChange={(e) => handleChange(index + 1, e)}
                                                required
                                                className="form-control mt-3"
                                            />
                                            </div>
                                        ))}
                                        <div className="add-question-section">
                                            <div className="add-question-icon" onClick={addQuestion}>
                                            <i
                                                className="fas fa-plus-circle"
                                                style={{ fontSize: "24px", color: "#007bff", cursor: "pointer" }}
                                            ></i>
                                            </div>
                                            <label style={{ marginLeft: "10px", fontSize: "16px" }}>
                                                Add form question
                                            </label>
                                        </div>
                                        <button className="btn btn-info">
                                            Create Register
                                        </button>
                                    </form>
                                </div>
                                : <div>
                                    <h3 className="pt-5">Form for {event.title}</h3>
                                    <form action="">
                                        <input type="text" className="form-control mt-3" value="Name" readOnly/>
                                        <input type="text" className="form-control mt-3" value="Surname" readOnly/>
                                        {
                                            register.questionair.map((question) => (
                                                <input 
                                                    key={question}
                                                    value={question}
                                                    className="form-control mt-3"
                                                    readOnly
                                                />
                                            ))
                                        }
                                        <button className="mt-5 btn btn-danger">Delete Form</button>
                                    </form>
                                </div>
                            :   <div></div>
                        }
                        {
                            controller === "" ? 
                                <div className="container-fluid">
                                    <div className="fs-2 mt-5">
                                        {event.title}
                                    </div>
                                    <div className="d-flex mt-5 mx-2">
                                        <button className="col-lg-2 btn " onClick={()=>{setManageController("")}} style={manageStyles('')}>Registered</button>
                                        <button className="col-lg-2 btn " onClick={()=>{setManageController("participants")}} style={manageStyles('participants')}>Participants</button>
                                        <button className="col-lg-2 btn " onClick={()=>{setManageController("survey")}} style={manageStyles('survey')}>Survey</button>
                                    </div>
                                    {
                                        manageController === "" ?
                                        <AllRegisteredComponent event_id={event.event_id}/>
                                        : <></>
                                        
                                    }
                                    {
                                        manageController === "participants" ?
                                        <AllParticipantsComponent/>
                                        : <></>
                                        
                                    }
                                    {
                                        manageController === "survey" ?
                                        <SurveyComponent/>
                                        : <></>
                                        
                                    }
                                </div>
                            :   <div></div>
                        }
                        {
                            controller === "edit" ? 
                                <div>
                                    <h3>Edit Event</h3>
                                    <form id="eventForm" onSubmit={handleEditEvent} encType="multipart/form-data">
                                        <div className="form-group">
                                            <label >Event Name: </label>
                                            <input
                                            type="text"
                                            value={title}
                                            disabled
                                            className="form-control"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Event Description</label>
                                            <textarea
                                            name="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="form-control"
                                            rows="3"
                                            ></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label>Time:</label>
                                            <input
                                            type="time"
                                            name="time"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Location:</label>
                                            <input
                                            type="text"
                                            name="location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Start Date:</label>
                                            <input
                                            type="date"
                                            name="start_date"
                                            value={start_date}
                                            onChange={(e) => setStart_date(e.target.value)}
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>End Date:</label>
                                            <input
                                            type="date"
                                            name="end_date"
                                            value={end_date}
                                            onChange={(e) => setEnd_date(e.target.value)}
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Image</label>
                                            <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            
                                            onChange={(e) => setImage(e.target.files[0])}
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="buttons mt-4">
                                            <button type="submit" className="btn btn-primary">
                                            Save Event
                                            </button>
                                        </div>
                                        </form>
                                </div>
                            :   <div></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}






export default EventDetails;