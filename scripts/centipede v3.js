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
		plugin.trial = function(display_element, block, trial, part) {
		var grn = '#66C266';
		var rd = "#8D1919";

		//start the experiment
		var n = 0;
			switch (part){	
				case 1://The first trial of playing as A, planning stage
				//generate random number between 3 and 10
				var max = 10; var min = 3; // will be used for action blocks, may need to move location
				var nRand = Math.floor(Math.random()*(max-min+1)+min);
				
	//********************* TRIAL CONSTRUCTION ***********************************
						if (trial.prompt1 !== "") {
						display_element.append($('<div>', { //stage1 is the main experimental container, all other things are placed relative to this
							"id": 'stage1'
						}));
							$('#stage1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													//top:'15%',
													//left:'15%',
													'margin-left': 'auto',
													'margin-right': 'auto',
													left: 0,
													right: 0,
													width: '900px',
													height: '800px',
													'background-color':'#F2F2F2',
													'border-radius': '25px',
													position:'fixed'
												});
							$("#stage1").append($('<div>', {
							"id": 'question',
							html: 'Now think, what is my chance to pass the pot to Player B on this step:'
							}));
							$('#question').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '420px',
													left: '30px',
													width: '800px',
													height: '120px',
													'background-color':green,
													'text-align':'left',
													'font-size':'40px',
													'color':'white',
													'padding': '20px',
													'border-radius': '25px',
													position:'absolute'
												});	
							$("#stage1").append($('<div>', {
							"id": 'decision',
							html: 'On this trial, I get $'+'1'+ ', player B gets $'+'0.' // change values to variable values
							}));
			
							$('#decision').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '100px',
													left: '150px',
													width: '620px',
													height: '100px',
													'font-weight': 'bold',
													'text-align':'left',
													'font-size':'2em',
													'color':'black',
													'padding-left': '10px',
													'border-radius': '25px',
													position:'absolute'
												});	
							
							$("#question").append($('<input>', {
							"id": 'input1',
							'maxlength':"2"
							}));
							$('#input1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '50%',
													left: '65%',
													width:'80px',
													height:'50px',
													'font-size':'1.3em',
													position:'absolute'
												});	
							$("#question").append($('<div>', {
							"id": 'test',
							html: "%"
							}));
							$('#test').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '47%',
													left: '76%',
													position:'absolute',
													'font-size':'1.3em'
												});	
							$("#stage1").append($('<canvas>', {
							"id": 'PA1'
							}));
							$('#PA1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '25%',
													left: '20%',
													position:'absolute'
												});
						$("#stage1").append($('<canvas>', {
							"id": 'PB1'
						}));
							$('#PB1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '25%',
													left: '68%',
													position:'absolute'
												});

						}
	// ********************* DRAWING CIRCLES **********************************
						var pA = document.getElementById("PA1");
						var pActx = pA.getContext("2d");
						pActx.beginPath();
						pActx.arc(65, 70, 60, 0, 2 * Math.PI);
						pActx.stroke();
						pActx.fillStyle= green;
						pActx.fill();
						pActx.fillStyle="white";
						pActx.font = '50px Arial';
						pActx.fillText('A',50,80);
						
						var pB = document.getElementById("PB1");
						var pBctx = pB.getContext("2d");
						pBctx.beginPath();
						pBctx.arc(65, 70, 60,0, 2 * Math.PI);
						pBctx.stroke();
						pBctx.fillStyle=red;
						pBctx.fill();
						pBctx.fillStyle="white";
						pBctx.font = '50px Arial';
						pBctx.fillText('B',50,80);
// *************************** TRIAL OPERATIONS ********************************	
						// start measuring response time
						var startTime = (new Date()).getTime();
						// create the function that triggers when a key is pressed.
						var flag_continue = false; // true when a valid key is chosen
						var flag_end = false;
	//*********************** FUNCTION DETECTING AFTER KEY PRESS *********************
						var resp_func1 = function(e1) { 
							if (e1.which == 13) // if the participant presses enter 
							{
								flag_continue = true;//
								resp_plan=$('#input1').val();
							}
							if (flag_continue) {
								var endTime = (new Date()).getTime();
								rtcent = (endTime - startTime);
								$(document).unbind('keydown', resp_func1); // remove response function from keys
								$('#stage1').remove();
								n++;
								plugin.trial(display_element, block, trial, part+1);
							}
						};
						$(document).keydown(resp_func1);
					break;
//*******************************************************************************************************************************
				case 2://remove prompt1 
				
	//********************* TRIAL CONSTRUCTION ***********************************
						if (trial.prompt1 !== "") {
						display_element.append($('<div>', { //stage1 is the main experimental container, all other things are placed relative to this
							"id": 'stage1'
						}));
							$('#stage1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													//top:'15%',
													//left:'15%',
													'margin-left': 'auto',
													'margin-right': 'auto',
													left: 0,
													right: 0,
													width: '900px',
													height: '800px',
													'background-color':'#F2F2F2',
													'border-radius': '25px',
													position:'fixed'
												});
							$("#stage1").append($('<div>', {
							"id": 'question',
							html: 'Now think, what is the chance of Player B passing the pot back to me?'
							}));
							$('#question').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '420px',
													left: '30px',
													width: '800px',
													height: '120px',
													'background-color':red,
													'text-align':'left',
													'font-size':'40px',
													'color':'white',
													'padding': '20px',
													'border-radius': '25px',
													position:'absolute'
												});	
							$("#stage1").append($('<div>', {
							"id": 'decision',
							html: 'On this trial, I get $'+'1'+ ', player B gets $'+'0.' // change values to variable values
							}));
			
							$('#decision').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '100px',
													left: '150px',
													width: '620px',
													height: '100px',
													'font-weight': 'bold',
													'text-align':'left',
													'font-size':'2em',
													'color':'black',
													'padding-left': '10px',
													'border-radius': '25px',
													position:'absolute'
												});	
							
							$("#question").append($('<input>', {
							"id": 'input1',
							'maxlength':"2"
							}));
							$('#input1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '50%',
													left: '65%',
													width:'80px',
													height:'50px',
													'font-size':'1.3em',
													position:'absolute'
												});	
							$("#question").append($('<div>', {
							"id": 'test',
							html: "%"
							}));
							$('#test').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '47%',
													left: '76%',
													position:'absolute',
													'font-size':'1.3em'
												});	
							$("#stage1").append($('<canvas>', {
							"id": 'PA1'
							}));
							$('#PA1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '25%',
													left: '68%',
													position:'absolute'
												});
						$("#stage1").append($('<canvas>', {
							"id": 'PB1'
						}));
							$('#PB1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '25%',
													left: '20%',
													position:'absolute'
												});

						}
	// ********************* DRAWING CIRCLES **********************************
						var pA = document.getElementById("PA1");
						var pActx = pA.getContext("2d");
						pActx.beginPath();
						pActx.arc(65, 70, 60, 0, 2 * Math.PI);
						pActx.stroke();
						pActx.fillStyle= green;
						pActx.fill();
						pActx.fillStyle="white";
						pActx.font = '50px Arial';
						pActx.fillText('A',50,80);
						
						var pB = document.getElementById("PB1");
						var pBctx = pB.getContext("2d");
						pBctx.beginPath();
						pBctx.arc(65, 70, 60,0, 2 * Math.PI);
						pBctx.stroke();
						pBctx.fillStyle=red;
						pBctx.fill();
						pBctx.fillStyle="white";
						pBctx.font = '50px Arial';
						pBctx.fillText('B',50,80);
// *************************** TRIAL OPERATIONS ********************************	
						// start measuring response time
						var startTime = (new Date()).getTime();
						// create the function that triggers when a key is pressed.
						var flag_continue = false; // true when a valid key is chosen
						var flag_end = false;
	//*********************** FUNCTION DETECTING AFTER KEY PRESS *********************
						var resp_func1 = function(e1) { 
							if (e1.which == 13) // if the participant presses enter 
							{
								flag_continue = true;//
								resp_plan=$('#input1').val();
							}
							if (flag_continue) {
								var endTime = (new Date()).getTime();
								rtcent = (endTime - startTime);
								$(document).unbind('keydown', resp_func1); // remove response function from keys
								$('#stage1').remove();
								n++;
								plugin.trial(display_element, block, trial, part=1);
							}
						};
						$(document).keydown(resp_func1);

				break;
//****************************************Remove Feedback and write trial data*****************************************************************************************
				case 3:

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
