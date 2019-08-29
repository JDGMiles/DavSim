var totalstickers=document.getElementById('totalstickersfield').value;

var sameprizerule=1; // 1: "can't win same row multiple times", 0: "can ~"
var prevrowrule=1; // 1: "do need to complete previous rows to claim prize", 0: "don't ~"
var presentgreedrule=1; // 1: "can't win same present multiple times", 0: "can ~"

var inputfeed=location.search;

var onecustomertixno = parseInt(document.getElementById('onecustomertix').value);

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

var rowprizecost=[];
var presentprizecost=[];
prizecostupdate();

var stickerroll=[];
var customerstickers=[]; // the number of stickers each customer receives

const spreadpercent=30; // amount to set range for interpolation

var totalawardedstickers=0;

var wonstickers = []; // a temporary variable for tracking which stickers a customer has been given

var rowholeno = [];
var holefillno = 0;
var wonrow = [];
var lost = 0;

var wonpresent=[];

var prizerecord = [];
for (var i=0; i<7; i++){
  prizerecord[i] = [];
  for (var j=0; j<5; j++){prizerecord[i][j] = 0}
}

var presentrecord = [];
for (var i=0; i<7; i++){
  presentrecord[i] = [];
  for (var j=0; j<7; j++){presentrecord[i][j] = 0}
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

function presentgreed() {
  presentgreedrule=(presentgreedrule+1)%2;
  if(presentgreedrule==0){
    document.getElementById('presentgreedbutton').innerHTML="Can Win Same Present Multiple Times";
    document.getElementById('presentgreedbutton').style.backgroundColor="#CC3300";
  }
  else{
    document.getElementById('presentgreedbutton').innerHTML="Can't Win Same Present Multiple Times";
    document.getElementById('presentgreedbutton').style.backgroundColor="#662200";
  }
}

function prizecostupdate() {
  for (i=0; i<4; i++){rowprizecost[i]=parseInt(document.getElementById('row'+(i+1)+'prize').value)}
  for (i=0; i<7; i++){presentprizecost[i]=parseInt(document.getElementById('present'+(i+1)).value)}
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

function onecustomertixupdate() {
  onecustomertixno=parseInt(document.getElementById('onecustomertix').value);
}

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
  document.getElementById('report').innerHTML += "<br>rowprizecost: "+rowprizecost;
  document.getElementById('report').innerHTML += "<br>presentprizecost: "+presentprizecost;
  setTimeout(variablesinfo, 100);
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
  for (var i=0; i<7; i++){
    for (var j=0; j<7; j++){
      presentrecord[i][j] = 0
    }
  }
  customerstickers=[];
  makestickerroll();
  customerstickerallocation();
  // variablesinfo();
  for(var i=0; i<customerstickers.length; i++){
    isawinneryou(i);
  }
  insertreport();
}

function onecustomersim() {
  makestickerroll();
  document.getElementById('report').innerHTML = '';

  wonstickers = [];
  for (var j=0; j<35; j++){wonstickers[j]=0;}

  for (var j=0; j<onecustomertixno; j++){
    wonstickers[stickerroll.pop()]++;
    if(stickerroll.length==0){makestickerroll();}
  }

  for(var k=0; k<5; k++){wonrow[k]=0;}

  for(var k=1; k<5; k++){
    lost=0;
    while(!lost){
      rowholeno[k]=0;
      holefillno=0;
      for(var l=(34-(k*7)); l>(27-(k*7)); l--){
        if(stickerF[l]!=0){rowholeno[k]++;}
        if(wonstickers[l]!=0){holefillno++; wonstickers[l]--;}
      }
      if(rowholeno[k]==holefillno && rowholeno[k]!=0){
        if(!prevrowrule){wonrow[k]++;}
        else {
          if(k==1){wonrow[k]++;}
          else if(rowholeno[k-1]==0){wonrow[k]++;}
          else if(wonrow[k-1]!=0){wonrow[k]++;}
        }
      }
      else{lost=1;}
    }
  }

  document.getElementById('report').innerHTML += "Prizes won by a single customer who had "+onecustomertixno+" stickers:<br>";

  for(var k=4; k>0; k--){
    if(wonrow[k]!=0){
      if(sameprizerule){document.getElementById('report').innerHTML += "<br>Row "+(5-k)+" prizes: 1";}
      else{document.getElementById('report').innerHTML += "<br>Row "+(5-k)+" prizes: "+wonrow[k]+"";}
    }
  }

  for(var k=0; k<7; k++){wonpresent[k]=0;}

  if(wonstickers[28]!=0){
    if(presentgreedrule){document.getElementById('report').innerHTML += "<br>Present A: 1";}
    else{document.getElementById('report').innerHTML += "<br>Present A: "+wonstickers[28];}
  }

  if(wonstickers[29]!=0){
    if(presentgreedrule){document.getElementById('report').innerHTML += "<br>Present B: 1";}
    else{document.getElementById('report').innerHTML += "<br>Present A: "+wonstickers[29];}
  }

  if(wonstickers[30]!=0){
    if(presentgreedrule){document.getElementById('report').innerHTML += "<br>Present C: 1";}
    else{document.getElementById('report').innerHTML += "<br>Present A: "+wonstickers[30];}
  }

  if(wonstickers[31]!=0){
    if(presentgreedrule){document.getElementById('report').innerHTML += "<br>Present D: 1";}
    else{document.getElementById('report').innerHTML += "<br>Present A: "+wonstickers[31];}
  }

  if(wonstickers[32]!=0){
    if(presentgreedrule){document.getElementById('report').innerHTML += "<br>Present E: 1";}
    else{document.getElementById('report').innerHTML += "<br>Present A: "+wonstickers[32];}
  }

  if(wonstickers[33]!=0){
    if(presentgreedrule){document.getElementById('report').innerHTML += "<br>Present F: 1";}
    else{document.getElementById('report').innerHTML += "<br>Present A: "+wonstickers[33];}
  }

  if(wonstickers[34]!=0){
    if(presentgreedrule){document.getElementById('report').innerHTML += "<br>Present G: 1";}
    else{document.getElementById('report').innerHTML += "<br>Present A: "+wonstickers[34];}
  }

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
  customertier=[];
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

  for(var k=1; k<5; k++){
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
          if(k==1){wonrow[k]++;}
          else if(rowholeno[k-1]==0){wonrow[k]++;}
          else if(wonrow[k-1]!=0){wonrow[k]++;}
        }
      }
      else{lost=1;}
    }
  }

  for(var k=1; k<5; k++){
    if(wonrow[k]!=0){
      if(sameprizerule){prizerecord[customertier[cardindex]][k]++;}
      else{prizerecord[customertier[cardindex]][k]+=wonrow[k];}
    }
  }
  for(var k=0; k<7; k++){wonpresent[k]=0;}

  for(var k=0; k<7; k++){
    if(filledcard[28+k]!=0){
      if(presentgreedrule){wonpresent[k]=1;}
      else{wonpresent[k]=filledcard[28+k];}
    }
  }

  for(var k=0; k<7; k++){presentrecord[customertier[cardindex]][k]+=wonpresent[k];}

}

function insertreport() {
  document.getElementById('report').innerHTML = '';
  document.getElementById('report').innerHTML += "Tier 1: ";
  if(prizerecord[0][4]!=0){document.getElementById('report').innerHTML += "<br>Top prize winners: "+prizerecord[0][4]+" ";}
  if(prizerecord[0][3]!=0){document.getElementById('report').innerHTML += "<br>Second prize winners: "+prizerecord[0][3]+" ";}
  if(prizerecord[0][2]!=0){document.getElementById('report').innerHTML += "<br>Third prize winners: "+prizerecord[0][2]+" ";}
  if(prizerecord[0][1]!=0){document.getElementById('report').innerHTML += "<br>Fourth prize winners: "+prizerecord[0][1]+" ";}
  if(prizerecord[0][4]==0 && prizerecord[0][3]==0 && prizerecord[0][2]==0 && prizerecord[0][1]==0){document.getElementById('report').innerHTML += "<br>No row winners."}
  document.getElementById('report').innerHTML += "<br>Presents: A: "+presentrecord[0][0]+" B: "+presentrecord[0][1]+" C: "+presentrecord[0][2]+" D: "+presentrecord[0][3]+" E: "+presentrecord[0][4]+" F: "+presentrecord[0][5]+" G: "+presentrecord[0][6]+" ";
  document.getElementById('report').innerHTML += "<br>Tier Payout: "+(prizerecord[0][4]*rowprizecost[0]+prizerecord[0][3]*rowprizecost[1]+prizerecord[0][2]*rowprizecost[2]+prizerecord[0][1]*rowprizecost[3]+presentrecord[0][0]*presentprizecost[0]+presentrecord[0][1]*presentprizecost[1]+presentrecord[0][2]*presentprizecost[2]+presentrecord[0][3]*presentprizecost[3]+presentrecord[0][4]*presentprizecost[4]+presentrecord[0][5]*presentprizecost[5]+presentrecord[0][6]*presentprizecost[6]);
  for(i=1; i<7; i++){
    document.getElementById('report').innerHTML += "<br><br>Tier "+(i+1)+": ";
    if(prizerecord[i][4]!=0){document.getElementById('report').innerHTML += "<br>Top prize winners: "+prizerecord[i][4]+" ";}
    if(prizerecord[i][3]!=0){document.getElementById('report').innerHTML += "<br>Second prize winners: "+prizerecord[i][3]+" ";}
    if(prizerecord[i][2]!=0){document.getElementById('report').innerHTML += "<br>Third prize winners: "+prizerecord[i][2]+" ";}
    if(prizerecord[i][1]!=0){document.getElementById('report').innerHTML += "<br>Fourth prize winners: "+prizerecord[i][1]+" ";}
    if(prizerecord[i][4]==0 && prizerecord[i][3]==0 && prizerecord[i][2]==0 && prizerecord[i][1]==0){document.getElementById('report').innerHTML += "<br>No row winners."}
    document.getElementById('report').innerHTML += "<br>Presents: A: "+presentrecord[i][0]+" B: "+presentrecord[i][1]+" C: "+presentrecord[i][2]+" D: "+presentrecord[i][3]+" E: "+presentrecord[i][4]+" F: "+presentrecord[i][5]+" G: "+presentrecord[i][6]+" ";
    document.getElementById('report').innerHTML += "<br>Tier Payout: "+(prizerecord[i][4]*rowprizecost[0]+prizerecord[i][3]*rowprizecost[1]+prizerecord[i][2]*rowprizecost[2]+prizerecord[i][1]*rowprizecost[3]+presentrecord[i][0]*presentprizecost[0]+presentrecord[i][1]*presentprizecost[1]+presentrecord[i][2]*presentprizecost[2]+presentrecord[i][3]*presentprizecost[3]+presentrecord[i][4]*presentprizecost[4]+presentrecord[i][5]*presentprizecost[5]+presentrecord[i][6]*presentprizecost[6]);
  }
  var topprizesawarded=(prizerecord[0][4]+prizerecord[1][4]+prizerecord[2][4]+prizerecord[3][4]+prizerecord[4][4]+prizerecord[5][4]+prizerecord[6][4]);
  var secondprizesawarded=(prizerecord[0][3]+prizerecord[1][3]+prizerecord[2][3]+prizerecord[3][3]+prizerecord[4][3]+prizerecord[5][3]+prizerecord[6][3]);
  var thirdprizesawarded=(prizerecord[0][2]+prizerecord[1][2]+prizerecord[2][2]+prizerecord[3][2]+prizerecord[4][2]+prizerecord[5][2]+prizerecord[6][2]);
  var fourthprizesawarded=(prizerecord[0][1]+prizerecord[1][1]+prizerecord[2][1]+prizerecord[3][1]+prizerecord[4][1]+prizerecord[5][1]+prizerecord[6][1]);
  var presentAawarded=(presentrecord[0][0]+presentrecord[1][0]+presentrecord[2][0]+presentrecord[3][0]+presentrecord[4][0]+presentrecord[5][0]+presentrecord[6][0]);
  var presentBawarded=(presentrecord[0][1]+presentrecord[1][1]+presentrecord[2][1]+presentrecord[3][1]+presentrecord[4][1]+presentrecord[5][1]+presentrecord[6][1]);
  var presentCawarded=(presentrecord[0][2]+presentrecord[1][2]+presentrecord[2][2]+presentrecord[3][2]+presentrecord[4][2]+presentrecord[5][2]+presentrecord[6][2]);
  var presentDawarded=(presentrecord[0][3]+presentrecord[1][3]+presentrecord[2][3]+presentrecord[3][3]+presentrecord[4][3]+presentrecord[5][3]+presentrecord[6][3]);
  var presentEawarded=(presentrecord[0][4]+presentrecord[1][4]+presentrecord[2][4]+presentrecord[3][4]+presentrecord[4][4]+presentrecord[5][4]+presentrecord[6][4]);
  var presentFawarded=(presentrecord[0][5]+presentrecord[1][5]+presentrecord[2][5]+presentrecord[3][5]+presentrecord[4][5]+presentrecord[5][5]+presentrecord[6][5]);
  var presentGawarded=(presentrecord[0][6]+presentrecord[1][6]+presentrecord[2][6]+presentrecord[3][6]+presentrecord[4][6]+presentrecord[5][6]+presentrecord[6][6]);
  document.getElementById('report').innerHTML += "<br><br>Total Prizes Awarded: ";
  document.getElementById('report').innerHTML += "<br>Top prizes: "+topprizesawarded;
  document.getElementById('report').innerHTML += "<br>Second prizes: "+secondprizesawarded;
  document.getElementById('report').innerHTML += "<br>Third prizes: "+thirdprizesawarded;
  document.getElementById('report').innerHTML += "<br>Fourth prizes: "+fourthprizesawarded;
  document.getElementById('report').innerHTML += "<br>Present A: "+presentAawarded;
  document.getElementById('report').innerHTML += "<br>Present B: "+presentBawarded;
  document.getElementById('report').innerHTML += "<br>Present C: "+presentCawarded;
  document.getElementById('report').innerHTML += "<br>Present D: "+presentDawarded;
  document.getElementById('report').innerHTML += "<br>Present E: "+presentEawarded;
  document.getElementById('report').innerHTML += "<br>Present F: "+presentFawarded;
  document.getElementById('report').innerHTML += "<br>Present G: "+presentGawarded;
  document.getElementById('report').innerHTML += "<br><br>Total Overall Prize Cost:<br>"+(topprizesawarded*rowprizecost[0]+secondprizesawarded*rowprizecost[1]+thirdprizesawarded*rowprizecost[2]+fourthprizesawarded*rowprizecost[3]+presentAawarded*presentprizecost[0]+presentBawarded*presentprizecost[1]+presentCawarded*presentprizecost[2]+presentDawarded*presentprizecost[3]+presentEawarded*presentprizecost[4]+presentFawarded*presentprizecost[5]+presentGawarded*presentprizecost[6]);
}

function generatesavestatelink() {
  var outputurl="?";
  outputurl+=""+totalstickers+",";
  if(sameprizerule==1){outputurl+="0,";}
  else{outputurl+="1,";}
  if(prevrowrule==1){outputurl+="0,";}
  else{outputurl+="1,";}
  if(presentgreedrule==1){outputurl+="0,";}
  else{outputurl+="1,";}
  for(i=0; i<35; i++){outputurl+=''+document.getElementById(i+'p').value+',';}
  for(i=1; i<5; i++){outputurl+=''+document.getElementById('row'+i+'prize').value+',';}
  for(i=1; i<8; i++){outputurl+=''+document.getElementById('present'+i).value+',';}
  for(i=7; i>0; i--){outputurl+=''+document.getElementById('freq'+i).value+',';}
  for(i=7; i>0; i--){outputurl+=''+document.getElementById('share'+i).value+',';}
  window.location.href = outputurl;
}

if(inputfeed[0]=="?"){
	var parameters=inputfeed.split(",");
	document.getElementById('totalstickersfield').value=parameters[0].substring(1);
  totalupdate();
  if(parameters[1]==1){sameprize();}
  if(parameters[2]==1){prevrows();}
  if(parameters[3]==1){presentgreed();}
  for(i=0; i<35; i++){document.getElementById(i+'p').value=parameters[4+i];}
  distributionupdate();
  for(i=1; i<5; i++){document.getElementById('row'+i+'prize').value=parameters[38+i];}
  for(i=1; i<8; i++){document.getElementById('present'+i).value=parameters[42+i];}
  prizecostupdate();
  for(i=7; i>0; i--){document.getElementById('freq'+i).value=parameters[57-i];}
  for(i=7; i>0; i--){document.getElementById('share'+i).value=parameters[64-i];}
  frequpdate();
  shareupdate();
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
