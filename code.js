var prevrowrule=1;
var sameprizerule=1;
var totalstickers=6050;
var freq=[];
for (i=0; i<7; i++){freq[i]=document.getElementById('freq'+(i+1)).value}
var share=[];
for (i=0; i<7; i++){share[i]=document.getElementById('share'+(i+1)).value}
var stickerP=[];
for (i=0; i<35; i++){stickerP[i]=document.getElementById(i+'p').value}
var stickerF=[];
for (i=0; i<35; i++){stickerF[i]=0}
var stickerPtotal=0;
var stickerFtotal=0;

function prevrows() {
  prevrowrule=(prevrowrule+1)%2;
  if(prevrowrule==1){
    document.getElementById('prevrowbutton').innerHTML="Do Need To Complete Previous Rows";
    document.getElementById('prevrowbutton').style.backgroundColor="#662200";
  }
  else{
    document.getElementById('prevrowbutton').innerHTML="Don't Need To Complete Previous Rows";
    document.getElementById('prevrowbutton').style.backgroundColor="#CC3300";
  }
}

function sameprize() {
  sameprizerule=(sameprizerule+1)%2;
  if(sameprizerule==0){
    document.getElementById('sameprizebutton').innerHTML="Can Win Same Row Multiple Times";
    document.getElementById('sameprizebutton').style.backgroundColor="#CC3300";
  }
  else{
    document.getElementById('sameprizebutton').innerHTML="Can't Win Same Row Multiple Times";
    document.getElementById('sameprizebutton').style.backgroundColor="#662200";
  }
}

function frequpdate() {for (i=0; i<7; i++){freq[i]=document.getElementById('freq'+(i+1)).value}}

function shareupdate() {for (i=0; i<7; i++){share[i]=document.getElementById('share'+(i+1)).value}}

function totalupdate() {totalstickers=document.getElementById('totalstickersfield').value; distributionupdate();}

function distributionupdate() {
  stickerPtotal=0;
  stickerFtotal=0;
  for (i=0; i<35; i++){stickerP[i]=document.getElementById(i+'p').value; stickerPtotal = parseInt(stickerPtotal)+parseInt(stickerP[i]);}
  if(stickerPtotal==0){stickerPtotal=1;} // stops NaN craziness
  for (i=0; i<35; i++){
    stickerF[i]=(Math.floor((totalstickers*stickerP[i])/stickerPtotal));
    document.getElementById(i+'f').innerHTML=stickerF[i];
    if(stickerF[i]!=0){document.getElementById(i+'f').style.color="#009900"; document.getElementById(i+'p').style.backgroundColor="#008300"; }
    else{document.getElementById(i+'f').style.color="white"; document.getElementById(i+'p').style.backgroundColor="#08188D"; }
    stickerFtotal = parseInt(stickerFtotal)+parseInt(stickerF[i]);
  }
  document.getElementById('leftovers').innerHTML=(totalstickers-stickerFtotal);
}

function variablesinfo() {
  document.getElementById('report').innerHTML="sameprizerule: "+sameprizerule+", prevrowrule: "+prevrowrule+", totalstickers: "+totalstickers+"<br>freq[6]: "+freq[6]+" share[6]: "+share[6]+", freq[5]: "+freq[5]+" share[5]: "+share[5]+"<br>freq[4]: "+freq[4]+" share[4]: "+share[4]+", freq[3]: "+freq[3]+" share[3]: "+share[3]+"<br>freq[2]: "+freq[2]+" share[2]: "+share[2]+", freq[1]: "+freq[1]+" share[1]: "+share[1]+"<br>freq[0]: "+freq[0]+" share[0]: "+share[0]+"<br>stickerP: "+stickerP+"<br>stickerF: "+stickerF+"<br>stickerPtotal: "+stickerPtotal;
  setTimeout(variablesinfo, 100);
}

function runsim() {
  document.getElementById('report').innerHTML="POOBUM";
}

variablesinfo();
distributionupdate();
