import React, { Component } from 'react';

class WordCardView extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>{this.props.word.title}</h1>
          <div className="modules">
            <button type="button" onClick={this.props.handleEdit}><i className="material-icons">mode_edit</i></button>
            <button type="button" onClick={this.props.handleRemove}><i className="material-icons">close</i></button>
          </div>
        </header>
        <p>{this.props.word.definition}</p>
      </div>
    )
  }
}

export default WordCardView
