var firebaseConfig = {
    apiKey: "AIzaSyDfve6e-VVUwIe40JEfh3GTOBbur-FJPAo",
    authDomain: "kiwtter-22df6.firebaseapp.com",
    databaseURL: "https://kiwtter-22df6-default-rtdb.firebaseio.com",
    projectId: "kiwtter-22df6",
    storageBucket: "kiwtter-22df6.appspot.com",
    messagingSenderId: "373966334506",
    appId: "1:373966334506:web:5bc8330c43e3e1d982f153"
  };
  
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   user_name=localStorage.getItem("user_name");
   room_name=localStorage.getItem("room_name");
   function send(){
    msg=document.getElementById("msg").value ;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });
    document.getElementById("msg").value="" ;

   }
   function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
 console.log(message_data);
 console.log(firebase_message_id);
 username=message_data['name'];
 message=message_data['message'];
 like=message_data['like'];
 nwt="<h4>"+username+" <img src='tick.png'class='user_tick'> </h4>";
 mwt="<h4>"+message+"  </h4>";
 lwt="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)'>";
 swt="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span></button><hr>";
 row=nwt+mwt+lwt+swt;
 document.getElementById("output").innerHTML+=row;
 
 } });  }); }
getData();
function updatelike(message_id){
button_id=message_id;
likes=document.getElementById(button_id).value ;
updatedlikes=Number(likes)+1;
console.log(updatedlikes);
firebase.database().ref(room_name).child(message_id).update({
    like:updatedlikes
});

}
   function logout(){
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location="index.html";
   }