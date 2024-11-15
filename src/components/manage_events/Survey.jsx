import axios from "axios";
import { useEffect, useState } from "react";



const SurveyComponent = ()=>{
    const [surveys, setSurveys] = useState([])
    const handleSubmission = async()=>{

    }

    const openForm = ()=>{

    }

    useEffect(()=>{
        async function fetchSurveys(){
            
        }
        fetchSurveys();
    })

    return <div className="container-fluid mt-2">
        <button className="btn btn-info" onClick={openForm()}>
            Create New Survey
        </button>
        <table className="table">
            <thead>
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
            </thead>
            <tbody>
                {
                    surveys.map((survey) => (
                        <tr>
                            <td>
                                {survey.title}
                            </td>
                            <td>
                                {survey.create_at}
                            </td>
                            <td>
                                {survey.expires_at}
                            </td>
                            <td>
                                <button className="btn">
                                    View Questions
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