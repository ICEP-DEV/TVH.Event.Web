import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faUsers, faBell, faCalendarAlt, faFileSignature, faCommentDots } from '@fortawesome/free-solid-svg-icons';



const SideBar = () => {
    return (
      <div className="d-flex flex-column flex-shrink-0 p-3" style={{width:280, backgroundColor:"#040081"}}>

        <Link to='/home' className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <h3 className="fs-4">Events System</h3>
        </Link>
        <hr style={{color:"white"}}/>

        <ul className="nav nav-pills flex-column mb-auto">
          <Link to="/home" className="nav-link text-white my-3">
            <FontAwesomeIcon icon={faCalendarCheck} class="bi me-2" width="24" height="24"/>
            Events
          </Link>


          <Link to="/organisers" className="nav-link text-white my-3">
            <FontAwesomeIcon icon={faUsers} class="bi me-2" width="24" height="24"/>
            &nbsp; Users
          </Link>


          <Link to="/notifications" className="nav-link text-white my-3">
            <FontAwesomeIcon icon={faBell} class="bi me-2" width="24" height="24"/>
            &nbsp; Notifications
          </Link>


          <Link to="/calendar" className="nav-link text-white my-3">
            <FontAwesomeIcon icon={faCalendarAlt} class="bi me-2" width="24" height="24"/>
            &nbsp; Calendar
          </Link>


          <Link to="/registrationform" className="nav-link text-white my-3">
            <FontAwesomeIcon icon={faFileSignature} class="bi me-2" width="24" height="24"/>
            &nbsp; Registration Form
          </Link>


          <Link to="/feedback" className="nav-link text-white my-3">
            <FontAwesomeIcon icon={faCommentDots} class="bi me-2" width="24" height="24"/>
            Feedback & Review
          </Link>
        </ul>

      </div>
    );
};

export default SideBar;