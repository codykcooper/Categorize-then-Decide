/**
 * Centipede for the OSU Caplab
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
	jsPsych['cent.game'] = (function(){
		var plugin = {};
		plugin.create = function(params) {
			var trials = new Array(5/*params.attributes.length*/);
			for(var i = 0; i < 5/*params.attributes.length*/; i++)
			{
				trials[i] = {};
				trials[i].type = "cent.game";
				trials[i].p1pay = params.p1pay[i];
				trials[i].p2pay = params.p2pay[i];
				trials[i].left_key = params.left_key || 65; // defaults to the 'A' key
                trials[i].right_key = params.right_key || 76; // defaults to the 'L' key
				trials[i].fixation= (typeof params.fixation === 'undefined') ? "+" : params.fixation;
                // supporting the generic data object with the following line
                // is always a good idea. it allows people to pass in the data
                // parameter, but if they don't it gracefully adds an empty object
                // in it's place.
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
			}	
			return trials;
		
		};
		var x = 1;
		var y = 2;
		plugin.trial = function(display_element, block, trial, part) {
		
		var n = 0;
		//start the experiment
			switch (part){	
				case 1://start trial with a fixation screen
					display_element.append($('<div>', {
                        "class": 'cent-study-fix',
                        html: trial.fixation
                    }));
					$('.cent-study-fix').css({
											'font-size' : '4em',
											top :'40%',
											left:'50%',
											position:'fixed'
												});
				// start a timer of length trial.timing_x to move to the next part of the trial
                setTimeout(function() {
                    plugin.trial(display_element, block, trial, part + 1);
                }, 1000);
                break;
//*********************************************************************************************************************
				case 2://remove the fixation image
					$('.cent-study-fix').remove();
					// start timer
					setTimeout(function() {
						plugin.trial(display_element, block, trial, part + 1);
					}, 250);
				break;
//********************************************************************************************************************
//************************************* Show the Pay Choices ****************************************************************
				case 3:
						// show prompt1 for CD
						if (trial.prompt1 !== "") {
							display_element.append($('<div>', {
							"class": 'cent-study-stimP1',
							html: "<p> You will win</p>" + "<br>" + "$"+ trial.p1pay
						}));
							$('.cent-study-stimP1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													'font-size' : '2em',
													top : '30%',
													left: '20%',
													'text-align':'center',
													position:'fixed'
												});
						}
						// player two
						if (trial.prompt1 !== "") {
							display_element.append($('<div>', {
							"class": 'cent-study-stimP2',
							html: "<p> Player two will win</p>" + "<br>" + "$" + trial.p2pay
						}));
							$('.cent-study-stimP2').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													'font-size' : '2em',
													top : '30%',
													left: '65%',
													'text-align':'center',
													position:'fixed'
												});
						}
						// Response Question
						if (trial.prompt1 !== "") {
							display_element.append($('<div>', {
							"class": 'cent-study-q',
							html: "<p>Press 'A' to pass to player 2 or press 'L' to take the money </p>"
						}));
							$('.cent-study-q').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													'font-size' : '2em',
													top : '60%',
													left: '27%',
													'text-align':'center',
													position:'fixed'
												});
						}
						// start measuring response time
						var startTime = (new Date()).getTime();
						
						// create the function that triggers when a key is pressed.
						var flag1 = false; // true when a valid key is chosen
						var resp_func1 = function(e1) {
							if (e1.which == trial.left_key) 
							{
								flag1 = true;//
								resp_c=e1.which;
							}
							else if (e1.which == trial.right_key) //
							{
								flag1 = true;
								resp_c=e1.which;
							}
							
							if (flag1) {
								var endTime = (new Date()).getTime();
								rtcent = (endTime - startTime);
								clearTimeout(cat_timer);//cancel the timeout event at the end of this case
								$(document).unbind('keydown', resp_func1); // remove response function from keys
								if(resp_c == 65){
								plugin.trial(display_element, block, trial, part + 1);	
								}				
								else if (resp_c == 76){
								plugin.trial(display_element, block, trial, part + 1);
								}
							}
						};
						$(document).keydown(resp_func1);
							cat_timer = setTimeout(function() {//acts as trial timer
								$(document).unbind('keydown', resp_func1);
								plugin.trial(display_element, block, trial, part + 1);
							}, 50000);
							break;
//*******************************************************************************************************************************
				case 4://remove prompt1 
					$('.cent-study-stimP1').remove();
					$('.cent-study-stimP2').remove();
					$('.cent-study-q').remove();
					// start timer
					setTimeout(function() {
						plugin.trial(display_element, block, trial, part + 1);
					}, 250);
				break;
//****************************************Remove Feedback and write trial data*****************************************************************************************
				case 5:

					var trial_data = {
								"trial_type": "face-exp",
								trial_index: block.trial_idx,
								"rt_cat": rtcent,
								"cat.resp":resp_c
							};
							block.writeData($.extend({}, trial_data, trial.data));
							if(resp_c == 65){
							setTimeout(function() {block.next();}, 1000);
							}
							else if (resp_c == 76){
							plugin.trial(display_element, block, trial, part + 1);
							}	
				break;
//*************************************************************************************************************************************
				case 6:
					block.trial_idx = 5;
					block.next();
				break;
            }// End switch function
        };
        return plugin;
    })();
})(jQuery);
