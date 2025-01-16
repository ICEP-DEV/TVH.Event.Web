import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import api from "../APIs/API";
import axios from "axios";




const OrganizersManagement = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [selectedOrganizers, setSelectedOrganizers] = useState([]);

    const fetchOrganizers = async()=>{
        try{
            await axios.get(
                api + 'organizer'
            ).then((response) =>{
                console.log(response);
            })
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchOrganizers();
    },[]);

    return (
        <div className="container-fluid p-0">
            <div className="d-flex">
                <SideBar />
                <div className="col p-5">
                    <p className="fs-1">
                        Manage Organizers
                    </p>
                    <div className="d-flex">
                        <div className="col-3">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="col-3 mx-5">
                            <select
                                className="form-control form-select"
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">All</option>
                            </select>
                        </div>
          
                        <div className="col-3 d-flex align-items-center">
                            <button className="btn btn-primary">
                                Add Organizer
                            </button>
                        </div>
                    </div>

                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Organisation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}



export default OrganizersManagement;
