import React, { Component } from 'react';
import firebase from '../firebase';

class WordCardEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: this.props.word.title,
      def: this.props.word.definition
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <header>
            <h1><input type="text" autoFocus name="word" onChange={this.handleChange} value={this.state.word} /></h1>
            <div className="modules">
              <button type="submit"><i className="material-icons">done</i></button>
            </div>
          </header>
          <p><textarea name="def" rows="5" onChange={this.handleChange} defaultValue={this.state.def}></textarea></p>
        </form>
      </div>
    )
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    if(this.state.word === "") {
      return;
    }
    if(this.state.def === "") {
      return;
    }
    const itemsRef = firebase.database().ref('words/' + this.props.word.id);
    const word = {
      id: Date.now(),
      title: this.state.word,
      definition: this.state.def
    };
    itemsRef.set(word);
    this.setState({
      word: '',
      def: '',
    });
    this.props.handleEdit();
  }
}

export default WordCardEdit
