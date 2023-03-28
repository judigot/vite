import React, { Component } from "react";
// import React, { useState, useEffect } from 'react'; <-- If using hooks you can change to functional component and import what's necessary
import PropTypes from "prop-types";
import styled from "styled-components";

import ChildComponent from "./components/Component";
import Data from "./utils/Data";

// Proptypes and default props act as docs and should be at
// the top of the component

// Only user PropTypes when you dont want TypeScript's typechecking
// Proptypes vs TypeScript Types
const propTypes = {
  type: PropTypes.number,
};

// Default props when no props are passed to the component
const defaultProps = {
  counter: 1000,
};

// not sure if I like having this above the component (thoughts?)

type Props = { counter: number };
type State = { count: number; data?: object | string };

const H1Styled = styled.h1`
  color: blue;
`;

// you can export your component like this if you don’t want to do it at the bottom
// export default class exampleComponent extends Component {…}

export default class ExampleComponent extends React.Component<Props, State> {
  static propTypes: { type: PropTypes.Requireable<number> };
  static defaultProps: { counter: number };
  // use a constructor if necessary
  constructor(props: Props) {
    super(props);

    this.state = { count: 0, data: "Loading" };
  }

  /*
  useEffect(() => {
  }, []);
  */
  componentDidMount() {
    // Initial render
    (async () => {
      const data = await Data();
      this.setState({ data });
    })();
  }

  /*
  useEffect(() => {
  }, [count]);
  */
  componentDidUpdate(prevProps: Props, prevState: State) {
    // Typical usage (don't forget to compare props):
    if (this.state.count !== prevState.count) {
      // Runs after state update
    }
  }

  componentWillUnmount() {
    // Runs when component will be destroyed
    console.log("Component was successfully removed from the DOM");
  }

  // Instead of componentDidMount we can now implement useEffect for our lifecycle methods
  // useEffect(() => {
  //   update.item = `{stateItem} to update`;
  // });

  handleClick = () => {
    if (this.state.count !== 5) {
      this.setState((state, props) => {
        return { count: state.count + 1 };
      });
    }

    // this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    // Destructured to shorten "this.state"
    // const {  } = this; // probably not necessary but cleans up the component a bit more
    const { counter: counterProp } = this.props;
    const { count } = this.state;

    return (
      <>
        <H1Styled>Styled Class Component</H1Styled>
        <h5>Initial Data:</h5>
        <p>{JSON.stringify(this.state.data)}</p>
        <button onClick={this.handleClick}>
          You've clicked {count} times.
        </button>

        <div>
          {[...Array(count)].map((element, i) => {
            return <ChildComponent key={i} index={i + 1} />;
          })}
        </div>
      </>
    );
  }
}

ExampleComponent.propTypes = propTypes;
ExampleComponent.defaultProps = defaultProps;
