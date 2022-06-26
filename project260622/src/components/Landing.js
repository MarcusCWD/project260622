import React from "react";
import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <React.Fragment>
        <div className="home-hero-img">
            <div className="hero-wrapper">
                <h2 className="hero-text">Welcome to Construction</h2>
                <Link className="cta" to="/projects"> see all projects</Link>
            </div>
        </div>
    </React.Fragment>
  );
}