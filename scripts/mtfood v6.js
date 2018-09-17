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
	jsPsych['mtfood'] = (function(){
		var plugin = {};
		plugin.create = function(params) {
			var trials = new Array(params.stim.length);
			for(var i = 0; i < params.stim.length; i++)
			{
				trials[i] = {};
				trials[i].type = "mtfood";
				trials[i].Limg = params.stim[i][0];
				trials[i].Rimg = params.stim[i][1];
                // supporting the generic data object with the following line
                // is always a good idea. it allows people to pass in the data
                // parameter, but if they don't it gracefully adds an empty object
                // in it's place.
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
			}	
			return trials;
		};
		var x = 0;
		var count = 1;
		var gtimer;
		var rightgrid;
		var contextb;
		// Draw the left grid
		var leftgrid;
		var contexta;
		var trial_type;
		var experimentStart = (new Date()).getTime();
	plugin.trial = function(display_element, block, trial, part) {
		var bw = 180;
		var bh = 180;
			//padding around grid
		var p = 10;
		var cw = 1.5*bw + (p*2) + 1;
		var ch = bh + (p*2) + 1;
		
		function ranstim(){
			var lets = "abcdefghijklmnopqrstuvwxyz";
			var matrix = new Array(9);
			var possible = [];
			var con = Math.floor((Math.random() * 2)); // random number 0 or 1 only possibilities
			if(con==0){
				possible = lets;//set possible stim to the letters
				for(var i=0; i < 9; i++ ){// fill the stim with randomly selected letters
				var text = "";
				text += possible.charAt(Math.floor(Math.random() * possible.length)) + possible.charAt(Math.floor(Math.random() * possible.length)) ;
					matrix[i]=text;
				}
			}
			else if(con==1){
				var text = [];
				var text1 = [];
				var text2 = [];
				for(var i=0; i < 9; i++ ){// fill the stim with randomly selected letters
				text1 = Math.floor(Math.random() * 9)+1;//random number between 1 and 9
				text2 = Math.floor(Math.random() * 9)+1;
				text = ("" + text1 + text2); 
					matrix[i]=Number(text);
				}
			}	
			return matrix;
			}
		// rbstim randomly selects 2 cells and changes the contents
		function rbstim(x){
			var possible = [];
			var matrix = new Array(9);
			var n = Math.floor(Math.random() * 9)+1;
			var nn = Math.floor(Math.random() * 9)+1;
			if(typeof x[1] == 'string'){
				possible = "abcdefghijklmnopqrstuvwxyz";
				for(var i=0; i <9;i++){
					var text = "";
					if(i==n || i==nn){
					text += possible.charAt(Math.floor(Math.random() * possible.length)) + possible.charAt(Math.floor(Math.random() * possible.length));
					matrix[i]=text;
					}else{
					matrix[i]=x[i];
					}
				}
			}
			else if(typeof x[1] =='number'){
				for(var t=0; t <9;t++){
					var text = [];
					var text1 = [];
					var text2 = [];
					if(t==n || t==nn){
					text1 = Math.floor(Math.random() * 9)+1;//random number between 0 and 9
					text2 = Math.floor(Math.random() * 9)+1;
					text = ("" + text1 + text2);
					matrix[t]=Number(text);
					}else{
					matrix[t]=x[t];
					}
				}
			}
			return matrix;
		}
			function drawBoarda(){
				for (var s = 0; s <= bw; s += 60) {
					contexta.moveTo(0.5 + s + p, p);
					contexta.lineTo(0.5 + s + p, bh + p);
				}
				for (var x = 0; x <= bh; x += 60) {
					contexta.moveTo(p, 0.5 + x + p);
					contexta.lineTo(bw + p, 0.5 + x + p);
				}
				contexta.strokeStyle = "black";
				contexta.stroke();
				contexta.font="25px Arial"; // # numbers indicate row and column placement in the grid
				contexta.fillText(ra[0],25,50); 
				contexta.fillText(ra[1],25,110); 
				contexta.fillText(ra[2],25,170); 
				 
				contexta.fillText(ra[3],85,50); 
				contexta.fillText(ra[4],85,110); 
				contexta.fillText(ra[5],85,170); 
				 
				contexta.fillText(ra[6],145,50); 
				contexta.fillText(ra[7],145,110); 
				contexta.fillText(ra[8],145,170); 
			}
		
			function drawBoardb(){
				for (var t = 0; t <= bw; t += 60) {
					contextb.moveTo(0.5 + t + p, p);
					contextb.lineTo(0.5 + t + p, bh + p);
				}
				for (var xx = 0; xx <= bh; xx += 60) {
					contextb.moveTo(p, 0.5 + xx + p);
					contextb.lineTo(bw + p, 0.5 + xx + p);
				}
				contextb.strokeStyle = "black";
				contextb.stroke();
				
				contextb.font="25px Arial"; // # numbers indicate row and column placement in the grid
				contextb.fillText(rb[0],25,50); 
				contextb.fillText(rb[1],25,110); 
				contextb.fillText(rb[2],25,170); 
				 
				contextb.fillText(rb[3],85,50); 
				contextb.fillText(rb[4],85,110); 
				contextb.fillText(rb[5],85,170); 
				 
				contextb.fillText(rb[6],145,50); 
				contextb.fillText(rb[7],145,110); 
				contextb.fillText(rb[8],145,170); 
			}
		function clear_gridtime(){
			clearInterval(gtimer);
			grid_timer();
		}
		function grid_timer(){ gtimer = setInterval(function() {//acts as trial timer for the grid
					switch(count){
									case 1:
										grid1=9999;
										gRT1 = 9999;
										g_onset_1 = startTimegrid - experimentStart;
										LGstim1=ra.join("-");
										RGstim1=rb.join("-");
									break;
									case 2:
										grid2=9999;
										gRT2 = 9999;
										g_onset_2 = startTimegrid - experimentStart;
										LGstim2=ra.join("-");
										RGstim2=rb.join("-");
									break;
									case 3:
										grid3=9999;
										gRT3 = 9999;
										g_onset_3 = startTimegrid - experimentStart;
										LGstim3=ra.join("-");
										RGstim3=rb.join("-");
									break;
									case 4:
										grid4=9999;
										gRT4 = 9999;
										g_onset_4 = startTimegrid - experimentStart;
										LGstim4=ra.join("-");
										RGstim4=rb.join("-");
									break;
									case 5:
										grid5=9999;
										gRT5 = 9999;
										g_onset_5 = startTimegrid - experimentStart;
										LGstim5=ra.join("-");
										RGstim5=rb.join("-");
									break;
									case 6:
										grid6= 9999;
										gRT6 = 9999;
										g_onset_6 = startTimegrid - experimentStart;
										LGstim6=ra.join("-");
										RGstim6=rb.join("-");
									break;
									case 7:
										grid7= 9999;
										gRT7 = 9999;
										g_onset_7 = startTimegrid - experimentStart;
										LGstim7=ra.join("-");
										RGstim7=rb.join("-");
									break;
									case 8:
										grid8= 9999;
										gRT8 = 9999;
										g_onset_8 = startTimegrid - experimentStart;
										LGstim8=ra.join("-");
										RGstim8=rb.join("-");
									break;
									case 9:
										grid9= 9999;
										gRT9 = 9999;
										g_onset_9 = startTimegrid - experimentStart;
										LGstim9=ra.join("-");
										RGstim9=rb.join("-");
									break;
									case 10:
										grid10= 9999;
										gRT10 = 9999;
										g_onset_10 = startTimegrid - experimentStart;
										LGstim10=ra.join("-");
										RGstim10=rb.join("-");
									break;
									case 11:
										grid11= 9999;
										gRT11 = 9999;
										g_onset_11 = startTimegrid - experimentStart;
										LGstim11=ra.join("-");
										RGstim11=rb.join("-");
									break;
									case 12:
										grid12= 9999;
										gRT12 = 9999;
										g_onset_12 = startTimegrid - experimentStart;
										LGstim12=ra.join("-");
										RGstim12=rb.join("-");
									break;
									case 13:
										grid13= 9999;
										gRT13 = 9999;
										g_onset_13 = startTimegrid - experimentStart;
										LGstim13=ra.join("-");
										RGstim13=rb.join("-");
									break;
									case 14:
										grid14= 9999;
										gRT14 = 9999;
										g_onset_14 = startTimegrid - experimentStart;
										LGstim14=ra.join("-");
										RGstim14=rb.join("-");
									break;
									case 15:
										grid15= 9999;
										gRT15 = 9999;
										g_onset_15 = startTimegrid - experimentStart;
										LGstim15=ra.join("-");
										RGstim15=rb.join("-");
									break;
					}//end switch********************************************************************************************************************
					count++;
					ra = ranstim();
						trial_type = Math.floor((Math.random() * 2)+1);
							if(trial_type == 1){//set to match
							rb = ra;}
							else if (trial_type ==2){
							rb = rbstim(ra);
							}
								contexta.clearRect (0,0,bw+5,bh);// remove left grid before redraw
								contextb.clearRect (0,0,bw+5,bh);// remove right grid before redraw
								drawBoarda();
								drawBoardb();
								clear_gridtime();
							}, 15000);//will terminate after 15000ms	
		}
		
		
	//********************* TRIAL CONSTRUCTION ***********************************
	if(x==0){//so it does not redraw on every trial
	
						display_element.append($('<div>', { //stage1 is the main experimental container, all other things are placed relative to this
							"id": 'grids'
						}));
							$('#grids').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top:'5%',
													//left:'15%',
													'margin-left': 'auto',
													'margin-right': 'auto',
													left: 0,
													right: 0,
													width: '600px',
													height: '575px',
													'border-radius': '20px',
													'border-color': 'black',
													border: '1px solid',
													position:'fixed'
												});
						
						$("#grids").append($('<canvas>', {
							"id": 'LG'
							}));
							$('#LG').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '2%',
													left: '2%',
													//width:cw,
													//height:ch,
													position:'absolute'
												});
							$('#LG').attr({width: cw, height: ch});
						$("#grids").append($('<canvas>', {
							"id": 'RG'
							}));
							$('#RG').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '2%',
													left: '64%',
													position:'absolute'
												});
							$('#RG').attr({width: cw, height: ch});
						
						$("#grids").append($('<div>',{
							"id": 'match',
							html: 'L - Match'
							}));
							$('#match').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '7%',
													left: '36%',
													width: '155px',
													height: '40px',
													'text-align':'center',
													'font-size':'25px',
													'color':'black',
													'border-radius': '5px',
													'border-color': 'black',
													border: '1px solid',
													position:'absolute'
												});	
						$("#grids").append($('<div>',{
							"id": 'mismatch',
							html: 'J - Mismatch'
							}));
							$('#mismatch').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '20%',
													left: '36%',
													width: '155px',
													height: '40px',
													'text-align':'center',
													'font-size':'25px',
													'color':'black',
													'border-radius': '5px',
													'border-color': 'black',
													border: '1px solid',
													position:'absolute'
												});	
		// Draw the right grid
		
		
		$("#grids").append($('<div>',{
							"id": 'choice',
							html: 'Press "A" to choose the item on the left <br> Press "D" to choose the item on the right'
							}));
							$('#choice').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '40%',
													left: '11%',
													width: '500px',
													height: '65px',
													'text-align':'center',
													'font-size':'25px',
													'color':'black',
													'border-radius': '5px',
													'border-color': 'black',
													border: '1px solid',
													position:'absolute'
												});		
		
	
	rightgrid = document.getElementById("RG");
		contextb = rightgrid.getContext("2d");
		// Draw the left grid
	leftgrid = document.getElementById("LG");
		contexta = leftgrid.getContext("2d");
		ra = ranstim();
		trial_type = Math.floor((Math.random() * 2)+1);
		if(trial_type == 1){//set to match
		rb = ra;}
		else if (trial_type ==2){
		rb = rbstim(ra);
		}
		drawBoarda();
		drawBoardb();
		grid_timer();	
		}
	x=1;
			// ********************* DRAWING Grids **********************************
			//grid width and height
			
			//size of canvas
		
	
//		*****************		Response Functions			*******************************
						// start measuring response time
						var startTimegrid = (new Date()).getTime();
						// create the function that triggers when a key is pressed.
						var flag_continue = false; // true when a valid key is chosen
	//*********************** FUNCTION DETECTING AFTER KEY PRESS *********************
	//			Images
				$("#grids").append($('<img>', {
							"id":"imgleft",
							//src: trial.Limg
						}));				
					$('#imgleft').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '55%',
													left: '4%',
													width: '240px',
													height: '240px',
													'text-align':'center',
													'font-size':'25px',
													'color':'black',
													'border-radius': '5px',
													'border-color': 'black',
													border: '1px solid',
													position:'absolute'
												});			
					$("#grids").append($('<img>', {
							"id":"imgright",
							//src: trial.Rimg
						}));				
					$('#imgright').css({//sets the display elements of the first prompt should be approximately in the middle of screen
													top : '55%',
													left: '56%',
													width: '240px',
													height: '240px',
													'text-align':'center',
													'font-size':'25px',
													'color':'black',
													'border-radius': '5px',
													'border-color': 'black',
													border: '1px solid',
													position:'absolute'
												});
												
			
		switch (part){
		case 1:
		grid1 = '';grid2 = '';grid3 = '';grid4 = '';grid5 = '';
		grid6 = '';grid7 = '';grid8 = '';grid9 = '';grid10 = '';
		grid11 = '';grid12 = '';grid13 = '';grid14 = '';grid15= '';
		
		gRT1 = '';gRT2 = '';gRT3 = '';gRT4 = '';gRT5 = '';
		gRT6 = '';gRT7 = '';gRT8 = '';gRT9 = '';gRT10 = '';
		gRT11 = '';gRT12 = '';gRT13 = '';gRT14 = '';gRT15= '';
		
		g_onset_1 = '';g_onset_2 = '';g_onset_3 = '';g_onset_4 = '';g_onset_5 = '';
		g_onset_6 = '';g_onset_7 = '';g_onset_8 = '';g_onset_9 = '';g_onset_10 = '';
		g_onset_11 = '';g_onset_12 = '';g_onset_13 = '';g_onset_14 = '';g_onset_15= '';
		
		RGstim1 = '';RGstim2 = '';RGstim3 = '';RGstim4 = '';RGstim5 = '';
		RGstim6 = '';RGstim7 = '';RGstim8 = '';RGstim9 = '';RGstim10 = '';
		RGstim11 = '';RGstim12 = '';RGstim13 = '';RGstim14 = '';RGstim15 = '';
		
		LGstim1 = '';LGstim2 = '';LGstim3 = '';LGstim4 = '';LGstim5 = '';
		LGstim6 = '';LGstim7 = '';LGstim8 = '';LGstim9 = '';LGstim10 = '';
		LGstim11 = '';LGstim12 = '';LGstim13 = '';LGstim14 = '';LGstim15 = '';

		pic_timer=setInterval(function() {//acts as trial timer for the pic
								rtpic=999;
								pic_Resp=999;//
								clearInterval(pic_timer);
								plugin.trial(display_element, block, trial, part + 1);
							}, 10000);
		//reset the grid variables
		// get trial type for the first block
		if(count==1){
			trial_type = Math.floor((Math.random() * 2)+1);
				if(trial_type == 1){//set to match
				rb = ra;}
				else if (trial_type ==2){
				rb = rbstim(ra);
				}
		}
			$("#imgleft").attr({src:trial.Limg});
			$("#imgright").attr({src:trial.Rimg});
			var flag_pic=false;	
					startTimepic = (new Date()).getTime();	
					var resp_grid = function(g1) { 
							if (g1.which == 74 || g1.which == 76){ // if the participant presses enter 
							flag_continue=true;
							switch(count){
								case 1:
									grid1=g1.which;
									gRT1 = (new Date()).getTime()-startTimegrid;
									g_onset_1 = startTimegrid - experimentStart;
									LGstim1=ra.join("-");
									RGstim1=rb.join("-");
								break;
								case 2:
									grid2=g1.which;
									gRT2 = (new Date()).getTime()-startTimegrid;
									g_onset_2 = startTimegrid - experimentStart;
									LGstim2=ra.join("-");
									RGstim2=rb.join("-");
								break;
								case 3:
									grid3=g1.which;
									gRT3 = (new Date()).getTime()-startTimegrid;
									g_onset_3 = startTimegrid - experimentStart;
									LGstim3=ra.join("-");
									RGstim3=rb.join("-");
								break;
								case 4:
									grid4=g1.which;
									gRT4 = (new Date()).getTime()-startTimegrid;
									g_onset_4 = startTimegrid - experimentStart;
									LGstim4=ra.join("-");
									RGstim4=rb.join("-");
								break;
								case 5:
									grid5=g1.which;
									gRT5 = (new Date()).getTime()-startTimegrid;
									g_onset_5 = startTimegrid - experimentStart;
									LGstim5=ra.join("-");
									RGstim5=rb.join("-");
								break;
								case 6:
									grid6=g1.which;
									gRT6 = (new Date()).getTime()-startTimegrid;
									g_onset_6 = startTimegrid - experimentStart;
									LGstim6=ra.join("-");
									RGstim6=rb.join("-");
								break;
								case 7:
									grid7=g1.which;
									gRT7 = (new Date()).getTime()-startTimegrid;
									g_onset_7 = startTimegrid - experimentStart;
									trial_type7=trial_type;
									LGstim7=ra.join("-");
									RGstim7=rb.join("-");
								break;
								case 8:
									grid8=g1.which;
									gRT8 = (new Date()).getTime()-startTimegrid;
									g_onset_8 = startTimegrid - experimentStart;
									LGstim8=ra.join("-");
									RGstim8=rb.join("-");
								break;
								case 9:
									grid9=g1.which;
									gRT9 = (new Date()).getTime()-startTimegrid;
									g_onset_9 = startTimegrid - experimentStart;
									LGstim9=ra.join("-");
									RGstim9=rb.join("-");
								break;
								case 10:
									grid10=g1.which;
									gRT10 = (new Date()).getTime()-startTimegrid;
									g_onset_10 = startTimegrid - experimentStart;
									LGstim10=ra.join("-");
									RGstim10=rb.join("-");
								break;
								case 11:
									grid11=g1.which;
									gRT11 = (new Date()).getTime()-startTimegrid;
									g_onset_11 = startTimegrid - experimentStart;
									LGstim11=ra.join("-");
									RGstim11=rb.join("-");
								break;
								case 12:
									grid12=g1.which;
									gRT12 = (new Date()).getTime()-startTimegrid;
									g_onset_12 = startTimegrid - experimentStart;
									LGstim12=ra.join("-");
									RGstim12=rb.join("-");
								break;
								case 13:
									grid13=g1.which;
									gRT13 = (new Date()).getTime()-startTimegrid;
									g_onset_13 = startTimegrid - experimentStart;
									LGstim13=ra.join("-");
									RGstim13=rb.join("-");
								break;
								case 14:
									grid14 = g1.which;
									gRT14 = (new Date()).getTime()-startTimegrid;
									g_onset_14 = startTimegrid - experimentStart;
									LGstim14=ra.join("-");
									RGstim14=rb.join("-");
								break;
								case 15:
									grid15 = g1.which;
									gRT15 = (new Date()).getTime()-startTimegrid;
									g_onset_15 = startTimegrid - experimentStart;
									LGstim15=ra.join("-");
									RGstim15=rb.join("-");
								break;
							}//end switch
							}
							if (flag_continue) {
								clear_gridtime();//has the new timer built into it
								//rtgrid[a] = (endTime - startTimegrid);
								leftgrid = document.getElementById("LG");
								contexta = leftgrid.getContext("2d");
								rightgrid = document.getElementById("RG");
								contextb = rightgrid.getContext("2d");
								contexta.clearRect (0,0,bw+5,bh);// remove left grid before redraw
								contextb.clearRect (0,0,bw+5,bh);// remove right grid before redraw
								ra = ranstim();
								count++;
								if(count>1){// trial type for the beginning of case is set outside of grid response function
								trial_type = Math.floor((Math.random() * 2)+1);
									if(trial_type == 1){//set to match
									rb = ra;}
									else if (trial_type ==2){
									rb = rbstim(ra);
									}
								}
								drawBoarda();
								drawBoardb();
								startTimegrid = (new Date()).getTime();
								
								flag_continue = false;	
						}
						};
						//'activate' the response function
						$(document).keydown(resp_grid);
						
						
					var resp_pic= function(p1) { 
							if (p1.which == 65 || p1.which == 68) // if the participant presses enter 
							{
								flag_pic = true;//
								pic_Resp= p1.which;
							}
							if (flag_pic) {
								var endTime = (new Date()).getTime();
								rtpic = (endTime - startTimepic);
								//if statement to switch out of main task
								clearInterval(pic_timer);//cancel the timeout event at the end of this case
								flag_pic=false;	
								$(document).unbind('keydown', resp_pic); // remove response function from keys
								plugin.trial(display_element, block, trial, part + 1);
							}
						};
					$(document).keydown(resp_pic);
						
			break;
			case 2:
			
				$(document).unbind('keydown', resp_pic); // remove response function from keys
							var trial_data = {
								'trial_type':'mtfood',
								'count':count-1,	//subtract 1 to get correct count
								trial_index: block.trial_idx,
								"Pic_Resp": pic_Resp,
								'Pic_RT':rtpic,
								'pic_onset':startTimepic - experimentStart,
								'Left_image':trial.Limg,
								'Right_image':trial.Rimg,
								
								'grid1':grid1,'grid2':grid2,'grid3':grid3,'grid4':grid4,'grid5':grid5,
								'grid6':grid6,'grid7':grid7,'grid8':grid8,'grid9':grid9,'grid10':grid10,
								'grid11':grid11,'grid12':grid12,'grid13':grid13,'grid14':grid14,'grid15':grid15,
								
								'gRT1':gRT1,'gRT2':gRT2,'gRT3':gRT3,'gRT4':gRT4,'gRT5':gRT5,
								'gRT6':gRT6,'gRT7':gRT7,'gRT8':gRT8,'gRT9':gRT9,'gRT10':gRT10,
								'gRT11':gRT11,'gRT12':gRT12,'gRT13':gRT13,'gRT14':gRT14,'gRT15':gRT15,
								
								'g_onset_1':g_onset_1,'g_onset_2':g_onset_2,'g_onset_3':g_onset_3,'g_onset_4':g_onset_4,'g_onset_5':g_onset_5,
								'g_onset_6':g_onset_6,'g_onset_7':g_onset_7,'g_onset_8':g_onset_8,'g_onset_9':g_onset_9,'g_onset_10':g_onset_10,
								'g_onset_11':g_onset_11,'g_onset_12':g_onset_12, 'g_onset_13':g_onset_13,'g_onset_14':g_onset_14,'g_onset_15': g_onset_15,
								
								'LGstim1':LGstim1,'LGstim2':LGstim2,'LGstim3':LGstim3,'LGstim4':LGstim4,'LGstim5':LGstim5,
								'LGstim6':LGstim6,'LGstim7':LGstim7,'LGstim8':LGstim8,'LGstim9':LGstim9,'LGstim10':LGstim10,
								'LGstim11':LGstim11,'LGstim12':LGstim12,'LGstim13':LGstim13,'LGstim14':LGstim14,'LGstim15':LGstim15,
								
								'RGstim1':RGstim1,'RGstim2':RGstim2,'RGstim3':RGstim3,'RGstim4':RGstim4,'RGstim5':RGstim5,
								'RGstim6':RGstim6,'RGstim7':RGstim7,'RGstim8':RGstim8,'RGstim9':RGstim9,'RGstim10':RGstim10,
								'RGstim11':RGstim11,'RGstim12':RGstim12,'RGstim13':RGstim13,'RGstim14':RGstim14,'RGstim15':RGstim15	
							};
						count=1;
							block.writeData($.extend({}, trial_data, trial.data));
					block.next();
			
					
			break;
            }// End switch function
			
        };
        return plugin;
    })();
})(jQuery);
