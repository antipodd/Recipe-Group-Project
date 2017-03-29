var config = {
    apiKey: "AIzaSyAh--04dzUCt6Iph2w8xn-cHUMx-Yfj6eM",
    authDomain: "nutrition-36cb1.firebaseapp.com",
    databaseURL: "https://nutrition-36cb1.firebaseio.com",
    storageBucket: "nutrition-36cb1.appspot.com",
    messagingSenderId: "759784210701"
  };

firebase.initializeApp(config);

var database = firebase.database();

// ----------------------------------------------------------------
// Below is logging in/registering code. ALl of this section is new. 

// Grab our elements here, store in variabeles for quick use
var txtName = $("#name");
var txtEmail = $("#exampleInputEmail2");
var txtPassword = $("#exampleInputPassword2");

// $(".register-submit").submit(function(e){
$(".login-submit").on("click", e => {
	event.preventDefault();
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
	var auth = firebase.auth();
	var name = txtName.val();
	var email = txtEmail.val();
	var password = txtPassword.val();
	var promise = auth.createUserWithEmailAndPassword(email,password);
	promise.catch(e=> console.log(e.message));
	var isNewUser = true;

	firebase.auth().onAuthStateChanged(function(authData) {
		if (authData && isNewUser) {
			database.ref().child("Users").child(authData.uid).set({
				email
			})
		}
	})
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
		$(".navigation-bar-signedin").removeClass("hide");
		// Very important line here below, that captures our user ID
		userState.firebaseUser = firebaseUser.uid;
		console.log(userState.firebaseUser);

		var dbRef = database.ref("Users").child(userState.firebaseUser);
		dbRef.once("value")
			.then(function(snapshot) {
				$(".welcome-user").html("Welcome, " + snapshot.child("email").val());
		})

		} else {
			console.log('not logged in');
			// $(".logout").addClass("hide");
			userState.firebaseUser = "";
			// $(".navigation-bar").show();
			// $(".welcome-user").empty();
		}
	});

$(".logout").on('click', function () {
	location.reload();
});

// -----------------------------------------------------------------
// Below is slightly modified app.js code. Only modified in 2 locations. 

var savedRecipes = database.ref("Saved Recipes");

var savedURI = [];


var userState = {
	ingredients: "",
	allergies: "",
	dietPrefs: "",
	time: "",
	from: 0,
	to: 9,
	// Modification Location 1: added a property firebaseUser to store UID
	firebaseUser: "" 
}



function searchForRecipes(){
	var url = "https://api.edamam.com/search?q=" + userState.ingredients + "&app_idbcb68bd8" + "&app_key=2a8d5e5d4600120a11ab487124231f6c" + "&from=" + userState.from + "&to=" + userState.to + userState.allergies + userState.dietPrefs;

	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(response) {
	  if(response.count != 0){
	  	loadHTML(response);
	  } else {
	  	//validation rule for no results
	  	$('.results').prepend("<p>There are no results for your search.</p>");
	  }
	  
	}).fail(function(err) {
	  throw err;
	});
}

$('#submit-search').on('click', function(event){
	
	event.preventDefault();
	$(".results").empty();
	userState.from = 0;
	userState.to = 9;

	//counter = 0;

	if( $('#ingredients-input').val() === ""){
		//validation rule for blank search
		$(this).after("<p class=\"invalid-input\">Please enter a valid search value</p>");
	} else {
		$('.invalid-input').hide();
		userState.ingredients = $('#ingredients-input').val().trim();
		var allergiesQuery = [];
		var dietPrefsQuery = [];
		userState.time = $('.time-input').val();
		pullCheckboxValues(allergiesQuery, ".allergyList");
		pullCheckboxValues(dietPrefsQuery, ".dietPrefs");

		for(i = 0; i < allergiesQuery.length; i++){
			userState.allergies += "&health=" + allergiesQuery[i]
		}

		for(i = 0; i < dietPrefsQuery.length; i++){
			userState.dietPrefs += "&health=" + dietPrefsQuery[i]
		}

		searchForRecipes();

		$(".results-section").removeClass("results-section");

	}
	$('#ingredients-input').val("");
	$('input:checked').prop('checked', false);

});
	
	function loadHTML (response) {
		for (var i = 0; i < response.hits.length; i++) {
			if (i === 0 || i%3 === 0) {
				var newRow = $("<div class = row>");
				var newColumn = $("<div>");
				buildResultsDisplay (response, i, newColumn);
				newRow.append(newColumn);
				$(".results").append(newRow);
			} else {
				var newColumn = $("<div>");
				buildResultsDisplay (response, i, newColumn);
				$(".results .row:last-child").append(newColumn);
			}
		}
		var newLoadRow = $("<div class = row>");
		var newLoadColumn = $("<div>");
		newLoadColumn.addClass("col-xs-4 col-sm-4 col-md-4 col-lg-4");
		var moreResultsButton = $("<button>");
		moreResultsButton.addClass("btn btn-primary");
		moreResultsButton.attr("id", "load-more-results");
		moreResultsButton.text("Show More Results");
		newLoadColumn.append(moreResultsButton);
		newLoadRow.append(newLoadColumn);
		$(".results").append(newLoadRow);
		$(".end-message").show();

	}
	

	
function pullCheckboxValues(array, formgroup){
	$(formgroup).find($('input[type="checkbox"]:checked')).each(function(){
		array.push($(this).val());
		/*database.ref("Allergies").set({
			allergiesList: userState.allergies
		});*/
	});
}

function buildResultsDisplay (response, i, newColumn){
	newColumn.addClass("col-xs-4 col-sm-4 col-md-4 col-lg-4");
	var imageURL = response.hits[i].recipe.image;
	var title = response.hits[i].recipe.label;
	var returnURL = response.hits[i].recipe.url;
	newColumn.append("<a href='" + returnURL + "' target='_blank'>" + "<img class ='recipePhoto' src='" + imageURL + "'/>" + "<h2>" + title + "</h2>" + "</a>" );
	var counter = 0;
	for (var j = 0; j < savedURI.length; j ++) {
		if (savedURI[j] === response.hits[i].recipe.uri) {
			counter++;
		}
	}
	if (counter !== 0) {
		var newTextDiv = $("<div>");
		newTextDiv.text("Recipe Saved!");
		newColumn.append(newTextDiv);
	} else {
		var newCheckbox = $("<div>");
		newCheckbox.addClass("checkbox");
		newCheckbox.append("<label><input type=\"checkbox\" id=\"recipe-result\" value=" + response.hits[i].recipe.uri + "><span>Save Recipe</span></label>");
		newColumn.append(newCheckbox);
	}	
}

//add text change upon click and also save the response.hits[i].recipe.uri to firebase - can use uri for ajax request for saved recipes
$(".results").on("click", "#recipe-result", function() {
	var value = $(this).val();
	var checked = this.checked;
	var pushKey;
	if (checked) {
		$(this).siblings("span").html("Recipe Saved!");
		var url = $(this).parents("div").siblings("a").attr("href");
		var imageSRC = $(this).parents("div").siblings("a").children("img").attr("src");
		var title = $(this).parents("div").siblings("a").children("h2").text()
		//add value to firebase
		// Modification 2: On save, pushes to the specific User ID Node
		var newPush = database.ref().child("Users").child(userState.firebaseUser).child("Saved Recipes").push({
			recipe: value,
			url: url,
			img: imageSRC,
			title: title
		});
		pushKey = newPush.key;
		$(this).attr("key", pushKey);
				
  	} else {
    	$(this).siblings("span").html("Save Recipe");
    	//remove value from firebase
    	var removeKey = $(this).attr("key");
    	savedRecipes.child(removeKey).remove();
  	}
});

$(".results").on('click', "#load-more-results", function(){
	$(".results .row:last-child").remove();
	userState.from += 9;
	userState.to += 9;	
	searchForRecipes();
});

$(".main-submit").on('click', function(){
	database.ref().child("Users").child(userState.firebaseUser).child("Saved Recipes").on("value", function(snapshot) {
	var savedKeys = Object.keys(snapshot.val());
	savedURI = [];
	for (var j = 0; j < savedKeys.length; j++) {
		savedURI.push(snapshot.child(savedKeys[j]).val().recipe)
	}
});
})


   