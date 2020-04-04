import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    // Set the state corresponding to the data in MongoDB
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount = async () => {
    try {
      // Get the users array
      const response = await axios.get('http://localhost:5000/users');

      // Get the exercise to edit
      const response2 = await axios.get(
        // Get the id directly from the URL
        `http://localhost:5000/exercises/${this.props.match.params.id}`
      );

      this.setState({
        username: response2.data.username,
        description: response2.data.description,
        duration: response2.data.duration,
        data: new Date(response2.data.date),
      });

      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.username),
        });
      }
    } catch (err) {}
  };

  onChnageUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    try {
      const response = await axios.post(
        // Get id from the URL
        `http://localhost:5000/exercises/update/${this.props.match.params.id}`,
        exercise
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }

    // Redirect to home page
    window.location = '/';
  };

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="">Username: </label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChnageUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes)</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
