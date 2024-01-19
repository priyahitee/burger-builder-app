import React from "react";
import Layout from "./containers/layout/layout";
import BurgerBuilder from "./containers/burgerBuilder/burgerBuilder";

class App extends React.Component{
  render(){
    return  (
      <div>
        <Layout>
            <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
