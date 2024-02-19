import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import Breadcrumb from "../components/Breadcrumb";
import FormComponent from "../components/FormComponent";

function AddCard() {
  const initialState = { front: "", back: "" };

  const history = useHistory();
  const params = useParams();
  const [loadedDeck, setLoadedDeck] = useState();
  const [formData, setFormData] = useState({ ...initialState });
  const [crumbs, setCrumbs] = useState();

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const data = await readDeck(params.deckId);
        setLoadedDeck(data);
        setCrumbs(['Home', data.name, 'Add Card']);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeck();
  }, [params.deckId]);

  const selectedCrumb = (crumb) => {
    switch (crumb) {
      case loadedDeck.name:
        history.push(`/decks/${params.deckId}`);
        break;
      default:
        history.push("/");
    }
  };

  const onDone = () => {
    history.push(`/decks/${loadedDeck.id}`);
  };

  const dataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await createCard(loadedDeck.id, formData);
    setFormData(initialState);
    history.go(0);
  };

  return (
    <>
      {loadedDeck && crumbs && (
        <div className="container mt-4 app-routes">
          <Breadcrumb crumbs={crumbs} selected={selectedCrumb} />
          <h3>{loadedDeck.name}: Add Card</h3>
          <FormComponent
            dataObject={loadedDeck}
            submitHandler={submitHandler}
            cancelHandler={onDone}
            dataHandler={dataHandler}
          />
        </div>
      )}
    </>
  );
}

export default AddCard;