import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';
import styles from './TaskList.module.css';

const TaskList = ({
  items,
  onDeleteTask,
  onUpdateCompleted,
  onUpdatePriority,
}) =>
  items.length > 0 && (
    <ul className={styles.list}>
      {items.map(item => (
        <li key={item.id}>
          <Task
            {...item}
            onDeleteTask={() => onDeleteTask(item.id)}
            onUpdateCompleted={() => onUpdateCompleted(item.id)}
            onUpdatePriority={onUpdatePriority}
          />
        </li>
      ))}
    </ul>
  );

TaskList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onUpdateCompleted: PropTypes.func.isRequired,
  onUpdatePriority: PropTypes.func.isRequired,
};

export default TaskList;
