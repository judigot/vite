import OrdersTable from "./components/OrdersTable";
import Navbar from "./components/Navbar";

import { Provider } from "react-redux";
import { store } from "./store";

interface Props {
  [key: string]: string | number | Date; // For assigning dynamic keys (string)
  [index: number]: string | number | Date; // For assigning dynamic indexes (number)
}

const App = ({}: Props) => {
  return (
    <Provider store={store}>
      {/* <Navbar /> */}
      <OrdersTable />
    </Provider>
  );
};
export default App;
