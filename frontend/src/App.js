// React
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Bootstrap
import { Container } from "react-bootstrap";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Screens
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/products/:id" component={ProductScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
};

export default App;

// rm -rf .git to remove the git repository of the current folder
