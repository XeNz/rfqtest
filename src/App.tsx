import React from "react";
import "./App.css";
import RfqListPage from "./pages/RfqListPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DrawerHelper from "./components/DrawerHelper";
import { Button, Wrap, WrapItem } from "@chakra-ui/react";
import RfqDetailPage from "./pages/RfqDetailPage";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <Wrap>
              <WrapItem>
                <Button colorScheme="teal">
                  <Link to="/">Home</Link>
                </Button>
              </WrapItem>
              <WrapItem>
                <Button colorScheme="teal">
                  <Link to="/rfq">Rfq</Link>
                </Button>
              </WrapItem>
              <WrapItem>
                <DrawerHelper />
              </WrapItem>
            </Wrap>
          </nav>
          <Switch>
            <Route exact path="/rfq" children={<RfqListPage />} />
            <Route path="/rfq/:rfqId" children={<RfqDetailPage/>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
