/*******************************************************
 * Copyright (C) {AsimoLoveGym} <{xiazhuangz@gmail.com}>
 *
 * This file is part of {Udacity FEND NanoDegree - Neighborhood Map Project}.
 *
 * {Udacity FEND NanoDegree - Neighborhood Map Project} can not be copied and/or distributed without the express
 * permission of {name}
 *******************************************************/

var map;
var largeInfowindow;

// Constructor function for each location
var Point = function(data){
  this.title = data.title;
  this.location = data.location;
  this.yelpId = data.yelpId;
}

// ******************* Model Below ******************

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

// ******************* Map Initiation Below ******************

function initMap(){
  map = new google.maps.Map(document.getElementById('map'),{
          center: {lat: 40.115634,lng: -88.236542},
          zoom: 13
        });

  largeInfowindow = new google.maps.InfoWindow();

// To solve the scoping issue raised
  ko.applyBindings(new ViewModel());
}

// ******************* View Model Below ******************

var ViewModel = function(){
    var self = this;

    this.lcfilter= ko.observable("");

    this.locations = ko.observableArray();

    this.setInfoWindow = function(){
      // this should be the selected location

      // Reset all animation to null
      for(var i = 0; i < self.locations().length; i++) {
        self.locations()[i].marker.setAnimation(null);
      }

      yelpApi(this.marker.yelpId);
      largeInfowindow.open(map, this.marker);
      // populateInfoWindow(this.marker, largeInfowindow);

      this.marker.setAnimation(google.maps.Animation.BOUNCE);
      largeInfowindow.addListener('closeclick',function(){
         this.marker.setAnimation(null);
      });
    };

    // Push all the initial hard coded location into observableArray.
    locations.forEach(function(locationPoint){
      self.locations().push(new Point(locationPoint));
    });

    // Filter function for filtering list view
    this.filteredItems = ko.computed(function() {
        var filterWords = this.lcfilter().toLowerCase();
        if (!filterWords) {
          // Reset the marker for each location
            for(var i = 0; i < this.locations().length; i++) {
              // Cause the define and set of marker is after lcfilter function here,
              // need to check the marker properties for locations existed or not.
              if(this.locations()[i].marker)
              this.locations()[i].marker.setVisible(true);
            }
            return this.locations();
        } else {
            return ko.utils.arrayFilter(this.locations(), function(item) {
                // two mechanism for filter funtion can be used,
                // filter mechanism 1: stringStartsWith method as its name indicated.
                // return stringStartsWith(item.title.toLowerCase(), filterWords);

                // filter mechanism 2: as long as the location's name includes the input string, show it
                if(item.title.toLowerCase().indexOf(filterWords) > -1) {
                  // for filtered locations, mark them on the map and animated the marker once.
                  item.marker.setVisible(true);
                  item.marker.setAnimation(google.maps.Animation.BOUNCE);
                  // 750 ms is the time needed for the marker to finish one bounce.
                  setTimeout(function(){item.marker.setAnimation(null);},750);
                  return true;
                } else {
                    item.marker.setVisible(false);
                    return false;
                }
            });
        }
    },this);

    for(var i = 0; i < this.locations().length; i++) {
      // initialize the properties for each location
        var position = this.locations()[i].location;
        var title = this.locations()[i].title;
        var marker = new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i
        });
        this.locations()[i].marker = marker;
        this.locations()[i].marker.yelpId = this.locations()[i].yelpId;
        this.locations()[i].marker.addListener('click', function(){
          // disguish the self, self is only used for viewmodel.
          var that = this;

          for(var i = 0; i < self.locations().length; i++) {
            self.locations()[i].marker.setAnimation(null);
          }

          yelpApi(this.yelpId);
          largeInfowindow.open(map, this);
          // populateInfoWindow(this, largeInfowindow);

          this.setAnimation(google.maps.Animation.BOUNCE);
          largeInfowindow.addListener('closeclick',function(){
            that.setAnimation(null);
          });

        });
    }

    // function populateInfoWindow(marker, infowindow) {
    //   if (infowindow.marker != marker) {
    //     infowindow.marker = marker;
    //     infowindow.open(map, marker);
    //   }
    // }
}

// only be used for filter mechanism 1
var stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
}

// Navigation toggle function for mobile
function navToggle() {
    var x = document.getElementsByTagName("BODY")[0];;
    if (x.className === "") {
        x.className += "header-visible";
    } else {
        x.className = "";
    }
}
