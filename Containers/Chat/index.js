import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_users } from '../../store/action';
import firebase from '../../Config/firebase';

class Chat extends Component {
    constructor() {
        super()
        this.state = {
            chat_user: {},
            chats: [],
            message: ""
        }
    }

    chat = (user) => {
        this.setState({
            chat_user: user
        })
        let current_user = this.props.current_user;
        let merge_uid = this.uid_merge(current_user.Uid, user.Uid);
        console.log(merge_uid)
        this.get_messages(merge_uid)
    }

    componentDidMount() {
        this.props.get_users()
    }

    get_messages = (uid) => {
        firebase.database().ref('/').child(`chats/${uid}`).on('child_added', (messages) => {
            this.state.chats.push(messages.val())
            this.setState({
                chats: this.state.chats
            })
        })
    }

    uid_merge(uid1, uid2) {
        if (uid1 < uid2) {
            return uid1 + uid2
        } else {
            return uid2 + uid1
        }
    }

    send_message = () => {
        let user = this.props.current_user;
        let chat_user = this.state.chat_user;
        let merge_uid = this.uid_merge(user.Uid, chat_user.Uid);

        firebase.database().ref('/').child(`chats/${merge_uid}`).push({
            Message: this.state.message,
            Name: user.Name,
            Uid: user.Uid
        })

        this.setState({
            message: ""
        })
    }

    render() {
        let user = this.props.current_user;
        // console.log("firebase messages==>", this.props.chats)
        return (
            <div>
                <h1>Welcome! {user.Name}</h1>
                <img src={user.ProfilePic} />
                <h6>Email: {user.Email}</h6>
                <div style={{ display: 'flex' }}>
                    <div style={{ backgroundColor: "grey" }}>
                        <h4>Chat Users:</h4>
                        <ul>
                            {this.props.users.map((v, i) => {
                                return v.Uid !== user.Uid && <li key={i}>
                                    <img src={v.ProfilePic} alt="" width="20" />
                                    {v.Name}<button onClick={() => this.chat(v)}>Chat</button>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div style={{ width: 400, backgroundColor: "yellow" }}>
                        <h4>Chat</h4>
                        {Object.keys(this.state.chat_user).length ?
                            <div>
                                <h4><img src={this.state.chat_user.ProfilePic} alt="" width="20" />{this.state.chat_user.Name}</h4>
                                <ul>
                                    {this.state.chats.map((v, i) => {
                                        return <li style={{color: v.Uid === user.Uid ? "red" : "green"}} key={i}>{v.Message}</li>
                                    })}
                                </ul>
                                <input value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} type="text" placeholder="Enter your message" />
                                <button onClick={() => this.send_message()}>Send</button>
                            </div>
                            :
                            <h4>No user</h4>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    current_user: state.current_user,
    users: state.users
})

const mapDispatchToProps = (dispatch) => ({
    get_users: () => dispatch(get_users())
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);