import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import styles from './TaskEditor.module.css';
import PrioritySelector from '../PrioritySelector/PrioritySelector';
import Priority from '../../utils/Priority';

const options = Object.values(Priority);
export default class TaskEditor extends Component {
  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  };

  state = {
    text: '',
    priority: Priority.NORMAL,
  };

  hendleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  hendleSubmit = e => {
    e.preventDefault();
    this.props.onAddTask({
      ...this.state,
    });
    this.setState({
      text: '',
      priority: Priority.NORMAL,
    });
  };

  render() {
    const {
      text,
      priority
    } = this.state;
    return ( <
      form className = {
        styles.form
      }
      onSubmit = {
        this.hendleSubmit
      } >
      <
      input className = {
        styles.input
      }
      type = "text"
      value = {
        text
      }
      onChange = {
        this.hendleChange
      }
      name = "text"
      placeholder = "Enter taskcontent..." /
      >
      <
      label className = {
        styles.label
      } >
      Select task priority:
      <
      PrioritySelector options = {
        options
      }
      value = {
        priority
      }
      onChange = {
        this.hendleChange
      }
      /> <
      /label> <
      button type = "submit" > Create < /button> <
      /form>
    );
  }
}