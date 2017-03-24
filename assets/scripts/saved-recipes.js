var config = {
    apiKey: "AIzaSyAh--04dzUCt6Iph2w8xn-cHUMx-Yfj6eM",
    authDomain: "nutrition-36cb1.firebaseapp.com",
    databaseURL: "https://nutrition-36cb1.firebaseio.com",
    storageBucket: "nutrition-36cb1.appspot.com",
    messagingSenderId: "759784210701"
  };



var database = firebase.database();

var savedRecipes = database.ref("Saved Recipes");

var savedRecipesURI = [];

var keys;

$(window).on('click',function(){
console.log(userState.firebaseUser);
database.ref("Users").child(userState.firebaseUser).child("Saved Recipes").on("value", function(snapshot) {
	$(".results").empty();
	keys = Object.keys(snapshot.val());
	console.log(keys);
	//console.log(uri);
	for (var i = 0; i < keys.length; i++) {
		if (i === 0 || i%3 === 0) {
			var newRow = $("<div class = row>");
			var newColumn = $("<div>");
			newColumn.addClass("col-xs-4 col-sm-4 col-md-4 col-lg-4");
			var imageURL = snapshot.child(keys[i]).val().img;
			var title = snapshot.child(keys[i]).val().title;
			var returnURL = snapshot.child(keys[i]).val().url;
			newColumn.append("<a href='" + returnURL + "' target='_blank'>" + "<img class ='recipePhoto' src='" + imageURL + "'/>" + "<h2>" + title + "</h2>" + "</a>" );
			var trashButton = $("<button>");
			trashButton.addClass("btn btn-default btn-sm");
			trashButton.attr("key", keys[i]);
			trashButton.append("<span class='glyphicon glyphicon-trash'></span>  Delete recipe");
			newColumn.append(trashButton);
			newRow.append(newColumn);
			$(".results").append(newRow);
		} else {
			var newColumn = $("<div>");
			newColumn.addClass("col-xs-4 col-sm-4 col-md-4 col-lg-4");
			var imageURL = snapshot.child(keys[i]).val().img;
			var title = snapshot.child(keys[i]).val().title;
			var returnURL = snapshot.child(keys[i]).val().url;
			newColumn.append("<a href='" + returnURL + "' target='_blank'>" + "<img class ='recipePhoto' src='" + imageURL + "'/>" + "<h2>" + title + "</h2>" + "</a>" );
			var trashButton = $("<button>");
			trashButton.addClass("btn btn-default btn-sm");
			trashButton.attr("key", keys[i]);
			trashButton.append("<span class='glyphicon glyphicon-trash'></span>  Delete recipe");
			newColumn.append(trashButton);
			$(".results .row:last-child").append(newColumn);
		}
	}

});


$(".results").on("click", "button", function() {
	var removeKey = $(this).attr("key");
    	console.log(removeKey);
    	savedRecipes.child(removeKey).remove();
});
	
});
