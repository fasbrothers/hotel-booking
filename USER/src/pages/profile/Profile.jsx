import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  const { data, error } = useFetch("/users");
  const userId = data.filter((item) => item._id === user._id);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  const editUser = async () => {
    localStorage.setItem("user", JSON.stringify(user));

    setShow(false);
    const updateUser = {
      ...user,
    };

    await axios.put(`/users/${userId[0]._id}`, updateUser);
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <Header type="list" />
        <div className="profile">
          <h5 className="profile__title">Personal details</h5>
          <button className="profile__edit" onClick={() => setShow(!show)}>
            Edit your personal details
          </button>

          {!show ? (
            <div className="profile__info">
              <p>Username: {user.username}</p>
              <p>Phone: {user.phone}</p>
              <p>Email: {user.email}</p>
              <p>
                Adress: {user.country}, {user.city}
              </p>
            </div>
          ) : (
            <div className="profile__inputs">
              <label>Username</label>
              <input
                type="text"
                defaultValue={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
              />
              <label>Phone</label>
              <input
                type="text"
                defaultValue={user.phone}
                onChange={(e) => {
                  setUser({ ...user, phone: e.target.value });
                }}
              />
              <label>Email</label>
              <input
                type="text"
                defaultValue={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
              <label>Country</label>
              <input
                type="text"
                defaultValue={user.country}
                onChange={(e) => {
                  setUser({ ...user, country: e.target.value });
                }}
              />
              <label>City</label>
              <input
                type="text"
                defaultValue={user.city}
                onChange={(e) => {
                  setUser({ ...user, city: e.target.value });
                }}
              />
              <button onClick={editUser}>Save</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
