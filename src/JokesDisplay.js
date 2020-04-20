import React, {Component} from 'react';
import Joke from './Joke';
import axios from 'axios';
const API_URL = 'https://icanhazdadjoke.com/search?limit=10&page=1';

export class JokesDisplay extends Component {
  constructor (props) {
    super (props);

    this.state = {jokesList: []};
  }

  async componentDidMount () {
    let response = await axios.get (API_URL, {
      headers: {Accept: 'application/json'},
    });
    this.setState (st => ({
      jokesList: response.data.results,
    }));
    console.log (response);
  }

  render () {
    const joke = this.state.jokesList.map (j => {
      return <Joke joke={j.joke} />;
    });
    return (
      <div className="JokesDisplay">
        {joke}
      </div>
    );
  }
}

export default JokesDisplay;
