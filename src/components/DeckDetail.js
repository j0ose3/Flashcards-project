import React from "react";
import { useHistory } from "react-router-dom";
import Card from "./Card";

function DeckDetail({ deck, deleteHandler }) {
  const history = useHistory();


  const studyHandler = () => {
    history.push(`/decks/${deck.id}/study`);
  };

  const viewHandler = () => {
    history.push(`/decks/${deck.id}`);
  };

  return (
    <>
        <Card
          name={deck.name}
          count={deck.cards.length}
          deleteHandler={deleteHandler}
          studyHandler={studyHandler}
          viewHandler={viewHandler}
        >
          {deck.description}
        </Card>
    </>
  );
}

export default DeckDetail;
