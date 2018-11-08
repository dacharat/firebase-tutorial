setData = () => {
  firebase
    .database()
    .ref("profile")
    .set({
      name: "Jack",
      age: 20,
      faculty: "Engineering",
      devices: {
        iphone: true,
        mackbook: true,
        huawei: true
      }
    });
};

updateData = () => {
  firebase
    .database()
    .ref("profile")
    .update({
      name: "Johnson"
    });
};

pushData = () => {
  firebase
    .database()
    .ref("profile")
    .child("devices")
    .push('samsung');
};

deleteData = () => {
  firebase
    .database()
    .ref("profile")
    .remove();
};

firebase
  .database()
  .ref()
  .on("value", snapshot => {
    const data = snapshot.val();

    document.getElementById("realtime-data").innerText = JSON.stringify(
      data,
      null,
      2
    );
  });
