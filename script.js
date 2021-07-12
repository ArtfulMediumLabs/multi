const creator = new URLSearchParams(window.location.search).get('creator')
const viewer = new URLSearchParams(window.location.search).get('viewer')

let playToggle = document.querySelector("#play-toggle");

function createPlayerPlusPanner(url, positionX, positionY, positionZ) {
    const panner = new Tone.Panner3D({
        panningModel: "HRTF",
        positionX,
        positionY,
        positionZ,
    }).toDestination();

    const player = new Tone.Player({
        url,
        loop: true,
    }).connect(panner).sync().start(0);

    return player
}

function createTonePlusPanner(freq, positionX, positionY, positionZ) {
    const panner = new Tone.Panner3D({
        panningModel: "HRTF",
        positionX,
        positionY,
        positionZ,
    }).toDestination();

    const osc = new Tone.Oscillator(freq, "sine").connect(panner);
    osc.connect(panner);

    return osc
}

function createNoisePlusPanner(type, positionX, positionY, positionZ) {
    const panner = new Tone.Panner3D({
        panningModel: "HRTF",
        positionX,
        positionY,
        positionZ,
    }).toDestination();

    const osc = new Tone.Noise(type).connect(panner);
    osc.connect(panner);

    return osc
}

const val = 2;
const source1 = createNoisePlusPanner("brown", -val, 0, val);
const source2 = createNoisePlusPanner("brown", val, 0, val);
const source3 = createNoisePlusPanner("brown", -val, 0, -val);
const source4 = createNoisePlusPanner("brown", val, 0, -val);
// const source1 = createTonePlusPanner(220, -val, 0, val);
// const source2 = createTonePlusPanner(220+2, val, 0, val);
// const source3 = createTonePlusPanner(220, -val, 0, -val);
// const source4 = createTonePlusPanner(220+2, val, 0, -val);
// const player1 = createPlayerPlusPanner("58808__syna-max__refrigerator-drone-loop.mp3", -val, 0, -val).toDestination();
// const player2 = createPlayerPlusPanner("58808__syna-max__refrigerator-drone-loop.mp3", val, 0, -val).toDestination();
// const player3 = createPlayerPlusPanner("58808__syna-max__refrigerator-drone-loop.mp3", val, 0, val).toDestination();
// const player4 = createPlayerPlusPanner("58808__syna-max__refrigerator-drone-loop.mp3", -val, 0, val).toDestination();

document.querySelector("#play-toggle").onclick = function () {
    Tone.start();
    if (Tone.Transport.state == "started") {
        Tone.Transport.stop()
        source1.stop()
        source2.stop()
        source3.stop()
        source4.stop()
    } else {
        source1.start()
        source2.start()
        source3.start()
        source4.start()
        Tone.Transport.start()
    }
}

document.getElementById("player1").addEventListener('input', (event) => {
    source1.volume.value = event.target.value;
});
document.getElementById("player2").addEventListener('input', (event) => {
    source2.volume.value = event.target.value;
});
document.getElementById("player3").addEventListener('input', (event) => {
    source3.volume.value = event.target.value;
});
document.getElementById("player4").addEventListener('input', (event) => {
    source4.volume.value = event.target.value;
});