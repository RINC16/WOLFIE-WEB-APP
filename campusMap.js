// Initialize and add the map
function initMap() {
    // Define the map options
    var options = {
        zoom: 17, // Zoom level - closer view of the campus
        center: {lat: 52.588216, lng: -2.127408}, // Center of the map (University of Wolverhampton City Campus)
        mapTypeId: google.maps.MapTypeId.ROADMAP, // Display standard roadmap view
        styles: [ // Custom styling to simplify the map appearance
            {
                "featureType": "poi.business", // Points of Interest - Businesses
                "stylers": [{ "visibility": "off" }] // Hide businesses from the map
            },
            {
                "featureType": "road",
                "elementType": "labels.icon", // Road icons
                "stylers": [{ "visibility": "off" }] // Hide road icons from the map
            },
            {
                "featureType": "transit", // Transit stations (bus, train)
                "stylers": [{ "visibility": "off" }] // Hide transit information
            }
        ]
    };

    // Create a new map instance inside the 'map' div element
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Array to store locations of campuses with their coordinates and info window content
    var locations = [
        {
            lat: 52.588216, 
            lng: -2.127408, 
            info: '<h4>City Campus Wolverhampton</h4><p>Description of the campus...</p>'
        }
    ];

    // Loop through all locations and place markers on the map
    locations.forEach(function(location) {
        // Create a marker at each location
        var marker = new google.maps.Marker({
            position: {lat: location.lat, lng: location.lng}, // Marker position
            map: map, // Attach marker to the map
            title: 'University of Wolverhampton' // Tooltip text when hovering over marker
        });

        // Create an InfoWindow for each marker
        var infowindow = new google.maps.InfoWindow({
            content: location.info // Content to display in the info window
        });

        // Add a click event listener to open InfoWindow when marker is clicked
        marker.addListener('click', function() {
            infowindow.open(map, marker); // Open info window on marker click
        });
    });
}
