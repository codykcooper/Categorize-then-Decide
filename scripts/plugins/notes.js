				if(trial.trialtype='CD'){	
					if(resp_c==trial.nat && resp_d==trial.disp){	//four correct screens
						if(resp_c==65 && resp_d==65){
							display_element.append($('<img>', {
								src: "img/AcFc.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==65 && resp_d==76){
							display_element.append($('<img>', {
								src: "img/AcDc.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==76 && resp_d==65){
							display_element.append($('<img>', {
								src: "img/LcFc.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==76 && resp_d==76){
							display_element.append($('<img>', {
								src: "img/LcDc.BMP",
								"class": 'face-study-stimulus'
							}));
						}
					}
					else if(resp_c!=trial.natCD && resp_d==trial.dispCD){//incorrect categorization***********************************
						if(resp_c==65 && resp_d==65){
							display_element.append($('<img>', {
								src: "img/AwFc.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==65 && resp_d==76){
							display_element.append($('<img>', {
								src: "img/AwDc.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==76 && resp_d==65){
							display_element.append($('<img>', {
								src: "img/LwFc.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==76 && resp_d==76){
							display_element.append($('<img>', {
								src: "img/LwDc.BMP",
								"class": 'face-study-stimulus'
							}));
						}
					}
					else if(resp_c==trial.natCD && resp_d!=trial.dispCD){//incorrect decision***********************
						if(resp_c==65 && resp_d==65){
							display_element.append($('<img>', {
								src: "img/AcFw.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==65 && resp_d==76){
							display_element.append($('<img>', {
								src: "img/AcDw.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==76 && resp_d==65){
							display_element.append($('<img>', {
								src: "img/LcFw.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==76 && resp_d==76){
							display_element.append($('<img>', {
								src: "img/LcDw.BMP",
								"class": 'face-study-stimulus'
							}));
						}
					}
					else if(resp_c!=trial.natCD && resp_d!=trial.dispCD){//incorrect decision and categorization***********************
						if(resp_c==65 && resp_d==65){
							display_element.append($('<img>', {
							src: "img/AwFw.BMP",
							"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==65 && resp_d==76){
							display_element.append($('<img>', {
								src: "img/AwDw.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==76 && resp_d==65){
							display_element.append($('<img>', {
								src: "img/LwFw.BMP",
								"class": 'face-study-stimulus'
							}));
						} 
						else if(resp_c==76 && resp_d==76){
							display_element.append($('<img>', {
								src: "img/LwDw.BMP",
								"class": 'face-study-stimulus'
							}));
						}
						else if(resp_c==999 || resp_d==999){
							display_element.append($('<img>', {
								src: "img/sorry.BMP",
								"class": 'face-study-stimulus'
							}));
						}
					}
				}
				else if(trial.trialtype='XD'||trial.trialtype='D'){
					if(trial.nat==65/*adok*/ && resp_d==trial.dispCD/*correct answer*/ && resp_d==65/*friendly*/){
						display_element.append($('<img>', {
							src: "img/AFc.BMP",
							"class": 'face-study-stimulus'
						}));
					
					}
					else if(trial.nat==65/*adok*/ && resp_d==trial.dispCD/*correct answer*/ && resp_d==76/*Defensive*/){
						display_element.append($('<img>', {
							src: "img/ADc.BMP",
							"class": 'face-study-stimulus'
						}));
					
					}
					else if(trial.nat==76/*lork*/ && resp_d==trial.dispCD/*correct answer*/ && resp_d==65/*friendly*/){
						display_element.append($('<img>', {
							src: "img/LFc.BMP",
							"class": 'face-study-stimulus'
						}));
					
					}
					else if(trial.nat==76/*lork*/ && resp_d==trial.dispCD/*correct answer*/ && resp_d==76/*Defensive*/){
						display_element.append($('<img>', {
							src: "img/LDc.BMP",
							"class": 'face-study-stimulus'
						}));
					
					}
//******************************************************************************************************************************************
					else if(trial.nat==65/*adok*/ && resp_d!=trial.dispCD/*correct answer*/ && resp_d==65/*friendly*/){
						display_element.append($('<img>', {
							src: "img/AFw.BMP",
							"class": 'face-study-stimulus'
						}));
					
					}
					else if(trial.nat==65/*adok*/ && resp_d!=trial.dispCD/*correct answer*/ && resp_d==76/*Defensive*/){
						display_element.append($('<img>', {
							src: "img/ADw.BMP",
							"class": 'face-study-stimulus'
						}));
					
					}
					else if(trial.nat==76/*lork*/ && resp_d!=trial.dispCD/*correct answer*/ && resp_d==65/*friendly*/){
						display_element.append($('<img>', {
							src: "img/LFw.BMP",
							"class": 'face-study-stimulus'
						}));
					
					}
					else if(trial.nat==76/*lork*/ && resp_d!=trial.dispCD/*correct answer*/ && resp_d==76/*Defensive*/){
						display_element.append($('<img>', {
							src: "img/LDw.BMP",
							"class": 'face-study-stimulus'
						}));
					
					}
				
				}
		$('.face-study-stimulus').css({//sets the display elements of the first prompt should be approximately in the middle of screen
			width:'auto',
			height:'100%',
			left:'22%',
			top:'0%',
			position:'fixed'
		});					
		setTimeout(function() {
			plugin.trial(display_element, block, trial, part+1);
			}, 4000);
						
						
						
						
						