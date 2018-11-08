let file;
let uploadTask;
addFile = () => {
  file = document.getElementById("input-file").files[0];
};

uploadFile = () => {
  uploadTask = firebase
    .storage()
    .ref(file.name)
    .put(file);

  uploadTask.on(
    "state_changed",
    snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("progress").innerText = progress + "%";
    },
    error => {},
    () => {
      firebase
        .storage()
        .ref(file.name)
        .getDownloadURL()
        .then(url => {
          document.getElementById(
            "progress"
          ).innerHTML = `Completed!! <a href="${url}">download here</a>`;
          firebase
            .database()
            .ref("files")
            .push({
              name: file.name,
              url: url
            });
        });
    }
  );
};

pause = () => {
  uploadTask.pause();
};

resume = () => {
  uploadTask.resume();
};

cancel = () => {
  uploadTask.cancel();
};

firebase
  .database()
  .ref("files")
  .on("value", snapshot => {
    const value = snapshot.val();
    const list = Object.values(value);
    
    document.getElementById("file-list").innerText = "";
    list.map(file => 
      document.getElementById("file-list").innerHTML += `<a href="${
        file.url
      }">${file.name}</a><br>`
    );
  });
