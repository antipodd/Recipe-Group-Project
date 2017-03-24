var config = {
    apiKey: "AIzaSyAh--04dzUCt6Iph2w8xn-cHUMx-Yfj6eM",
    authDomain: "nutrition-36cb1.firebaseapp.com",
    databaseURL: "https://nutrition-36cb1.firebaseio.com",
    storageBucket: "nutrition-36cb1.appspot.com",
    messagingSenderId: "759784210701"
  };

var database = firebase.database();

var txtName = $("#name");
var txtEmail = $("#exampleInputEmail2");
var txtPassword = $("#exampleInputPassword2");

// $(".register-submit").submit(function(e){
$(".login-submit").on("click", e => {
	event.preventDefault();
	console.log("submitted");
	var name = txtName.val();
	var email = txtEmail.val();
	var password = txtPassword.val();
	var auth = firebase.auth();
	var promise = auth.signInWithEmailAndPassword(email,password);
	// location.href="index.html";
	promise.catch(e=> console.log(e.message));
	});

$(".register-submit").on("click", e => {
	event.preventDefault();
	// To do: check for real email here
	console.log("submitted");
	var auth = firebase.auth();
	var name = txtName.val();
	var email = txtEmail.val();
	var password = txtPassword.val();
	var promise = auth.createUserWithEmailAndPassword(email,password);
	promise.catch(e=> console.log(e.message));
	});

$(".logout").on("click", e => {
	event.preventDefault();
	firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser) {
		console.log(firebaseUser);
		$(".logout").removeClass("hide");
		$(".navigation-bar").hide();

		} else {
			console.log('not logged in');
			$(".logout").addClass("hide");
			$(".login-submit").removeClass("hide");
			$(".register-submit").removeClass("hide");
		}


	});
  	
    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  // var errorCode = error.code;
  // console.log(errorCode);
  // var errorMessage = error.message;
  // console.log(errorMessage);
  // ...






  

  //   authClient.createUser(email, password, function(error,  user) {
  //     if (!error) {
  //       doLogin(user);
  //     } else {
  //       alert(error);
  //     }
  //   });
  // });

// // var ref = new Firebase("https://demo.firebaseio-demo.com");
// var authClient = new FirebaseAuthClient(database, function(error, user) {
//   if (error) {
//     alert(error);
//     return;
//   }
//   if (user) {
//     // User is already logged in.
//     doLogin(user);
//   } else {
//     // User is logged out.
//     showLoginBox();
//   }
// });


// function showLoginBox() {
//   // Do whatever DOM operations you need to show the login/registration box.
//   $(".register-submit").submit(function(){
// 	console.log("submitted");
//     var email = $("#email").val();
//     var password = $("#password").val();
//     authClient.createUser(email, password, function(error,  user) {
//       if (!error) {
//         doLogin(user);
//       } else {
//         alert(error);
//       }
//     });
//   });
// }

// function showLoginBox() {
//   // Do whatever DOM operations you need to show the login/registration box.
//   $("#loginButton").on("click", function() {
//     authClient.login("password", {
//       email: $("#email").val(),
//       password: $("#password").val(),
//       rememberMe: $("#rememberCheckbox").val()
//     });
//   });
// }


// // $(".login-submit").submit(function(){
// // 	console.log("Submitted");
// // 	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
// // 	  // Handle Errors here.
// // 	  var errorCode = error.code;
// // 	  var errorMessage = error.message;
// // 	  // ...
// // });

// // });
