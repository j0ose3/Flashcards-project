import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../utils/api";

function Deck() {
  const params = useParams();
  const history = useHistory();
  const [loadedDeck, setLoadedDeck] = useState();
  const [crumbs, setCrumbs] = useState();

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const data = await readDeck(params.deckId);
        setLoadedDeck(data);
        setCrumbs(['Home', data.name]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeck();
  }, [params.deckId]);

  const selectedCrumb = (crumb) =>{
    switch(crumb) {
      case loadedDeck.name: history.push(`/decks/${params.deckId}`);
      break;
      default: history.push('/');
    }
  }

  const studyHandler = () => {
    history.push(`/decks/${loadedDeck.id}/study`);
  };

  const editHandler = () => {
    history.push(`/decks/${loadedDeck.id}/edit`);
  }

  const deleteHandler = async (deckId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (confirmDelete) {
      try {
        await deleteDeck(deckId);
        history.push('/')
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCardsHandler = () => {
    history.push(`/decks/${loadedDeck.id}/cards/new`);
  };

  const cardDeleteHandler = async (cardId) => {
    const confirmDelete = window.confirm(
      "delete this card?"
    );

    if (confirmDelete) {
      try {
        await deleteCard(cardId);
        history.go(0);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const editCardHandler = (cardId) => {
    history.push(`/decks/${loadedDeck.id}/cards/${cardId}/edit`)
  }

  return (
    <>
      {loadedDeck && crumbs && (
        <div>
          <Breadcrumb crumbs={crumbs} selected={selectedCrumb}/>
          <div className="">
            <div className="card-body text-primary">
              <h2 className="card-title">{loadedDeck.name}</h2>
              <p className="card-text">{loadedDeck.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="card-buttons">
                  <button className="btn btn-secondary" onClick={editHandler}>Edit</button>
                  <button className="btn btn-primary" onClick={studyHandler}>
                    Study
                  </button>
                  <button className="btn btn-primary" onClick={addCardsHandler}>
                    Add Cards
                  </button>
                </div>
                <button className="btn btn-danger" onClick={() => deleteHandler(loadedDeck.id)}>
                  Delete
                </button>
              </div>
            </div>
            <div className="card-body">
              <h1>Cards</h1>
              {loadedDeck.cards.map(card => (
                <div className="row border shadow rounded p-2" key={card.id} >
                  <div className="col-md-6">
                    <div>
                      <p>{card.front}</p>
                    </div>
                  </div>
                  <div className="col-md-6 text-right">
                    <p>{card.back}</p>
                    <button className="btn btn-secondary" onClick={() => editCardHandler(card.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => cardDeleteHandler(card.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Deck;
