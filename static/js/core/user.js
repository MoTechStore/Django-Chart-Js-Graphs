$(document).ready(function(){
//console.log('Hi Mose');


var userList;

function getuser(){
	$.ajax({
		url: "alluser/",
		method: "GET",
		success: function(data){
			userList = data.users;
			//userList = JSON.stringify(data);
			//console.log('User List',userList);
		}
	})
}

getuser();


// View user information
$('.btninfo').click(function(){
	console.log('Button Info Clicked');
	$('#user_info').show();
	$('#mytable').hide();
	let id = $(this).attr("data-sid");
	console.log(id);


	// FIll button
	$('#bfbutton_two').hide();
	$('#bfbutton').show();


	var index = $(this).parents("tr").index();
	console.log('user index',index);

	//$('.card-header #fname').val(id);

	$('.card-header #fname').val(userList[index]["username"]);
	$('.card-header #lname').val(userList[index]["last_name"]);
	$('#bfid').val(id);

	console.log('My user ID is',id);
	$('.bedit-form #editbf').val(id);
	console.log(userList);

	console.log('Guys Am Here');
	mydata = {id:id};
	
	$.ajax({
		url: "check_cv/",
		method: "POST",
		data : mydata,
		success:function(data){
			if(data.status == 1){
				console.log('User with That ID Has CV');
				// $('#rowbf').append('<button type="button" class="btn btn-sm btn-warning" id="bfbutton">Fill Form</button>');

				// Fill and edit button
				$('#bfbutton').hide();
				$('#bfebutton').show();

				// View button
				$('#bfvbutton').hide();
				$('#bfnbutton').show();


				// Download button
				$('#bfndbutton').show();
				$('#bfdbutton').hide();


			}

			if(data.status == 0){
				console.log('User with That ID Has No CV');
				// Fill and edit button


				$('#bfbutton').show();
				$('#bfebutton').hide();

				// View button
				$('#bfvbutton').show();
				$('#bfnbutton').hide();


				// Download button
				$('#bfndbutton').hide();
				$('#bfdbutton').show();	
			}
		}
	})

});



$('#bfsave').click(function(){
	console.log('Modal Fill Form Button Submited');
	var id = $('#bfid').val();
	console.log('User Id is',id);

	let fn = $('#bffname').val();
	let ln = $('#bflname').val();
	let em = $('#bfemail').val();

	if(fn == ""){
		console.log('Please Enter First Name');
	}else if(ln == ""){
		console.log('Please Enter Last Name');
	}else if(em == ""){
		console.log("Please Enter Email");
	}else{
		console.log("Everythin Is Ok");

		mydata = {first_name:fn, last_name:ln, email:em, user_id:id};
		$.ajax({
			url: "savedata/",
			method: "POST",
			data : mydata,

			success: function(data){
				if(data.status == "Success"){
					console.log('Data Saved');
					$('form')[0].reset();
					$('#bfModal').hide();
					getuser();


				}


				if(data.status == "Fail"){
					console.log('Request Failed');
				}
			}
		})

	}


});


// View Report Button
$('#bfnbutton').click(function(){
	console.log('View Report Button Cliked');
	var id = $('.bedit-form #editbf').val();
	console.log('User Id is',id);

	mydata = {id:id};

	$.ajax({
		url: "user/",
		method:"POST",
		data:mydata,

		success:function(data){
			console.log('Report Displayed With Success');
		}
	})


});


// Fill Information To Edit In Form
$('#bfebutton').click(function(){
	console.log('Edit Form Button Clicked');
	$('#editbfModal').show();
	var id = $('.bedit-form #editbf').val();
	console.log('User Id is',id);

	mydata = {id:id};
	$.ajax({
		url:"edit_take/",
		method: "POST",
		data:mydata,
		success:function(data){
			console.log("Information Fetched");
			console.log('Firstname is',data.fname);
			$('.bedit-form #bffname').val(data.fname);
			$('.bedit-form #bflname').val(data.lname);
			$('.bedit-form #bfemail').val(data.email);


		}
	})

});


// Save Background Screening Editing Model
$('#bfesave').click(function(){
	console.log('BS Edit Model Clicked');
	var id = $('.bedit-form #editbf').val();

	console.log('User Id is',id);
	var fname = $('.bedit-form #bffname').val();
	var lname = $('.bedit-form #bflname').val();
	var email = $('.bedit-form #bfemail').val();

	console.log(lname);


	mydata = {id:id, fname:fname, lname:lname, email:email};
	$.ajax({
		url: "save_edit/",
		method: "POST",
		data:mydata,
		success:function(data){
			if(data.status == 1){
				console.log('Updated Successfully');
				getuser();
			}

			if(data.status == 0){
				console.log('Failed To Update');
				getuser();
			}
		}
	})

});


// Close Candidate
$("#close_cand").click(function(){
	console.log('Candidate Button Clicked');
    $('#user_info').hide();
    $('#mytable').show();

});



$('#bfbutton').click(function(){
	console.log('Fill Form Button Clicked');
	$('#bfModal').show();

});

// Close bfModal
$("#fmbutton").click(function(){
    $('#bfModal').hide();
});



// Close Edit Background Screen Modal Form
$("#efmbutton").click(function(){
    $('#editbfModal').hide();
});




});




