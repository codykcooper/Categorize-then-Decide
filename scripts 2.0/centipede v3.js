/*
 * Centipede game plugin
 * Created by Cody Cooper (codykcooper@gmail.com)
 */
 




jsPsych.plugins["centipede"] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

    // set default values for parameters
	trial.p1pay = trial.p1pay; //value of player 1 win
	trial.p2pay = trial.p2pay; // value of player 2 win
	trial.stage = trial.stage; // Action or planning stage

    // allow variables as functions
    // this allows any trial variable to be specified as a function
    // that will be evaluated when the trial runs. this allows users
    // to dynamically adjust the contents of a trial as a result
    // of other trials, among other uses. you can leave this out,
    // but in general it should be included
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
	
	// set the colors for the experiment
	//set up some basic vairbales. They do not have to go here, just preference.
	var grn = '#66C266';
	var rd = "#8D1919";
	//set some variables
	var flag_continue = false;
	var w = "1000px";
	var txtsize= "25px";
	rt=[];resp=[];
	var n = 0;
	var startTime = -1;
	var endTime = -1;
	
	//define the function for the first prompt
	function q1(){
		startTime = (new Date()).getTime();
		
		$('#s1').append($('<p>',{
			id: 'Q1',
			html: 'Now think, what is my chance to pass the pot to Player B on this step:'
			}));
			
		$("#Q1").append($('<input>', {
			"id": 'q1Resp',
			'maxlength':"2",
			'autofocus':'autofocus'
			}));
			$('#q1Resp').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				'font-size':txtsize,
				top : '50%',
				left: '35%',
				position:'absolute'
			});	
		$("#q1Resp").focus();
		$('#Q1').append($('<p>',{
			id: 'Q1.1',
			html: '<br><br>Please press ENTER to continue.'
			}));
			$('#Q1.1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				'font-size':txtsize,
				top : '60%',
				left: '35%',
				position:'absolute'
			});	
			
	}
	//define the function for the second prompt
	function q2(){
		startTime = (new Date()).getTime();//set new time for RT
		$('#s1').append($('<p>',{
			id: 'Q1',
			html: 'Now think, what is the chance of Player B will pass the pot back to me?:'
			}));
			
		$("#Q1").append($('<input>', {
			"id": 'q1Resp',
			'maxlength':"2",
			'autofocus':'autofocus'
			}));
			$('#q1Resp').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				'font-size':txtsize,
				top : '50%',
				left: '35%',
				position:'absolute'
			});	
			
		$('#Q1').append($('<p>',{
			id: 'Q1.1',
			html: '<br><br>Please press ENTER to continue.'
			}));
			$('#Q1.1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				'font-size':txtsize,
				top : '60%',
				left: '35%',
				position:'absolute'
			});	
			
	}
	if(trial.stage = 'action'){
	//define the function for the third prompt
		function q3(){
			startTime = (new Date()).getTime();//set new time for RT
			$('#s1').append($('<p>',{
				id: 'Q1',
				html: 'Now, select your choice on this step:'
				}));
				
			$("#Q1").append($('<p>', {
				"id": 'qResp',
				'html':'1 - Yes. Pass it. &nbsp &nbsp 3 - No. Keep it.'
				}));
				$('#q1Resp').css({//sets the display elements of the first prompt should be approximately in the middle of screen
					'font-size':txtsize,
					top : '50%',
					left: '35%',
					position:'absolute'
				});		
		}
	}
	else if (trial.stage = 'planning'){
		function q3(){
			startTime = (new Date()).getTime();//set new time for RT
			$('#s1').append($('<p>',{
				id: 'Q1',
				html: 'Now, do you plan to pass the pot on this step?'
				}));
				
			$("#Q1").append($('<p>', {
				"id": 'qResp',
				'html':'1 - Yes. I plan to pass it. &nbsp &nbsp 3 - No. I plan to keep it.'
				}));
				$('#qResp').css({//sets the display elements of the first prompt should be approximately in the middle of screen
					'font-size':txtsize,
					top : '50%',
					left: '35%',
					position:'absolute'
				});		
		}	
	}
	//player b perspective**************************************************************************
	function intermission(){
		$('#s1').append($('<p>',{
			id: 'Q1',
			html: '<br><br>Please press ENTER to continue.'
			}));
			$('#Q1.1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				'font-size':txtsize,
				top : '60%',
				left: '35%',
				position:'absolute'
			});
	}
	function q4(){
		startTime = (new Date()).getTime();
		
		$('#s1').append($('<p>',{
			id: 'Q1',
			html: 'Now think from player B&#39s perspective and put yourself in B&#39s shoes:<br> What does B think my chance to pass the pot to player B is:'
			}));
			
		$("#Q1").append($('<input>', {
			"id": 'q1Resp',
			'maxlength':"2",
			'onfocus':"if(this.value != '') { this.value = ''; }"
			}));
			$('#q1Resp').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				'font-size':txtsize,
				top : '60%',
				left: '35%',
				position:'absolute'
			});	
			
		$("#q1Resp").focus();
		
		$('#Q1').append($('<p>',{
			id: 'Q1.1',
			html: '<br><br>Please press ENTER to continue.'
			}));
			$('#Q1.1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				'font-size':txtsize,
				top : '60%',
				left: '35%',
				position:'absolute'
			});	
		
	}
	
	function q5(){
		startTime = (new Date()).getTime();
		
		$('#s1').append($('<p>',{
			id: 'Q1',
			html: 'Now think from player B&#39s perspective and put yourself in B&#39s shoes:<br> What does B think I think B&#39s chance is to pass the pot to me:'
			}));
			
		$("#Q1").append($('<input>', {
			"id": 'q1Resp',
			'maxlength':"2",
			'autofocus':'autofocus'
			}));
			$('#q1Resp').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				'font-size':txtsize,
				top : '60%',
				left: '35%',
				position:'absolute'
			});	
			
		$("#q1Resp").focus();
		$('#Q1').append($('<p>',{
			id: 'Q1.1',
			html: '<br><br>Please press ENTER to continue.'
			}));
			$('#Q1.1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				'font-size':txtsize,
				top : '60%',
				left: '35%',
				position:'absolute'
			});	
			
	}
	
	if (trial.prompt1 !== "") {
		display_element.append($('<div>', { //stage1 is the main experimental container, all other things are placed relative to this
			"id": 's1',
			html: '<br><br>On this trial, I get $' + trial.p1pay +', Player B gets $' + trial.p2pay
		}));
			$('#s1').css({//sets the display elements of the first prompt should be approximately in the middle of screen
							display: 'inline-block',
							margin:'0 0 0 -8%',
							'text-align':'center',
							'font-size':txtsize,
							width: w,
							height: '300px',
							'background-color':'#F2F2F2',
							position:'fixed'
						});
	}

	function resp_func1(event) { 
		// if the participant presses enter or 1 or numpad 1 or 3 or numpad 3 
		// Still a problem if they press 1 in the probability
		if ((event.keyCode == 13 && $('#q1Resp').val() != "") && n!=2)
		{
			flag_continue = true;//
			endTime = (new Date()).getTime();
			resp.push($('#q1Resp').val());
		}
		else if((event.keyCode == 49 || event.keyCode == 97 || event.keyCode == 51 || event.keyCode ==99) && n==2) // if the participant presses 1 or 3 keys 
		{
			flag_continue = true;//
			endTime = (new Date()).getTime();
			resp.push(event.which);
		}
		if (flag_continue) {
			flag_continue = false;
			rt.push(endTime - startTime)
			n++ // use to display second prompt
			$('#Q1').remove();
			if(n==1){
				q2();
				$("#q1Resp").focus();
				}//display the second prompt
			if(n==2){
				q3();//is user keeping or passing
			}
			if(n==3){
				intermission();
			}
			if(n==4){//think from b's perspective 1
				q4();
			}
			if(n==5){ //think from b's perspective 2
				q5();
			}
			if(n==6){
				$(document).unbind('keydown', resp_func1); // remove response function from keys
				$('#s1').remove();
				 // data saving
				n = 0;
				var trial_data = {
				  rtAtoB:rt[0],//Q1()
				  rtBtoA:rt[1],//Q2()
				  rtAchoice:rt[2],//Q3()
				  rtpause:rt[3],//intermission
				  rtAasB:rt[4],//Q4()
				  rtAasBasB:rt[5],//Q5()
				  respAtoB:resp[0],//q1()
				  respBtoA:resp[1],//q2()
				  respAchoice:resp[2],//q3()
				  respPause:resp[3],//intermission
				  respAasB:resp[4],//q4()
				  respAasBasB:resp[5], //q5()
				  stage:trial.stage,
				  p1pay:trial.p1pay,
				  p2pay:trial.p2pay
				};
				jsPsych.finishTrial(trial_data);//end the trial
			};
		}
	};// end response function
	
	//The first prompt will show after 1 seconds
	setTimeout(q1(), 1000);
	
	$(document).keydown(resp_func1);
	
   

    // end trial
    
  };

  return plugin;
})();
