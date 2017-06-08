  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyAff5NErGzjm7TW45GzgdTH0hikkuiUqLc",
      authDomain: "trainscheduler-87718.firebaseapp.com",
      databaseURL: "https://trainscheduler-87718.firebaseio.com",
      projectId: "trainscheduler-87718",
      storageBucket: "trainscheduler-87718.appspot.com",
      messagingSenderId: "382111121977"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  //Capture Button Click
  $("#addData").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();

      var name = $("#trainName").val().trim();
      var dest = $("#destination").val().trim();
      var time = $("#firstTime").val().trim();
      var freq = $("#frequency").val().trim();
      var monthsWorked = moment().diff(moment(time), "months");
      console.log(monthsWorked);
      var totalBilled = monthsWorked * monthRate;
      // YOUR TASK!!!

      database.ref().push({

          name: name,
          dest: dest,
          time: time,


      })
  });

  database.ref().on('child_added', function(childSnapshot) {
              var newRow = $('<tr>');

              var newName = $('<td>').text(childSnapshot.val().name).appendTo(newRow);
              var newdest = $('<td>').text(childSnapshot.val().dest).appendTo(newRow);
              var newStartDate = $('<td>').text(childSnapshot.val().time).appendTo(newRow);
              var newMonthsWorked = $('<td>').text(childSnapshot.val().monthsWorked).appendTo(newRow);
              var newMonthRate = $('<td>').text(childSnapshot.val().monthRate).appendTo(newRow);
              var newTotalBilled = $('<td>').text(childSnapshot.val().totalBilled).appendTo(newRow);

              newRow.appendTo($('#new-data'));
