var soundManager = function(){
	var p = new Audio();
  var cp = new CPlayer();
  function makeFlashSound(freq){
    return jsfxr([0,0.0596,0.7064,0.0081,0.36,freq,,-0.0004,,,0.2157,-0.7315,,,0.0199,0.521,-0.2162,-0.0148,0.31,-0.0077,0.7212,,,0.5]);
  }
	var flashSounds = [
    makeFlashSound(0.18),
    makeFlashSound(0.2),
    makeFlashSound(0.1465),
    makeFlashSound(0.2599),
    makeFlashSound(0.14),
    makeFlashSound(0.1264)];
	
	var entrance =[jsfxr([0,,0.7797,0.0119,0.4994,0.1269,,-0.0403,-0.1117,,0.7201,0.3971,,0.0417,-0.0052,,-0.2124,-0.5039,0.7312,0.01,,0.008,-0.0007,0.5])];
	var fail = [jsfxr([0,0.162,0.5877,0.1306,0.0162,0.174,,0.0667,-0.0124,0.8225,,0.0288,0.3508,,-0.9339,0.5889,-0.2865,-0.0057,0.6608,-0.0142,0.4854,0.1261,0.0351,0.5])];
	var startHover = [jsfxr([2,0.1987,0.01,0.1879,0.0546,0.5352,,0.001,-0.0335,0.0945,0.7083,-0.5801,,0.2778,0.0232,,-0.89,-0.1085,1,0.103,0.6283,0.0205,0.0992,0.5])];
	var ex1 = [jsfxr([3,,0.8322,0.0008,0.1136,0.5007,,-0.0406,0.0129,0.5741,0.0328,-0.6105,0.4488,0.1968,-0.0012,,0.3845,0.1591,0.0584,0.6495,0.0575,0.0154,0.0053,0.5])]; 
	var ex2 = [jsfxr([3,0.0046,0.6902,0.425,0.6979,0.8763,,-0.6451,-0.0001,0.2544,,-0.3907,0.9039,,-0.0802,0.5166,-0.0351,0.3129,0.6215,0.0915,,0.0011,0.034,0.5])]; 
	var gameOver = [jsfxr([1,0.3132,0.3794,0.1442,0.7257,0.5797,,0.0623,-0.1481,0.3722,,-0.6773,,0.7766,-0.3999,,-0.002,0.6031,0.9723,-0.0185,0.4156,0.0439,-0.4949,0.5])];
	var story = [jsfxr([0,0.7909,0.01,0.2248,0.8564,0.5019,,0.0552,-0.0023,,0.4751,0.3358,-0.7351,0.467,-0.3839,0.6577,0.0969,-0.5708,0.7606,-0.0001,,0.3454,0.027,0.5])];
	var song = {
      songData: [
        { // Instrument 0
          i: [
          1, // OSC1_WAVEFORM
          192, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          1, // OSC2_WAVEFORM
          191, // OSC2_VOL
          116, // OSC2_SEMI
          9, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          6, // ENV_ATTACK
          22, // ENV_SUSTAIN
          34, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          69, // LFO_AMT
          3, // LFO_FREQ
          1, // LFO_FX_FREQ
          1, // FX_FILTER
          23, // FX_FREQ
          167, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          77, // FX_PAN_AMT
          6, // FX_PAN_FREQ
          25, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [1,1,1],
          // Columns
          c: [
            {n: [159,158,152,161,152,156,158,147,149,151,151,151,152,158,159,147,161,158,151,156,152,159,147,161,158,152,156,147],
             f: []}
          ]
        },
        { // Instrument 1
          i: [
          2, // OSC1_WAVEFORM
          100, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          3, // OSC2_WAVEFORM
          201, // OSC2_VOL
          128, // OSC2_SEMI
          0, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          5, // ENV_ATTACK
          6, // ENV_SUSTAIN
          58, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          195, // LFO_AMT
          6, // LFO_FREQ
          1, // LFO_FX_FREQ
          2, // FX_FILTER
          135, // FX_FREQ
          0, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          147, // FX_PAN_AMT
          6, // FX_PAN_FREQ
          121, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [],
          // Columns
          c: [
          ]
        },
        { // Instrument 2
          i: [
          2, // OSC1_WAVEFORM
          100, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          3, // OSC2_WAVEFORM
          201, // OSC2_VOL
          128, // OSC2_SEMI
          0, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          5, // ENV_ATTACK
          6, // ENV_SUSTAIN
          58, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          195, // LFO_AMT
          6, // LFO_FREQ
          1, // LFO_FX_FREQ
          2, // FX_FILTER
          135, // FX_FREQ
          0, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          147, // FX_PAN_AMT
          6, // FX_PAN_FREQ
          121, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [],
          // Columns
          c: [
          ]
        },
        { // Instrument 3
          i: [
          2, // OSC1_WAVEFORM
          100, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          3, // OSC2_WAVEFORM
          201, // OSC2_VOL
          128, // OSC2_SEMI
          0, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          5, // ENV_ATTACK
          6, // ENV_SUSTAIN
          58, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          195, // LFO_AMT
          6, // LFO_FREQ
          1, // LFO_FX_FREQ
          2, // FX_FILTER
          135, // FX_FREQ
          0, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          147, // FX_PAN_AMT
          6, // FX_PAN_FREQ
          121, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [],
          // Columns
          c: [
          ]
        },
        { // Instrument 4
          i: [
          2, // OSC1_WAVEFORM
          100, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          3, // OSC2_WAVEFORM
          201, // OSC2_VOL
          128, // OSC2_SEMI
          0, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          5, // ENV_ATTACK
          6, // ENV_SUSTAIN
          58, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          195, // LFO_AMT
          6, // LFO_FREQ
          1, // LFO_FX_FREQ
          2, // FX_FILTER
          135, // FX_FREQ
          0, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          147, // FX_PAN_AMT
          6, // FX_PAN_FREQ
          121, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [],
          // Columns
          c: [
          ]
        },
        { // Instrument 5
          i: [
          2, // OSC1_WAVEFORM
          100, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          3, // OSC2_WAVEFORM
          201, // OSC2_VOL
          128, // OSC2_SEMI
          0, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          5, // ENV_ATTACK
          6, // ENV_SUSTAIN
          58, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          195, // LFO_AMT
          6, // LFO_FREQ
          1, // LFO_FX_FREQ
          2, // FX_FILTER
          135, // FX_FREQ
          0, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          147, // FX_PAN_AMT
          6, // FX_PAN_FREQ
          121, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [],
          // Columns
          c: [
          ]
        },
        { // Instrument 6
          i: [
          2, // OSC1_WAVEFORM
          100, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          3, // OSC2_WAVEFORM
          201, // OSC2_VOL
          128, // OSC2_SEMI
          0, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          5, // ENV_ATTACK
          6, // ENV_SUSTAIN
          58, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          195, // LFO_AMT
          6, // LFO_FREQ
          1, // LFO_FX_FREQ
          2, // FX_FILTER
          135, // FX_FREQ
          0, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          147, // FX_PAN_AMT
          6, // FX_PAN_FREQ
          121, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [],
          // Columns
          c: [
          ]
        },
        { // Instrument 7
          i: [
          2, // OSC1_WAVEFORM
          100, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          3, // OSC2_WAVEFORM
          201, // OSC2_VOL
          128, // OSC2_SEMI
          0, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          5, // ENV_ATTACK
          6, // ENV_SUSTAIN
          58, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          195, // LFO_AMT
          6, // LFO_FREQ
          1, // LFO_FX_FREQ
          2, // FX_FILTER
          135, // FX_FREQ
          0, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          147, // FX_PAN_AMT
          6, // FX_PAN_FREQ
          121, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [],
          // Columns
          c: [
          ]
        }
      ],
      rowLen: 5513,   // In sample lengths
      patternLen: 32,  // Rows per pattern
      endPattern: 4  // End pattern
    };
    
    var done = 0;
    cp.init(song);
    while(done = cp.generate()){
      if(done >= 1)
        break;
      // wait zzz...
    }
    var bg = new Audio(URL.createObjectURL(new Blob([cp.createWave()], {type: "audio/wav"})));
    bg.volume = 0.3;
    bg.loop = true;
    
    var playBg = function(){
      bg.play();  
    };
    
    var stopBg = function(){
       bg.pause();
    };
	
	var playFlashSound = function(index){
		p.src = flashSounds[index];
		p.play();
	};
	
	var playEntrance = function(){
		p.src = entrance;
		p.play();	
	};
	
	var playFail = function(){
		p.src = fail;
		p.play();	
	};
	
	var playStartHover = function(){
		p.src = startHover;
		p.play();	
	};
	
	var playExplosion = function(){
		p.src = ex1;
		p.play();
		p.onended = function(){
			p.src = ex2;
			p.play()
			p.onended = null;	
		};
	};
	
	var playGameOver = function(){
		p.src = gameOver;
		p.play();
	};
	
	var playStory = function(){
		p.src = story;
		p.play();	
	};
	
	return {
		playGameOver: playGameOver,
		playFlashSound: playFlashSound,
		playEntrance: playEntrance,
		playFail: playFail,
		playStartHover: playStartHover,
		playExplosion: playExplosion,
		playStory: playStory,
    playBg: playBg,
    stopBg: stopBg
	};
}();