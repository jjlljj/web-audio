var play = new Nexus.Toggle('#play');
var density = new Nexus.Slider('#density');

synth= new Tone.Oscillator(0, 'triangle').start();
volume = new Tone.Volume(-Infinity);
delayGen = new Tone.FeedbackDelay(0.2,0.7);

synth.chain(delayGen, volume, Tone.Master);

density.min = 0;
density.max = 0.7;
density.on('change', function(val) {
  delayGen.wet.value = val;
})

density.value = 0.4;

$('.start').on('click', function() {
  volume.volume.cancelScheduledValues();
  var level = -20 ;
  volume.volume.rampTo(level, 2);
})

$('.stop').on('click', function() {
  volume.volume.cancelScheduledValues();
  var level = -Infinity ;
  volume.volume.rampTo(level, 3);
})

var sequence = new Nexus.Sequence([1,4,1,4,2,5,1,3,6,3,6,2,5,1,5,2,5]);

var beat = new Nexus.Interval(300, function(e) {
  synth.frequency.value = Nexus.note(sequence.next(), -1);
});

beat.start();