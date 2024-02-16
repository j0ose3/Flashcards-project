import React, {useState} from "react";
import { useHistory} from "react-router-dom";
import { createDeck } from "../utils/api";
import Breadcrumb from "../components/Breadcrumb";

function CreateDeck() {
  const initialState = {name: '', description: ''};

  const history = useHistory();
  const [formData, setFormData] = useState({...initialState});

  const onCancel = () => {
    history.push("/");
  };

  const dataHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  } 

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await createDeck(formData);
    history.push(`/decks/${data.id}`);
  };

  return (
    <div className="container mt-4">
      <Breadcrumb names={["Create Deck"]} />
      <h1>Create Deck</h1>
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
  );
}

export default CreateDeck;
