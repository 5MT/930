var iNmuberOfQuestions = 3;
var iIndexOfElmOf1stNumber = 0;
var iIndexOfElmOf2ndNumber = 2;
var iDefaultNumberOfDigit = 6;
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
  document.getElementById("secBottom").innerText="Answer : ";
  
  var fillNumbers = (elmOfOl, iIndex)=>{
   var iNum1;
   var iNum2;
   if(elmOfOl.tagName == "LI"){
    iIndex = (iIndex+1)/2
    // まず二つの数値を生成
    iNum1 = Math.floor(Math.random()*Math.pow(10,iNumberOfDigit));
    iNum2 = Math.floor(Math.random()*Math.pow(10,iNumberOfDigit));
    // 問題の式を表示
    elmOfOl.childNodes[0].innerText = iNum1 + " ÷ " + iNum2;
    // 回答打ち出し
    document.getElementById("secBottom").innerText += "    (" + iIndex + ") " + (Math.round(iNum1/iNum2*1000)/1000).toFixed(3);
   }
  };
       
  // fillQuestionNumbers の本処理
  document.getElementById("olDivisionQuestions").childNodes.forEach(fillNumbers);
}
  // デバッグ用
//  document.getElementById("secBottom").innerText = olMultiplication.childNodes.length;

