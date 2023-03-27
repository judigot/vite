import OrdersTable from "./components/OrdersTable";
import Navbar from "./components/Navbar";

import { Provider } from "react-redux";
import { store } from "./store";

interface Props {
  // For assigning dynamic keys (string)
  [key: string]: string | number | Date | undefined;

  // For assigning dynamic indexes (number)
  [index: number]: string | number | Date | undefined;
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
