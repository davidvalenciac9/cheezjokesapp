import React, {Component} from 'react';
import Joke from './Joke';
//import SideBar from './SideBar';
import './JokesDisplay.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
const API_URL = 'https://icanhazdadjoke.com/';

export class JokesDisplay extends Component {
  constructor (props) {
    super (props);

    this.state = {jokesList: []};
    this.upVote = this.upVote.bind (this);
    this.downVote = this.downVote.bind (this);
    this.LoadMoreJokes = this.LoadMoreJokes.bind (this);
  }

  /******* Loading first 10 jokes from page 1

  async componentDidMount () {
    let response = await axios.get (`${API_URL}1`, {
      headers: {Accept: 'application/json'},
    });
    let results = response.data.results;
    results.forEach (r => {
      r.score = 0;
    });
    this.setState (st => ({
      jokesList: results,
    }));
    console.log (results);
  }
 *************************************************************/

  //Loading Data from API with Axios

  async componentDidMount () {
    let jokesArray = [];
    for (let i = 0; i < 10; ) {
      let response = await axios.get (API_URL, {
        headers: {Accept: 'application/json'},
      });

      //Comparing each element in jokes array with the joke of each new response that will return -1 or 0 if it exists
      let cleanArray = jokesArray.findIndex (
        x => x.joke === response.data.joke
      );

      //if the comparaison returns -1 I push with spread the new object into the jokesArray
      if (cleanArray === -1) {
        jokesArray = [...jokesArray, response.data];

        //incrementing for loop variable inside the conditional so the code runs until we reach 10 new jokes
        i++;
      } else {
        console.log ('joke already exists');
      }
      response.data.score = 0;
    }

    this.setState (st => ({
      jokesList: jokesArray,
    }));
  }

  //Handling button to load more jokes, may move it to a separate component later
  async LoadMoreJokes () {
    //Important!!! This time jokesArray has to be the State array or I will lose already loaded jokes.
    let jokesArray = this.state.jokesList;

    for (let i = 0; i < 10; ) {
      let response = await axios.get (API_URL, {
        headers: {Accept: 'application/json'},
      });
      let cleanArray = jokesArray.findIndex (
        x => x.joke === response.data.joke
      );

      if (cleanArray === -1) {
        jokesArray = [...jokesArray, response.data];
        i++;
      } else {
        console.log ('joke already exists');
      }
      response.data.score = 0;
    }

    this.setState (st => ({
      jokesList: jokesArray,
    }));
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
    //Creating new Array with Jokes Sorted by score
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
        {/*<SideBar />*/}
        <button onClick={this.LoadMoreJokes}>Load More Jokes</button>
      </div>
    );
  }
}

export default JokesDisplay;
