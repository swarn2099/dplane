  $(document).ready(function() {
    $('#wait').hide();
    $('#good').hide();
    $('#delayed').hide();
    $('#notLanded').hide();

  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $('#loginButton').hide();
      $('#signoutButton').show();
      var docRef = db.collection("users").doc(user.email);
      docRef.get().then(function(doc) {

        if (!doc.data().connecting) {
          console.log('No Second flight...here we go');
          var flightRef = db.collection("flights").doc(doc.data().flight1);
          flightRef.get().then(function(flightDoc) {
            $('#welcomeTo').append("Welcome to " + flightDoc.data().arrival);

            if(flightDoc.data().status = 2){
              console.log('UH-oh we got an issue');
              $('#delayed').show();
            }else {
              $('#welcomeTo').append("Welcome to " + flightDoc.data().arrival);
              console.log("Here is the flight data =>", flightDoc.data());
              $('#fName').append('Flight Name:' + flightDoc.data().name + '');
              $('#depName').append('Departure:' + flightDoc.data().depart + '');
              $('#desName').append('Destination:' + flightDoc.data().arrival + '');
              if (flightDoc.data().landed) {
                console.log("Landed Flight data:", flightDoc.data());
                if (flightDoc.data().connectPassDone == false && doc.data().connecting == false) {
                  console.log("Youre gonna wait");
                  $('#good').hide();
                  $('#wait').show();
                } else if (flightDoc.data().connectPassDone == true && doc.data().connecting == true) {
                  console.log("You're good to go!");
                  $('#wait').hide();
                  $('#good').show();
                } else if (flightDoc.data().connectPassDone == true && doc.data().connecting == false) {
                  console.log("You're good to go!");
                  $('#wait').hide();
                  $('#good').show();
                } else if (flightDoc.data().connectPassDone == false && doc.data().connecting == true) {
                  console.log("You're good to go!");
                  $('#wait').hide();
                  $('#good').show();
                }
              }else{
                console.log('Flight hasnt landed');
                $('#notLanded').show();
                $('#fName').append('Flight Name:' + flightDoc.data().name + '');
                $('#depName').append('Departure:' + flightDoc.data().depart + '');
                $('#desName').append('Destination:' + flightDoc.data().arrival + '');
              }
            }

          }).catch(function(error) {
            console.log("Error getting document:", error);
          });
        } else {
          console.log('Second flight found');
          var flightRef = db.collection("flights").doc(doc.data().flight2);
          var flightRefAlt = db.collection("flights").doc(doc.data().flight2).collection("alt");

          flightRef.get().then(function(flightDoc) {
            console.log("Status", "=>", flightDoc.data().status);
            if(flightDoc.data().status == 2){
              flightRefAlt.get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                    $('#delayed').show();
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                      var altCard = '<div class="col s12 m5" id=""><div class="card-panel z-depth-5" style="border-radius: 20px; background-color: #fff; "><h4 class="black-text left-align" style="font-weight: 900;">Flight '+doc.data().name+'<br></h4><p class="black-text left-align" style="font-weight: 900;">'+doc.data().dtime+' - '+doc.data().atime+'<br></p><p class="black-text left-align" style="font-weight: 900;">'+doc.data().depart+' - '+doc.data().arrival+'<br></p><div class="left-align"><a class="waves-effect waves-light btn blue darken-4" style="border-radius: 20px;">Book Flight</a></div></div></div>';
                      $('#altFlights').append(altCard);
                  });
              });
            }else{
              console.log("flight is fine...youre good to go");
              var flightRef = db.collection("flights").doc(doc.data().flight1);
              $('#welcomeTo').append("Welcome to " + flightDoc.data().arrival);
              flightRef.get().then(function(flightDoc) {
                console.log("Here is the flight data =>", flightDoc.data());
                $('#fName').append('Flight Name:' + flightDoc.data().name + '');
                $('#depName').append('Departure:' + flightDoc.data().depart + '');
                $('#desName').append('Destination:' + flightDoc.data().arrival + '');
                if (flightDoc.data().landed) {
                  console.log("Landed Flight data:", flightDoc.data());
                  if (flightDoc.data().connectPassDone == false && doc.data().connecting == false) {
                    console.log("Youre gonna wait");
                    $('#good').hide();
                    $('#wait').show();
                  } else if (flightDoc.data().connectPassDone == true && doc.data().connecting == true) {
                    console.log("You're good to go!");
                    $('#wait').hide();
                    $('#good').show();
                  } else if (flightDoc.data().connectPassDone == true && doc.data().connecting == false) {
                    console.log("You're good to go!");
                    $('#wait').hide();
                    $('#good').show();
                  } else if (flightDoc.data().connectPassDone == false && doc.data().connecting == true) {
                    console.log("You're good to go!");
                    $('#wait').hide();
                    $('#good').show();
                  }
                }else{
                  console.log('Flight hasnt landed');
                  $('#notLanded').show();
                  $('#fName').append('Flight Name:' + flightDoc.data().name + '');
                  $('#depName').append('Departure:' + flightDoc.data().depart + '');
                  $('#desName').append('Destination:' + flightDoc.data().arrival + '');
                }
              }).catch(function(error) {
                console.log("Error getting document:", error);
              });
            }



          });
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }else{
      console.log('No one is signed in!!!');
    }
  });
