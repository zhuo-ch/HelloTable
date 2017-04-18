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

  handleSubmit(e) {
   e.preventDefault();
   const user = Object.assign({}, this.state);
   this.props.processForm(user).then(() => hashHistory.push('/'));
 }

  handleChange(e) {
    e.preventDefault();
    const action = e.currentTarget.className;
    this.setState({[action]: e.currentTarget.value});
  }

  render() {
    return (
      <form>
        <label>User Name
          <input
            type="text"
            onChange={this.handleChange}
            className="username"/>
        </label>
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
        <input type="submit" onClick={this.handleSubmit}/>
      </form>
    )
  }
}

export default SessionForm;
