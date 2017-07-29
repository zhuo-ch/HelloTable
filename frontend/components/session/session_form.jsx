import React from 'react';
import { Link } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", email: "", password: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formType !== this.props.formType) {
      this.props.receiveErrors([]);
      this.setState({ username: "", email: "", password: ""});
    }
  }

  handleError() {
    setTimeout( () => this.props.setCurrentModal({ hidden: false, type: this.props.formType }), 500);
  }

  handleGuest(e) {
    e.preventDefault();
    const user = {
      username: 'Guest',
      email: 'guest@guest-email.com',
      password: 'password'
    };

    this.props.setCurrentModal({ hidden: false, type: 'spinner' });
    this.props.login(user).then(() => this.props.resetCurrentModal());
  }

  handleSubmit(e) {
   e.preventDefault();
   const action = this.props.formType === 'signup' ? this.props.signup : this.props.login;
   const user = Object.assign({}, this.state);

   this.props.setCurrentModal({ hidden: false, type: 'spinner' });
   action(user).then(() => this.props.resetCurrentModal(), () => this.handleError());
 }

  handleChange(e) {
    e.preventDefault();
    const action = e.currentTarget.className.split(" ")[0];
    this.setState({[action]: e.currentTarget.value});
  }

  handleSwitch(e) {
    e.preventDefault();
    const type = this.props.formType === 'signup' ? 'login' : 'signup';
    this.props.setCurrentModal({hidden: false, type})
  }

  renderErrors() {
    const errors = this.props.errors ? this.props.errors.join('. ') : "";

    return (
      <h5>{ errors }</h5>
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
            className="username input"
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
                  className="email input"
                  placeholder="Email Address"/>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="password input"
                placeholder="Password"/>
              <section className='errors'>
                {this.renderErrors()}
              </section>
            <input type="submit" onClick={this.handleSubmit} value={buttonText} className="input button"/>
            <button onClick={this.handleGuest} className='button'>Demo</button>
          </form>
          <div className='switch-link'>
            <span onClick={this.handleSwitch}>{linkText}</span>
          </div>
        </section>
      </div>
    );
  }
}

export default SessionForm;
