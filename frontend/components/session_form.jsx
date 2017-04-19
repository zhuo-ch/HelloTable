import React from 'react';
import { withRouter, hashHistory } from 'react-router';
import { assign } from 'lodash';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", email: "", password: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    debugger
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.receiveErrors([]);
    }
  }

  handleSubmit(e) {
   e.preventDefault();
   const user = Object.assign({}, this.state);
   this.props.processForm(user);
 }

  handleChange(e) {
    e.preventDefault();
    const action = e.currentTarget.className;
    this.setState({[action]: e.currentTarget.value});
  }

  renderErrors() {
    return (
      <ul>
        {
          this.props.errors.map((error) => (
            <li>{error}</li>
          ))
        }
      </ul>
    );
  }

  render() {

    let username;
    let welcome;
    let buttonText;
      if (this.props.formType === 'signup') {
        welcome = (<h3>Sign Up</h3>);
        buttonText = "Sign Up";
        username = (
        <label>User Name
          <input
            type="text"
            onChange={this.handleChange}
            className="username"/>
        </label>);
      } else {
        welcome = (<h3>Log In</h3>);
        buttonText = "Log In";
      }

    return (
      <form>
        { username }
        <label>Email Address
          <input
            type="text"
              value={this.state.email}
              onChange={this.handleChange}
              className="email"/>
        </label>
        <label>Password
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="password"/>
        </label>
          {this.renderErrors()}
        <input type="submit" onClick={this.handleSubmit} value={buttonText}/>
      </form>
    );
  }
}

export default SessionForm;
