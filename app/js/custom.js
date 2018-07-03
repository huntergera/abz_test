;(function($) {

// Form registration
	$("#form__log-in").validate({
		rules: {
			name: 'required',
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: 'Please enter a valid name!',
			email: 'Please enter a valid email address!'
		}
	});

	var upload = new FileUploadWithPreview('myUniqueUploadId');
	upload.imageSelected = function(event) {
    	var files = upload.cachedFileArray;
    	if (files[0].size > $("#max-file-size").val()) {
    		$(".add-photo").fadeIn();
    	}else{
    		$(".add-photo").fadeOut();
    	}
	};


	$("#textarea").keyup(function(){
		var textareaValue = $("#textarea").val().length;
		$("#symbol-numbers").html(textareaValue);
	});


//Mobile-menu
	$('#mobile-menu_btn').on ('click', function(){
		$("body").addClass("menu_active");
		$(".menu_mask").css ({'display':'block'});
		$(".menu_mask").animate ({opacity:0.3}, 400);
	});

	$('#menu_close, .menu_mask').on ('click', function(){
		$("body").removeClass("menu_active");
		$(".menu_mask").animate ({opacity:0}, 400, function(){
			$(".menu_mask").css ({'display':'none'});
		});
	});


	
})(jQuery);