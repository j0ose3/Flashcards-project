import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import Card from "./Card";

function DeckDetail({ deck, deleteHandler }) {
  const history = useHistory();
  const [cardsCount, setCardsCount] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await readDeck(deck.id);
        setCardsCount(data.cards.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCards();
  }, [deck.id]);

  const studyHandler = () => {
    history.push(`/decks/${deck.id}/study`);
  };

  const viewHandler = () => {
    history.push(`/decks/${deck.id}`)
  }

  return (
    <>
      <Card
        name={deck.name}
        count={cardsCount}
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
