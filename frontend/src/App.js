import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserScreen from "./screens/UserScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import CategoryProductScreen from './screens/CategoryProductScreen';
// import Recommendation from './screens/Recommendation';
import ContentRecommendation from './screens/ContentRecommendation';




import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "react-bootstrap";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-o.45">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path='/category' component={CategoryProductScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={UserScreen} />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          {/* <Route path="/recommend" component={Recommendation} /> */}

          <Route path="/content" component={ContentRecommendation} />
          <Route path="/admin/productList" component={ProductListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
        </Container>

      </main>

      <Footer />
    </Router >
  );
}

export default App;
