import { TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import signInSvg from "../../assets/images/undraw_fingerprint.svg";
import signUpSvg from "../../assets/images/undraw_voice_assistant.svg";
import { auth, provider } from "../../data/firebase";
import { setActiveUser } from "../../features/userSlics";

import "../../App.css";

const SignInPage = () => {
  console.log('<SignInPage /> renderd');
  
  const dispath = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginCard, setLoginCard] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const inputEmailHandler = (e) => {
    setEmail(e.target.value.trim());
    setEmailError(false);
    setEmailErrorMessage("");
  };
  const inputPasswordHandler = (e) => {
    setPassword(e.target.value.trim());
    setPasswordError(false);
    setPasswordErrorMessage("");
  };
  const createUserWithEmailAndPassword = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((result) => {
        dispath( setActiveUser({
            userEmail: result.user.email,
            userPassword: result.user.password,
          }));
           toast.success("You are sign up succesfull.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          setPasswordError(true);
          setPasswordErrorMessage("The password is too weak");
        }
        if (errorCode === "auth/invalid-email") {
          setEmailError(true);
          setEmailErrorMessage("Email is invalid");
        }
        if (errorCode === "auth/email-already-in-use") {
          setEmailError(true);
          setEmailErrorMessage("The email already in use , please login");
        } else {
          toast.error(errorMessage);
        }
      });
  };
  const SignInUserWithEmailAndPassword = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        dispath(setActiveUser({
            userEmail: userCredential.user.email,
            userPassword: userCredential.user.password,
          })
        );
        toast.success("You are login succesfull.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/user-not-found") {
          setEmailError(true);
          setEmailErrorMessage("User not found");
        }
        if (errorCode === "auth/wrong-password") {
          setPasswordError(true);
          setPasswordErrorMessage("Password is wrong");
        } else {
          toast.error(errorMessage);
        }
      });
  };
  const handelSignInWithGoogle = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispath(
          setActiveUser(
            {
              userName: result.user.displayName,
              userEmail: result.user.email,
              userAvatar: result.user.photoURL,
            },
            toast.success("You are login succesfull")
          )
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        toast.error(errorMessage);
      });
  };
  const ResetPassword = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      toast.error("Please inter your Email ");
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          toast.success("We send reset password link to your Mail");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/invalid-email") {
            toast.error("The email address is badly formatted");
          }
          if (errorCode === "auth/user-not-found") {
            toast.error("The email not found ");
          } else {
            toast.error(errorMessage);
          }
        });
    }
  };
  return (
    <>
      {!loginCard ? (
        <section className="d-flex py-5 ">
          <div className=" scale-up-center col-lg-6  d-flex justify-content-center align-item-center align-content-center ">
            <img className="imgimg-fluid w-75 " src={signInSvg} alt="singin" />
          </div>
          <div className="col-12 col-lg-6  justify-content-center align-item-center align-content-center ">
            <div
              className="modal modal-signin position-static d-block  "
              tabIndex="-1"
              role="dialog"
              id="modalSignin"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content rounded-2 shadow border-0 ">
                  <div className="modal-body p-4 pt-0 ">
                    <form className="mt-3 ">
                      <div className="form-floating mb-3">
                        <TextField
                          error={emailError}
                          required
                          fullWidth
                          label="Email"
                          id="fullWidth"
                          onChange={(e) => inputEmailHandler(e)}
                        />
                        <small className="text-danger">
                          {emailErrorMessage}
                        </small>
                      </div>
                      <div className="form-floating mb-3">
                        <TextField
                          error={passwordError}
                          required
                          fullWidth
                          label="Password"
                          id="fullWidth-password-input"
                          type="password"
                          autoComplete="current-password"
                          onChange={(e) => inputPasswordHandler(e)}
                        />
                        <small className="text-danger">
                          {passwordErrorMessage}
                        </small>
                      </div>
                      <div className="mt-1 d-flex justify-content-end ">
                        <button
                          style={{ fontSize: "13px" }}
                          className="mb-1 mx-1 bg-light border-0 "
                          type="submit"
                          onClick={(e) => ResetPassword(e)}
                        >
                          Forgotten password?{" "}
                        </button>
                      </div>
                      <button
                        className="w-100 mb-5 btn btn-lg rounded-3 btn-primary button"
                        type="submit"
                        onClick={(e) => SignInUserWithEmailAndPassword(e)}
                      >
                        Sign in{" "}
                      </button>
                      <div className="d-flex align-align-content-between justify-content-center mx-auto">
                        <button
                          className="button py-2 mb-2 btn btn-outline-primary rounded-5 mx-1 "
                          type="submit"
                          onClick={handelSignInWithGoogle}
                        >
                          <span
                            className="bi me-1 mr-3 "
                            width="16"
                            height="16"
                          >
                            <i
                              className="fa fa-google"
                              style={{ fontSize: "24px" }}
                            ></i>
                          </span>
                        </button>
                        <button
                          className=" py-2 mb-2 btn btn-outline-primary rounded-5 mx-1 "
                          type="submit"
                          disabled
                        >
                          <span
                            className="bi me-1 mr-3 "
                            width="16"
                            height="16"
                          >
                            <i
                              className="fa fa-twitter"
                              style={{ fontSize: "24px" }}
                            ></i>
                          </span>
                        </button>
                        <button
                          className=" py-2 mb-2 btn btn-outline-dark rounded-5 mx-1 "
                          type="submit"
                          disabled
                        >
                          <span
                            className="bi me-1 mr-3 "
                            width="16"
                            height="16"
                          >
                            <i
                              className="fa fa-apple"
                              style={{ fontSize: "24px" }}
                            ></i>
                          </span>
                        </button>
                      </div>
                      <hr className="my-1" />
                      <div className="mt-3  d-flex  justify-content-center">
                        <span>Don't have an account? </span>
                        <button
                          className="text-primary fs-6 mx-2 bg-light border-0"
                          onClick={() => setLoginCard(true)}
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="d-flex section_signin py-5 ">
          <div className="scale-up-center col-lg-6  d-flex justify-content-center align-item-center align-content-center ">
            <img className="imgimg-fluid w-75 " src={signUpSvg} alt="" />
          </div>
          <div className="col-12 col-lg-6  ">
            <div
              className=" modal modal-signin position-static d-block "
              tabIndex="-1"
              role="dialog"
              id="modalSignin"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content rounded-2 shadow  border-0">
                  <div className="modal-body p-4 pt-0">
                    <form className="mt-3">
                      <div className="form-floating mb-3">
                        <TextField
                          error={emailError}
                          required
                          fullWidth
                          label="Email"
                          id="fullWidth"
                          onChange={(e) => inputEmailHandler(e)}
                        />
                        <small className="text-danger">
                          {emailErrorMessage}
                        </small>
                      </div>
                      <div className="form-floating mb-5">
                        <TextField
                          error={passwordError}
                          required
                          fullWidth
                          label="Password"
                          id="fullWidth-password-input"
                          type="password"
                          autoComplete="current-password"
                          onChange={(e) => inputPasswordHandler(e)}
                        />
                        <small className="text-danger">
                          {passwordErrorMessage}
                        </small>
                      </div>
                      <button
                        className="w-100 mb-2 btn btn-lg rounded-3 btn-primary mb-5"
                        type="submit"
                        onClick={createUserWithEmailAndPassword}
                      >
                        Sign up
                      </button>
                      <div className="d-flex align-align-content-between justify-content-center mx-auto">
                        <button
                          className=" py-2 mb-2 btn btn-outline-primary rounded-5 mx-1 "
                          type="submit"
                          onClick={handelSignInWithGoogle}
                        >
                          <span
                            className="bi me-1 mr-3 "
                            width="16"
                            height="16"
                          >
                            <i
                              className="fa fa-google"
                              style={{ fontSize: "24px" }}
                            ></i>
                          </span>
                        </button>
                        <button
                          className=" py-2 mb-2 btn btn-outline-primary rounded-5 mx-1 "
                          type="submit"
                          disabled
                          onClick={handelSignInWithGoogle}
                        >
                          <span
                            className="bi me-1 mr-3 "
                            width="16"
                            height="16"
                          >
                            <i
                              className="fa fa-twitter"
                              style={{ fontSize: "24px" }}
                            ></i>
                          </span>
                        </button>
                        <button
                          className=" py-2 mb-2 btn btn-outline-dark rounded-5 mx-1 "
                          type="submit"
                          disabled
                          onClick={handelSignInWithGoogle}
                        >
                          <span
                            className="bi me-1 mr-3 "
                            width="16"
                            height="16"
                          >
                            <i
                              className="fa fa-apple"
                              style={{ fontSize: "24px" }}
                            ></i>
                          </span>
                        </button>
                      </div>
                      <hr className="my-1" />
                      <div className="mt-3  d-flex  justify-content-center">
                        <button
                          className="  btn btn-md text-primary btn-outline-none  "
                          type="submit"
                          onClick={() => setLoginCard(false)}
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default SignInPage;
