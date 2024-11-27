import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import "../style/ContactUs.css";

export const ContactUs = () => {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false); 

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

  return (
    <div>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <h1 className="form-title">CONTACT US</h1>
        <p className="form-description">
          For comments, complaints, and enquiries please contact us by
          completing and submitting the form below.
        </p>
        <label className="form-label">Name</label>
        <input type="text" name="from_name" className="form-input" required />
        <label className="form-label">Email</label>
        <input type="email" name="from_email" className="form-input" required />
        <label className="form-label">Message</label>
        <textarea
          name="message"
          className="form-textarea"
          rows="5"
          required
        ></textarea>
        <input type="submit" value="Send" className="form-submit" />

        {messageSent && (
          <p className="success-message">
            Your message has been sent successfully!
          </p>
        )}
      </form>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2024 Hacktrack Event Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
