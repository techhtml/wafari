import React, { Component } from 'react';
import './index.css';
import WordCardView from './wordCardView';
import WordCardEdit from './wordCardEdit';
import firebase from '../firebase';

class WordCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.word.id,
      editable: false
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  render() {
    const isEditable = this.state.editable;
    let card = null;
    if(isEditable) {
      card = <WordCardEdit word={this.props.word} handleEdit={this.handleEdit} />
    } else {
      card = <WordCardView word={this.props.word} handleEdit={this.handleEdit} handleRemove={this.handleRemove} />
    }
    return (
      <div className="word">
        {card}
      </div>
    )
  }
  handleRemove() {
    const itemsRef = firebase.database().ref('words/' + this.props.word.id);
    itemsRef.remove();
  }
  handleEdit() {
    if(this.state.editable) {
      this.setState({editable: false})
    } else {
      this.setState({editable: true})
    }
  }
}

export default WordCard;
