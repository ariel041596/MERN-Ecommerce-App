// React
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Bootstrap
import { Container } from "react-bootstrap";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/products/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
};

export default App;

// rm -rf .git to remove the git repository of the current folder
