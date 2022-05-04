//
//	ロード時
//
function body_OnLoad() {
 // 現在の年を取得してデフォルト入力
 var iYear = new Date().getFullYear();
 document.getElementById("tbx_Year").value = iYear;
 populateCalendars(iYear);
 document.getElementById("divTemplate").style.display = "none"; // 最後にテンプレートは消す
 return;
}
//
//	Enter 時
//
function tbx_Year_Enter(){
 if (event.keyCode == 13){
  var iYear = document.getElementById("tbx_Year").value;
  populateCalendars(iYear);
 }
 document.getElementById("divTemplate").style.display = "none"; // 最後にテンプレートは消す
 return;
}


//
//	表作成
//
function populateCalendars(iYear) {
 
 var divPrint = document.getElementById("divPrint");
 
 // 一旦画面上の印刷用 div 内を全てクリア
 while(divPrint.firstChild){
  divPrint.removeChild(divPrint.firstChild);
 }
 
 for(var iPage = 1; iPage <= 6; iPage++){
  var secNthPage = document.getElementById("secTemplate").cloneNode(true);
  secNthPage.id = "secPage" + iPage;
  secNthPage.childNodes[1].id = `secMonth${iPage*2-1}`;
  secNthPage.childNodes[3].id = `secMonth${iPage*2}`;
  // カレンダーに日付を記入
  fillCalendar(secNthPage.childNodes[1], iYear, iPage*2-1);
  fillCalendar(secNthPage.childNodes[3], iYear, iPage*2);
  // メモ欄を作成
  createMemoField(secNthPage.childNodes[1]);
  createMemoField(secNthPage.childNodes[3]);

  // ページセクションをアペンド
  divPrint.appendChild(secNthPage);
//  if(iPage%2==0 && iPage != 6){
//  }
 }
 return;
}

//
//	カレンダーに月、日付を記入する
//
function fillCalendar(secNthMonth, iYear, iMonth){

 // 月ヘッダの入力と位置合わせ
 // secNthMonth.childNodes[1] は h1。
 secNthMonth.childNodes[1].innerText = iMonth;
 secNthMonth.childNodes[1].style.marginTop = (7 + 7.3*(iMonth-1)) + "mm";
 
 var dFirst = new Date(iYear,iMonth-1,1);
 var dLast = (iMonth==12)? new Date(iYear+1,0,0): new Date(iYear,iMonth,0);
 // node に tbody を設定
 var tbCalendar = secNthMonth.childNodes[3].childNodes[3];
  
 var iDayNum = 1;
 for (var iRow = 1; iRow <= 6; iRow++){
  for (var iCol = 1; iCol <=7; iCol++){
   // 範囲に入っていたら日付カウントを入力、休日なら休日マークをつける
   if(dFirst.getDay() <= 7*(iRow - 1)+iCol-1 && 7*(iRow - 1)+iCol-1 <= dFirst.getDay()+dLast.getDate()-1){
    // 日付
    // ここは結構トリッキー。td や tr との間のホワイトスペースを子要素カウントしているのでこの式になる。
    tbCalendar.childNodes[2*iRow-1].childNodes[2*iCol-1].innerText = iDayNum;
    // 休日マーク
    if (iCol == 1 || iCol==7) {
     tbCalendar.childNodes[2*iRow-1].childNodes[2*iCol-1].className += " Holiday";
    }
    iDayNum++;
   }
  }
 }
 return;
}

//
//	メモフィールドの作成
//
function createMemoField(secNthMonth) {
 // node に tbody を設定
 var tbCalendar = secNthMonth.childNodes[3].childNodes[3];
 if (tbCalendar.childNodes[2*6-1].childNodes[1].innerText == "") {
  tbCalendar.childNodes[2*6-1].childNodes[1].innerText = "Memo";
  for (var iCol = 1; iCol <=6; iCol++){
   tbCalendar.childNodes[2*6-1].childNodes[2*iCol-1].className += " NoBorderR";
  }
  for (var iCol = 2; iCol <=7; iCol++){
   tbCalendar.childNodes[2*6-1].childNodes[2*iCol-1].className += " NoBorderL";
  }
 }
 return;
}
