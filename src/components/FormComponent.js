import React from "react";

function FormComponent({
  dataObject,
  submitHandler,
  cancelHandler,
  dataHandler,
}) {

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="deckName" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            placeholder="Front side of card"
            name="front"
            rows={3}
            onChange={dataHandler}
            value={dataObject.front}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="deckDescription" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="dback"
            placeholder="Back side of card"
            name="back"
            rows={3}
            onChange={dataHandler}
            value={dataObject.back}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={cancelHandler}
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default FormComponent;
