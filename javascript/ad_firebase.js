/* global Firebase */

var ref = new Firebase("https://globaldomination.firebaseio.com/"),
		users = new Firebase("https://globaldomination.firebaseio.com/users/"),
		currentuser;

$('#uid1').click(function(){ playerChoice('alpha'); });
$('#uid2').click(function(){ playerChoice('bravo'); });
$('#uid3').click(function(){ playerChoice('charlie'); });

function playerChoice(playerclass) {
   var uname = $('#' + playerclass + 'nameinput').val();

   if(uname != ''){

      users.once("value", function(data) {
      	if(data.hasChild(uname)){
      	   alert('This username has been taken already.');
      	} else {
      	   currentuser = uname;   
            users.child(currentuser).set({
      	    	id: currentuser,
      	  	   userclass: playerclass
      	  });
      	  $('#sp2').html('<div class="well"><h3>Welcome ' + currentuser + '!<h3></div>');
      	  $('#' + playerclass + 'modal').modal('toggle');
      	}
      });
   
   }
   

}
