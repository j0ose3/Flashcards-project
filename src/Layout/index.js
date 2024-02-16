import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import ShowDecks from "../pages/ShowDecks";
import Deck from "../pages/Deck";
import Study from "../pages/Study";
import CreateDeck from "../pages/CreateDeck";
import EditDeck from "../pages/EditDeck";
import AddCard from "../pages/AddCard";
import EditCard from "../pages/EditCard";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <ShowDecks />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
