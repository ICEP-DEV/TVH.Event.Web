import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import PieChart  from "../components/Graphs";
import AnimatedValue from "../components/AnimatedValue";
import axios from 'axios';
import api from "../APIs/API";
import Footer from "../components/Footer";







const FeedbackPage = () => {

  const [ events , setEvents ] = useState([])
  const [ totalApplicants, setTotalApplicants] = useState(null)
  const [ totalParticipants, setTotalParticipants] = useState(null)
  const [ totalReviews, setTotalReviews] = useState(null)
  const [ selectedEvent, setSelectedEvent ] = useState('');
  const [ attendees, setAttendees] = useState([])
  //const [ successful, setSetSuccessful] = useState([])
  const [ reviews, setReviews] = useState([])



  useState(()=>{
    
    const fetchEvents = async()=>{
      await axios.post(
        api + "event/fetchbyuser",
        {
          type : localStorage.getItem("type"),
          user_id : localStorage.getItem("user_id")
        }
      ).then((response) =>{
        setEvents(response.data.results)
      }).catch((error) =>{
        console.log(error)
      })
    }

    async function fetchReviews(){
      await axios.get(
        api + "feedback/event/" + parseInt(selectedEvent)
      ).then((response)=>{
        setReviews(response.data.results);
        setTotalReviews(reviews.length)
        console.log("Reached")
        console.log(reviews)
      }).catch((error) =>{
        console.log(error)
      })
    }

    fetchReviews();
    fetchEvents();
  })

  var totalParticipantsLabels = [
    "Successful Applicants",
    "Unsuccessful Applicants",
  ]

  var totalParticipantsValues = [
    totalParticipants,
    (totalApplicants - totalParticipants),
  ]

  var totalParticipantsColors = [
    "#40ccff",
    "#f70289",
  ]

  var reviewsLabels = [
    '1 Star',
    '2 Star',
    '3 Star',
    '4 Star',
    '5 Star',
  ]
  var reviewsValues = [
    12,32,64,31,12
  ]

  var reviewColors = [
    "#40ccff",
    "#e0ecff",
    '#f70289',
    '#011291',
    '#014091'
  ]


  const handleFilter = (e)=>{

    console.log("Reached : " + e.target.value)
    setSelectedEvent(e.target.value)
    function setSuccessfulApplicants(){
      let temp = []
      attendees.map((attendee) => {
        if(attendee.success === 1){
          temp.push(attendee)
        }
      })
      setTotalParticipants(temp.length);
    }

    async function getParticipants(){
      await axios.get(
        api + 'register/attendee/' + parseInt(e.target.value)
      ).then((response) =>{
        setAttendees(response.data.results);
        setTotalApplicants(response.data.results.length);
        
        let temp = []
        response.data.results.map((attendee)=>{
          if(attendee.success === 1){
            temp.push(attendee)
          }
        })
        setTotalParticipants(temp.length)

      }).catch((error)=>{
        console.log(error)
      })
    }

    async function getReviews(){
      await axios.get(
        api + "feedback/event/" + parseInt(e.target.value)
      ).then((response)=>{
        setReviews(response.data.results);
        setTotalReviews(response.data.results.length)
        //console.log(totalReviews)
      }).catch((error) =>{
        console.log(error)
      })
    }
    getReviews();
    getParticipants();

  }

  const decodeResponses = (responses)=>{
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(new Uint8Array(responses.data));
    console.log(text);
    return text;
  }

  return <div className="container-fluid">
    <div className="row">
      <SideBar/>
      <div className="col">
        <NavBar/>
        <div className="col-4 d-flex ">
          <select onChange={handleFilter} name="" id="" className="form-select" >
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
          selectedEvent !== '' ?
          <div style={{marginTop:"40"}}>
            <div className="row mt-2">
              <div className="col-lg-4 p-2">
                <div className="container" style={{backgroundColor:'var(--blue)'}}>
                  <p className="text-white">
                    Total Applicants
                  </p>
                  < PieChart 
                    labels={['Total Applications']} values={[totalApplicants]} colors={['#f70289']}
                  />
        
                  <h4 className="text-white d-flex justify-content-center pt-2">
                    <AnimatedValue 
                      start={0} end={totalApplicants} duration={1000}
                    />
                    <p className="pt-0 pb-0 p-3">Applicants</p>
                  </h4>

                </div>
              </div>
              <div className="col-lg-4 p-2">
                <div className="container" style={{backgroundColor:'var(--blue)'}}>
                  <p className="text-white">
                    Total Participants
                  </p>
                  < PieChart 
                    labels={totalParticipantsLabels} values={totalParticipantsValues} colors={totalParticipantsColors}
                  />
                  <h4 className="text-white d-flex justify-content-center pt-2">
                    <AnimatedValue 
                      start={0} end={totalParticipants} duration={1000}
                    />
                    <p className="pt-0 pb-0 p-3">Participants</p>
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 p-2">
                <div className="container" style={{backgroundColor:'var(--blue)'}}>
                  <p className="text-white">
                    Reviews
                  </p>
                  < PieChart 
                    labels={reviewsLabels} values={reviewsValues} colors={reviewColors}
                  />
                  <h4 className="text-white d-flex  justify-content-center pt-2">
                    <AnimatedValue 
                      start={0} end={totalReviews} duration={1000}
                    />
                    <p className="pt-0 pb-0 p-3">Reviews</p>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-4">
              <select name="" id="" className="form-select">
                <option value="" >
                  All Ratings
                </option>
                  {
                    reviewsLabels.map((review) =>(
                      <option
                        key={review}
                        value={review}
                      >
                        {review}
                      </option>
                    ))
                  }
              </select>
            </div>
            {
              reviews.map((review) =>(
                <div key={review.feedback_id} className="mt-2 p-5 pt-2 pb-1 text-black rounded-4" style={{background:"#f5f6f7"}}>
                  <div className="d-flex justify-content-between">
                    <p className="fs-3">
                      Yinhla Makamu
                    </p>
                    <div>rating - {review.rating}</div>
                  </div>
                  <hr />
                  {
                    decodeResponses(review.responses)
                  }
                </div>
              ))
            }
          </div>
          
          : <></>
        }
        <div style={{height:"10vh"}}>

        </div>
      </div>
    </div>
    
    <Footer/>
  </div>
}




export default FeedbackPage;






