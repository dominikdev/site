$(document).ready(function(){
	$("#submit").click(function(){
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		var phone = $("#phone").val();
		var email = $("#email").val();
		var project_name = $("#project_name").val();
		var project_desc = $("#project_desc").val();
		var ios = $("#ios").is(':checked');
		var android = $("#android").is(':checked');
		var web = $("#web").is(':checked');
		var file = $("#file").val();
		var completion = $("#completion").val();
		var budget = $("#budget").val();

		var data = 'firstname='+ firstname + '&lastname='+ lastname + '&phone='+ phone + '&email='+ email + '&project_name='+ project_name + '&project_desc='+ project_desc + '&ios='+ ios + '&android='+ android + '&web='+ web + '&file='+ file + '&development_time='+ completion + '&budget='+ budget;
		
		if(firstname == '' || lastname == '' || phone == '' || email == '' || project_name == '' || project_desc == '' || completion == '' || budget=='') {
			alert("Please Fill All Fields");
		} else {
			$.ajax({
				type: "POST",
				url: "quote-request.php",
				data: data,
				cache: false,
				success: function(result){
					$(".modal-title").html("Success");
					$(".modal-body").html("<p style=\"text-align:center;\">Your request has been sent to our team. We will review the content that you have provided us and contact you with a quote as quickly as possible.</p>");
					$(".modal-footer").html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>");
				}
			});
		}

	return false;
	});
});