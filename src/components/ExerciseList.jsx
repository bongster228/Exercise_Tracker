import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${props.exercise._id}`}>Edit</Link> |{' '}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
    };
  }

  componentDidMount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/exercises');

      this.setState({
        exercises: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  deleteExercise = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/exercises/${id}`
      );

      this.setState({
        exercises: this.state.exercises.filter((el) => el._id !== id),
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  exerciseList = () => {
    return this.state.exercises.map((currExercise) => {
      return (
        <Exercise
          exercise={currExercise}
          deleteExercise={this.deleteExercise}
          key={currExercise._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
