import React, {Component} from 'react';
import './Joke.css';

export class Joke extends Component {
  constructor (props) {
    super (props);

    this.upVote = this.upVote.bind (this);
    this.downVote = this.downVote.bind (this);
  }

  upVote () {
    this.props.upVote (this.props.id);
  }

  downVote () {
    this.props.downVote (this.props.id);
  }

  render () {
    let borderColor;

    if (this.props.score === 0) {
      borderColor = 'gray';
    } else if (this.props.score > 0) {
      borderColor = 'orange';
    } else {
      borderColor = 'red';
    }

    let styleScoreDisplay = {
      border: `3px solid ${borderColor}`,
    };

    return (
      <div className="Joke">
        <div className="score">
          <i onClick={this.upVote} className="fas fa-arrow-up" />
          {/*Displaying Score*/}
          <span className="score-display" style={styleScoreDisplay}>
            {this.props.score}
          </span>
          <i onClick={this.downVote} className="fas fa-arrow-down" />
        </div>
        <div className="joke-text">{this.props.joke}</div>

      </div>
    );
  }
}

export default Joke;
