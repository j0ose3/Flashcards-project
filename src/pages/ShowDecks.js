import React, { useEffect, useState } from "react";
import DeckDetail from "../components/DeckDetail";
import { listDecks, deleteDeck } from "../utils/api";
import { Link } from "react-router-dom";
import "./Decks.css";

function ShowDecks( {studyHandler}) {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const data = await listDecks();
        setDecks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDecks();
  }, []);

  const deleteHandler = async (deckId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (confirmDelete) {
      try {
        await deleteDeck(deckId);
        setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Link className="create" to="/decks/new">Create Deck</Link>
      {decks.map((deck) => (
        <DeckDetail
          deck={deck}
          key={deck.id}
          deleteHandler={() => deleteHandler(deck.id)}
        />
      ))}
    </>
  );
}

export default ShowDecks;
