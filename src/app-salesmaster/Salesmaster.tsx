import OrdersTable from "./components/OrdersTable";
import Navbar from "./components/Navbar";

import { Provider } from "react-redux";
import { store } from "./store";

interface Props {}

const App = ({}: Props) => {
  return (
    <Provider store={store}>
      {/* <Navbar /> */}
      <OrdersTable />
    </Provider>
  );
};
export default App;
