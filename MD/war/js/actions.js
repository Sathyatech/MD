$(document).ready(function() {
	var click = true;
	//var filesize = false;
	$(function() {
	    $("#file_browse").change(function (){
	       //filesize = false;
	       var fileName = $(this).val();
	       $("#filemessage").html(fileName.split('\\').pop());
	       $('#file_browse_wrapper').removeClass('error_field');
	       //if(this.files[0].size>1048570 )
	       // {
	       // filesize=true;
	       // }
	     });
	  });



	$(function(){
		   $('form#register').ajaxForm(options); 
		});
		var options={
			 beforeSubmit:  showRequest,  // pre-submit callback 
		     success:       showResponse  // post-submit callback 	
		};
		function showRequest(formData, jqForm, options)
		{
			console.log('validating form');
			var error = false;
			var reg_forcheckingmailid 	= /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			$('#adpt_fname').removeClass('error_field');
			$('#adpt_email').removeClass('error_field');
			$('.expe_div').removeClass('error_field');
			$('.desig_div').removeClass('error_field');
			$('#file_browse_wrapper').removeClass('error_field');
			if($('#adpt_fname').val()=='')
			 {
				$('#adpt_fname').addClass('error_field');
				$('#adpt_fname').val('Name is missing !');
				error=true;
			 }
			else if($('#adpt_fname').val()=='Name is missing !'||$('#adpt_fname').val()=='Invalid Name !'||$('#adpt_fname').val()=='Your Name')
			{
				$('#adpt_fname').addClass('error_field');
				$('#adpt_fname').val('Invalid Name !');
				error=true;
			}
			if($('#adpt_email').val()=='')
			{
				$('#adpt_email').addClass('error_field');
				$('#adpt_email').val('Email is missing !');
				error=true;
			}
			else if(!reg_forcheckingmailid.test($('#adpt_email').val()))
			{
				$('#adpt_email').addClass('error_field');
				$('#adpt_email').val('Invalid Email Format !');
				error=true;
			}
			if($('#file_browse').val()=='')
			{
				$('#file_browse_wrapper').addClass('error_field');
				$('#filemessage').text("Please Upload Your Resume");
				error=true;
			}
			else if($.inArray($('#file_browse').val().split('.').pop().toLowerCase(),['doc','docs','pdf','odt']) == -1)
			{
				$('#file_browse_wrapper').addClass('error_field');
				$('#filemessage').text(".Pdf or .doc are allowed");
				error=true;
			}
			if($('#experience').text()==''||$('#experience').text()=='Experience')
				{
				$('.expe_div').addClass('error_field');
				error=true;
				}
			if($('#designation').text()==''||$('#designation').text()=='Job Title')
				{
				$('.desig_div').addClass('error_field');
				error=true;
				}
			if(error==true)
				return false;
			else
				{
				if(click)
					{
					click = false;
					console.log('no errors submitting form');
					$('#loading_img').show();
					return true;
					}
				else{
					console.log('you are submitting multiple times stoping form submission');
					return false;
					}
				}
		}
		
		function showResponse(responseText, statusText, xhr, $form)
		{
			/*alert('status: ' + statusText + '\n\nresponseText: \n' + responseText + 
	        '\n\nThe output div should have already been updated with the responseText.'); */
			$('#loading_img').hide();
			click = true;
	        if(responseText=='success'||responseText=='<PRE>success</PRE>')
	    	{
	        $('form#register').resetForm();
	        $('#filemessage').text("Upload Your Resume");
	        $('#experience').text("Experience");
	        $('#designation').text("Job Title");
	    	//$('.job_popup').hide();
	    	$('#success_message').show();
	    	$('#backgroundPopup').show();
	    	}
	        else if(responseText=='LargeFile'||responseText=='<PRE>LargeFile</PRE>')
	    	{
	    	$('#file_browse_wrapper').addClass('error_field');
			$('#filemessage').text(" File size must be less than 1MB");
	    	}
	        else
	        {
	        $('#error_message').show();
	        }
					
		}
	
	
	
	
	
	
	
	/*
	$(function(){
		$("form#register").submit(function(){
			var error = false;
			var reg_forcheckingmailid 	= /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			$('#adpt_fname').removeClass('error_field');
			$('#adpt_email').removeClass('error_field');
			$('#file_browse_wrapper').removeClass('error_field');
			if($('#adpt_fname').val()=='')
			 {
				$('#adpt_fname').addClass('error_field');
				$('#adpt_fname').val('Name is missing !');
				error=true;
			 }
			else if($('#adpt_fname').val()=='Name is missing !'||$('#adpt_fname').val()=='Invalid Name !'||$('#adpt_fname').val()=='Your Name')
				{
				$('#adpt_fname').addClass('error_field');
				$('#adpt_fname').val('Invalid Name !');
				error=true;
				}
			if($('#adpt_email').val()=='')
				{
				$('#adpt_email').addClass('error_field');
				$('#adpt_email').val('Email is missing !');
				error=true;
				}
			else if(!reg_forcheckingmailid.test($('#adpt_email').val()))
				{
				$('#adpt_email').addClass('error_field');
				$('#adpt_email').val('Invalid Email Format !');
				error=true;
				}
			if($('#file_browse').val()=='')
				{
				$('#file_browse_wrapper').addClass('error_field');
				$('#filemessage').text("Please Upload Your Resume");
				error=true;
				}
			else if($.inArray($('#file_browse').val().split('.').pop().toLowerCase(),['doc','docs','pdf','odt']) == -1)
				{
				$('#file_browse_wrapper').addClass('error_field');
				$('#filemessage').text(" .Pdf or .doc are allowed ");
				error=true;
				}
			else if(filesize)
				{
				$('#filemessage').text(" File size must be less than 1MB");
				error=true;
				}
			if(error==true)
				return false;
			else
				{
				if(click)
					{
					click = false;
					console.log('submitting data');
					$('#loading_img').show();
					var formData = new FormData($(this)[0]);
				    $.ajax({
				        url: 'registerAction',
				        type: 'POST',
				        data: formData,
				        async: false,
				        success: function (data) {
				        	$('#loading_img').hide();
				            if(data=='success')
				            	{
				            	$('.job_popup').hide();
				            	$('#success_message').show();
				            	$('#backgroundPopup').show();
				            	}
				            else{
				            	$('#error_message').show();
				            }
				        },
				        cache: false,
				        contentType: false,
				        processData: false
				    });
				    return false;
					}
				else
					{
					console.log('already clicked');
					}
				}
		});
	});
	*/
	
	
	
	function position_popup () {
		var pop_pos = $(window).scrollTop() + 100;
		$('.popup_wrapper').css('top', pop_pos);
	}	

	 
//InputBox
	$('input.text_val_act, textarea').focus(function() { 
	  if( this.value == this.defaultValue ) {
	   this.value = "";
	  }
	  }).blur(function() {
	   if( !this.value.length ) {
		this.value = this.defaultValue;
	   }
	}); 
	


 // black screen dynamic height on window resize	
	

  	$('.popup_close_act').click(function() {
  		$('#backgroundPopup').fadeOut();
		$(this).parent().hide();
				
	});
		
   var body_win_height = parseInt(document.body.clientHeight) ;
   var win_height = parseInt(document.documentElement.clientHeight) ;

	   if( body_win_height > win_height) {
		$('#backgroundPopup').height(body_win_height);
	   } else {
		$('#backgroundPopup').height(win_height);
	   }

	$(window).resize(function(){
	   var body_win_height = parseInt(document.body.clientHeight) ;
	   var win_height = parseInt(document.documentElement.clientHeight) ;

	   if( body_win_height > win_height) {
		$('#backgroundPopup').height(body_win_height);
	   } else {
		$('#backgroundPopup').height(win_height);
	   }
	}); 	

/******  black screen ends here********/ 	
	
	$('.term_condition_act').click (function() {
			$('#backgroundPopup').fadeIn();
			$('.term_condition').show();
			position_popup ();
	});
	$('.privacy_policy_act').click (function() {
		
		$('#backgroundPopup').fadeIn();
		$('.privacy_policy').show();
		position_popup ();
	});	
	$('.job_popup_act').click (function() {
			$('#backgroundPopup').fadeIn();
			$('.job_popup').show();
			position_popup ();
	});
	
	$('.drop_down_selected').click(function() {
		$('.cust_drop_down .drop_down_list').hide();
		$(this).next().show();
	});
	
	$('.cust_drop_down .drop_down_list li').click(function() {
		$(this).parent().parent().children().find('b').html($(this).html());
		$(this).parent().hide();
	});
	
	$('#expe_div #expe_ul li').click(function() {
		console.info("the hidden experience is " +$(this).html());
		$('#hidden_experience').val($(this).html());
		
	});
	
	$('#desig_div #desig_ul li').click(function() {
		var test= $('#hidden_experience').val($(this).html());		
		$('#hidden_designation').val($(this).html());
		console.info("tst "+window.$('#hidden_designation').val($(this).html()));
	});
	
});

