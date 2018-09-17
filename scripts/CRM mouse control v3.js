/**
 * jspsych-single-stim
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

(function($) {
	jsPsych["CRM"] = (function() {

		var plugin = {};

		plugin.create = function(params) {
		
			params = jsPsych.pluginAPI.enforceArray(params, ['stimuli', 'poles']);

			var trials = new Array(params.stimuli.length);
			for (var i = 0; i < trials.length; i++) {
				trials[i] = {};
				trials[i].stim = params.stimuli[i];
				trials[i].prompt = params.prompt;
				// optional parameters
				trials[i].autoplay = (typeof params.autoplay === 'undefined') ? 1 : params.autoplay;
				trials[i].controls = (typeof params.controls === 'undefined') ? 0 : params.controls;
				trials[i].related = (typeof params.related === 'undefined') ? 0 : params.related;
				trials[i].stimH = (typeof params.stimH === 'undefined') ? 390 : params.stimH;
				trials[i].stimW = (typeof params.stimW === 'undefined') ? 640 : params.stimW;
				trials[i].sample_rate = (typeof params.sample_rate === 'undefined') ? 1000 : params.sample_rate;
			}
			return trials;
		};
		plugin.trial = function(display_element, trial) {
			var response = {y: 0, time: -1};
			var rating = [];
			var rating_time = [];
			var v=false;
			
		display_element.append($('<div>', {
			"id": 'player'
			}));
			$('#player').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				'margin-left': 'auto',
				'margin-right': 'auto',
				left: 0,
				right: 0,
				top:'0px',
				position:'absolute',
				'-moz-user-select':'-moz-none',
				'-o-user-select':'none',
				'-khtml-user-select':'none', /* you could also put this in a class */
				'-webkit-user-select':'none',/* and add the CSS class here instead */
				'-ms-user-select':'none',
				'user-select':'none'
			});
			
		
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
			player = new YT.Player('player', {
			height: trial.stimH,
			width: trial.stimW,
			videoId: trial.stim,
			playerVars: { 'autoplay': trial.autoplay, 'controls': trial.controls,'rel':trial.related },
			events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
			
          }
        });
		
      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == 0) {
			v=true;
			$('#player').remove();
        }
      }
		var qH = trial.stimH+10;
//show prompt
			display_element.append($('<div>', {
			html: trial.prompt,
			"id": 'question'
			}));
			$('#question').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				top : qH,
				'margin-left': 'auto',
				'margin-right': 'auto',
				left: 0,
				right: 0,
				width: '750px',
				height: '65px',
				'text-align':'center',
				'font-size':'25px',
				position:'absolute',
				'-moz-user-select':'-moz-none',
				'-o-user-select':'none',
				'-khtml-user-select':'none', /* you could also put this in a class */
				'-webkit-user-select':'none',/* and add the CSS class here instead */
				'-ms-user-select':'none',
				'user-select':'none'
			});
			
		
		$("#question").append($('<div>', {
			"id":"test-result",
			html:'0%'
			}));
			$('#test-result').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				top : '90%',
				'margin-left': 'auto',
				'margin-right': 'auto',
				left: 0,
				right: 0,
				width: '400px',
				height: '500px',
				'text-align':'center',
				'font-size':'25px',
				position:'absolute',
				'line-height':2.5,
				'-moz-user-select':'-moz-none',
				'-o-user-select':'none',
				'-khtml-user-select':'none', /* you could also put this in a class */
				'-webkit-user-select':'none',/* and add the CSS class here instead */
				'-ms-user-select':'none',
				'user-select':'none'
							});
			// add the line for the scale
			$("#question").append($('<div>', {
			"id":"range-slider"
			}));
			$("#range-slider").append( "<span></span>");
			
			$('#range-slider').css({//sets the display elements of the first prompt should be approximately in the middle of screen
				width:'100%',
				left:'0%',
				top:'50px',
				height:'20px',
				position:'relative',
				margin:'0 auto 1em',
				cursor:'e-resize',
				content:"",
				'-moz-user-select':'-moz-none',
				'-o-user-select':'none',
				'-khtml-user-select':'none', /* you could also put this in a class */
				'-webkit-user-select':'none',/* and add the CSS class here instead */
				'-ms-user-select':'none',
				'user-select':'none'
			});
			
			$('#range-slider').prev().css({	
				content:"",
				display:'block',
				width:'100%',
				top:'65px',
				position:'relative',
				left:0,
				height:'10px',
				'background-color':'black'
			});
			
			$('#range-slider span').css({	
				display:'block',
				height:'20px',
				width:'100%',
				position:'absolute',
				'z-index':2,
				'background-color':'red',
				cursor:'inherit'
			});
			
			//************************ slider functions*****************************
			function rangeSlider(id, onDrag) {

				var range = document.getElementById(id);
				var	dragger = range.children[0];
				var	draggerWidth = 15; // width of your dragger
				var	down = false;
				var	rangeWidth, rangeLeft;

					dragger.style.width = draggerWidth + 'px';
					dragger.style.left = -draggerWidth + 'px';
					dragger.style.marginLeft = (draggerWidth / 2) + 'px';

					range.addEventListener("mousedown", function(e) {
						rangeWidth = $('#'+String(id)).width();
						rangeLeft = $('#'+String(id)).offset().left;
						down = true;
						updateDragger(e);
						return false;
					});

					document.addEventListener("mousemove", function(e) {
						updateDragger(e);
					});

					document.addEventListener("mouseup", function() {
						down = false;
					});

					function updateDragger(e) {
						if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {
							dragger.style.left = (e.pageX - rangeLeft - draggerWidth) + 'px';
							if (typeof onDrag == "function") onDrag(Math.round((((e.pageX - rangeLeft)) / rangeWidth) * 100));
						}
					}

			}	
				
				rangeSlider('range-slider', function(value) {
				document.getElementById('test-result').innerHTML =  value+'%' ;
				response.y=value;
			});

				sample_timer=setInterval(function() {//acts as timer for sampling rate
								rating.push(response.y);
								rating_time.push(player.getCurrentTime());//
								//v = document.getElementById("video").childNodes[0].currentTime
								//alert(v);
								end_all();
							}, trial.sample_rate);//sample the cursor position every second
			// function to end trial when it is time
			
		function end_all(){
			if(v){
				// kill any remaining setTimeout handlers
				clearInterval(sample_timer);
				// kill keyboard listeners
					
				// gather the data to store for the trial
				var trial_data = {
					"stimulus": trial.stim,
					'prompt':trial.prompt,
					"rating_time": rating_time.join(';'),
					"rating": rating.join(';')
				};

				jsPsych.data.write(trial_data);

				// clear the display
				display_element.html('');

				// move on to the next trial
				jsPsych.finishTrial();
			}
			}

		};

		return plugin;
	})();
})(jQuery);
