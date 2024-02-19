import React from "react";
import "./Breadcrumb.css";

const Breadcrumb = ({ crumbs, selected }) => {
  const isLast = (index) => {
    return index === crumbs.length - 1;
  };

  return (
    <>
      <nav className="row justify-content-left mt-4">
        <ol className="breadcrumb">
          {crumbs.map((crumb, index) => {
            const disabled = isLast(index) ? "disabled" : "";
            return (
              <li key={index} className="breadcrumb-item align-items-center">
                <button
                  className={`btn btn-link ${disabled}`}
                  onClick={() => selected(crumb)}
                >
                  {crumb}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
