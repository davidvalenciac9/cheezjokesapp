import React, {Component} from 'react';
import Joke from './Joke';
import './JokesDisplay.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
const API_URL = 'https://icanhazdadjoke.com/search?limit=10&page=1';

export class JokesDisplay extends Component {
  constructor (props) {
    super (props);

    this.state = {jokesList: []};
    this.upVote = this.upVote.bind (this);
    this.downVote = this.downVote.bind (this);
  }

  [{id: 1234, joe: 'aca el chiste', score: 0}];

  async componentDidMount () {
    let response = await axios.get (API_URL, {
      headers: {Accept: 'application/json'},
    });
    let results = response.data.results;
    results.forEach (r => {
      r.score = 0;
    });
    this.setState (st => ({
      jokesList: response.data.results,
    }));
    console.log (results);
  }

  //UpVote and DownVote handlers
  //Seting State creating a new array with map, looking for a matching id and +/- 1 to current score

  upVote (id) {
    this.setState (st => ({
      jokesList: st.jokesList.map (
        j => (j.id === id ? {...j, score: j.score++} : j)
      ),
    }));
  }

  downVote (id) {
    this.setState (st => ({
      jokesList: st.jokesList.map (
        j => (j.id === id ? {...j, score: j.score--} : j)
      ),
    }));
  }
  //End of UpVote and DownVote handlers

  render () {
    const sortedJokes = this.state.jokesList.sort (
      (a, b) => (a.score > b.score ? -1 : 1)
    );
    const joke = sortedJokes.map (j => {
      return (
        <Joke
          joke={j.joke}
          upVote={this.upVote}
          downVote={this.downVote}
          score={j.score}
          id={j.id}
          key={j.id}
        />
      );
    });
    return (
      <div className="JokesDisplay">
        {joke}
      </div>
    );
  }
}

export default JokesDisplay;
