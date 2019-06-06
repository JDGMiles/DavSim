var stickercount=[];
for (i=0; i<35; i++){stickercount[i]=0;}

var stickerprobabilities=[6, 6, 6, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 6, 3, 6, 6, 6, 6, 6, 2, 6, 6, 6, 2, 6, 6, 6, 6, 2, 6, 6, 6, 1];

var prizecount=[];
for (i=0; i<5; i++){prizecount[i]=0;}

var stickerreference=[];

for (i=0; i<stickerprobabilities.length; i++){
  for (j=0; j<stickerprobabilities[i]; j++){stickerreference.push(i);}
}

var takentix=0;

function takesticker() {
  takentix++;
  var n=stickerreference[Math.floor(Math.random()*stickerreference.length)];
  stickercount[n]++;
  for (i=0; i<35; i++){document.getElementById(i+1).innerHTML=stickercount[i]; document.getElementById(i+1).style.color="white";}
  document.getElementById(n+1).style.color="red";
  for (i=0; i<5; i++){prizecount[i]=Math.min(stickercount[7*i], stickercount[7*i+1], stickercount[7*i+2], stickercount[7*i+3], stickercount[7*i+4], stickercount[7*i+5], stickercount[7*i+6]);}
  for (i=0; i<5; i++){document.getElementById("P"+(i+1)).innerHTML=prizecount[i];}
  document.getElementById('tix').innerHTML="Taken Stickers: "+takentix;
}

function reset() {
  for (i=0; i<35; i++){stickercount[i]=0;}
  for (i=0; i<35; i++){document.getElementById(i+1).innerHTML=stickercount[i]; document.getElementById(i+1).style.color="white";}
  for (i=0; i<5; i++){prizecount[i]=0;}
  for (i=0; i<5; i++){document.getElementById("P"+(i+1)).innerHTML=prizecount[i];}
  takentix=0;
  document.getElementById('tix').innerHTML="Taken Stickers: "+takentix;
}
