const backgroundMusic = new Audio('/assets/bgm.wav');
const buildSound = new Audio('/assets/build.wav');
const missSound = new Audio('/assets/miss.wav');
const endSound = new Audio('/assets/end.wav');

backgroundMusic.loop = true;
backgroundMusic.play();

export { backgroundMusic, buildSound, missSound, endSound };
