import { auth } from "../../data/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserAvatar,
  setUserLogOutState,
} from "../../features/userSlics";
import { Dropdown } from "react-bootstrap";
import { Switch } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import userAvatarSvg from "../../assets/images/userAvatar.svg";
const Header = ({ toggleTheme, theme }) => {
  console.log('<Header /> renderd');
  const dispath = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const userAvatar = useSelector(selectUserAvatar);

  const label = { inputProps: { "aria-label": "Switch demo" } };
  const handelSignOut = () => {
    auth
      .signOut()
      .then((result) => {
        document.cookie = null;
        dispath(setUserLogOutState({}));
      })
      .cath((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <header>
      <nav className="d-flex justify-content-between align-items-center">
        <Link to="/" className="col-6 m-2 p-0  text-logo ">
          React Todos
        </Link>
        <div className="d-flex m-2 align-items-center">
          <div>
            {userEmail ? (
              <Dropdown className="col-2 border-fucus-white ">
                <Dropdown.Toggle variant="" id="dropdown-basic-button">
                  <img
                    src={userAvatar ? userAvatar : userAvatarSvg}
                    alt="avatar"
                    width="32"
                    height="32"
                    className="ml-5 rounded-circle"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="mx-3">
                    <Link to="/user" style={{ textDecoration: "none" }}>
                      Profile
                    </Link>
                  </div>
                  <div className="d-flex justify-content-around align-content-center my-1">
                    <div>
                      <span>Theme</span>{" "}
                    </div>
                    <Switch
                      {...label}
                      onClick={toggleTheme}
                      className=""
                      size="small"
                      checked={theme === "light" ? false : true}
                    />
                  </div>
                  <Dropdown.Item href="" onClick={handelSignOut}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
Header.propTypes = {
  theme: PropTypes.string,
  toggleTheme: PropTypes.func,
};
export default Header;
