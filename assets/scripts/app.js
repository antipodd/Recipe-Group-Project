

var config = {
    apiKey: "AIzaSyAh--04dzUCt6Iph2w8xn-cHUMx-Yfj6eM",
    authDomain: "nutrition-36cb1.firebaseapp.com",
    databaseURL: "https://nutrition-36cb1.firebaseio.com",
    storageBucket: "nutrition-36cb1.appspot.com",
    messagingSenderId: "759784210701"
  };

firebase.initializeApp(config);

var database = firebase.database();

var userState = {
	ingredients: "",
	allergies: "",
	dietPrefs: "",
	time: ""
}

$('#submit-search').on('click', function(event){
	event.preventDefault();
	console.log("test");

	userState.ingredients = $('#ingredients-input').val().trim();
	userState.allergies = [];
	userState.dietPrefs = [];
	userState.time = $('.time-input').val();
	pullCheckboxValues(userState.allergies,".allergyList");
	pullCheckboxValues(userState.dietPrefs,".dietPrefs");
	
	console.log("allergies " + userState.allergies, "dietPrefs " + userState.dietPrefs);
	console.log("ingredients " + userState.ingredients);
	console.log("time " + userState.time);

	var allergiesQuery = "";
	var dietPrefsQuery = "";

	for(i = 0; i < userState.allergies.length; i++){
		allergiesQuery += "&health=" + userState.allergies[i]
		console.log(allergiesQuery);
	}

	for(i = 0; i < userState.dietPrefs.length; i++){
		dietPrefsQuery += "&diet=" + userState.dietPrefs[i]
		console.log(dietPrefsQuery);
	}


	var url = "https://api.edamam.com/search?q=" + userState.ingredients + "&app_idbcb68bd8" + "&app_key=2a8d5e5d4600120a11ab487124231f6c" + dietPrefsQuery + allergiesQuery;
	console.log(url);
	

	$.ajax({
	  url: url,
	  method: 'GET',
	}).done(function(response) {
	  console.log(response);
	  loadHTML(response);
	}).fail(function(err) {
	  throw err;
	});

	$(".results-section").removeClass("results-section");

});

	function loadHTML (response) {
		for (var i = 0; i < response.hits.length; i++) {
			if (i === 0 || i%3 === 0) {
				var newRow = $("<div class = row>");
				var newColumn = $("<div>");
				newColumn.addClass("col-xs-12 col-sm-6 col-md-4 col-lg-4")
				var imageURL = response.hits[i].recipe.image;
				var title = response.hits[i].recipe.label;
				var returnURL = response.hits[i].recipe.url;
				newColumn.append("<a href='" + returnURL + "''>" + "<img class ='recipePhoto' src='" + imageURL + "'/>" + "<h2>" + title + "</h2>" + "</a>" );
				var newCheckbox = $("<div>");
				newCheckbox.addClass("checkbox");
				newCheckbox.append("<label><input type=\"checkbox\" id=\"recipe-result\" value=" + response.hits[i].recipe.uri + "><span>Save Recipe</span></label>");
				newColumn.append(newCheckbox);
				newRow.append(newColumn);
				$(".results").append(newRow);
			} else {
				var newColumn = $("<div>");
				newColumn.addClass("col-xs-12 col-sm-6 col-md-4 col-lg-4")
				var imageURL = response.hits[i].recipe.image;
				var title = response.hits[i].recipe.label;
				var returnURL = response.hits[i].recipe.url;
				newColumn.append("<a href='" + returnURL + "''>" + "<img class ='recipePhoto' src='" + imageURL + "'/>" + "<h2>" + title + "</h2>" + "</a>" );
				var newCheckbox = $("<div>");
				newCheckbox.addClass("checkbox recipe-result");
				newCheckbox.append("<label><input type=\"checkbox\" id=\"recipe-result\" value=" + response.hits[i].recipe.uri + "><span>Save Recipe</span></label>");
				newColumn.append(newCheckbox);
				$(".results .row:last-child").append(newColumn);
			}
		}
	}
	

	
function pullCheckboxValues(array, formgroup){
	$(formgroup).find($('input[type="checkbox"]:checked')).each(function(){
		array.push($(this).val());
		database.ref().set({
			allergiesList: userState.allergies
		});
	});
}
//add text change upon click and also save the response.hits[i].recipe.uri to firebase - can use uri for ajax request for saved recipes
$(".results").on("click", "#recipe-result", function() {
	var value = $(this).val();
	console.log(value)
	var checked = this.checked;
	console.log(checked);
	if (checked) {
		$(this).siblings("span").html("Recipe Saved!");
		//add value to firebase
  } else {
    $(this).siblings("span").html("Save Recipe");
    //remove value from firebase
  }
});

  // Initialize Firebase
  

   

