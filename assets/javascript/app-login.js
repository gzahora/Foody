$(document).ready(function () {
    var player = "";

    // Firebase configuration
    var config = {
        apiKey: "AIzaSyDWaMigUeaDDmBOdpQoVAhi1uLXO2vPJJM",
        authDomain: "foody-127eb.firebaseapp.com",
        databaseURL: "https://foody-127eb.firebaseio.com",
        projectId: "foody-127eb",
        storageBucket: "",
        messagingSenderId: "422331329980",
        appId: "1:422331329980:web:a558937ea4ea6dda"
    };
    // Initialize Firebase
    firebase.initializeApp(config);
    // create variable for firebase database
    var my_database = firebase.database();
    //createNewSession();
    var display = $("#game-display");
    // populates the display with play and scoreboard options

    function goToPage() {
        window.open("index.html", "_self")
    };

    function inError(message) {
        $("#input-name").val("");
        $("#input-password").val("");
        $(".form-group").append("<p class='bg-danger text-center'>" + message + "</p>")
        setTimeout(function () {
            $("p").remove();
        }, 1000);
    };


    display.html("");
    display.append("<div><button class='btn btn-success' id='login'>");
    $("#login").html("<h4>login");
    display.append("<div><button class='btn btn-outline-success' id='signup'>");
    $("#signup").text("sign up");
    display.append("<div><button class='btn btn-outline-success' id='visitor'>");
    $("#visitor").text("visitor");


    $(document).on({
        "click": function () {
            display.html("<div class='form-group'><input type='text' class='form-control' id='input-name' placeholder='name'></div><div class='form-group'><input type='password' class='form-control' id='input-password' data-toggle='password' placeholder='password'></div>");
            display.append("<button class='btn btn-success' id ='submit-login'>");
            $("#submit-login").text("Start");
            $("#submit-login").on("click", function () {
                var inputName = $("#input-name").val().trim();
                var inputPwd = $("#input-password").val().trim();
                my_database.ref("users").once("value", function (snapshot) {
                    var sv = snapshot.val();
                    var userUnique = false;
                    for (i in sv) {
                        if (sv[i].name === inputName) {
                            console.log("you in the vip list");
                            userUnique = true;
                            if (sv[i].password === inputPwd) {
                                console.log("right answer")
                                player = inputName;
                                break
                            }
                            else {
                                console.log("wrong answer, now you must die")
                                inError("incorrect password");
                            };
                        }
                    };
                    if (userUnique === false) {
                        inError("incorrect user")
                    }
                    else {
                        goToPage();
                    }
                });
            })
        }
    }, "#login");


    $(document).on({
        "click": function () {
            display.html("<div class='form-group'><input type='text' class='form-control' id='input-name' placeholder='name'></div><div class='form-group'><input type='password' class='form-control' id='input-password' placeholder='password'></div>");
            display.append("<button class='btn btn-success' id ='input-login'>");
            $("#input-login").text("Start");
            $("#input-login").on("click", function () {
                if ($("#input-name").val() !== "" && $("#input-password").val() !== "") {
                    my_database.ref("users").once("value", function (snapshot) {
                        var sv = snapshot.val();
                        var inputName = $("#input-name").val().trim();
                        var inputPwd = $("#input-password").val().trim();
                        var nameUnique = true;
                        for (i in sv) {
                            console.log("name:  " + sv[i].name)
                            if (sv[i].name === inputName) {
                                nameUnique = false;
                                break
                            }
                        };
                        if (nameUnique === true) {
                            my_database.ref("users").push({
                                name: inputName,
                                password: inputPwd,
                                sessions: "",
                            });
                            player = inputName;
                        }
                        else {
                            console.log("already a thing");
                            inError("EXISTING PLAYER")
                        }
                        console.log(player);
                        goToPage();
                    });

                }

            })

        }
    }, "#signup");
    $(document).on({
        "click": function () {
            goToPage();
        }
    }, "#visitor");
});

//svv = sv[Object.keys(sv)[0]];
//svname = Object.keys(sv)[0];
//my_database.ref().push
//currentGame = my_database.ref().limitToLast(1);
//currentGame.once("value", function (snapshot) {
//sv = snapshot.val();
//svv = sv[Object.keys(sv)[0]];
//my_database.ref(Object.keys(sv)[0]).update({ state: 2, });
//my_database.ref(Object.keys(sv)[0]).update({ player2: $(this).attr("id"), });
