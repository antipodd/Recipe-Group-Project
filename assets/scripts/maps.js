var config = {
    apiKey: "AIzaSyAh--04dzUCt6Iph2w8xn-cHUMx-Yfj6eM",
    authDomain: "nutrition-36cb1.firebaseapp.com",
    databaseURL: "https://nutrition-36cb1.firebaseio.com",
    storageBucket: "nutrition-36cb1.appspot.com",
    messagingSenderId: "759784210701"
  };

firebase.initializeApp(config);


//---Location Scripts Below -----//

function initMap() {
	if (document.referrer.indexOf('donate') === -1) {
		query = "food pantry";
	} else if (document.referrer.indexOf('restaurant') === -1){
		query = "restaurant";
	}

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 10
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      	navigator.geolocation.getCurrentPosition(function(position) {
	        var pos = {
	          lat: position.coords.latitude,
	          lng: position.coords.longitude
	        };

	        infoWindow.setPosition(pos);
	        infoWindow.setContent('Location found.');
	        map.setCenter(pos);

	        var request = {
	          location: pos,
	          radius: '5',
	          query: query
	        };

	        var infowindow = new google.maps.InfoWindow();
	        service = new google.maps.places.PlacesService(map);
	        service.textSearch(request, callback);
	     

	        function callback(results, status) {
	          if (status == google.maps.places.PlacesServiceStatus.OK) {
	            for (var i = 0; i < results.length; i++) {
	              var place = results[i];
	              var placeID = results[i].place_id;
	              console.log(place);
	              createMarker(results[i]);
	            }
	          }
	        }

	        function createMarker(place) {
	          var placeLoc = place.geometry.location;
	          var marker = new google.maps.Marker({
	            map: map,
	            position: place.geometry.location
	          });
	          console.log(placeLoc);
	          console.log(marker);

	          google.maps.event.addListener(marker, 'click', function() { 
	            infoWindow.setContent(place.name + "<br />" + place.formatted_address);
	            infoWindow.open(map, this);
	          });

	        }
		}, function() {
	        handleLocationError(true, infoWindow, map.getCenter());
	      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser doesn\'t support geolocation.');
}

  