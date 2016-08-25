var map;
var markers = [];

var locations = [
      {title: 'Sakanaya Restaurant, Japanese restaurant', location: {lat: 40.110155, lng: -88.233122}},
      {title: 'Le Peep, My favorite brunch restaurant', location: {lat: 40.087095, lng: -88.247949}},
      {title: 'The Art Theater', location: {lat: 40.118571, lng: -88.244699}},
      {title: 'The Red Lion', location: {lat: 40.109972, lng: -88.235615}},
      {title: 'Crystal Lake Park Family Aquatic Center', location: {lat: 40.12518, lng: -88.209342}},
      {title: 'Activities and Recreation Center', location: {lat: 40.10083, lng: -88.235555}},
      {title: 'Lai Lai Wok, my favorite Chinese restaurant', location: {lat: 40.110455, lng: -88.233305}}
    ];

function initMap(){
  map = new google.maps.Map(document.getElementById('map'),{
          center: {lat: 40.115634,lng: -88.236542},
          zoom: 13
        });
  // console.log('hi');



  var largeInfowindow = new google.maps.InfoWindow();

  for(var i = 0; i < locations.length; i++) {
    var position = locations[i].location;
    var title = locations[i].title;

    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    markers.push(marker);
    marker.addListener('click', function(){
      populateInfoWindow(this, largeInfowindow);
    });
  }

  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker(null);
      });
    }
  }
}

// *******************View Model******************

var ViewModel = function(){
    this.filter= ko.observable("");

    this.filteredItems = ko.computed(function() {
        var filter = this.filter().toLowerCase();
        if (!filter) {
            return locations;
        } else {
            return ko.utils.arrayFilter(locations, function(item) {
                // return stringStartsWith(item.title.toLowerCase(), filter);
                if(item.title.toLowerCase().indexOf(filter) > -1)
                  return true;
            });
        }
    },this);

    console.log(this.filteredItems());

    this.locationsList = ko.observableArray(this.filteredItems());
    console.log(this.locationsList());
}

//ko.utils.arrayFilter - filter the items using the filter text
// viewModel.filteredItems = ko.computed(function() {
//     var filter = this.filter().toLowerCase();
//     if (!filter) {
//         return locations;
//     } else {
//         return ko.utils.arrayFilter(locations, function(item) {
//             return stringStartsWith(item.title.toLowerCase(), filter);
//         });
//     }
// }, viewModel);

var stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
}

ko.applyBindings(new ViewModel());
