import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import React, { useState } from "react";
import axios from 'axios';
import api from "../APIs/API";
import InfoBox from "../components/dashboard/infobox";
import { BarGraphComponent, PieChart, ReviewGaugeComponent} from "../components/Graphs";
import Modal from 'react-modal';





const FeedbackPage = ()=>{
  const [ events , setEvents ] = useState([]) 
  const [ surveys , setSurveys ] = useState([]) 
  
  const [ selectedEvent, setSelectedEvent ] = useState('');
  const [ selectedSurveyID, setSelectedSurveyID ] = useState('0');
  const [ feedbacks, setFeedbacks ] = useState([])

  // Chart data
  const [ totalApplicants, setTotalApplicants] = useState(0)
  const [ totalParticipants, setTotalParticipants] = useState(0)
  const [ reviews , setReviews] = useState([])
  const [ reviewsFiltered, setReviewsFiltered] = useState([])
  const [ ratings, setRatings] = useState([])
  //const [ attendees, setAttendees] = useState([])


  // Gender
  const [ maleApplicants, setMaleApplicants] = useState(0)
  const [ femaleApplicants, setFemaleApplicants] = useState(0)

  const [ maleParticipants, setMaleParticipants] = useState(0)
  const [ femaleParticipants, setFemaleParticipants] = useState(0)

  // Ethnic Groups
  const [ africanApplicants, setAfricanApplicants ] = useState(0)
  const [ whiteApplicants , setWhiteApplicants ] = useState(0)
  const [ colouredApplicants, setColouredApplicants ] = useState(0)
  const [ indianApplicants, setIndianApplicants ] = useState(0)
  const [ otherApplicants, setOtherApplicants ] = useState(0)

  const [ africanParticipants, setAfricanParticipants ] = useState(0)
  const [ whiteParticipants , setWhiteParticipants ] = useState(0)
  const [ colouredParticipants, setColouredParticipants ] = useState(0)
  const [ indianParticipants, setIndianParticipants ] = useState(0)
  const [ otherParticipants, setOtherParticipants ] = useState(0)

  const token = localStorage.getItem("token")
  const config = {
    headers : {
      "token" : `Bearer ${token}`
    }
  }

  useState(()=>{
    
    const fetchEvents = async()=>{
      await axios.post(
        api + "event/fetchbyuser",
        {
          type : localStorage.getItem("type"),
          user_id : localStorage.getItem("user_id")
        },
        config
      ).then((response) =>{
        setEvents(response.data.results)
      }).catch((error) =>{
        console.log(error)
      })
    }

    fetchEvents();
  });


  const handleEventFilter = (e) =>{
    setSelectedEvent(e.target.value)

    async function getParticipants(){
      await axios.get(
        api + 'register/attendee/' + parseInt(e.target.value), config
      ).then((response) =>{
        //setAttendees(response.data.results);
        setTotalApplicants(response.data.results.length);
        
        let temp = []
        response.data.results.map((attendee)=>(
          attendee.successful === 1 ?
            temp.push(attendee)
            : {}
        ));
        setTotalParticipants(temp.length)


        getGender(response.data.results, temp);
        getGroups(response.data.results, temp);

      }).catch((error)=>{
        console.log(error)
      })
    }

    function getGender(applicants,participants){
      let tempMales = 0, tempFemales = 0

      applicants.map((applicant) =>(
        applicant.gender === 'Male' ? 
          tempMales += 1
          : tempFemales += 1
      ))

      setMaleApplicants(tempMales)
      setFemaleApplicants(tempFemales)

      tempMales = 0 
      tempFemales = 0
      participants.map((applicant) =>(
        applicant.gender === 'Male' ? 
          tempMales += 1
          : tempFemales += 1
      ))
      setMaleParticipants(tempMales)
      setFemaleParticipants(tempFemales)
    }

    function getGroups(applicants, participants){
      let africans = 0, whites = 0, coloured = 0, indians = 0, other = 0;
      applicants.map((applicant)=>{
        switch(applicant.ethnic_group){
          case "African":
            africans++
            break;
          case "White":
            whites++
            break;
          case "Coloured":
            coloured++
            break;
          case "Indian":
            indians++
            break;
          default :
            other++
        }
      });
      
      setAfricanApplicants(africans)
      setColouredApplicants(coloured)
      setWhiteApplicants(whites)
      setIndianApplicants(indians)
      setOtherApplicants(other)

      africans = 0; whites = 0; coloured = 0; indians = 0; other = 0;


      participants.map((participant)=>{
        switch(participant.ethnic_group){
          case "African":
            africans++
            break;
          case "White":
            whites++
            break;
          case "Coloured":
            coloured++
            break;
          case "Indian":
            indians++
            break;
          default :
            other++
        }
      });

      setAfricanParticipants(africans)
      setColouredParticipants(coloured)
      setWhiteParticipants(whites)
      setIndianParticipants(indians)
      setOtherParticipants(other)
    }

    async function getSurveys(){
      await axios.get(
        api + "survey/all/" + parseInt(e.target.value), config
      ).then((response) => {
        setSurveys(response.data.results)
      }).catch((error) =>{
        console.log(error)
      })
    }

    const getRatings = (results) =>{
      let y = [0,0,0,0,0];
      results.map((result) => {
        switch(result.rating){
          case 1:
            y[0] = y[0] + 1
            break;
          case 2:
            y[1] = y[1] + 1
            break;
          case 3:
            y[2] = y[2] + 1
            break;
          case 4:
            y[3] = y[3] + 1
            break;
          default:
            y[4] = y[4] + 1
            
        }
      })
      setRatings(y)
      
    }
    

    async function getReviews(){
      await axios.get(
        api + "reviews/event/" + parseInt(e.target.value), config
      ).then((response) =>{
        setReviews(response.data.results)
        setReviewsFiltered(response.data.results)
        getRatings(response.data.results)
      }).catch((error) =>{
        console.log(error.message)
      })
    }

    

    getParticipants();
    getSurveys();
    getReviews();
  }

  
  const handleReviewFilter = (e)=>{
    if(e.target.value === '0'){
      setReviewsFiltered(reviews)
    }
    else{
      setReviewsFiltered(reviews.filter( (r) => r.rating === parseInt(e.target.value) ))
    }
  }

  const handleSurveyFilter = (e) =>{
    setSelectedSurveyID(e.target.value);

    async function getSurvey(){
      await axios.get(
        api + "feedback/event/" + parseInt(selectedEvent), config
      ).then((response) =>{
        setFeedbacks(response.data.results)
      }).catch((error) =>{
        console.log(error)
      })
    }

    getSurvey();
  }

  function calculateAverageRating(){
    // Calculate 
    let sum = 0;
    reviews.map((review) =>{
      sum += review.rating
    })
    
    return (sum / reviews.length).toFixed(2);
  }


  return <div className="container-fluid p-0">
    <div className="d-flex">
      <SideBar />
      <div className="col m-5">
        <div className="col-3 d-flex ">
          <select onChange={handleEventFilter} className="form-select" >
            <option value="">-- Select an event --</option>
            {
              events.map((event) =>(
                <option
                  key={event.event_id}
                  value={event.event_id}
                >
                  {event.title}
                </option>
              ))
            }
          </select>
        </div>
        {
          selectedEvent !== "" ?
          <div className="col">
            <div className="row ps-3 py-3">
              <InfoBox title="Total Applications" quantity={totalApplicants} colour="var(--blue)" />
              <InfoBox title="Total Participants" quantity={totalParticipants} colour="var(--blue1)" />
              <InfoBox title="Total Surveys Sent" quantity={surveys.length} colour="var(--blue2)" />
              <InfoBox title="Overall Average Rating" quantity={calculateAverageRating()} colour="var(--blue2)" />
            </div>
            <div className="row mb-5">
              <div className="col-md mt-2">
                <BarGraphComponent 
                  label_1={"Total Applications"}
                  label_2={"Total Participants"}
                  labels={["Male", "Females"]}
                  values_1={[maleApplicants,femaleApplicants]}  
                  values_2={[maleParticipants,femaleParticipants]} 
                  colour_1={"#79cbf7"}
                  colour_2={"#005e61"}
                />
              </div>
              <div className="col-1"></div>
              <div className="col-md mt-2">
                <BarGraphComponent 
                  label_1={"Total Applications"}
                  label_2={"Total Participants"}
                  labels={["African", "White", "Coloured", "Indian", "Other"]}
                  values_1={[africanApplicants, whiteApplicants, colouredApplicants,indianApplicants,otherApplicants]}
                  values_2={[africanParticipants, whiteParticipants, colouredParticipants,indianParticipants,otherParticipants]}
                  colour_1={"#79cbf7"}
                  colour_2={"#005e61"}
                />
              </div>
            </div>

            <div className="row mb-5">
              
              <div className="col-lg-5 mt-2">
                {
                  /*
                  <RatingGraph 
                  label={["1 Star", "2 Star","3 Star","4 Star","5 Star"]}
                  values={ratings}
                  labels={["Ratings"]}
                  colors={["#93dffa", "#79cbf7","#005e61","#003a57","#000238"]}
                />
                  */
                }
                <p>
                  Overall Ratings
                </p>
                <ReviewGaugeComponent
                  label={["1 Star", "2 Star","3 Star","4 Star","5 Star"]}
                  values={ratings}
                />
              </div>
              <div className="col rounded-3 pt-2 px-2" >
                <div className="col-2">
                  <select className="form-select" name="" id="" onChange={handleReviewFilter}>
                    <option value="0">All Reviews</option>
                    <option value="1">1 Star Reviews</option>
                    <option value="2">2 Star Reviews</option>
                    <option value="3">3 Star Reviews</option>
                    <option value="4">4 Star Reviews</option>
                    <option value="5">5 Star Reviews</option>
                  </select>
                </div>

                <div className="container-fluid pt-1 overflow-auto" style={{height : "25vh"}}>
                  {
                    reviewsFiltered.map((review) =>(
                      <div key={review.reviews_id} className="row my-2 p-1 border-bottom">
                        {review.content}
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            <div className="col-3">
              <select className="form-select" onChange={handleSurveyFilter}>
                <option value="0">-- Select a Survey --</option>
                {
                  surveys.map((survey) =>(
                    <option 
                      key={survey.survey_id}  
                      value={survey.title}
                    >
                      {survey.title}
                    </option>
                  ))
                }
              </select>
            </div>
            {
              selectedSurveyID !== "0" ?
              <div className="row mt-5">
                <div className="col">
                  <table className="table table-hover">
                    <thead className="table-active">
                      <tr>
                        <th>Date</th>
                        <th>First Names</th>
                        <th>Last Name</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        feedbacks.map((feedback)=>(
                          <tr key={feedback.feedback_id}>
                            <td>{feedback.submitted_at.split('T')[0]} {feedback.submitted_at.split('T')[1].split('.')[0]}</td>
                            <td>{feedback.first_name}</td>
                            <td>{feedback.last_name}</td>
                            <td>{feedback.responses.split('|')[0]}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <div className="col-4">
                  <PieChart 
                    labels={[
                      'Submitted',
                      'Not Submitted',
                    ]}
                    values={[
                      feedbacks.length, totalParticipants-feedbacks.length
                    ]}
                    colors={[
                      "#79cbf7",
                      "#005e61",
                    ]}
                  />
                </div>
              </div>

              : <></>
            }
          </div>

          : <></>
        }
      </div>
    </div>
    <Modal></Modal>
    <Footer/>
  </div>
}


// Could add a time line of when people actually fill in surveys


export default FeedbackPage;
