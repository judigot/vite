// Usage
//=====REDUX=====//
import App from "./AppBoilerplate";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
export default ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
//=====REDUX=====//
