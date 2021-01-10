import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { Presentational } from "./React";
import {store, mapS2P, mapD2P} from "./Redux";
import "./index.css";
import "./style.css";

const Container = connect(mapS2P, mapD2P)(Presentational);

const Wrapper = () => {
  return (
    <Provider store={store}>
      <Container/>
    </Provider>
  );
}


ReactDOM.render(<Wrapper/>, document.getElementById("root"));