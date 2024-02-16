import React from "react";

const Card = ({ name, count, children, deleteHandler, studyHandler, viewHandler }) => {
  return (
    <div className="container position-relative" style={{ height: "100vh" }}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
        <div className="card border mb-3" style={{ maxWidth: "24rem", position: "relative" }}>
          <div style={{ position: "absolute", top: "0", right: "0", padding: "0.5rem" }}>
            <span className="badge bg-secondary">{count} Cards</span>
          </div>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p className="card-text">{children}</p>
            <div className="d-flex justify-content-between">
              <div>
                <button className="btn btn-primary" onClick={studyHandler}>
                  Study
                </button>
                <button className="btn btn-secondary" onClick={viewHandler}>View</button>
              </div>
              <button className="btn btn-danger" onClick={deleteHandler}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
