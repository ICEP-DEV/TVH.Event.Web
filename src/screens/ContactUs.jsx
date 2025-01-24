import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import NavBar from "../components/NavBar"; // Import NavBar component
import Footer from "../components/Footer"; // Import Footer component

export const ContactUs = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);
  const bg = require('../assets/contact_us.jpg')

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_yvzb4hn', 'template_2xn5021', form.current, {
        publicKey: '43wpXICVCfgg-Sio9',
      })
      .then(
        () => {
          setMessageSent(true);
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };


  useEffect(() => {
    if (messageSent) {
      const timer = setTimeout(() => setMessageSent(false), 2000); 

      
      return () => clearTimeout(timer);
    }
  }, [messageSent]);

  return (
    <div className ="Container-fluid p-0" style={{backgroundImage : `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh'}}>
      {/* Add NavBar at the top */}
      <NavBar />

      {/* Contact Form Section */}
      <form ref={form} onSubmit={sendEmail} className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="text-white pt-5 fw-bold">CONTACT US</h1>
        <p className="form-description text-white fs-4 pt-3">
          For comments, complaints, and enquiries please contact us by
          completing and submitting the form below.
        </p>
        <div className="form-group col-4">
          <label className="form-label text-white ">Name</label>
          <input type="text" name="from_name" className="form-control" required />
        </div>
        <div className="form-group col-4">
          <label className="form-label text-white">Email</label>
          <input type="email" name="from_email" className="form-control" required />
        </div>
        <div className="form-group col-4">
          <label className="form-label text-white">Message</label>
          <textarea
            name="message"
            className="form-control"
            rows="5"
            required
            style={{resize: 'none'}}
          ></textarea>
        </div>
        <input type="submit" value="Send" className="btn btn-primary btn-lg my-3" />

        {messageSent && (
          <p className="success-message">
            Your message has been sent successfully!
          </p>
        )}
      </form>

      <div className="container-fluid p-0" style={{position : 'fixed', bottom:0}}>
          <Footer/>
      </div>
    </div>
  );
};

export default ContactUs;
