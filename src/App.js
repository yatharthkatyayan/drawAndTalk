import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./component/join/join";
import Chat from "./component/chat/chat";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
