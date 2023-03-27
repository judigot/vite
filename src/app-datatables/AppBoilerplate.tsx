import MUIDataTable from "./components/MUIDatatable";

import Data from "./helpers/Data";

export default function AppBoilerplate() {
  const columnNames = [
    { name: "ID", options: { filterOptions: { fullWidth: true } } },
    "First Name",
    "Last Name",
    "Email",
    "Password",
    "Created At",
    "Updated At",
  ];

  Data()
    .then((result) => {
      // Success
    })
    .catch((error) => {
      // Failure
      throw new Error(error);
    })
    .finally(() => {
      // Finally
    });
  return (
    <MUIDataTable
      title={"Users Table"}
      columnNames={columnNames}
      // prettier-ignore
      data={[]}
    />
  );
}
