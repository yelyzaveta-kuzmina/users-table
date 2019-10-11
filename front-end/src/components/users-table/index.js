import React from "react";

const API_ORIGIN = "http://192.168.0.94:8080";

class UsersTable extends React.Component {
  state = { users: [] };

  componentDidMount() {
    setInterval(this.refetchUsers, 1000);
  }
  refetchUsers = () => {
    fetch(`${API_ORIGIN}/users`)
      .then(response => response.json())
      .then(allUsers => this.setState({ users: allUsers }))
      .catch(error => console.error(error));
  };

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSendContent = () => {
    const { name, surname } = this.state;
    if (name && surname) {
      fetch(`${API_ORIGIN}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          surname
        })
      });
    } else {
      console.log("fill in missing fields");
    }
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        {users.map((user, index) => (
          <div key={index}>{user.name}</div>
        ))}
        <button onClick={this.onSendContent}>Send data</button>
        <div>
          <input
            onChange={this.onInputChange}
            name="name"
            placeholder="name"
          ></input>
          <input
            onChange={this.onInputChange}
            name="surname"
            placeholder="surname"
          ></input>
        </div>
      </div>
    );
  }
}

export default UsersTable;
