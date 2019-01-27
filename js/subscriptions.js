$(document).ready(function() {
  $('#loginButton').show();
  $('#signoutButton').hide();


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $('#loginButton').hide();
      $('#signoutButton').show();
      console.log(user.email);
      var docRef = db.collection("users").doc(user.email);
      docRef.get().then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  });
});

function login() {
  var email = document.getElementById("emailLogin").value;
  var password = document.getElementById('passwordLogin').value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    $('.modal').modal('close');

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message
    M.toast({
      html: 'Incorrect Email or Password',
      classes: 'rounded red white-text'
    });
  });
};

function signout() {
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    window.location.href = "index.html";

  }, function(error) {
    window.location.href = "index.html";
  });
}

function signoutHome() {
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    window.location.href = "index.html";

  }, function(error) {
    window.location.href = "../index.html";
  });
}
