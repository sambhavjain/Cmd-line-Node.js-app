var http = require('http');

function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badges and " + points + " points in JS";
  console.log(message);
}
//Print out error message
function printError(error) {
  console.error(error.message);
}

//Connect to the Treehouse's api url(http://teamtreehouse.com/username.json)
function get(username) {
  var request = http.get('http://teamtreehouse.com/' + username + '.json', function(response){
    console.log(response.statusCode);
    //Read the data
    var body = "";
    response.on('data', function (chunk) {
        body += chunk;
    });
    //emitted by the system once the end has happened
    response.on('end', function(){
      if(response.statusCode === 200) {
        try {
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript)

        } catch (e) {
          //Parse error
          printError(e);
        }

      } else {
        //Status Code error
        printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODE + ")"});
      }
      // console.log(body);
    //  console.log(typeof body);
    });
  });
  //error event is emitted by the system when error is occured
  request.on('error', function(error){
     console.error(error.message);
  })

}

module.exports.get = get;
