import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";

import productContext from '../context/products/productContext';

function Signup(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

    const context = useContext(productContext);  
    const { host } = context; //destructuring

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent from reload
        const { name, email, password } = credentials;
        // Api call
        const response = await fetch(`${host}/api/v1/auth/createuser`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);
        // ------------------------------------
        if (json.success) {
            alert("Account created successfully");
            navigate("/login");  // redirect
        } else {
            alert("Invalid credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className="container">
                <div className="container my-4 mt-5 ">
                    <form className="border rounded border-dark my-4 p-4" style={{ backgroundColor: "#e6ede5" }} onSubmit={handleSubmit} >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input name="name" type="text" className="form-control" id="name" placeholder="John Doe" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input name="email" type="email" className="form-control" id="email" placeholder="johndoe@gmail.com"  onChange={onChange} />
                            <small id="emailHelp" className="form-text text-muted"> We'll never share your email with anyone else. </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input name="password"  type="password"  className="form-control"  id="password"  required  minLength={5}  onChange={onChange} />
                        </div>
                        <small id="emailHelp" className="form-text text-muted"> password must contains an upper case letter , a number and a special charecter. </small>
                        <div className="form-group">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input name="cpassword" type="password" className="form-control" id="cpassword" required  minLength={5}/>
                        </div>
                        <div className="form-group form-check my-3">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;