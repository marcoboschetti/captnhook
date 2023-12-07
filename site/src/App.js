import React, { Component } from "react";

import { BucketProvider } from './context/BucketProvider';
import { DisplayWebhooks } from './components/Webhooks';
import { Header } from "./components/Header";


class App extends Component {
  render() {
    return (
          <BucketProvider basename="/">
            <div className="container" style={{maxWidth: "unset"}}>
              <Header />
              <DisplayWebhooks />
            </div>
          </BucketProvider>
    );
  }
}

export default App;
