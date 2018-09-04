//中級用のquiz.js

//設定用変数
var id5 = "box5";	//計測結果の表を表示するタグのID
var id6 = "box6";	//クイズを表示するタグのID
var flagQ=0;//ファイルを読み込んだかどうかのフラグ
var txtq = [];
//初期化
var pcq = 0;//txtの何行目を読んでいるか
var worldq = null;

//ここから下はファイル読み込み用
if(window.File) {
	var selectq = document.getElementById('selectQUIZ');
    console.log(selectq);
    // ファイルが選択されたとき
    selectq.addEventListener('change', function(e) {        
	// 選択されたファイルの情報を取得
        var fileDataq = e.target.files[0];
        var readerq = new FileReader();
        // ファイル読み取りに失敗したとき
        readerq.onerror = function() {
            alert('ファイル読み取りに失敗しました')
        }
        // ファイル読み取りに成功したとき
        readerq.onload = function() {
			console.log("readerq.result:"+readerq.result); //QUIZデータ(string)
			txtq = readerq.result.split("\n");
			console.log("txtq[0]:"+txtq[0]);
			flagQ=1;
			//一行目読み込む
			if(txtq[pcq].charAt(0)=="◎"){
				//クイズモード
				console.log("◎入りました pcq:"+pcq);
				//◎が続くまで文章を表示
				writeQuiz(txtq[pcq]);
			}else if(txtq[pcq].charAt(0)=="●"){
				//回答モード
				console.log("●入りました pcq:"+pcq);
				//ラジオボタンの値によって表示内容を変更
				writeAnswer(txtq[pcq]);
			}else if(txtq[pcq].charAt(0)=="▲"||txtq[pcq].charAt(0)=="△"){
				//表モード
				console.log("△▲入りました pcq:"+pcq);
				//ラジオボタンの値によって表示内容を変更
				writeTFTable(txtq[pcq]);
			}
		}
        // ファイル読み取りを実行
        readerq.readAsText(fileDataq,"Shift-JIS");
    }, false);
}
//ファイル読み込みここまで

//テキスト
/*
var txt = new Array(num);
txtq[0] = "私はその人を常に先生と呼んでいた。";
txtq[1] = "だからここでもただ先生と書くだけで本名は打ち明けない。";
txtq[2] = "これは世間を憚かる遠慮というよりも、その方が私にとって自然だからである。";
txtq[3] = "私はその人の記憶を呼び起すごとに、すぐ「先生」といいたくなる。";
txtq[4] = "筆を執っても心持は同じ事である。";
txtq[5] = "よそよそしい頭文字などはとても使う気にならない。";
*/



onload = function() {
    if (worldq === null) {
	worldq = document.getElementById(id6);
	}
};




//進む戻るボタンで呼ぶ関数
function quizback(){
	console.log("quizback呼ばれましたが未実装です pcq:"+pcq);
}


function quizahead(){
	pcq++;//一行進める
	console.log("quizahead呼ばれました");
	if(flagQ==1) {
		if(pcq < txtq.length) {
			if(txtq[pcq].charAt(0)=="◎"){
				//クイズモード
				console.log("◎入りました pcq:"+pcq);
				//◎が続くまで文章を表示
				writeQuiz(txtq[pcq]);
			}else if(txtq[pcq].charAt(0)=="●"){
				//回答モード
				console.log("●入りました pcq:"+pcq);
				//ラジオボタンの値によって表示内容を変更
				writeAnswer(txtq[pcq]);
			}else if(txtq[pcq].charAt(0)=="▲"||txtq[pcq].charAt(0)=="△"){
				//表モード
				console.log("△▲入りました pcq:"+pcq);
				//ラジオボタンの値によって表示内容を変更
				writeTable(txtq[pcq]);
			}
		}else if(flagTXT==0){
			return;
		}else {
		    alert("終了です。");
		    return;
		}
    }
}


function writeTable(t) {
//	console.log("writeTable呼ばれましたが未実装です")
	console.log("writeTable入りました pcq:"+pcq);
	//行数取得
    if(t.charAt(0)=="▲"){//DF
		tnum=t.charAt(1);//DFtable番号
		t=t.slice(2);//「▲2DVD明細情報」から「▲2」を消去
		//「▲1DVD情報:データ項目」といった風に「:」で区切っている
		//「:」で分けて配列に入れる
		var DFTC = t.split(":");
		console.log("DFTC:"+DFTC);
		var DFrow = DFtable.rows.length;
		//DFの方の表に項目を追加
		//指定の行を削除してから追加
		//「行数DFtable.rows.length <=今入れたい表の行数tnum」の時は削除をスルー
		//指定された表に指定された情報を追記する関数tablechange()を実行
		DFtablechange(DFtable.rows.length,tnum,DFTC);
		/*
		$("#DFtable").append(
            $("<tr></tr>")
                .append($("<th></th>").text("'+DFTC[0]+'"))
                .append($("<td></td>").text("'+DFTC[1]+'"))
        );
		//このままだと表の何行目に追加みたいにはなってない
		//表がない場合=append
		//表がある場合=変更・更新
		*/
	}else if(t.charAt(0)=="△"){//TF
		tnum=t.charAt(1);//TFtable番号
		t=t.slice(2);//「▲2DVD明細情報」から「▲2」を消去
		//TFの方の表に項目を追加
		//「△1DVD登録:入力項目:出力項目:種類:FTR」といった風に「:」で区切っている
		//「:」で分けて配列に入れる
		var TFTC = t.split(":");
		console.log("TFTC:"+TFTC);
		var TFrow = TFtable.rows.length;
		//TFの方の表に項目を追加
		TFtablechange(TFtable.rows.length,tnum,TFTC);
		/*
		$("#TFtable").append(
            $("<tr></tr>")
                .append($("<th></th>").text("'+TFTC[0]+'"))
                .append($("<td></td>").text("'+TFTC[1]+'"))
                .append($("<td></td>").text("'+TFTC[2]+'"))
                .append($("<td></td>").text("'+TFTC[3]+'"))
                .append($("<td></td>").text("'+TFTC[4]+'"))
        );
		*/
	}
	//次の文章も▲or△→表に記載したい情報
	while(txtq[pcq+1].charAt(0)=="▲"||txtq[pcq+1].charAt(0)=="△"){
		console.log("次も▲or△でした pcq+1:"+pcq+1)
		pcq++;
		t=txtq[pcq];
		if(t.charAt(0)=="▲"){//DF
			tnum=t.charAt(1);//DFtable番号
			t=t.slice(2);//「▲2DVD明細情報」から「▲2」を消去
			var DFTC = t.split(":");
			console.log("DFTC:"+DFTC);
			var DFrow = DFtable.rows.length;
			DFtablechange(DFtable.rows.length,tnum,DFTC);
			
		}else if(t.charAt(0)=="△"){//TF
			tnum=t.charAt(1);//TFtable番号
			t=t.slice(2);//「▲2DVD明細情報」から「▲2」を消去
			var TFTC = t.split(":");
			console.log("TFTC:"+TFTC);
			var TFrow = TFtable.rows.length;
			TFtablechange(TFtable.rows.length,tnum,TFTC);
		}
	}
}
	


function DFtablechange(a,b,DFTC){
	if(a>=b){
		//b行を削除
		DFtable.deleteRow(b); 
	}
	//b行に要素を追加
	var row=DFtable.insertRow(b-1);
	var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    cell1.innerHTML = DFTC[0];
    cell2.innerHTML = DFTC[1];
}

function TFtablechange(a,b,TFTC){
	if(a>=b){
		//b行を削除
		TFtable.deleteRow(b); 
	}
	//b行に要素を追加
	var row=TFtable.insertRow(b-1);
	var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    var cell3 = row.insertCell(-1);
	var cell4 = row.insertCell(-1);
	var cell5 = row.insertCell(-1);
	cell1.innerHTML = TFTC[0];
    cell2.innerHTML = TFTC[1];
    cell3.innerHTML = TFTC[2];
    cell4.innerHTML = TFTC[3];
    cell5.innerHTML = TFTC[4];
}



function writeQuiz(t) {
	console.log("writeQuiz入りました pcq:"+pcq);
    t=t.slice(1);
	//次の文章も◎→クイズの文章
	while(txtq[pcq+1].charAt(0)=="◎"){
		pcq++;
		t+="<br>"+txtq[pcq].slice(1);
	}
	console.log("t:"+t);
	worldq=document.getElementById(id6);
	worldq.innerHTML = t;
	//選択肢としてラジオボタン表示
	radioON();
}

function writeAnswer(t) {
	console.log("writeAnswer入りました pcq:"+pcq);
    //ラジオボタンの値によって対処を変更
    var num = $('input[name="test"]:checked').val();
	console.log("ラジオボタンの値:"+num);
	if(num==1){
		t=t.slice(1);
		//冒頭が▽→同じ回答の文章
		console.log("txtq[pcq+1]:"+txtq[pcq+1]);
		while(txtq[pcq+1].charAt(0)=="▽"){
			pcq++;
			t+="<br>"+txtq[pcq].slice(1);
		}
		//後に続く二つの回答の先へpcqを進める必要がある
		console.log("Skip!! txtq[pcq+1]:"+txtq[pcq+1]);
		pcq++;//次の●へpcqを合わせる
		while(txtq[pcq+1].charAt(0)=="▽"){
			pcq++;
		}
		pcq++;//次の●へpcqを合わせる
		while(txtq[pcq+1].charAt(0)=="▽"){
			pcq++;
		}
		console.log("SkipFinish!! txtq[pcq]:"+txtq[pcq]);
	}else if(num==2){
	    //まず次の●まで文章を進める
		while(txtq[pcq+1].charAt(0)=="▽"){
			pcq++;
		}
		pcq++//前回の回答の文末まで来てるので一個進める
		console.log("SkipFinish!! txtq[pcq]:"+txtq[pcq]);
		t=txtq[pcq].slice(1);
		//冒頭が▽→同じ回答の文章
		while(txtq[pcq+1].charAt(0)=="▽"){
			pcq++;
			t+="<br>"+txtq[pcq].slice(1);
		}
		//回答3の先へpcqを進める
		pcq++;//次の●へpcqを合わせる
		while(txtq[pcq+1].charAt(0)=="▽"){
			pcq++;
		}
	}else if(num==3){
		//まず次の次の●まで文章を進める
		while(txtq[pcq+1].charAt(0)=="▽"){
			pcq++;
		}
		pcq++;//次の●へpcqを合わせる
		while(txtq[pcq+1].charAt(0)=="▽"){
			pcq++;
		}
		pcq++//前回の回答の文末まで来てるので一個進める
		console.log("SkipFinish!! txtq[pcq]:"+txtq[pcq]);
		t=txtq[pcq].slice(1);
		//冒頭が▽→同じ回答の文章
		while(txtq[pcq+1].charAt(0)=="▽"){
			pcq++;
			t+="<br>"+txtq[pcq].slice(1);
		}
	}
	console.log("t:"+t);
	worldq=document.getElementById(id6);
	worldq.innerHTML = t;
	//ラジオボタン非表示
	radioOFF();
}

