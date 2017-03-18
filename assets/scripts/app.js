

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
	}).fail(function(err) {
	  throw err;
	});

});

function pullCheckboxValues(array, formgroup){
	$(formgroup).find($('input[type="checkbox"]:checked')).each(function(){
		array.push($(this).val());
		database.ref().set({
			allergiesList: userState.allergies
		});
	});
}



  // Initialize Firebase
  

   

