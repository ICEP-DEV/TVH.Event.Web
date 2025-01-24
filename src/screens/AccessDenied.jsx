import React from "react";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeh } from "@fortawesome/free-solid-svg-icons";



const AccessDenied = ()=>{



    return <div className="container-fluid p-0">
        <div className="d-flex">
            <SideBar />
            <div className="col m-5 p-5">
                <FontAwesomeIcon 
                    icon={faMeh}
                    color="#ff7070"
                    className="fs-1"
                />
                <span className="fs-1 ms-5" style={{color: "#ff7070"}}> 
                    Sorry but you do not have access to this page
                </span>
            </div>
        </div>
        
        <Footer />
    </div>
}




export default AccessDenied;

