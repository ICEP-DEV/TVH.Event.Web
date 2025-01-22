import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import api from "../../APIs/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } from "@fortawesome/free-solid-svg-icons";


const SurveyComponent = ({surveys, event_id, config})=>{
    const [error, setError] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [surveyTitle, setSurveyTitle] = useState("")
    const [surveyExpires, setSurveyExpires] = useState(null)
    const [surveyActive, setSurveyActive] = useState(null)
    const [surveyQuestions, setSurveyQuestions] = useState([])

    //const [questions, setQuestions] = useState([]);
    const [showAdditionalQuestions, setShowAdditionalQuestions] = useState(false); 

    const addSurveyQuestion = ()=>{
        setShowAdditionalQuestions(true)
        setSurveyQuestions([...surveyQuestions, ""]);
    }

    const handleQuestionChange = (index, e)=>{
        const newQuestions = [...surveyQuestions];
        newQuestions[index] = e.target.value;
        setSurveyQuestions(newQuestions)
    }

    const handleSubmission = async(e)=>{
        e.preventDefault();
        const data = {
            active_from : surveyActive,
            expires : surveyExpires,
            event_id,
            questions : surveyQuestions,
            title : surveyTitle
        }
        await axios.post(
            api + "survey/create",
            data,
            config
        ).then((response) =>{
            window.location.reload()
        }).catch((error)=>{
            setError(true)
            console.log(error)
        })
    }

    const modalStyles = {
        
    }


    return <div className="container-fluid mt-2">
        
        <button className="btn mb-2 text-white" style={{backgroundColor:"var(--blue2)"}} onClick={()=>{setIsFormOpen(true)}}>
            Create New Survey
        </button>
        <Modal
            isOpen = {isFormOpen}
            onRequestClose={()=>{setIsFormOpen(false)}}
            style={modalStyles}
        >
            <div className="d-flex flex-column">
                <button 
                    onClick={()=>{setIsFormOpen(false)}}
                    className="col-1 btn btn-danger align-self-end" >Close</button>
                <hr />
            </div>
            { error === true ? 
                <div className="alert alert-danger">
                    Something went wrong
                    <i className="fa fa-times-circle" style={{position:"absolute" ,right:20, fontSize:24}} onClick={()=>{setError(false)}}></i>
                </div>
                : <></>
            }
            <form onSubmit={handleSubmission}>
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder="Survey Title" onChange={(e)=>{setSurveyTitle(e.target.value)}} required/>
                </div>
                <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" onChange={(e)=>setSurveyActive(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input type="date" className="form-control" onChange={(e)=>setSurveyExpires(e.target.value)}/>
                </div>
                <div className="my-2 btn btn-success" onClick={addSurveyQuestion}>
                    Add Question
                </div>

                {
                    showAdditionalQuestions ?
                        surveyQuestions.map((question, index) => (
                            <input 
                                key={index}
                                type="text"
                                className="form-control"
                                value={question}
                                onChange={(e) => handleQuestionChange(index, e)}
                            />
                        ))
                    : <></>
                }

                <div>
                    <button className="btn my-2 text-white" type="submit" style={{backgroundColor:"var(--blue1)"}}>Create Survey</button>
                </div>
            </form>
        </Modal>
        <table className="table">
            <thead>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Active From
                    </th>
                    <th>
                        Expires
                    </th>
                    <th>
                        Questions
                    </th>
                    <th>

                    </th>
                </tr>
            </thead>
            <tbody>
                {
                
                    surveys.map((survey) => (
                        
                        <tr key={survey.survey_id}>
                            <td>
                                {survey.title}
                            </td>
                            <td>
                                {survey.create_at?.split('T')[0]}
                            </td>
                            <td>
                                {survey.expires_at?.split('T')[0]}
                            </td>
                            <td>
                                <button className="btn">
                                    View Questions
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>


        
    </div>
}



export default SurveyComponent;