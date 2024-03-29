import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layouts/Layout";
import { BsFillEyeFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from "../components/OAuth";
import "../styles/signin.css";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChangeInputHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      if (!(email || password)) {
        toast.warn("Please enter complete details !");
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <Layout title="signin - house marketplace">
      <div className="row m-4 signin-container ">
        <div className="col-md-6">
          <img src="./assets/loginpage.svg" alt="login" />
        </div>
        <div className="col-md-6 signin-container-col2">
          <form onSubmit={loginHandler}>
            <h4 className=" text-center">Sign In</h4>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={onChangeInputHandler}
                className="form-control"
                placeholder="test@test.com"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-2 ">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={onChangeInputHandler}
                placeholder="123456"
                className="form-control"
                id="password"
              />
            </div>
            <div className="mb-3 show-pass-forgot">
              <span>
                <BsFillEyeFill
                  className="text-danger ms-2 "
                  size={25}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowPassword((prevState) => !prevState);
                  }}
                />{" "}
                show password
              </span>{" "}
              |
              <Link to="/forgot-password" className="ms-4">
                forgot Password
              </Link>
            </div>
            {!(email && password) && (
              <button
                onClick={() =>
                  setFormData({
                    email: "test@test.com",
                    password: "123456",
                  })
                }
                className="btn signinbutton mb-2"
              >
                Guest Sign-in
              </button>
            )}
            <button type="submit" className="btn signinbutton">
              Sign in
            </button>
            <span className="ms-4 new-user"> New User</span>{" "}
            <Link to="/signup">Sign up !</Link>
            <OAuth />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
