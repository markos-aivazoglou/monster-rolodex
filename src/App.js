import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list";
import { SearchBox } from "./components/search-box/search-box";
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ monsters: users });
      });
  }

  // equivalent to this.handleChange = this.handleChange.bind(this); in constructor
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    /* 
      Below statement is equivalent to:
      const monsters = this.state.monsters;
      const searchField = this.state.searchField;
    */
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1> Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monster"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
