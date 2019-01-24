import React from 'react';
import axios from "axios";

class Users extends React.Component {
    state = {
        users: [],
    };

    componentDidMount() {
        const endpoint = `${process.env.REACT_APP_API_URL}/api/users`;
        const token = localStorage.getItem('jwt');
        const requestOptions = {
            headers: {
                authorization: token,
            },
        };
        console.log(endpoint);
        axios.get(endpoint, requestOptions)
            .then(res => {
                console.log(res);
                this.setState({
                    users: res.data.users
                })
                // console.log(this.state.users);
            })
            .catch(err => console.error(err));
    }

    render() {
        // console.log(this.state.users);
        return (
            <>
                <h2>List of Users</h2>
                <ul>
                    {this.state.users.map(u => (
                        <li key={u.id}>{u.username}</li>
                    ))}
                </ul>
            </>
        )
    }

}

export default Users;