var map;
function initMap(){
  map = new google.maps.Map(document.getElementById('map'),{
          center: {lat: 40.115634,lng: -88.236542},
          zoom: 13
        });
  // console.log('hi');

  var tribeca = {lat: 40.087095, lng: -88.247949};
  var marker = new google.maps.Marker({
    position: tribeca,
    map: map,
    title: 'Le Peep, My favorite brunch restaurant!'
  });

  var infowindow = new google.maps.InfoWindow({
    content: 'Hahahaha'
  });

  marker.addListener('click', function(){
    infowindow.open(map, marker);
  });
}
