import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserScreen from "./screens/UserScreen";
import UserListScreen from "./screens/UserListScreen";

import HomePage from "./screens/HomePage";


import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "react-bootstrap";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-o.45">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={UserScreen} />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/home" component={HomePage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
