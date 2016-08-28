var map;
var largeInfowindow;
var markers = [];


// console.log(yelpApi('sakanaya-restaurant-champaign'));

var Point = function(data){
  this.title = data.title;
  this.location = data.location;
  this.yelpId = data.yelpId;
}

var locations = [
      {
        title: 'Sakanaya Restaurant, Japanese restaurant',
        location: {lat: 40.110155, lng: -88.233122},
        yelpId: 'sakanaya-restaurant-champaign'
      },
      {
        title: 'Le Peep, My favorite brunch restaurant',
        location: {lat: 40.087095, lng: -88.247949},
        yelpId: 'le-peep-restaurant-champaign'
      },
      {
        title: 'The Art Theater',
        location: {lat: 40.118571, lng: -88.244699},
        yelpId: 'the-art-theater-champaign'
      },
      {
        title: 'The Red Lion',
        location: {lat: 40.109972, lng: -88.235615},
        yelpId: 'red-lion-champaign'
      },
      {
        title: 'Crystal Lake Park Family Aquatic Center',
        location: {lat: 40.12518, lng: -88.209342},
        yelpId: 'crystal-lake-family-aquatic-center-urbana'
      },
      {
        title: 'Activities and Recreation Center',
        location: {lat: 40.10083, lng: -88.235555},
        yelpId: 'activities-and-recreation-center-arc-champaign'
      },
      {
        title: 'Lai Lai Wok, my favorite Chinese restaurant',
        location: {lat: 40.110455, lng: -88.233305},
        yelpId: 'lai-lai-wok-champaign'
      }
    ];

function initMap(){
  map = new google.maps.Map(document.getElementById('map'),{
          center: {lat: 40.115634,lng: -88.236542},
          zoom: 13
        });

  largeInfowindow = new google.maps.InfoWindow();
// ******************* Relocation Below ******************
//   var largeInfowindow = new google.maps.InfoWindow();
//
// for(var i = 0; i < locations.length; i++) {
//     var position = locations[i].location;
//     var title = locations[i].title;
//
//     var marker = new google.maps.Marker({
//       position: position,
//       map: map,
//       title: title,
//       animation: google.maps.Animation.DROP,
//       id: i
//     });
//     markers.push(marker);
//     marker.addListener('click', function(){
//       populateInfoWindow(this, largeInfowindow);
//     });
//   }
//
//   function populateInfoWindow(marker, infowindow) {
//     if (infowindow.marker != marker) {
//       infowindow.marker = marker;
//       infowindow.setContent('<div>' + marker.title + '</div>');
//       infowindow.open(map, marker);
//       infowindow.addListener('closeclick',function(){
//         infowindow.setMarker(null);
//       });
//     }
//   }

// ******************* Relocation Above ******************

  ko.applyBindings(new ViewModel());
}

// ******************* View Model Below ******************

var ViewModel = function(){
    var self = this;

    this.lcfilter= ko.observable("");

    this.locations = ko.observableArray();

    this.setInfoWindow = function(){
      // this should be the selected marker
      yelpApi(this.marker.yelpId);
      populateInfoWindow(this.marker, largeInfowindow);
    };

    // console.log(this.locations());

    locations.forEach(function(locationPoint){
      // Need to use self to anchor to ViewModel, if "this" used instead
      // of "self", "this" will refer to global var array
      self.locations().push(new Point(locationPoint));
    });
    // console.log(this.locations());

    this.filteredItems = ko.computed(function() {
        var filterWords = this.lcfilter().toLowerCase();
        if (!filterWords) {
            // item.marker.setVisible(true);
// for restore the marker for each locations
            for(var i = 0; i < this.locations().length; i++) {
              // Cause the define and set of marker is after lcfilter function here,
              // need to check the marker properties for locations existed or not.
              if(this.locations()[i].marker)
              this.locations()[i].marker.setVisible(true);
            }
            return this.locations();
        } else {
            return ko.utils.arrayFilter(this.locations(), function(item) {
                // return stringStartsWith(item.title.toLowerCase(), filterWords);
                if(item.title.toLowerCase().indexOf(filterWords) > -1) {
                  item.marker.setVisible(true);
                  return true;
                } else {
                    item.marker.setVisible(false);
                    return false;
                }
            });
        }
    },this);

    for(var i = 0; i < this.locations().length; i++) {
        var position = this.locations()[i].location;
        var title = this.locations()[i].title;

        var marker = new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i
        });
        // markers.push(marker);
        this.locations()[i].marker = marker;

        this.locations()[i].marker.yelpId = this.locations()[i].yelpId;
        // console.log(this.locations()[i].marker.yelpId);
        this.locations()[i].marker.addListener('click', function(){
          // TODO: Call yelpAPI here, pass self.locations()[i].yelpId
          yelpApi(this.yelpId);
          populateInfoWindow(this, largeInfowindow);
        });
    }

    function populateInfoWindow(marker, infowindow) {
      if (infowindow.marker != marker) {
        infowindow.marker = marker;
        // infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // infowindow.addListener('closeclick',function(){
        //   infowindow.setMarker(null);
        // });
      }
    }
}

var stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
}
