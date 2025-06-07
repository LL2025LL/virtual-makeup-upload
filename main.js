let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let video = document.getElementById('video');
let currentMakeup = new Image();
currentMakeup.src = 'assets/face1.png'; // 默认妆容

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

function changeMakeup(file) {
  currentMakeup.src = 'assets/' + file;
}

function drawLoop() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(currentMakeup, 0, 0, canvas.width, canvas.height); // 叠加妆容图
  requestAnimationFrame(drawLoop);
}

function downloadResult() {
  const link = document.createElement('a');
  link.download = 'makeup_result.png';
  link.href = canvas.toDataURL();
  link.click();
}

startCamera().then(drawLoop);
