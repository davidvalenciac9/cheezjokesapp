import React, {Component} from 'react';
import './Joke.css';

export class Joke extends Component {
  render () {
    return (
      <div className="Joke">
        <p>{this.props.joke}</p>
      </div>
    );
  }
}

export default Joke;
