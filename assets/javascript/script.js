window.onload = function() {
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
        console.log("cheetoh");
        event.preventDefault();

        var name = $("#trainName").val().trim();
        var dest = $("#destination").val().trim();
        var freq = $("#frequency").val().trim();
        var firstTimeConverted = moment(name, "HH:mm");
        var currentTime = moment().format("HH:mm");
        var freqConvert = moment(freq, "minutes");
        var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
        var timeRemainder = timeDiff % freqConvert;
        var minutes = freqConvert - timeRemainder;
        var next = moment().add(minutes, "minutes").format("HH:mm");

        console.log("whatever");
        database.ref().push({

            name: name,
            dest: dest,
            freq: freqConvert,
            next: next,
            minutes: minutes,

        })
    });

    database.ref().on('child_added', function(childSnapshot) {
        var newRow = $('<div class="row">');

        var newName = $('<div class = "col-md-3">').text(childSnapshot.val().name).appendTo(newRow);
        var newDest = $('<div class = "col-md-3">').text(childSnapshot.val().dest).appendTo(newRow);
        var newFreq = $('<div class = "col-md-2">').text(childSnapshot.val().time).appendTo(newRow);
        var newNext = $('<div class = "col-md-2">').text(childSnapshot.val().next).appendTo(newRow);
        var newMin = $('<div class = "col-md-2">').text(childSnapshot.val().minutes).appendTo(newRow);


        newRow.appendTo($('#new-data'));
    });
};
