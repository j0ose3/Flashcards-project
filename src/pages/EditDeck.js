import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const params = useParams();
  const history = useHistory();

  const initialState = { id: "", name: "", description: "" };
  const [formData, setFormData] = useState({ ...initialState });
  const [crumbs, setCrumbs] = useState();

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const data = await readDeck(params.deckId);
        setFormData(data);
        setCrumbs(["Home", data.name, "Edit Deck"]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeck();
  }, [params.deckId]);

  const selectedCrumb = (crumb) => {
    switch (crumb) {
      case formData.name:
        history.push(`/decks/${params.deckId}`);
        break;
      default:
        history.push("/");
    }
  };

  const onCancel = () => {
    history.push(`/decks/${params.deckId}`);
  };

  const dataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDeck(formData);
    history.push(`/`);
  };

  return (
    <>
      {crumbs && (
        <div className="container mt-4">
          <Breadcrumb crumbs={crumbs} selected={selectedCrumb} />
          <h1>Edit Deck</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="deckName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="deckName"
                name="name"
                placeholder="Deck Name"
                value={formData.name}
                onChange={dataHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deckDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="deckDescription"
                placeholder="Brief description of the Deck"
                name="description"
                rows={5}
                value={formData.description}
                onChange={dataHandler}
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditDeck;
