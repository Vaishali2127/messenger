import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";

import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  // const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useHistory();
  console.log(user);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile= async (url) =>{
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  }

  useEffect(() => {
    // if (!didMountRef.current) {
    //   didMountRef.current = true;

    if (!user) {
      history.push("/");

      return;
    }
    axios
      .get("https://api.chatengin.io/users/me", {
        headers: {
          "project-id": "2bb22961-9810-4940-b489-34e92ee94b7a",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => setLoading(false))

      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "46b0b109-cf11-4e43-9c8f-5461c92ddcb5",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
    // }
  }, [user, history]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID="2bb22961-9810-4940-b489-34e92ee94b7a"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
