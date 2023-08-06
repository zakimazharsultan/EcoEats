export const Quantity = ({ item }) => {
  state = {
    quantity: 1,
    symbol: "",
  };

  if (itemType === "s") {
    this.setState({
      symbol: "P",
    });
  } else if (itemType === "l") {
    this.setState({
      symbol: "L",
    });
  } else if (itemType === "d") {
    this.setState({
      symbol: "kg",
    });
  }

  incrementValue = () => {
    this.setState({
      value: this.state.value + 1,
    });
  };

  decrementValue = () => {
    this.setState({
      value: this.state.value - 1,
    });
  };
};
