// // Credit to Udacity Coach MarkN https://discussions.udacity.com/t/how-to-make-ajax-request-to-yelp-api/13699/4
//
// /**
//  * Generates a random number and returns it as a string for OAuthentication
//  * @return {string}
//  */
//
// // TODO: difference here. Created yelpCall function here, and pass location data into the function
//
// function nonce_generate() {
//   return (Math.floor(Math.random() * 1e12).toString());
// }
//
// // TODO: difference in the yelp_url
// // var yelp_url = YELP_BASE_URL + 'business/' + self.selected_place().Yelp.business_id;
//   var yelp_url = 'http://api.yelp.com/v2/business/village-sake-fairfax';
//
// // TODO: difference here。
// // to define YELP_KEY, YELP_TOKEN
//     var YELP_KEY = 'jT35AXIRI8LXdlEnJOG_FQ';
//     var YELP_TOKEN = '72nsiEPyM4q-TMXsFD9qiDCktKtyc0Io';
//     var YELP_KEY_SECRET = 'fVwEq4DqL2OQLpLkWoZOm2Ra1QA';
//     var YELP_TOKEN_SECRET = 'g0rjtar7cJ6-vHyAFAcknCK-914';
//
//     var parameters = {
//       oauth_consumer_key: YELP_KEY,
//       oauth_token: YELP_TOKEN,
//       oauth_nonce: nonce_generate(),
//       oauth_timestamp: Math.floor(Date.now()/1000),
//       oauth_signature_method: 'HMAC-SHA1',
//       oauth_version : '1.0',
//       callback: 'cb'              // This is crucial to include for jsonp implementation in AJAX or else the oauth-signature will be wrong.
//       // TODO: difference here, cll: for what?
//     };
//
//     var encodedSignature = oauthSignature.generate('GET',yelp_url, parameters, YELP_KEY_SECRET, YELP_TOKEN_SECRET);
//     parameters.oauth_signature = encodedSignature;
//
//     var settings = {
//       url: yelp_url,
//       data: parameters,
//       cache: true,                // This is crucial to include as well to prevent jQuery from adding on a cache-buster parameter "_=23489489749837", invalidating our oauth-signature
//       dataType: 'jsonp',
//       // TODO: difference here. jsonpCallback: 'cb'
//       success: function(results) {
//         // Do stuff with results
//         console.log(results);
//       },
//       fail: function(xhr, status, error) {
//         // Do stuff on fail
//         console.log("An AJAX error occured: " + status + "\nError: " + error + "\nError detail: " + xhr.responseText);
//       }
//     };
//
//     // Send AJAX query via jQuery library.
//     $.ajax(settings);
