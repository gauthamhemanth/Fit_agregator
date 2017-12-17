  var GoogleAuth;
  var SCOPE = 'https://www.googleapis.com/auth/fitness.activity.read';
  var profile;
	  //'https://www.googleapis.com/auth/drive.metadata.readonly';
  
  function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
  }

  function initClient() {
    // Retrieve the discovery document for version 3 of Google Drive API.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        
        'discoveryDocs': [discoveryUrl],
        'clientId': '611639443303-u72rshiprflum73pklilpki081e2piuq.apps.googleusercontent.com',
        'scope': SCOPE
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();
		console.log("entered init module created google auth object");
      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      var user = GoogleAuth.currentUser.get();
      console.log('triggered');
      setSigninStatus();
      

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      $('#sign-in-or-out-button').click(function() {
        console.log('just now clicked the sign in button');
    	  handleAuthClick();
        
      }); 
      $('#revoke-access-button').click(function() {
        revokeAccess();
      }); 
    });
  }

  function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked 'Sign out' button.
    	 console.log('just now entered sign in button');
      GoogleAuth.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      GoogleAuth.signIn();
    }
  }
  

  function revokeAccess() {
    GoogleAuth.disconnect();
  }
  
  function setSigninStatus(isSignedIn) {
    var user = GoogleAuth.currentUser.get();
     profile = user.getBasicProfile();
     
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    console.log("is authorized values ::::::::"+ isAuthorized);
    if (isAuthorized) {
      $('#sign-in-or-out-button').html('Sign out');
      $('#revoke-access-button').css('display', 'inline-block');
      $('#auth-status').html('You are currently signed in and have granted ' +
          'access to this app.');
      $('#profile_parent').css('display','inline-block');
      $('#user_table').html("<table><tr><th rowspan='3'><img src="+profile.getImageUrl()+" height='80' width='90' /></th><tr><td> User:"+profile.getName()+"</td></tr><tr><td><p>Email:"+profile.getEmail()+"</p></td></tr></table>");
        
    } else {
      $('#sign-in-or-out-button').html('Sign In/Authorize');
      $('#sign-in-or-out-button').css ('align','center')
      $('#revoke-access-button').css('display', 'none');
      $('#auth-status').html('You have not authorized this app or you are ' +
          'signed out.');
      $('#profile_parent').css('display','none');

    }
   
  }

  function updateSigninStatus(isSignedIn) {
    setSigninStatus();
    if (isSignedIn){
    	
    	makeApiCall();
    	
    	makeOtherCall();
    }
  }
  
  function makeOtherCall(){
	  var req1 =  gapi.client.request({
    	  'method': 'GET',
    	 'path': 'https://www.googleapis.com/fitness/v1/users/me/dataSources'
    	});
	  
	  req1.execute(function(response){
		  
		  
		  console.log(response);
	  });
  }
  
  function makeApiCall(){
	  var dat = new Date().setHours(0,0,0,0);
	  var dat1 = new Date().setHours(24,0,0,0);
 	 //dat1.setDate(dat1.getDate() -1);
 	 //var da = Math.round(new Date().getTime());
 	console.log('old date and time '+dat);
 	// console.log('new date and time '+da);
	 var req =  gapi.client.request({
    	  'method': 'GET',
    	 'path': 'https://www.googleapis.com/fitness/v1/users/me/dataSources'
    		 //derived:com.google.step_count.delta:com.google.android.gms:estimated_steps/datasets/'+dat+'000000-'+dat1 + '000000'
    	});
	
	 

	// Execute the API request.
 	req.execute(function(response) {
 	  console.log(response);
 	  var pointTracker =response.point ;
 	 
// 	  console.log(pointTracker.length);
// 	  
// 
// 	  var step_count=0;
// 	  for(var i=0;i< pointTracker.length;i++){
//
//  	//	  console.log(pointTracker[i].value[0].intVal);
//  		  step_count= step_count+pointTracker[i].value[0].intVal;	
// 	  }
// 	 console.log(step_count);
// 	 
// 	$('#activity_table').html("<table border='1' width ='50%' align='center'><tr><td>Steps:</td><td>"+step_count +"</td></tr></table>");
// 	 
 	});
	 
  }