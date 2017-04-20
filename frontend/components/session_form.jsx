import React from 'react';
import { Link } from 'react-router';
import Navbar from './navbar';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", email: "", password: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.receiveErrors({base:""});
    }
  }

  handleGuest() {
    const user = {user: {
      username: 'Guest',
      email: 'guest@guest-email.com',
      password: 'password'
    }};

    this.props.login(user).then(() => this.props.router.push('/'));
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
        welcome = (<h2>Sign Up</h2>);
        buttonText = "Sign Up";
        linkText = "Log In";
        link = "login"
        username = (
          <input
            type="text"
            onChange={this.handleChange}
            className="username"
            placeholder="Username"/>
          );
      } else {
        welcome = (<h2>Log In</h2>);
        buttonText = "Log In";
        linkText = "Sign Up";
        link = "/signup"
      }

    return (
      <div className="form-page">
        <section className="login-form">
          <div className="welcome">
          {welcome}
          </div>
          <form>
            { username }
              <input
                type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="email"
                  placeholder="Email Address"/>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="password"
                placeholder="Password"/>
              {this.renderErrors()}
            <input type="submit" onClick={this.handleSubmit} value={buttonText} className="button"/>
          </form>
          <button onClick={this.handleGuest}>Guest Login</button>
          <div className='switch-link'>
            <Link to={link}>{linkText}</Link>
          </div>
        </section>
      </div>
    );
  }
}

export default SessionForm;
