createUser = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = firebase.auth().currentUser;
      user.sendEmailVerification().then(() => {
        alert("Email vertification has been sent");
      });
    });
};

loginWithEmail = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {});
};

logout = () => {
  firebase.auth().signOut();
};

loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

loginWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    //Sign in
    document.getElementById("auth-info").innerText = JSON.stringify(
      user,
      null,
      2
    );
    firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value", snapshot => {
        if (!snapshot.exists()) {
          //Create User
          // firebase
          //   .database()
          //   .ref("users")
          //   .child(user.uid)
          //   .set({
          //     displayName: user.displayName,
          //     photoURL: user.photoURL,
          //     email: user.email,
          //     purchaseHistory: ["Nike", "Converse", "Adidas"]
          //   });
        }
      });
  } else {
    //Sign out
    document.getElementById("auth-info").innerText = "No user";
  }
});
