import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const Navbar = (state) => {
  let rightBar;
  //
  // if (state.current_user) {
  //   rightBar = (
  //     <section className=""
  //   );
  // }
  return (
    <div>
      <h2>Hello world</h2>
      {state.children}
    </div>
  )
};

const mapStateToProps = state => {
  return ({
    currentUser: state.session.currentUser,
  })
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
