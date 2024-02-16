import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "./Decks.css";

function Study() {
  const history = useHistory();
  const params = useParams();
  const [loadedDeck, setLoadedDeck] = useState();
  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const data = await readDeck(params.deckId);
        setLoadedDeck(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeck();
  }, [params.deckId]);

  const flipCard = () => {
    setIsFlipped((current) => !current);
  };

  const nextCard = () => {
    setIndex((current) => current + 1);
    flipCard();
    console.log(index + 1, loadedDeck.cards.length);
    if (index + 1 === loadedDeck.cards.length) {
      const confirm = window.confirm(
        "Are you sure you want to delete this deck?"
      );

      if (confirm) {
        setIndex(0);
        setIsFlipped(false);
        history.go(0);
      } else {
        history.push("/");
      }
    }
  };

  const cardHandler = () => {
    history.push(`/decks/${loadedDeck.id}/cards/new`);
  }

  return (
    <>
      {loadedDeck && (
        <div>
          <Breadcrumb names={[loadedDeck.name, "Study"]} />
          <h1>Study: {loadedDeck.name}</h1>
          {loadedDeck.cards.length > 2 ? (
            <div>
              <h4>
                Card {index + 1} of {loadedDeck.cards.length}
              </h4>
              {isFlipped ? (
                <p>{loadedDeck.cards[index].back}</p>
              ) : (
                <p>{loadedDeck.cards[index].front}</p>
              )}
              <div className="d-flex gap-2">
                <button className="btn btn-secondary me-2" onClick={flipCard}>
                  Flip
                </button>
                {isFlipped && (
                  <button className="btn btn-primary" onClick={nextCard}>
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h4>Not enough cards</h4>
              <p>
                You need at least 3 cards to study. There are{" "}
                {loadedDeck.cards.length} in this Deck
              </p>
              <button onClick={cardHandler} className="btn btn-primary">Add Cards</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Study;
