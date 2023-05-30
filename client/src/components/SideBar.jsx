import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutC } from "../app/features/consumableSlice";
import { logoutS } from "../app/features/storeSlice";
import { logoutT } from "../app/features/titleSlice";
import { logoutU } from "../app/features/userSlice";

const SideBar = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logoutC);
        dispatch(logoutS);
        dispatch(logoutT);
        dispatch(logoutU);
        navigate("/auth");
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/auth" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Menu</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <Link to="/titles" className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-card-text"></i>
                                    <span className="ms-1 d-none d-sm-inline">Çeşitler Düzenle</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/consumables" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-cup"></i>
                                    <span className="ms-1 d-none d-sm-inline">Tüketilebilir Düzenle</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/stores" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-list-ol"></i>
                                    <span className="ms-1 d-none d-sm-inline">Şubeler Düzenle</span>
                                </Link>
                            </li>

                        </ul>
                        <hr />
                        <div className="dropdown pb-4">
                            <Button variant="danger" onClick={logoutHandler}> Log Out </Button >
                        </div>
                    </div>
                </div>
                <div className="col py-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SideBar;