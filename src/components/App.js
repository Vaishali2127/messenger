import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import "../index.css";

// import Chats from './Chats'
import Login from "./Login";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        {/* <AuthPrider> */}
        <Switch>
          {/* <Route path="/chats" component={Chats}/> */}
          <Route path="/" component={Login} />
        </Switch>
        {/* </AuthPrider> */}
      </Router>
    </div>
  );
}

export default App;
