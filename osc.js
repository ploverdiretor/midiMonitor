window.addEventListener("load", async ()=>{
  /*--------------------------オシレーター-------------------------*/
  const audioctx = new AudioContext();
  var osc = []
  var gain = []
  for (let i=0;i<16;i++){
    osc[i] = new OscillatorNode(audioctx);
    gain[i] = new GainNode(audioctx);
  }
  const tablen = 8;
  const real = new Float32Array(tablen);
  const imag = new Float32Array(tablen);

  /*-----------------------------音量------------------------------*/
  const master = new GainNode(audioctx);

  /*-----------------------------接続------------------------------*/
  osc[0].connect(gain[0]).connect(master).connect(audioctx.destination);
  for (let i=1;i<16;i++){
    osc[i].connect(gain[i]).connect(master)
  }
  /*-----------------------------初期化------------------------------*/
  audioctx.suspend();
  for (let i=0;i<16;i++){
    osc[i].start();
    SetupWave(i);
  }
//  audioctx.resume();

  for(let i=1;i<8;++i){
    document.getElementById("imag"+i).addEventListener("input", ()=>{
      Setup()
      for (let j=0;j<16;j++){
        SetupWave(j);
      }
    });
  }
  document.getElementById("master").addEventListener("input", Setup);
/*  for (let i=0;i<16;i++){
    const textKey = 'key'+i;
    const textFreqVal='freq'+i+'val';
    osc[i].frequency.value = voiceFreq[i];
    document.getElementById(textFreqVal).innerHTML= voiceFreq[i];
  }*/
  Setup();
/*  for (let j=0;j<16;j++){
    SetupWave(j);
  }*/
  audioctx.resume();
  /*-----------------------------セットアップ------------------------------*/
  function Setup(){
    for (let i=0;i<16;i++){
      gain[i].gain.value = voiceGain[i];
    }
    master.gain.value = document.getElementById("masterval").innerHTML
      = document.getElementById("master").value;
  }
  /*-----------------------------ドローバー設定------------------------------*/
  function SetupWave(num){
    for(i = 0; i < tablen; i++) { // make Harmonics
      real[i] = 0;
      if(i!==0){
      imag[i] = parseFloat(document.getElementById("imag"+i+"val").innerHTML
        = document.getElementById("imag"+i).value);
      }else{
      imag[i] = 0;
      }
    }
    const waveTable = audioctx.createPeriodicWave(real, imag);	//create periodicWave
    osc[num].setPeriodicWave(waveTable);
  }

})