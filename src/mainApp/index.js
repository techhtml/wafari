import React, { Component } from 'react';
import './index.css';
import firebase from '../firebase';
import AddWordCard from '../addWordCard';
import WordCard from '../wordCard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      wordAddVisible: false,
      words: [],
    }
    this.handleAddWord = this.handleAddWord.bind(this);
  }
  render() {
    return (
      <div className="wafari">
        <button className="btn-add-word" onClick={this.handleAddWord}><i className="material-icons">note_add</i></button>
        <AddWordCard visible={this.state.wordAddVisible} close={this.handleAddWord}/>
        <div className="word-list">
        {this.state.words.map((word) => {
          return (
            <WordCard key={word.id} word={word} />
          )
        })}
        </div>
      </div>
    );
  }
  handleAddWord() {
    let isWordAddVisible = this.state.wordAddVisible;
    if(isWordAddVisible) {
      this.setState({wordAddVisible: false});
    } else {
      this.setState({wordAddVisible: true});
    }
  }
  componentWillMount() {
    const itemsRef = firebase.database().ref('words');
    itemsRef.on('value', (snapshot) => {
      let words = snapshot.val();
      let newWords = [];
      for (let word in words) {
        newWords.push({
          id: word,
          title: words[word].title,
          definition: words[word].definition
        })
      }
      this.setState({
        words: newWords
      })
    })
  }
}

export default App;
