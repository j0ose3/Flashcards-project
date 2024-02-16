import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import Breadcrumb from "../components/Breadcrumb";
import FormComponent from "../components/FormComponent";

function EditCard() {
  const initialState = { id: "", front: "", back: "", deckId: "" };

  const history = useHistory();
  const params = useParams();
  const [loadedDeck, setLoadedDeck] = useState();
  const [formData, setFormData] = useState({ ...initialState });

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckData = await readDeck(params.deckId);
        const cardData = await readCard(params.cardId);
        setLoadedDeck(deckData);
        setFormData(cardData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeck();
  }, [params.deckId, params.cardId]);

  const onCancel = () => {
    history.push(`/decks/${loadedDeck.id}`);
  };

  const dataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await updateCard(formData);
    history.push(`/decks/${loadedDeck.id}`);
  };

  return (
    <>
      {loadedDeck && (
        <div>
          <div className="container mt-4">
            <Breadcrumb
              names={[`Deck ${loadedDeck.name}`, `Edit Card ${formData.id}`]}
            />
            <h3>Edit Card</h3>
            <FormComponent
              dataObject={formData}
              cancelHandler={onCancel}
              submitHandler={submitHandler}
              dataHandler={dataHandler}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default EditCard;
