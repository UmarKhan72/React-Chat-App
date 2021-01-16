import firebase from '../../Config/firebase';

const facebook_login = (history) => {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider;

        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;


                let create_user = {
                    Name: user.displayName,
                    Email: user.email,
                    ProfilePic: user.photoURL,
                    Uid: user.uid
                }
                firebase.database().ref('/').child(`Users/${user.uid}`).set(create_user)
                    .then(() => {
                        dispatch({ type: "SETUSER", payload: create_user })
                        alert("User Login successfully!")
                        history.push('/chat')
                    })


            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorMessage)
            })
    }
}



const get_users = () => {
    return (dispatch) => {
        let users = [];
        firebase.database().ref('/').child('Users').on('child_added', (data) => {
            users.push(data.val())
        })
        dispatch({ type: "SETFIREBASEUSERS", payload: users })
    }
}


export {
    facebook_login,
    get_users
}