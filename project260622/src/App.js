import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react"
import Footer from "./components/Footer"
import Landing from "./components/Landing";
import Projects from "./components/Projects";

function App() {

  return (
      <React.Fragment>
          <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
              <Link className="navbar-brand" style={{ display: "flex", height: "40px" }} to="/">
                    <img src="/images/engineering.png" alt="logo" /> <p className="logo-title">Construction</p>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-item nav-link" to="/products">All Projects</Link>
                    </li>
                  </ul>

                </div>
              </div>
            </nav>
            <section style={{
                minHeight: "78vh"
            }}>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/projects" element={<Projects/>}/>
                </Routes>
            </section>
            <Footer />
          </Router>
      </React.Fragment >
  );
}

export default App;