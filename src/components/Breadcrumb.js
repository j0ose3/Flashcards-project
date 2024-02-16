import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = ({names}) => {

  return (
    <nav className="">
      <span><Link to="/">Home</Link> {names.map((name, index) => <span key={index}> / {name} </span> )} </span>
    </nav>
  );
};

export default Breadcrumb;