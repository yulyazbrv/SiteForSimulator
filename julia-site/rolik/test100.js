(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"test100_atlas_1", frames: [[0,0,1224,1500],[1226,802,550,400],[1226,1204,64,72],[1226,1278,64,72],[1226,1352,64,72],[1226,1426,64,72],[1226,1500,64,72],[1292,1204,64,72],[1292,1278,64,72],[1292,1352,64,72],[1292,1426,64,72],[1292,1500,64,72],[1358,1204,64,72],[1358,1278,64,72],[1358,1352,64,72],[1358,1426,64,72],[1358,1500,64,72],[1424,1204,64,72],[1424,1278,64,72],[1424,1352,64,72],[1424,1426,64,72],[1424,1500,64,72],[1490,1204,64,72],[1490,1278,64,72],[1490,1352,64,72],[1226,0,705,800]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.котлета = function() {
	this.initialize(img.котлета);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2482,1798);


(lib.плита = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.сковородаpngкопия = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.часы_0 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.часы_1 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.часы_10 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.часы_11 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.часы_12 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.часы_13 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.часы_14 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.часы_15 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.часы_16 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.часы_17 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.часы_18 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.часы_19 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.часы_2 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.часы_20 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.часы_21 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.часы_22 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.часы_3 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.часы_4 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.часы_5 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.часы_6 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.часы_7 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.часы_8 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.часы_9 = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.pngwingcom = function() {
	this.initialize(ss["test100_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.pusc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("Ego0gzkMAAABnJMBRqgyog");
	this.shape.setTransform(-328.55,709.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ego0gzkMBRpA0hMhRpAyog");
	this.shape_1.setTransform(-328.55,709.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-590.9,378.1,524.6999999999999,662.1999999999999);


(lib.pause = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("AmyqOIE2AAIAAUdIk2AAgAB9qOIE2AAIAAUdIk2AAg");
	this.shape.setTransform(-192.5,-8.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AB9KPIAA0dIE2AAIAAUdgAmyKPIAA0dIE2AAIAAUdg");
	this.shape_1.setTransform(-192.5,-8.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-237,-74.9,89,133);


(lib.Символ1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.pngwingcom();
	this.instance.setTransform(0,0,0.0639,0.057);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,45.1,45.6);


(lib.Анимация8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.котлета();
	this.instance.setTransform(-36.1,-19.35,0.0291,0.0215);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.1,-19.3,72.2,38.7);


(lib.Анимация7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.котлета();
	this.instance.setTransform(-36.1,-19.35,0.0291,0.0215);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.1,-19.3,72.2,38.7);


(lib.Анимация6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.котлета();
	this.instance.setTransform(-36.1,-19.35,0.0291,0.0215);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.1,-19.3,72.2,38.7);


(lib.Анимация5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.котлета();
	this.instance.setTransform(-36.1,-19.35,0.0291,0.0215);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.1,-19.3,72.2,38.7);


(lib.Символ2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_2
	this.instance = new lib.Символ1("synched",0);
	this.instance.setTransform(31.95,27.6,1,1,0,0,0,22.6,22.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(48).to({startPosition:0},0).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,54.5,50.4);


// stage content:
(lib.test100 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"_1wav",startFrame:0,endFrame:189,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("_1wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,189,1);
		this.stop();
		this.Pusc.addEventListener("click",f1.bind(this));
		function f1(args){this.play();} 
		
		this.Pause.addEventListener("click",f2.bind(this));
		function f2(args){this.stop();}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(189));

	// sounds
	this.Pusc = new lib.pusc();
	this.Pusc.name = "Pusc";
	this.Pusc.setTransform(1157.3,207.15,0.202,0.2279);
	new cjs.ButtonHelper(this.Pusc, 0, 1, 2, false, new lib.pusc(), 3);

	this.Pause = new lib.pause();
	this.Pause.name = "Pause";
	this.Pause.setTransform(1104.5,385.4);
	new cjs.ButtonHelper(this.Pause, 0, 1, 2, false, new lib.pause(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Pause},{t:this.Pusc}]}).wait(189));

	// Слой_8
	this.instance = new lib.часы_0();

	this.instance_1 = new lib.часы_1();

	this.instance_2 = new lib.часы_2();

	this.instance_3 = new lib.часы_3();

	this.instance_4 = new lib.часы_4();

	this.instance_5 = new lib.часы_5();

	this.instance_6 = new lib.часы_6();

	this.instance_7 = new lib.часы_7();

	this.instance_8 = new lib.часы_8();

	this.instance_9 = new lib.часы_9();

	this.instance_10 = new lib.часы_10();

	this.instance_11 = new lib.часы_11();

	this.instance_12 = new lib.часы_12();

	this.instance_13 = new lib.часы_13();

	this.instance_14 = new lib.часы_14();

	this.instance_15 = new lib.часы_15();

	this.instance_16 = new lib.часы_16();

	this.instance_17 = new lib.часы_17();

	this.instance_18 = new lib.часы_18();

	this.instance_19 = new lib.часы_19();

	this.instance_20 = new lib.часы_20();

	this.instance_21 = new lib.часы_21();

	this.instance_22 = new lib.часы_22();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},120).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_8}]},3).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_10}]},3).to({state:[{t:this.instance_11}]},3).to({state:[{t:this.instance_12}]},3).to({state:[{t:this.instance_13}]},3).to({state:[{t:this.instance_14}]},3).to({state:[{t:this.instance_15}]},3).to({state:[{t:this.instance_16}]},3).to({state:[{t:this.instance_17}]},3).to({state:[{t:this.instance_18}]},3).to({state:[{t:this.instance_19}]},3).to({state:[{t:this.instance_20}]},3).to({state:[{t:this.instance_21}]},3).to({state:[{t:this.instance_22}]},3).wait(3));

	// Слой_7
	this.instance_23 = new lib.Анимация5("synched",0);
	this.instance_23.setTransform(187.1,131.35);
	this.instance_23._off = true;

	this.instance_24 = new lib.Анимация6("synched",0);
	this.instance_24.setTransform(282.1,145.35);
	this.instance_24._off = true;

	this.instance_25 = new lib.Анимация7("synched",0);
	this.instance_25.setTransform(374.1,152.35);
	this.instance_25._off = true;

	this.instance_26 = new lib.Анимация8("synched",0);
	this.instance_26.setTransform(515.1,152.35);
	this.instance_26._off = true;

	this.instance_27 = new lib.котлета();
	this.instance_27.setTransform(478,132,0.0291,0.0215);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_23}]},104).to({state:[{t:this.instance_24}]},4).to({state:[{t:this.instance_25}]},4).to({state:[{t:this.instance_26}]},4).to({state:[{t:this.instance_27}]},4).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(104).to({_off:false},0).to({_off:true,x:282.1,y:145.35},4).wait(81));
	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(104).to({_off:false},4).to({_off:true,x:374.1,y:152.35},4).wait(77));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(108).to({_off:false},4).to({_off:true,x:515.1},4).wait(73));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(112).to({_off:false},4).to({_off:true,scaleX:0.0291,scaleY:0.0215,x:478,y:132},4).wait(69));

	// Слой_6
	this.instance_28 = new lib.сковородаpngкопия();
	this.instance_28.setTransform(211,53,0.3316,0.3772);
	this.instance_28._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(77).to({_off:false},0).wait(3).to({x:255,y:67},0).wait(3).to({x:345,y:82},0).wait(3).to({x:410,y:76},0).wait(103));

	// Символ_2
	this.instance_29 = new lib.Символ2("synched",0);
	this.instance_29.setTransform(612.55,283.2,1,1,0,0,0,30.9,31);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).to({rotation:53.9722,startPosition:3},3).to({regY:30.9,rotation:98.7948,x:612.6,y:283.25,startPosition:6},3).to({regY:31,rotation:150.0008,x:612.5,y:283.2,startPosition:9},3).to({regY:30.9,rotation:165.0017,y:283.25,startPosition:12},3).to({rotation:199.7029,x:612.45,startPosition:15},3).to({rotation:257.9595,y:283.15,startPosition:18},3).to({regY:31.1,rotation:320.562,x:612.6,startPosition:21},3).to({regY:31,rotation:360,x:612.55,y:283.2,startPosition:24},3).to({rotation:426.6905,y:284.25,startPosition:27},3).to({rotation:465.0002,x:612.5,y:283.2,startPosition:30},3).to({rotation:542.6858,x:612.55,y:283.15,startPosition:33},3).to({regY:31.1,rotation:616.9884,x:612.65,startPosition:36},3).to({rotation:690.0008,x:612.6,y:283.25,startPosition:39},3).to({regY:31,rotation:720,x:612.55,y:283.2,startPosition:42},3).to({regY:30.9,rotation:813.5107,x:612.6,startPosition:45},3).to({rotation:902.2378,x:612.45,y:283.25,startPosition:48},3).to({_off:true},1).wait(140));

	// Слой_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,0,0,0.2)").s().p("AlTBjQiNgpAAg6QAAg5CNgpQCNgpDGAAQDHAACNApQCNApAAA5QAAA6iNApQiNApjHAAQjGAAiNgpg");
	this.shape.setTransform(515.05,164.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,0,0,0.4)").s().p("AlTBjQiNgpAAg6QAAg5CNgpQCNgpDGAAQDHAACNApQCNApAAA5QAAA6iNApQiNApjHAAQjGAAiNgpg");
	this.shape_1.setTransform(515.05,164.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,0,0,0.498)").s().p("AlTBjQiNgpAAg6QAAg5CNgpQCNgpDGAAQDHAACNApQCNApAAA5QAAA6iNApQiNApjHAAQjGAAiNgpg");
	this.shape_2.setTransform(515.05,164.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,0,0,0.6)").s().p("AlTBjQiNgpAAg6QAAg5CNgpQCNgpDGAAQDHAACNApQCNApAAA5QAAA6iNApQiNApjHAAQjGAAiNgpg");
	this.shape_3.setTransform(515.05,164.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,0,0,0.698)").s().p("AlTBjQiNgpAAg6QAAg5CNgpQCNgpDGAAQDHAACNApQCNApAAA5QAAA6iNApQiNApjHAAQjGAAiNgpg");
	this.shape_4.setTransform(515.05,164.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,0,0,0.8)").s().p("AlTBjQiNgpAAg6QAAg5CNgpQCNgpDGAAQDHAACNApQCNApAAA5QAAA6iNApQiNApjHAAQjGAAiNgpg");
	this.shape_5.setTransform(515.05,164.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,0,0,0.898)").s().p("AlTBjQiNgpAAg6QAAg5CNgpQCNgpDGAAQDHAACNApQCNApAAA5QAAA6iNApQiNApjHAAQjGAAiNgpg");
	this.shape_6.setTransform(515.05,164.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FF0000").s().p("AlTBjQiNgpAAg6QAAg5CNgpQCNgpDGAAQDHAACNApQCNApAAA5QAAA6iNApQiNApjHAAQjGAAiNgpg");
	this.shape_7.setTransform(515.05,164.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},49).to({state:[{t:this.shape_1}]},4).to({state:[{t:this.shape_2}]},4).to({state:[{t:this.shape_3}]},4).to({state:[{t:this.shape_4}]},4).to({state:[{t:this.shape_5}]},4).to({state:[{t:this.shape_6}]},4).to({state:[{t:this.shape_7}]},4).wait(112));

	// Слой_1
	this.instance_30 = new lib.плита();
	this.instance_30.setTransform(358,24,0.4186,0.4655);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(77).to({y:25},0).wait(112));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(640,360,504.79999999999995,363.29999999999995);
// library properties:
lib.properties = {
	id: '135E138AE035DD47983A4B59CEA36EC6',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/котлета_.png?1664955220314", id:"котлета"},
		{src:"images/test100_atlas_1.png?1664955220280", id:"test100_atlas_1"},
		{src:"sounds/_1wav.mp3?1664955220314", id:"_1wav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['135E138AE035DD47983A4B59CEA36EC6'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;