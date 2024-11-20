import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import axios from "axios";
import api from "../APIs/API";
import AllRegisteredComponent from "../components/manage_events/AllRegistered";
import SurveyComponent from "../components/manage_events/Survey";
import AllParticipantsComponent from "../components/manage_events/participants";
import Footer from "../components/Footer";



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
    const [attendees, setAttendees] = useState([])

    const [surveys, setSurveys] = useState([])

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
            Navigate({to : "/event/details", state : event });
        }catch(error){

        }
        
    }

    const deleteRegistrationForm = async(e)=>{
        e.preventDefault();
        await axios.delete(
            api + "register/form/" + register.registration_form_id
        ).then((response) => {
            Navigate({to : "/event/details", state : event });
        }).catch((error) =>{
            console.log(error)
        });
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

        const fetchRegister = async()=>{
            await axios.get(
                api + 'register/attendee/' + event.event_id
            ).then((response) =>{
                setAttendees(response.data.results)
            })
        }

        const fetchSurveys = async()=>{
            await axios.get(
                api + 'survey/all/' + event.event_id
            ).then((response) =>{
                setSurveys(response.data.results)
            })
            
        }
        fetchRegister();
        getRegister();
        fetchSurveys();

    }, [event]);


    const controllerStyle = (ctrl) =>(
        
        controller === ctrl ? {
            backgroundColor : "var(--blue2)",
            color : "white"
        } : {
            backgroundColor : "white",
            color : "black",
        }
    )

    const manageStyles = (ctrl) =>(
        manageController === ctrl ? {
            backgroundColor : "var(--blue2)",
            color : "white"
        } : {
            backgroundColor : "white"
        }
    )

    return (
        <div className="container-fluid m-0 p-0">
            <div className="d-flex">
                <SideBar />
                <div className="col">
                    <NavBar/>
                    <div className="d-flex container-fluid">
                        <div className="col-1">
                            <button className="btn" onClick={()=>{navigate("/event")}}>
                                Back
                            </button>
                        </div>
                        <div className="btn-group container-fluid  justify-self-center">
                            <button className="btn" onClick={()=>{setController("")}} style={controllerStyle("")}>
                                Registration Form
                            </button>
                            <button className="btn" onClick={()=>{setController("view")}} style={controllerStyle("view")}>
                                Manage Event
                            </button>
                            <button className="btn" onClick={()=>{setController("edit")}} style={controllerStyle("edit")}>
                                Edit Event
                            </button>
                        </div>
                    </div>
                    <div className="container-fluid">
                        {
                            controller === "" ? 
                                register.length === 0 ?
                                <div>
                                    <p className="pt-5 fs-3">{event.title} Registration Form </p> 
                                    <form onSubmit={handleRegisterSave}>
                                        <input type="text" className="form-control mt-3" value="Name" readOnly/>
                                        <input type="text" className="form-control mt-3" value="Surname" readOnly/>
                                        <input type="text" className="form-control mt-3" value="Email" readOnly/>
                                        <input type="text" className="form-control mt-3" value="Gender" readOnly/>
                                        <input type="text" className="form-control mt-3" value="Ethnic Group" readOnly/>
                                    { showAdditionalQuestions ?
                                        questions.map((question, index) => (
                                            <div key={index + 1} className="question-set">
                                            <input
                                                type="text"
                                                name={`question-${index}`}
                                                value={question}
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                                className="form-control mt-3"
                                            />
                                            </div>
                                        )) :    <></>

                                    }
                                        <div className="add-question-section mt-2">
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
                                        <button className="btn text-white" style={{backgroundColor:"var(--blue2)"}}>
                                            Create Register
                                        </button>
                                    </form>
                                </div>
                                : <div>
                                    <h3 className="pt-5">Form for {event.title}</h3>
                                    <form onSubmit={(e)=>{deleteRegistrationForm(e)}}>
                                        <input type="text" className="form-control mt-3" value="Name" readOnly/>
                                        <input type="text" className="form-control mt-3" value="Surname" readOnly/>
                                        <input type="text" className="form-control mt-3" value="Email" readOnly/>
                                        <input type="text" className="form-control mt-3" value="Gender" readOnly/>
                                        <input type="text" className="form-control mt-3" value="Ethnic Group" readOnly/>
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
                                        <button type="submit" className="mt-5 btn btn-danger">Delete Form</button>
                                    </form>
                                </div>
                            :   <div></div>
                        }
                        {
                            controller === "view" ? 
                                <div className="container-fluid mt-5">
                                    <div className="fs-3 ">
                                        {event.title}
                                    </div>
                                    <div className="d-flex mt-5 mx-2">
                                        <button className="col-lg-2 btn " onClick={()=>{setManageController("")}} style={manageStyles('')}>Registered</button>
                                        <button className="col-lg-2 btn " onClick={()=>{setManageController("participants")}} style={manageStyles('participants')}>Participants</button>
                                        <button className="col-lg-2 btn " onClick={()=>{setManageController("survey")}} style={manageStyles('survey')}>Survey</button>
                                    </div>
                                    {
                                        manageController === "" ?
                                        <AllRegisteredComponent attendees={attendees}/>
                                        : <></>
                                        
                                    }
                                    {
                                        manageController === "participants" ?
                                        <AllParticipantsComponent attendees={attendees}/>
                                        : <></>
                                        
                                    }
                                    {
                                        manageController === "survey" ?
                                        <SurveyComponent event_id={event.event_id} surveys={surveys} />
                                        : <></>
                                        
                                    }
                                </div>
                            :   <div></div>
                        }
                        {
                            controller === "edit" ? 
                                <div>
                                    <p className="fs-3 mt-5">Edit Event</p>
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
            <Footer/>
        </div>
    )
}






export default EventDetails;