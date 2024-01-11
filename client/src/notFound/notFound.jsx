import React from "react";
import "./notFound.styles.css";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <div className="error-page">
      <h1 className="title-error">Error404: Not Found</h1>
      <Link to="/home/">
        <button className="return-detail">Return</button>
      </Link>
    </div>
  );
}

export default Error404;
