
  /*--------------------------オシレーター-------------------------*/
  const audioctx = new AudioContext();
  var osc = []
  var gain = []
  var vco = []
  var vca = []
  for (let i=0;i<16;i++){
    osc[i] = new OscillatorNode(audioctx);
    gain[i] = new GainNode(audioctx);
    vco[i] = new OscillatorNode(audioctx);
    vca[i] = new GainNode(audioctx);
  }
  const tablen = 8;
  const real = new Float32Array(tablen);
  const imag = new Float32Array(tablen);
  const vcaGain = new GainNode(audioctx);
  /*-----------------------------フィルター------------------------------*/
  var filter = []
  for (let i=0;i<16;i++){
  filter[i] = new BiquadFilterNode(audioctx,{frequency:5000, q:5});
  }
  /*-----------------------------音量------------------------------*/
  const master = new GainNode(audioctx);
  
  /*-----------------------------接続------------------------------*/
  for (let i=0;i<16;i++){
    osc[i].connect(gain[i]).connect(master)
    vco[i].connect(vca[i]).connect(filter[i]).connect(vcaGain).connect(master)
  }
  master.connect(audioctx.destination);
  /*-----------------------------初期化------------------------------*/
  audioctx.suspend();
  for (let i=0;i<16;i++){
    osc[i].start();
    vco[i].start();
  }
  document.getElementById("stop").addEventListener("click", ()=>{
    audioctx.suspend();
  });
  document.getElementById("play").addEventListener("click", ()=>{
      for (let i=0;i<16;i++){
          SetupWave(i);
      }
      audioctx.resume();
  });
  for(let i=1;i<8;++i){
    document.getElementById("imag"+i).addEventListener("input", ()=>{
      Setup()
      for (let j=0;j<16;j++){
        SetupWave(j);
      }
    });
  }
  document.getElementById("master").addEventListener("input", Setup);
  document.getElementById("vcaGain").addEventListener("input", SetupVCO);
  for (let i=0;i<16;i++){
    osc[i].frequency.value = voiceFreq[i];
    vco[i].frequency.value = voiceFreq[i];
  }
  document.getElementById("typeFilter").addEventListener("change", SetupVCO);
  document.getElementById("freqF").addEventListener("input", SetupVCO);
  document.getElementById("qF").addEventListener("input", SetupVCO);
  document.getElementById("gainF").addEventListener("input", SetupVCO);
  for (let j=0;j<16;j++){
    SetupWave(j);
  }
  Setup();
  SetupVCO();
  /*-----------------------------セットアップ------------------------------*/
  function Setup(){
    for (let i=0;i<16;i++){
      gain[i].gain.value = voiceGain[i];
    }
    master.gain.value = document.getElementById("masterval").innerHTML
      = document.getElementById("master").value;
  }
  function SetupVCO() {
    var type = document.getElementById("type").value;
    for (let i=0;i<16;i++){
      vca[i].gain.value = vcaLevel[i];
      vco[i].type = type;
    }
    vcaGain.gain.value = document.getElementById("vcaVal").innerHTML = document.getElementById("vcaGain").value;
    for (let i=0;i<16;i++){
      filter[i].type = ["lowpass","highpass","bandpass","lowshelf","highshelf","peaking","notch","allpass"][document.getElementById("typeFilter").selectedIndex];
      filter[i].frequency.value = document.getElementById("freqvalFilter").innerHTML = document.getElementById("freqF").value;
      filter[i].Q.value = document.getElementById("qvalFilter").innerHTML = document.getElementById("qF").value;
      filter[i].gain.value = document.getElementById("gainvalFilter").innerHTML = document.getElementById("gainF").value;
    }
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


