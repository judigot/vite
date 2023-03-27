import React, { Component } from "react";

interface Props {
  index: number;
}

export default class ChildComponent extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return <div>Child {this.props.index}</div>;
  }
}
