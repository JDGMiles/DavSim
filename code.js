var totalstickers=document.getElementById('totalstickersfield').value;

var sameprizerule=1; // 1: "can't win same row multiple times", 0: "can ~"
var prevrowrule=1; // 1: "do need to complete previous rows to claim prize", 0: "don't ~"

var freq=[]; // number of customers in each tier
var freqtotal=0;
frequpdate();

var share=[]; // share of total stickers in each tier, as decimal
var sharetotal=0;
shareupdate();

var stickerP=[]; // print run shares for the 35 sticker types
var stickerF=[]; // print run frequencies for the 35 sticker types
var stickerPtotal=0;
var stickerFtotal=0;
distributionupdate();

var stickerroll=[];
var customerstickers=[]; // the number of stickers each customer receives

const spreadpercent=20; // amount to set range for interpolation

var totalawardedstickers=0;

var wonstickers = []; // a temporary variable for tracking which stickers a customer has been given

var rowholeno = [];
var holefillno = 0;
var wonrow = [];
var lost = 0;

var prizerecord = [];
for (var i=0; i<7; i++){
  prizerecord[i] = [];
  for (var j=0; j<5; j++){prizerecord[i][j] = 0}
}

var customertier = [];

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

function frequpdate() {
  for (i=0; i<7; i++){freq[i]=parseInt(document.getElementById('freq'+(i+1)).value)}
  freqtotal=0;
  for (i=0; i<7; i++){freqtotal+=freq[i]}
}

function shareupdate() {
  for (i=0; i<7; i++){share[i]=parseInt(document.getElementById('share'+(i+1)).value)}
  sharetotal=0;
  for (i=0; i<7; i++){sharetotal+=share[i]}
  for (i=0; i<7; i++){share[i]=share[i]/sharetotal}
}

function totalupdate() {totalstickers=document.getElementById('totalstickersfield').value; distributionupdate();}

function distributionupdate() {

  stickerPtotal=0;
  for (i=0; i<35; i++){
    stickerP[i]=parseInt(document.getElementById(i+'p').value);
    stickerPtotal+=stickerP[i];
  }

  if(stickerPtotal==0){stickerPtotal=1;} // stops NaN craziness

  stickerFtotal=0;
  for (i=0; i<35; i++){
    stickerF[i]=Math.floor( totalstickers*stickerP[i]/stickerPtotal );
    document.getElementById(i+'f').innerHTML=stickerF[i];
    if(stickerF[i]!=0) {document.getElementById(i+'f').style.color="#009900"; document.getElementById(i+'p').style.backgroundColor="#008300";}
    else {document.getElementById(i+'f').style.color="white"; document.getElementById(i+'p').style.backgroundColor="#08188D";}
    stickerFtotal+=stickerF[i];
  }
  document.getElementById('leftovers').innerHTML = totalstickers - stickerFtotal;
}

function variablesinfo() {
  document.getElementById('report').innerHTML = '';
  document.getElementById('report').innerHTML += "sameprizerule: "+sameprizerule;
  document.getElementById('report').innerHTML += "<br>prevrowrule: "+prevrowrule;
  document.getElementById('report').innerHTML += "<br>totalstickers: "+totalstickers;
  document.getElementById('report').innerHTML += "<br>freq[6]: "+freq[6]+" // share[6]: "+share[6];
  document.getElementById('report').innerHTML += "<br>freq[6]: "+freq[5]+" // share[5]: "+share[5];
  document.getElementById('report').innerHTML += "<br>freq[6]: "+freq[4]+" // share[4]: "+share[4];
  document.getElementById('report').innerHTML += "<br>freq[6]: "+freq[3]+" // share[3]: "+share[3];
  document.getElementById('report').innerHTML += "<br>freq[6]: "+freq[2]+" // share[2]: "+share[2];
  document.getElementById('report').innerHTML += "<br>freq[6]: "+freq[1]+" // share[1]: "+share[1];
  document.getElementById('report').innerHTML += "<br>freq[6]: "+freq[0]+" // share[0]: "+share[0];
  document.getElementById('report').innerHTML += "<br>freqtotal: "+freqtotal;
  document.getElementById('report').innerHTML += "<br>sharetotal: "+sharetotal;
  document.getElementById('report').innerHTML += "<br>stickerP: "+stickerP;
  document.getElementById('report').innerHTML += "<br>stickerF: "+stickerF;
  document.getElementById('report').innerHTML += "<br>stickerPtotal: "+stickerPtotal;
//  document.getElementById('report').innerHTML += "<br>stickerroll: "+stickerroll;
  document.getElementById('report').innerHTML += "<br>customerstickers: "+customerstickers;
  document.getElementById('report').innerHTML += "<br>totalawardedstickers: "+totalawardedstickers;
//  setTimeout(variablesinfo, 100);
}

function splashsim(){
  document.getElementById('report').innerHTML = '<span style=\'font-size:60px\'>Calculating...</span>';
  setTimeout(runsim, 200);
}

function runsim() {
  for (var i=0; i<7; i++){
    for (var j=0; j<5; j++){
      prizerecord[i][j] = 0
    }
  }
  customerstickers=[];
  makestickerroll();
  customerstickerallocation();
  variablesinfo();
  for(var i=0; i<customerstickers.length; i++){
    isawinneryou(i);
  }
  insertreport();
}

function makestickerroll() {
  var placeinroll=0;
  for(var i=0; i<35; i++) {
    for(var j=0; j<stickerF[i]; j++){stickerroll[placeinroll]=i; placeinroll++;}
  }
  stickerroll=shuffle(stickerroll);
}

function customerstickerallocation() {
  var stickerspercustomer;
  var adjustedallocation;
  totalawardedstickers = 0;
  for(i=0; i<7; i++){
    if(freq[i]!=0){stickerspercustomer = totalstickers*share[i]/freq[i];}
    else{stickerspercustomer=0;}
    for(j=0; j<freq[i]; j++){
      customertier.push(i);
      if(freq[i]!=1){adjustedallocation = ( (1-(spreadpercent/100)) * stickerspercustomer ) + (((spreadpercent/100)*stickerspercustomer)/((freq[i]-1)/2))*j;} // straight line from (first person in tier, average allocation - adjustment %) to (last person in tier, average allocation + adjustment %)
      else{adjustedallocation=stickerspercustomer};
      customerstickers.push(Math.floor(adjustedallocation+0.5));
      totalawardedstickers += Math.floor(adjustedallocation+0.5);
    }
  }
}

function isawinneryou(customerindex) {
  wonstickers = [];
  for (var j=0; j<35; j++){wonstickers[j]=0;}

  for (var j=0; j<customerstickers[customerindex]; j++){
    wonstickers[stickerroll.pop()]++;
    if(stickerroll.length==0){makestickerroll();}
  }
//  document.getElementById('report').innerHTML += "<br>wonstickers: "+wonstickers;
//  document.getElementById('report').innerHTML += "<br>customertier: "+customertier[customerindex];
  whatdoiwin(wonstickers, customerindex);
}

function whatdoiwin(filledcard, cardindex) {
  for(var k=0; k<5; k++){wonrow[k]=0;}
  for(var k=0; k<5; k++){
    lost=0;
    while(!lost){
      rowholeno[k]=0;
      holefillno=0;
      for(var l=(34-(k*7)); l>(27-(k*7)); l--){
        if(stickerF[l]!=0){rowholeno[k]++;}
        if(filledcard[l]!=0){holefillno++; filledcard[l]--;}
      }
      if(rowholeno[k]==holefillno && rowholeno[k]!=0){
        if(!prevrowrule){wonrow[k]++;}
        else {
          if(k==0){wonrow[k]++;}
          else if(rowholeno[k-1]==0){wonrow[k]++;}
          else if(wonrow[k-1]!=0){wonrow[k]++;}
        }
      }
      else{lost=1;}
    }
  }
//  document.getElementById('report').innerHTML += "<br>wonrow: "+wonrow;

  for(var k=0; k<5; k++){
    if(wonrow[k]!=0){
      prizerecord[customertier[cardindex]][k]++;
    }
  }
}

function insertreport() {
  document.getElementById('report').innerHTML = '';
  document.getElementById('report').innerHTML += "Tier 1: ";
  if(prizerecord[0][4]!=0){document.getElementById('report').innerHTML += "<br>Top prize winners: "+prizerecord[0][4]+" ";}
  if(prizerecord[0][3]!=0){document.getElementById('report').innerHTML += "<br>Second prize winners: "+prizerecord[0][3]+" ";}
  if(prizerecord[0][2]!=0){document.getElementById('report').innerHTML += "<br>Third prize winners: "+prizerecord[0][2]+" ";}
  if(prizerecord[0][1]!=0){document.getElementById('report').innerHTML += "<br>Fourth prize winners: "+prizerecord[0][1]+" ";}
  if(prizerecord[0][0]!=0){document.getElementById('report').innerHTML += "<br>Fifth prize winners: "+prizerecord[0][0]+" ";}
  if(prizerecord[0][4]==0 && prizerecord[0][3]==0 && prizerecord[0][2]==0 && prizerecord[0][1]==0 && prizerecord[0][0]==0){document.getElementById('report').innerHTML += "<br>No winners."}
  for(i=1; i<7; i++){
    document.getElementById('report').innerHTML += "<br><br>Tier "+(i+1)+": ";
    if(prizerecord[i][4]!=0){document.getElementById('report').innerHTML += "<br>Top prize winners: "+prizerecord[i][4]+" ";}
    if(prizerecord[i][3]!=0){document.getElementById('report').innerHTML += "<br>Second prize winners: "+prizerecord[i][3]+" ";}
    if(prizerecord[i][2]!=0){document.getElementById('report').innerHTML += "<br>Third prize winners: "+prizerecord[i][2]+" ";}
    if(prizerecord[i][1]!=0){document.getElementById('report').innerHTML += "<br>Fourth prize winners: "+prizerecord[i][1]+" ";}
    if(prizerecord[i][0]!=0){document.getElementById('report').innerHTML += "<br>Fifth prize winners: "+prizerecord[i][0]+" ";}
    if(prizerecord[i][4]==0 && prizerecord[i][3]==0 && prizerecord[i][2]==0 && prizerecord[i][1]==0 && prizerecord[i][0]==0){document.getElementById('report').innerHTML += "<br>No winners."}
  }
}


function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
