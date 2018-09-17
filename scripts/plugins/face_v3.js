/**
 * Face ERP Experiment for the OSU Caplab
 * Code by Cody Cooper
 *
 * Based on work by:
 * Josh de Leeuw
 * November 2013
 * 
 * This is a basic template for a jsPsych plugin. Use it to start creating your
 * own plugin. There is more information about how to create a plugin on the
 * jsPsych wiki (https://github.com/jodeleeuw/jsPsych/wiki/Create-a-Plugin).
 * 
 * 
 */
(function( $ ) {

	jsPsych["face-exp"] = (function(){
		var plugin = {};
		plugin.create = function(params) {
			var trials = new Array(6);
			for(var i = 0; i < 6; i++)
			{
				trials[i] = {};
				trials[i].type = "face-exp";
				trials[i].imgCD = params.stimuli[i][0];
				trials[i].imgXD = params.stimuli[i][1];
				trials[i].imgD  = params.stimuli[i][2];
                trials[i].prompt1 = (typeof params.prompt1 === 'undefined') ? "Please specify a value for prompt1 in the block parameters" : params.prompt1;
				trials[i].prompt2 = (typeof params.prompt2 === 'undefined') ? "Please specify a value for prompt2 in the block parameters" : params.prompt2;
				trials[i].left_key = params.left_key || 65; // defaults to 'A'
                trials[i].right_key = params.right_key || 76; // defaults to 'L'
				trials[i].fixation= (typeof params.fixation === 'undefined') ? "+" : params.fixation;
                // other information needed for the trial method can be added here
                
                // supporting the generic data object with the following line
                // is always a good idea. it allows people to pass in the data
                // parameter, but if they don't it gracefully adds an empty object
                // in it's place.
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
			}	
			return trials;
		};
		
		//Global Variables?
		
		//var tcomplete=false;
		var rtc=-1;
		var resp_c =-1;
		var rtd=-1;
		var resp_d =-1;
		//Shuffle the images, hopefully... 
		
		plugin.trial = function(display_element, block, trial, part) {
			switch (part){	
				case 1://start trial with a fixation screen
					rtc=999;
					resp_c =999;
					rtd=999;
					resp_d =999;
					display_element.append($('<div>', {
                        "class": 'face-study-stimulus',
                        html: trial.fixation
                    }));
					$('.face-study-stimulus').css({
											'font-size' : '75px',
											top :'40%',
											left:'50%',
											position:'fixed'
												});
				// start a timer of length trial.timing_x to move to the next part of the trial
                setTimeout(function() {
                    plugin.trial(display_element, block, trial, part + 1);
                }, 1000);
                break;
				case 2://remove the fixation image
					$('.face-study-stimulus').remove();
					// start timer
					setTimeout(function() {
						plugin.trial(display_element, block, trial, part + 1);
					}, 250);
				break;
				case 3://show the face
					display_element.append($('<img>', {
						src: trial.imgCD,
						"class": 'face-study-stimulus'
					}));			
					setTimeout(function() {
						plugin.trial(display_element, block, trial, part+1);
						}, 2000);
				break;
//******************************************************************************************************************
				case 4://remove the face image
					$('.face-study-stimulus').remove();
					// start timer
					setTimeout(function() {
						plugin.trial(display_element, block, trial, part + 1);
					}, 250);
				break;
//********************************************************************************************************************
				case 5://display the fixation
					display_element.append($('<div>', {
                        "class": 'face-study-stimulus',
                        html: trial.fixation
                    }));
					$('.face-study-stimulus').css({
											'font-size' : '75px',
											top :'40%',
											left:'50%',
											position:'fixed'
												});
				// start a timer of length trial.timing_x to move to the next part of the trial
                setTimeout(function() {
                    plugin.trial(display_element, block, trial, part + 1);
                }, 1000);
                break;
//*********************************************************************************************************************************
				case 6://remove the fixation image
					$('.face-study-stimulus').remove();
					// start timer
					setTimeout(function() {
						plugin.trial(display_element, block, trial, part + 1);
					}, 250);
				break;				
//************************************* Show Categorization Question ****************************************************************
				case 7:
					// show prompt1
					if (trial.prompt1 !== "") {
						display_element.append($('<div>', {
                        "class": 'face-study-stimulus',
                        html: trial.prompt1
						
                    }));
						$('.face-study-stimulus').css({//sets the display elements of the first prompt should be approximately in the middle of screen
											'font-size' : '1em',
											top : '40%',
											left: '35%',
											'text-align':'center',
											position:'fixed'
											});
					}

					// start measuring response time
					var startTime = (new Date()).getTime();

					// create the function that triggers when a key is pressed.
					var flag1 = false; // true when a valid key is chosen
					var resp_func1 = function(e1) {
						//var correct1 = false; // true when the correct response is chosen
						if (e1.which == trial.left_key) // 'q' key by default
						{
							flag1 = true;//can use this for feedback set a correct == to the assignment
							resp_c=e1.which;
						}
						else if (e1.which == trial.right_key) // 'p' key by default
						{
							flag1 = true;
							resp_c=e1.which;
						}
						
						if (flag1) {
							var endTime = (new Date()).getTime();
							rtc = (endTime - startTime);
							clearTimeout(cat_timer);//cancel the timeout event at the end of this case
							$(document).unbind('keydown', resp_func1); // remove response function from keys
							plugin.trial(display_element, block, trial, part + 1);							
						}
					};
						$(document).keydown(resp_func1);
						cat_timer = setTimeout(function() {//acts as trial timer
							plugin.trial(display_element, block, trial, part + 1);
							$(document).unbind('keydown', resp_func1);
							rtc=999;
							resp_c=999;//
						}, 5000);
						
					break;
//*******************************************************************************************************************************
				case 8://remove prompt1 
					$('.face-study-stimulus').remove();
					// start timer
					setTimeout(function() {
						plugin.trial(display_element, block, trial, part + 1);
					}, 250);
				break;
//*************************** Show fixation after Prompt1 ***********************************************************************
				case 9:
					display_element.append($('<div>', {
                        "class": 'face-study-stimulus',
                        html: trial.fixation
                    }));
					$('.face-study-stimulus').css({
											'font-size' : '75px',
											top : '40%',
											left:'50%',
											position:'fixed'
											});
				// start a timer of length trial.timing_x to move to the next part of the trial
					setTimeout(function() {
						plugin.trial(display_element, block, trial, part + 1);
					}, 1000);// need to fix
                break;
//*************************************************************************************************************************
				case 10://remove the fixation image
					$('.face-study-stimulus').remove();
					// start timer
					setTimeout(function() {
						plugin.trial(display_element, block, trial, part + 1);
					}, 250);
				break;
//************************ Show prompt2 ***********************************************************************************
				case 11:
					// show prompt2
					if (trial.prompt2 !== "") {
						display_element.append($('<div>', {
                        "class": 'face-study-stimulus',
                        html: trial.prompt2
                    }));
						$('.face-study-stimulus').css({//sets the display elements of the first prompt should be approximately in the middle of screen
												'font-size' : '1em',
												top : '40%',
												left: '35%',
												'text-align':'center',
												position:'fixed'
											});
					}

					// start measuring response time
					var startTime2 = (new Date()).getTime();

					// create the function that triggers when a key is pressed.
					var resp_func2 = function(e2) {
						var flag2 = false; // true when a valid key is chosen
						//var correct2 = false; // true when the correct response is chosen
						if (e2.which == trial.left_key) // 'q' key by default
						{
							flag2 = true;//can use this for feedback set a correct == to the assignment
							resp_d=e2.which;
						}
						else if (e2.which == trial.right_key) // 'p' key by default
						{
							flag2 = true;
							resp_d=e2.which;
						}
						if (flag2) {
							var endTime2 = (new Date()).getTime();
							rtd = (endTime2 - startTime2);
							// create object to store data from trial
							$(document).unbind('keydown', resp_func2); // remove response function from keys
							clearTimeout(dec_timer);
							plugin.trial(display_element, block, trial, part + 1);
							//tcomplete = true;
						}
					};
						$(document).keydown(resp_func2);
						dec_timer = setTimeout(function() {//acts as trial timer
							plugin.trial(display_element, block, trial, part + 1);
							$(document).unbind('keydown', resp_func2);
							rtd=999;
							resp_d=999;//
							}, 5000);
				break;
				case 12:
					$('.face-study-stimulus').remove();//set time out function for the blank screen then block.next();
					var trial_data = {
								"trial_type": "face-exp",
								"trial_index": block.trial_idx,
								"rt_cat": rtc,
								"rt_dec":rtd,
								"stimulus": trial.imgCD,
								"cat.resp":resp_c,
								"dec.resp":resp_d,
								"part":part
							};
							block.writeData($.extend({}, trial_data, trial.data));
					setTimeout(function() {block.next();}, 1000);
            }// End switch function
        };
        return plugin;
    })();
})(jQuery);