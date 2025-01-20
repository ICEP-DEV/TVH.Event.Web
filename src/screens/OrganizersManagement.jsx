import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import api from "../APIs/API";
import axios from "axios";
import { FaTrashAlt, FaMailBulk } from "react-icons/fa";




const OrganizersManagement = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [selectedOrganizers, setSelectedOrganizers] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [organizersFiltered, setOrganizersFiltered] = useState([]);
    const [organizers, setOrganizers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalError, setModalError] = useState(false);

    //create organizer
    const [newOrganizerEmail, setNewOrganizerEmail] = useState(null);
    const [newOrganization, setNewOrganization] = useState('');

    const fetchOrganizations = async()=>{
        await axios.get(
            api + 'organization'
        ).then((response) => {
            setOrganization(response.data.results);
        }).catch((error) => {
            console.log(error);
        });
    }

    const fetchOrganizers = async()=>{
        try{
            await axios.get(
                api + 'organiser'
            ).then((response) =>{
                setOrganizers(response.data.slice(1));
                setOrganizersFiltered(response.data.slice(1));
            })
        }catch(error){
            console.log(error);
        }
    }

    const closeModal = ()=>{
        setIsModalOpen(false);
        setModalError(false);
    }

    const handleCheckboxChange = async(organizer_id)=>{
        setSelectedOrganizers((prev) =>
            prev.includes(organizer_id) ? prev.filter((id) => id !== organizer_id) : [...prev, organizer_id]
        );
    }

    const handleFilterChange = (e) => setFilter(e.target.value);

    const handleAddOrganizer = () =>{
        setModalContent(
            <form onSubmit={(e)=>{handleCreateOrganizer(e)}}>
                <div className="form-group">
                    <label className="form-label">Organizer's Email</label>
                    <input 
                        type="email"
                        className="form-control" 
                        id="organizerEmail"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Name of Organization</label>
                    <select className="form-control form-select" name="organizationName" id="organizationName">
                        {
                            organization.map((org) => (
                                <option key={org.organization_id} value={org.organization_id}>{org.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <button className="btn btn-md" style={{backgroundColor: "var(--blue2)", color: "white"}} type="submit">
                        Create Organizer
                    </button>
                </div>
            </form>
        );

        setIsModalOpen(true);
    }

    const handleCreateOrganizer = async(e)=>{
        e.preventDefault(true)
        const email = e.target[0].value;
        const org_id = e.target[1].value;
        
        await axios.post(
            api + "auth/web/organiser",
            {email,org_id}
        ).then(() =>{
            setIsModalOpen(false);
            handleInfoBox("Account has been created and an email sent to the organizer")
        })
        .catch((error) =>{
            setModalError(true)
            console.log(error)
        })
    }
    const handleInfoBox = (content)=>{
        setModalContent(
            <div>
                <p className="fs-4 pb-3">{content}</p>
                <div>
                    <button className="btn text-center btn-success me-3" onClick={()=>{setIsModalOpen(false)}}>Okay</button>
                </div>
            </div>
        );
        setIsModalOpen(true);
    }

    const handleArchiveAnOrganizer = (organiser_id) =>{

        setModalContent(
            <div>
                <p className="fs-4 pb-3">Are you sure you want to archive the selected organizer?</p>
                <div>
                    <button className="btn btn-success me-3" onClick={()=>{setIsModalOpen(false)}}>No Cancel</button>
                    <button className="btn btn-danger" onClick={()=>{archiveOrganizer(organiser_id)}}>Yes Archive</button>
                </div>
            </div>
        );

        setIsModalOpen(true);
    }

    const archiveOrganizer = async(organizer_id) =>{
        await axios.put(
            api + 'organiser/archive/' + organizer_id
        ).then(() => {
            fetchOrganizers();
            setIsModalOpen(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    const reinstateOrganizer = async(organizer_id) =>{
        await axios.put(
            api + 'organiser/reinstate/' + organizer_id
        ).then(()=>{
            fetchOrganizers();
            
            closeModal();
        }).catch((error) => {
            console.log(error);
        });
    }

    const archiveSelectedOrganizers = async()=>{
        selectedOrganizers.map((org) =>{
            archiveOrganizer(org);
        })
    }


    const handleArchiveOrganizers = async() =>{
        setModalContent(
            <div>
                <p className="fs-4 pb-3">Are you sure you want to archive the selected organizers?</p>
                <div>
                    <button className="btn btn-success me-3" onClick={()=>{setIsModalOpen(false)}}>No Cancel</button>
                    <button className="btn btn-danger" onClick={archiveSelectedOrganizers}>Yes Archive</button>
                </div>
            </div>
        );

        setIsModalOpen(true);
    }

    const handleShowArchivedOrganizers = () =>{
        setModalContent(
            <div >
                { organizers.filter((organizer) => organizer.is_active === 0).length === 0 && <p>No Archived accounts to show</p>}
                { organizers.filter((organizer) => organizer.is_active === 0).map((organizer) => (
                    <div key={organizer.organiser_id} className="d-flex justify-content-between align-items-center my-2">
                        
                        <div>{organizer?.surname}</div>
                        <div>{organizer.email}</div>
                        <div>{organizer.organization_name}</div>
                        <div role="button" className="btn text-white" style={{backgroundColor: "var(--blue2)"}} onClick={()=>{reinstateOrganizer(organizer.organiser_id)}}>
                            Re-instate
                        </div>
                    </div>
                ))}
            </div>
        );

        setIsModalOpen(true);
    }

    const handleSendEmail = (email) =>{
        setModalContent(
            <form onSubmit={(e)=>handleEmailSubmission(e)}>
                <div className="form-group">
                    <label className="form-label">Receiver's Email</label>
                    <input 
                        type="email"
                        className="form-control"
                        value={email}
                        readOnly 
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email Subject</label>
                    <input 
                        type="text"
                        className="form-control" 
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email Content</label>
                    <textarea name="" id="" rows={6} className="form-control" style={{resize:"none"}}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-success" type="submit">Send Email</button>
                </div>
            </form>
        );

        setIsModalOpen(true);
    }

    const handleEmailSubmission = async(e)=>{
        e.preventDefault()
        const email = e.target[0].value;
        const subject = e.target[1].value;
        const content = e.target[2].value;
        

        await axios.post(
            api + 'send_mail',
            {email, subject, content}
        ).then(()=>{
            handleInfoBox("Successfully send email to organizer")
        }).catch((error)=>{
            setModalError(true)
        })
    }



    useEffect(()=>{
        fetchOrganizations();
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="col-3 mx-5">
                            <select
                                className="form-control form-select"
                                value={filter}
                                onChange={handleFilterChange}
                            >
                                <option value="All">All</option>
                                {
                                    organization.map((org) => (
                                        <option key={org.organization_id} value={org.name}>{org.name}</option>
                                    ))
                                }
                            </select>
                        </div>
          
                        <div className="d-flex align-items-center">
                            <div className="btn text-white" style={{backgroundColor: "var(--blue2)"}} onClick={handleAddOrganizer}>
                                Add Organizer
                            </div>
                        </div>
                        <div className="d-flex mx-3 align-items-center">
                            <div className="btn text-white" style={{backgroundColor: "var(--blue2)"}} onClick={handleShowArchivedOrganizers}>
                                Archived Organizers
                            </div>
                        </div>
                        {
                            selectedOrganizers.length > 0 && (
                                <div className=" d-flex align-items-center">
                                    <div className="btn text-white" style={{backgroundColor: "var(--red)"}} onClick={handleArchiveOrganizers}>
                                        Archive Organizers
                                    </div>
                                </div>
                            )
                        }

                    </div>

                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Organization</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>


                            {
                                organizersFiltered.filter((organizer)=>
                                    filter === "All" || organizer.organization_name === filter
                                ).filter((organizer) => organizer.is_active === 1)
                                .filter((organizer) =>
                                    searchTerm === "" || organizer.name?.toLowerCase().includes(searchTerm) || organizer.surname?.toLowerCase().includes(searchTerm)
                                )
                                .map((organizer) => (
                                    <tr key={organizer.organiser_id}>
                                        <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedOrganizers.includes(organizer.organiser_id)}
                                            onChange={() => handleCheckboxChange(organizer.organiser_id)}
                                        />
                                        </td>
                                        <td>{organizer.name}</td>
                                        <td>{organizer.surname}</td>
                                        <td>{organizer.email}</td>
                                        <td>{organizer.organization_name}</td>
                                        <td className="">
                                            <span onClick={()=>{handleArchiveAnOrganizer(organizer.organiser_id)}} className="me-3" role="button"><FaTrashAlt size={20} color="var(--red)"/></span>
                                            <span onClick={()=>{handleSendEmail(organizer.email)}} role="button"><FaMailBulk size={20} color="var(--blue2)"/></span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
            { isModalOpen && 
                <div className="modal justify-content-center container-fluid d-flex" style={{display: "block", zIndex: 1, backgroundColor: "rgba(0,0,0,0.5)"}}>
                    <div className="align-self-center bg-white rounded-3" style={{width: "50%", margin: "auto", padding: "20px", maxHeight: "70vh", overflowY: "auto"}}>
                        <div className="mb-5 row" style={{borderBottom: "1px solid var(--blue2)"}}>
                            <span className="col-10">
                                { 
                                    modalError && <span className="fs-6 text-danger">
                                        Something went wrong
                                    </span>
                                }
                            </span>
                            <button className="btn btn-danger col-2 mb-1" onClick={closeModal}>Cancel</button>
                        </div>

                        {modalContent}
                    </div>
                </div>
                }
        </div>

        
    );
}



export default OrganizersManagement;
