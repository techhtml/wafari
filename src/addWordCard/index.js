import React, { Component } from 'react';
import './index.css';
import firebase from '../firebase';

class AddWordCard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }
  ComponentDidMount() {
    this.setState({
      word: '',
      def: ''
    })
  }
  render() {
    if(!this.props.visible) {
      return null;
    }
    return (
      <div className="word-box" onKeyDown={this.closePopup}>
        <header>
          <h1><i className="material-icons">note_add</i></h1>
          <button onClick={this.props.close}><i className="material-icons">close</i></button>
        </header>
        <div className="input-box">
          <form onSubmit={this.handleSubmit}>
            <input type="text" autoFocus name="word" onChange={this.handleChange} placeholder="Word" />
            <textarea name="def" rows="7" onChange={this.handleChange} placeholder="say something"></textarea>
            <input type="submit" value="add word" />
          </form>
        </div>
      </div>
    )
  }
  closePopup(e) {
    if(e.keyCode === 27) {
      this.props.close();
    }
  }
  handleChange(e) {
    if(e.target.value === "") {
      return;
    }
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

    const itemsRef = firebase.database().ref('words');
    const word = {
      id: Date.now(),
      title: this.state.word,
      definition: this.state.def
    };
    itemsRef.push(word);
    this.setState({
      word: '',
      def: '',
    });
    this.props.close();
  }
}

export default AddWordCard
