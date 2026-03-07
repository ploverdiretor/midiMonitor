
const noteNum = [   'C-1','C#-1','D-1','D#-1','E-1','F-1','F#-1','G-1','G#-1','A-1','A#-1','B-1',
                    ' C0','C#0',' D0','D#0',' E0',' F0','F#0',' G0','G#0',' A0','A#0',' B0',
                    ' C1','C#1',' D1','D#1',' E1',' F1','F#1',' G1','G#1',' A1','A#1',' B1',
                    ' C2','C#2',' D2','D#2',' E2',' F2','F#2',' G2','G#2',' A2','A#2',' B2',
                    ' C3','C#3',' D3','D#3',' E3',' F3','F#3',' G3','G#3',' A3','A#3',' B3',
                    ' C4','C#4',' D4','D#4',' E4',' F4','F#4',' G4','G#4',' A4','A#4',' B4',
                    ' C5','C#5',' D5','D#5',' E5',' F5','F#5',' G5','G#5',' A5','A#5',' B5',
                    ' C6','C#6',' D6','D#6',' E6',' F6','F#6',' G6','G#6',' A6','A#6',' B6',
                    ' C7','C#7',' D7','D#7',' E7',' F7','F#7',' G7','G#7',' A7','A#7',' B7',
                    ' C8','C#8',' D8','D#8',' E8',' F8','F#8',' G8','G#8',' A8','A#8',' B8',
                    ' C9','C#9',' D9','D#9',' E9',' F9','F#9',' G9'];
const ccType = [    '','modulation','ブレスコントローラー','','フットコントローラー','ポルタメントタイム','データ入力 MSB','','バランスコントローラー','',
                    '','エクスプレッション','エフェクトコントローラー1','エフェクトコントローラー2','','','','','','',
                    '','','','','','','','','','',
                    '','','','モジュレーションホイール LSB','ブレスコントローラー LSB','','フットコントローラー LSB','ポルタメントタイム LSB','データ入力 MSB LSB','メインボリューム LSB',
                    'バランスコントローラー LSB','','パン LSB','エクスプレッション','エフェクトコントローラー1 LSB','エフェクトコントローラー2 LSB','','','','',
                    '','','','','','','','','','',
                    '','','','','サスティン','ポルタメント','ソステヌート','ソフトペダル','レガート・フットスイッチ','ホールド2',
                    '','','','','','','','','','',
                    '','','','','ポルタメントコントロール'];
const keyTable = [  27.5, 29.13523509488062, 30.867706328507758,
                    32.70319566257483, 34.64782887210901, 36.70809598967595, 38.890872965260115, 41.20344461410874,
                    43.653528929125486, 46.2493028389543, 48.99942949771866, 51.91308719749314, 55.0, 58.27047018976124, 61.735412657015516,
                    65.40639132514966, 69.29565774421802, 73.4161919793519, 77.78174593052023, 82.40688922821748,
                    87.30705785825097, 92.4986056779086, 97.99885899543732, 103.82617439498628, 110.0, 116.54094037952248, 123.47082531403103,
                    130.8127826502993, 138.59131548843604, 146.8323839587038, 155.56349186104046, 164.81377845643496,
                    174.61411571650194, 184.9972113558172, 195.99771799087463, 207.65234878997256, 220.0, 233.08188075904496, 246.94165062806206,
                    261.6255653005986, 277.1826309768721, 293.6647679174076, 311.1269837220809, 329.6275569128699,
                    349.2282314330039, 369.9944227116344, 391.99543598174927, 415.3046975799451, 440.0, 466.1637615180899, 493.8833012561241,
                    523.2511306011972, 554.3652619537442, 587.3295358348151, 622.2539674441618, 659.2551138257398,
                    698.4564628660078, 739.9888454232688, 783.9908719634985, 830.6093951598903, 880.0, 932.3275230361799, 987.7666025122483,
                    1046.5022612023945, 1108.7305239074883, 1174.6590716696303, 1244.5079348883237, 1318.5102276514797,
                    1396.9129257320155, 1479.9776908465376, 1567.981743926997, 1661.2187903197805, 1760.0, 1864.6550460723597, 1975.5332050244965,
                    2093.004522404789, 2217.4610478149766, 2349.3181433392606, 2489.0158697766474, 2637.0204553029594,
                    2793.825851464031, 2959.955381693075, 3135.963487853994, 3322.437580639561, 3520.0, 3729.3100921447194, 3951.066410048993,
                    4186.009044809578];
let midiNoteValue = 0
let voice = ['OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF']
let voiceEnv = ['OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF','OFF']
let voiceFreq = [440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440]
let voiceGain = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let vcaLevel = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
for(let i=0;i<16;i++){
  const index = 'voice'+i
  document.getElementById(index).innerHTML = voice[i]
  document.getElementById('env'+i+'val').innerHTML = 'OFF'
  document.getElementById('note'+i+'val').innerHTML = 'OFF'
}
/*--------------------------------------- MIDI Connection Status -------------------------------------------*/
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
  document.getElementById('midi-status').textContent = 'Web MIDI API is not supported in this browser.';
  document.getElementById('midi-status').style.color = 'red';
}

function onMIDISuccess(midiAccess) {
  const statusEl = document.getElementById('midi-status');
  statusEl.textContent = 'Connected. Waiting for input...';
  statusEl.style.color = 'green';

  // Get all input devices and loop through them
  const inputs = midiAccess.inputs.values();
  for (let input of inputs) {
    // Add a listener for the "midimessage" event to each input
    input.onmidimessage = handleMIDIMessage;
    console.log(`Connected to input: ${input.name}`);
  }
}

function onMIDIFailure(error) {
  document.getElementById('midi-status').textContent = `Failed to get MIDI access: ${error.message}`;
  document.getElementById('midi-status').style.color = 'red';
}
/*----------------------------------------------------------------------------------------------------------*/

/*---------------------------------------- MIDI Message Analyze --------------------------------------------*/
function handleMIDIMessage(event) {
  const data = event.data; // event.data is a Uint8Array [status byte, data1, data2]
  let messageType = ''
  for (let i=0;i<data.length;i++){
    messageType = messageType + 'data'+i+':0x'+data[i].toString(16).padStart(2,'0')+' '
  }
  messageType = messageType + ' '
  let midiText = ''
  const midiCh = data[0] & 0x0f
  const status = data[0]>>>4;
  switch(status){
    case 0x08:
      midiText = 'Note Off('+noteNum[data[1]]+') velo:'+data[2].toString(10).padStart(3,'0')
        for(let i=0;i<16;i++){
          if(voice[i]===data[1]){
            voiceEnv[i]='OFF'
            voiceGain[i]=0;
            vcaLevel[i]=0
            document.getElementById('env'+i+'val').innerHTML = 'OFF'
            document.getElementById('note'+i+'val').innerHTML = 'OFF'
            document.getElementById('voice'+i).innerHTML = voice[i] = 'OFF'
            Setup()
            SetupVCO()
            break;
          }
        }
      break
    case 0x09:
      midiNoteValue = parseInt(data[1])-21
      midiText = 'Note On ('+noteNum[data[1]]+') velo:'+data[2].toString(10).padStart(3,'0')+' freq:'+keyTable[midiNoteValue].toFixed(2)
      for(let i=0;i<16;i++){
        if(voiceEnv[i]==='OFF'){
          voiceEnv[i]='ON'
          voice[i] = data[1]
          document.getElementById('env'+i+'val').innerHTML = data[2]
          document.getElementById('note'+i+'val').innerHTML = noteNum[data[1]]
          document.getElementById('voice'+i).innerHTML = data[1]
          let midiNoteValue = parseInt(data[1])-21
          voiceFreq[i] = keyTable[midiNoteValue].toFixed(2);
          voiceGain[i]=1;
          vcaLevel[i]=1
          osc[i].frequency.value = voiceFreq[i];
          vco[i].frequency.value = voiceFreq[i];
          Setup()
          SetupWave(i);
          SetupVCO()
          break;
        }
      }
      break
    case 0x0a:
      break
    case 0x0b:
      midiText = 'Ch('+midiCh+')　CC:'+ccType[data[1]]+'　Value:'+data[2].toString(10).padStart(3,'0')
      break
    case 0x0c:
      midiText = 'Ch('+midiCh+')　Program Change:'+data[1].toString(10).padStart(3,'0')
      break
    case 0x0d:
      midiText = 'Ch('+midiCh+')　Channel Pressure:'+data[1].toString(10).padStart(3,'0')
      break
    case 0x0e:
      const bendVal = parseInt(data[2]<<7) + parseInt(data[1])-8192
      midiText = 'Ch('+midiCh+')　Pitch Wheel Change:'+ bendVal.toString(10)
      break
    case 0x0f:
      break
    default:
      break
  }
  logMessage(messageType+midiText)
}
/*----------------------------------------------------------------------------------------------------------*/

/*---------------------------------------- Display MIDI Message --------------------------------------------*/
function logMessage(message) {
  const log = document.getElementById('midi-log');
  const entry = document.createElement('div');
  entry.className = 'log-message';
  entry.textContent = message;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}
/*----------------------------------------------------------------------------------------------------------*/
