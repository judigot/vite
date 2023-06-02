import React, { Component } from "react";
import Input from "@mui/material/Input";

class Search extends Component {
  constructor(props) {
    super(props);

    // prettier-ignore
    this.handleChange = props.handleChange;
  }
  render() {
    return (
      <Input
        onChange={this.handleChange}
        className="search-box"
        placeholder="Enter Country Name"
      />
    );
  }
}

export default Search;
