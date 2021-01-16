import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { facebook_login } from '../../store/action';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <button onClick={() => this.props.facebook_login(this.props.history)}>Login with Facebook</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = (dispatch) => ({
    facebook_login: (history) => dispatch(facebook_login(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);