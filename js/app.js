/*******************************************************
 * Copyright (C) {AsimoLoveGym} <{xiazhuangz@gmail.com}>
 *
 * This file is part of {Udacity FEND NanoDegree - Neighborhood Map Project}.
 *
 * {Udacity FEND NanoDegree - Neighborhood Map Project} can not be copied and/or distributed without the express
 * permission of {name}
 *******************************************************/
// Credit to Udacity Coach MarkN https://discussions.udacity.com/t/how-to-make-ajax-request-to-yelp-api/13699/4
/**
 * Generates a random number and returns it as a string for OAuthentication
 * @return {string}
 */
function yelpApi(selectedYelpId) {
    function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
    }

    var YELP_BASE_URL = 'https://api.yelp.com/v2/';
    var yelp_url = YELP_BASE_URL + 'business/' + selectedYelpId;

    // to define YELP_KEY, YELP_TOKEN
    var YELP_KEY = 'jT35AXIRI8LXdlEnJOG_FQ';
    var YELP_TOKEN = '72nsiEPyM4q-TMXsFD9qiDCktKtyc0Io';
    var YELP_KEY_SECRET = 'fVwEq4DqL2OQLpLkWoZOm2Ra1QA';
    var YELP_TOKEN_SECRET = 'g0rjtar7cJ6-vHyAFAcknCK-914';

    var parameters = {
        oauth_consumer_key: YELP_KEY,
        oauth_token: YELP_TOKEN,
        oauth_nonce: nonce_generate(),
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        callback: 'cb' // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
    };

    var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
    parameters.oauth_signature = encodedSignature;

    var settings = {
        url: yelp_url,
        data: parameters,
        cache: true, // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
        dataType: 'jsonp',
        success: function(results) {
            // Do stuff with results
            var content = '';

            content = '<h3>' + results.name + '</h3>' +
                '<span><strong>Rating: </strong></span>' +
                '<img src=' + results.rating_img_url + '>' +
                '<span><strong>  ' + results.rating + '</strong></span>' +
                '<p><strong>Reviews: </strong>' +
                '<span>  ' + results.review_count + ' </span></p>' +
                '<p>' + results.categories[0][0] + '</p>';
            if (results.categories[1]) {
                content += '<p>' + results.categories[1][0] + '</p>';
            }
            content += '<p>' + results.location.display_address[0] + results.location.display_address[1] + '</p>' +
                '<p>' + results.display_phone + '</p>';
            if (results.image_url) {
                content += '<img src=' + results.image_url + '>';
            }

            content += "<img class='yelpLogo' src='image/yelp-logo.png'>";

            largeInfowindow.setContent(content);
        },
        error: function(xhr, status, error) {
            // Do stuff on fail
            content = "<img src='image/error.png'>" +
                "<p>" + "An AJAX error occured: " + status + "</p>" +
                "<p>" + "Error: " + error + "</p>" +
                "<p>" + "Error detail: " + xhr.responseText + "</p>";
            content += "<img class='yelpLogo' src='image/yelp-logo.png'>";
            largeInfowindow.setContent(content);
        }
    };

    // Send AJAX query via jQuery library.
    $.ajax(settings);
}
