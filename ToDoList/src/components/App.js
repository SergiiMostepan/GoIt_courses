import React, { Component } from 'react';
import 'normalize.css';
import shortid from 'shortid';
import TaskEditor from './TaskEditor/TaskEditor';
import TaskList from './TaskList/TaskList';
import TaskFilter from './TaskFilter/TaskFilter';
import localStorageLoader from './LocalStorage/LocalStorage';

const containerStyles = {
  maxWidth: 1200,
  minWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const taskFilter = (tasks, filter) =>
  tasks.filter(task => task.text.toLowerCase().includes(filter.toLowerCase()));

export default class App extends Component {
  state = {
    tasks: [],
    filter: '',
  };

  componentDidMount() {
    const tasksFromLS = localStorageLoader.load('tasks');
    if (tasksFromLS) {
      this.setState({
        tasks: tasksFromLS,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks !== this.state.tasks)
      localStorageLoader.save('tasks', this.state.tasks);
  }

  changeFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  addTask = task => {
    const toAddTask = {
      ...task,
      id: shortid.generate(),
      completed: false,
    };
    this.setState(state => ({
      tasks: [...state.tasks, toAddTask],
    }));
  };

  deleteTask = id => {
    this.setState(state => ({
      tasks: state.tasks.filter(task => task.id !== id),
    }));
  };

  updateCompleted = id => {
    this.setState(state => ({
      tasks: state.tasks.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    }));
  };

  updatePriority = (id, priority) => {
    this.setState(state => ({
      tasks: state.tasks.map(task =>
        task.id === id
          ? {
              ...task,
              priority: priority,
            }
          : task,
      ),
    }));
  };

  render() {
    const { tasks, filter } = this.state;
    const filteredTasks = taskFilter(tasks, filter);
    return (
      <div style={containerStyles}>
        <TaskEditor onAddTask={this.addTask} /> <hr />
        <TaskFilter value={filter} onChangeFilter={this.changeFilter} />
        <TaskList
          items={filteredTasks}
          onDeleteTask={this.deleteTask}
          onUpdateCompleted={this.updateCompleted}
          onUpdatePriority={this.updatePriority}
        />
      </div>
    );
  }
}
