var iNmuberOfQuestions = 3;
var iIndexOfElmOf1stNumber = 0;
var iIndexOfElmOf2ndNumber = 2;
var iDefaultNumberOfDigit = 4;
//
//	ロード時
//
function body_OnLoad() {
 // 現在の年を取得してデフォルト入力
 document.getElementById("tbx_NumberOfDigit").value = iDefaultNumberOfDigit;
 populateDrillQandA(iDefaultNumberOfDigit);
 return;
}
//
//	Enter 時
//
function tbx_NumberOfDigit_Enter(){
 if (event.keyCode == 13){
  var iNumberOfDigit = document.getElementById("tbx_NumberOfDigit").value;
  populateDrillQandA(iNumberOfDigit);
 }
 return;
}




// 紙面作成
//
function populateDrillQandA(iNumberOfDigit){
  //　初期化
  document.getElementById("secAnswerMultiplication").innerText="";
  document.getElementById("secAnswerDivision").innerText="";
  // メインフロー
  fillQuesionNumbers(iNumberOfDigit).then(
   // 成功 (resolved) フロー
   ()=>{
    // 答えを入れるフローはここから
    var putAnswersMultiplication = (elmOfOl)=>{
      if(elmOfOl.tagName == "LI"){
        document.getElementById("secAnswerMultiplication").innerText
        += Number(elmOfOl.childNodes[iIndexOfElmOf1stNumber].innerText)*Number(elmOfOl.childNodes[iIndexOfElmOf2ndNumber].innerText)
        + ", ";
      }
    };
    var putAnswersDivision = (elmOfOl)=>{
      if(elmOfOl.tagName == "LI"){
        document.getElementById("secAnswerDivision").innerText
        += Math.round(Number(elmOfOl.childNodes[iIndexOfElmOf1stNumber].innerText)/Number(elmOfOl.childNodes[iIndexOfElmOf2ndNumber].innerText)*10000)/10000
        + ", ";
      }
    };
    document.getElementById("olMultiplication").childNodes.forEach(putAnswersMultiplication);
    document.getElementById("olDivision").childNodes.forEach(putAnswersDivision);
   }
   ,
   // 失敗 (rejected) フロー
   ()=>{}
  );

  /* Promise */ function fillQuesionNumbers(iNumberOfDigit){
    return new Promise((resolveFillQnum, rejectFillQNum)=>{
      
      // ol の子アイテム (li を期待している) をぞれぞれ引数にとって処理する。
      // ol の子アイテムはブランクも含まれるので注意。
      var fillNumbers = (elmOfOl)=>{
        if(elmOfOl.tagName == "LI"){
          elmOfOl.childNodes[iIndexOfElmOf1stNumber].innerText = Math.floor(Math.random()*Math.pow(10,iNumberOfDigit));
          elmOfOl.childNodes[iIndexOfElmOf2ndNumber].innerText = Math.floor(Math.random()*Math.pow(10,iNumberOfDigit));
        }
      };
       
      // fillQuestionNumbers の本処理
      document.getElementById("olMultiplication").childNodes.forEach(fillNumbers);
      document.getElementById("olDivision").childNodes.forEach(fillNumbers);

      // ちゃんと上の本処理が終わってからここに来てくれるといいが……
      resolveFillQnum();
    });
  };
}
  // デバッグ用
//  document.getElementById("secBottom").innerText = olMultiplication.childNodes.length;

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
