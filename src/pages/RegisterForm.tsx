import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterForm.css';


const RegisterForm: React.FC = () => {
    const [form,setForm] = useState({
        fullName: "",
        email: "",
        location: "",
        secondaryPhone: ""
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if(form.secondaryPhone.length !== 10 || !/^\d+$/.test(form.secondaryPhone)) {
            alert("Please enter a valid secondary phone number.");
            return;
        }
        const locationRegex = /^[a-zA-Z\s]+$/;
        if(form.location.trim() === "" || !locationRegex.test(form.location.trim())) {
            alert("Please enter a valid location (letters and spaces only).");
            return;
        }
        const phone = localStorage.getItem("user_phone") || "";
        const user_details = {...form,phone}
        localStorage.setItem("user_details", JSON.stringify(user_details));
        setForm({
            fullName: "",
            email: "",
            location: "",
            secondaryPhone: ""
        });
        alert("Registration successful!");
        // navigate("/nextpage");
        // Handle form submission logic here
    };

    return (
        <div className="register-bg">
            <div className="register-content">
                <button className="register-back" onClick={() => navigate(-1)}>&lt;</button>
                <h1 className="register-title">Almost Done!</h1>
                <p className="register-desc">
                    Please enter your details in the following section.
                    </p>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <input 
                        type="text"
                        name = "fullName"
                        className = "register-input"
                        placeholder = "Enter Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                         />

                        <input 
                        type="text"
                        name = "email"
                        className = "register-input"
                        placeholder = "Enter Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                         />
                        <div className="register-location-row">
                            <input 
                            type="text"
                            name = "location"
                            className = "register-input"
                            placeholder = "Enter Location"
                            value={form.location}
                            onChange={handleChange}
                            required
                            />
                            <span className="register-location-icon">
                                <i className="fas fa-map-marker-alt"></i>
                                </span>
                        </div>
                        <input 
                        type="tel"
                        name = "secondaryPhone"
                        className = "register-input"
                        placeholder = "Enter Secondary Phone Number"
                        value={form.secondaryPhone}
                        onChange={handleChange}
                        required
                        />

                        <button type="submit" className="register-btn">Create Account</button>
    
                    </form>
                    <div className="register-logo-bg"></div>
            </div>
        </div>
    );
};

export default RegisterForm;