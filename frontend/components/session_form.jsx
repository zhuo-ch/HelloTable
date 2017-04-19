import React from 'react';
import { Link } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", email: "", password: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.receiveErrors({base:""});
    }
  }

  handleSubmit(e) {
   e.preventDefault();
   const user = Object.assign({}, this.state);
   this.props.processForm(user).then(() => this.props.router.push('/'));
 }

  handleChange(e) {
    e.preventDefault();
    const action = e.currentTarget.className;
    this.setState({[action]: e.currentTarget.value});
  }

  renderErrors() {
    return (
      <h5>{this.props.errors.base}</h5>
    );
  }

  render() {

    let username;
    let welcome;
    let buttonText;
    let linkText;
    let link;
      if (this.props.formType === 'signup') {
        welcome = (<h3>Sign Up</h3>);
        buttonText = "Sign Up";
        linkText = "Log In";
        link = "login"
        username = (
        <label>User Name
          <input
            type="text"
            onChange={this.handleChange}
            className="username"
            placeholder="Username"/>
        </label>);
      } else {
        welcome = (<h3>Log In</h3>);
        buttonText = "Log In";
        linkText = "Sign Up";
        link = "/signup"
      }

    return (
      <div className="login-form">
        <h3>{welcome}</h3>
        <form>
          { username }
          <label>Email Address
            <input
              type="text"
                value={this.state.email}
                onChange={this.handleChange}
                className="email"
                placeholder="Email Address"/>
          </label>
          <label>Password
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              className="password"
              placeholder="Password"/>
          </label>
            {this.renderErrors()}
          <input type="submit" onClick={this.handleSubmit} value={buttonText}/>
        </form>
        <Link to={link}>{linkText}</Link>
      </div>
    );
  }
}

export default SessionForm;
