import React, { Component } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

class CountryList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper>
        <List>
          {this.props.countries.map((element, i, array) => {
            return (
              <ListItem key={i}>
                <ListItemText primary={element} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  }
}

export default CountryList;
