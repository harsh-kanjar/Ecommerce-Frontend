import { Button } from "@mui/material";

import "../CSS/pages/header.css";
import { FaUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="header">
        <div className="top-strip bg-blue">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              Due to the <strong>COVID 19</strong> epidemic, orders may be
              processed with a slight delay
            </p>
          </div>
        </div>
        <div className="head">
          <div className="container">
            <div className="row">
              <div className="logo-container d-flex align-items-center col-sm-2">
                <img src="/assets/images/logo1.jpg" alt="Logo" />
              </div>
              <div className="col-sm-10 d-flex align-items-center part2">
                <input
                  type="text"
                  name=""
                  placeholder="Search for products..."
                  id=""
                />
                <div className="user ic">
                  <FaUser />
                </div>
                <div className="shopping-cart ic">
                  <FaBagShopping />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav>
        <div className="container">
          <div className="row">
            <div className="col-sm-3 section-1">
              <Button variant="contained">All Categories</Button>
            </div>
            <div className="col-sm-9 section-2">
              <ul className="list list-inline">
                <li className="list-inline-item">
                  <Button variant="text">Home</Button>
                </li>
                <li className="list-inline-item">Home</li>
                <li className="list-inline-item">Home</li>
                <li className="list-inline-item">Home</li>
                <li className="list-inline-item">Home</li>
                <li className="list-inline-item">Home</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
   

     <div style={{height:'400px',offset:'cover'}}>
     <div
      id="carouselExampleIndicators"
      className="carousel slide container"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1638602612226-55fd638475c9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1620554600249-636b81e27699?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1698594380432-270f92bf6235?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Third slide"
          />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
     </div>
    </>
  );
}

export default Header;
