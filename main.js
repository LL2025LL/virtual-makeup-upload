let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let upload = document.getElementById('upload');
let img = new Image();
let makeup = new Image();
makeup.src = 'face1.png';

upload.addEventListener('change', function(e) {
  let reader = new FileReader();
  reader.onload = function(event) {
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.drawImage(makeup, 0, 0, img.width, img.height);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
});

function changeMakeup(file) {
  makeup.src = file;
  if (img.src) {
    makeup.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.drawImage(makeup, 0, 0, img.width, img.height);
    }
  }
}

function downloadResult() {
  let link = document.createElement('a');
  link.download = 'makeup_result.png';
  link.href = canvas.toDataURL();
  link.click();
}
