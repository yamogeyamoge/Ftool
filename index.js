//設定用変数
var fps = 8;		//fps
var msgsp = 100;	//メッセージスピード
var id = "box1";	//図表を表示するタグのID
var id2 = "box2";	//テキストを表示するタグのID
var id3 = "box3";	//メモを表示するタグのID
var flagTXT=0;//ファイルを読み込んだかどうかのフラグ
var txt = [];
var MEMO="";
//初期化
var pc = 0;//txtの何行目を読んでいるか
var world = null;

//ここから下はファイル読み込み用
if(window.File) {
	var select = document.getElementById('selectTXT');
    console.log(select);
    // ファイルが選択されたとき
    select.addEventListener('change', function(e) {        
	// 選択されたファイルの情報を取得
        var fileData = e.target.files[0];
        var reader = new FileReader();
        // ファイル読み取りに失敗したとき
        reader.onerror = function() {
            alert('ファイル読み取りに失敗しました')
        }
        // ファイル読み取りに成功したとき
        reader.onload = function() {
			console.log("reader.result:"+reader.result); //TXTデータ(string)
			txt = reader.result.split("\n");
			console.log("txt[0]:"+txt[0]);
			flagTXT=1;
			//一行目読み込む
			if(txt[pc].charAt(0)!="★"){
				console.log("文章表示します pc:"+pc);
				//配列がテキストの場合
				//ただ一行読むだけ
				world.innerHTML=txt[pc];
			}else{
				console.log("画像表示します pc:"+pc);
				writeImage(txt[pc]);
				//textahead();//文章読み進める
			}
		}
        // ファイル読み取りを実行
        reader.readAsText(fileData,"Shift-JIS");
    }, false);
}
//ファイル読み込みここまで

//テキスト
/*
var txt = new Array(num);
txt[0] = "私はその人を常に先生と呼んでいた。";
txt[1] = "だからここでもただ先生と書くだけで本名は打ち明けない。";
txt[2] = "これは世間を憚かる遠慮というよりも、その方が私にとって自然だからである。";
txt[3] = "私はその人の記憶を呼び起すごとに、すぐ「先生」といいたくなる。";
txt[4] = "筆を執っても心持は同じ事である。";
txt[5] = "よそよそしい頭文字などはとても使う気にならない。";
*/



onload = function() {
    if (world === null) {
	world = document.getElementById(id2);
	}
};




//進む戻るボタンで呼ぶ関数
function textback(){
	console.log("textback呼ばれました pc:"+pc);
	if(flagTXT==1) {
		if(pc<=0)return;
		console.log("pc:"+pc);
		//今指してる文章が図か文か
		if(txt[pc].charAt(0)=="★"){
			//今指してる文章が図ならちょうど区切りなので前の画像を表示する
			//現在表示されてる画像より一枚前を表示するのみでいい
			//textから★を持つ文字列を検索して表示
			for(i=pc-1;i>=0;i--){
				if(txt[i].charAt(0)=="★"){
					writeImage(txt[i]);
					pc--;
					return;
				}
			}
			//for文内で終わらない＝一番最初の画像の場合
			//初期化
			writenullImage();
			pc--;
		}else if(txt[pc].charAt(0)=="☆"){
			console.log("☆入りました pc:"+pc);
			//前の☆までの間にあるメモを全て表示
			//まず前の星を探す
			for(i=pc-1;i>-1;i--){
				console.log("for☆入りました i:"+i);
				if(txt[i].charAt(0)=="☆"){
					console.log("☆見つけました pc:"+pc);
					break;
				}
				if(i==0){
					MEMO="";
					cleanMemo();
					console.log("最初の☆ pc:"+pc);
					pc--;
					return;
				}
			}
			MEMO="";
			for(k=i;k<pc;k++){
				if(txt[k].charAt(0)=="〇"){
					MEMO+=txt[k].slice(1)+"<br>";
				}
			}
			writeMemo();
			pc--;
		//}else if(txt[pc].charAt(0)=="〇"){
			//一行分消す？
			//とりあえず放置で
		//	pc--;
		}else{
			//文章だった場合は前の文章を表示
			for(i=pc-1;i>=0;i--){
				if(txt[i].charAt(0)!="★"&&txt[i].charAt(0)!="☆"&&txt[i].charAt(0)!="〇"){
					world.innerHTML=txt[i];
					pc--;
					return;
				}else{
					console.log("txt:"+txt[i]);
				}
			}
			console.log("終わりませんでした pc:"+pc);
			//for文内で終わらない＝一番最初の文章
			//初期化
			if(pc>0)pc--;
			/*
			pc--;
			console.log("文章表示しますZ pc:"+pc);
			if(txt[pc].charAt(0)=="★"){//一つ前の文章が図の場合はその前の文章を表示
				//world.innerHTML=txt[pc-1];
			}else if(txt[pc].charAt(0)=="☆"){
				//world.innerHTML=txt[pc-1];
			}else if(txt[pc].charAt(0)=="〇"){
				//world.innerHTML=txt[pc-1];
			}else{
				console.log("文章表示します pc:"+pc);
				//配列がテキストの場合
				//ただ一行読むだけ
				world.innerHTML=txt[pc];
			}
			*/
		}
	}
}


function textahead(){
	pc++;//一行進める
	console.log("textahead呼ばれました");
	if(flagTXT==1) {
		if(pc < txt.length) {
			if(txt[pc].charAt(0)=="★"){
				console.log("画像表示します pc:"+pc);
				//配列が画像表示を示す場合
				//単純に表示するのみ
				writeImage(txt[pc]);
				//textahead();//文章読み進める
			}else if(txt[pc].charAt(0)=="☆"){
				//メモ消去
				MEMO="";
				cleanMemo();
			}else if(txt[pc].charAt(0)=="〇"){
				//メモ追加
				MEMO+=txt[pc].slice(1)+"<br>";
				writeMemo();
			}else if(txt[pc].charAt(0)=="◎"){
				//クイズモード
				console.log("◎入りました pc:"+pc);
				//◎が続くまで文章を表示
				writeQuiz(txt[pc]);
			}else{
				console.log("文章表示します pc:"+pc);
			    //配列がテキストの場合
				//ただ一行読むだけ
				world.innerHTML=txt[pc];
			}
		}else if(flagTXT==0){
			return;
		}else {
		    alert("終了です。");
		    return;
		}
    }
}

function writeImage(t) {
    t=t.slice(1);
    world=document.getElementById(id1);
	world.innerHTML = '<img src='+t+' alt="サンプル画像">';
	//tは変数なので"t"ではなく+t+で追加する
	world=document.getElementById(id2);
}

function writenullImage() {
    world=document.getElementById(id1);
	world.innerHTML = '';
	world=document.getElementById(id2);
}
function writeMemo() {
    world=document.getElementById(id3);
	world.innerHTML = MEMO;
	world=document.getElementById(id2);
}

function cleanMemo() {
    world=document.getElementById(id3);
	world.innerHTML = "";
	world=document.getElementById(id2);
}


function writeQuiz(t) {
	console.log("writeQuiz入りました pc:"+pc);
    t=t.slice(1);
	//次の文章も◎→クイズの文章
	while(txt[pc+1].charAt(0)=="◎"){
		pc++;
		t+="<br>"+txt[pc].slice(1);
	}
	console.log("t:"+t);
	world=document.getElementById(id2);
	world.innerHTML = t;
	//選択肢としてラジオボタン表示
	radioON();
}

/*
onload = function() {
    if (world === null) {
	world = document.getElementById(id);
	}
    main = setInterval("pcst()", 1000/fps);
};


function pcst() {
    if((flagTXT==1)&&(cnt === 0)&&(flag === 0)) {
	if(pc < txt.length) {
		if(txt[pc].charAt(0)!="★"){
			console.log("文章表示します pc:"+pc);
		    //配列がテキストの場合
			writeText(txt[pc], "txt[" + pc + "]");
		}else{
			console.log("画像表示します pc:"+pc);
			//配列が画像表示を示す場合
			writeImage(txt[pc]);
		}
	}else if((flagTXT==0)&&(cnt === 0)&&(flag === 0)){
		return;
	}else {
	    clearInterval(main);
	    alert("終了です。");
	    return;
	}
    }
}

//この関数でテキストを書き込む
//writeImage関数を作れば画像の表示もできそう
function writeText(t, f) {
	flag = 1;
    str = t;
    world.innerHTML = str;
	//sleep();
	//cntの数だけ文字を表示
    world.onclick = function() {
		//一文を読み込み終わったので諸々初期化
		flag = 0;
	    nm = 0;
	    pc++;
	}
}


function writeImage(t) {
    flag = 1;
	t=t.slice(1);
    world=document.getElementById(id2);
	world.innerHTML = '<img src='+t+' alt="サンプル画像">';
	//tは変数なので"t"ではなく+t+で追加する
	world=document.getElementById(id);
	flag = 0;
	nm = 0;
	pc++;
}

function sleep(){
	var huga = 0;
	var hoge = setInterval(function() {
	    console.log(huga);
	    huga++;
	    //終了条件
	    if (huga == 3) {
	    clearInterval(hoge);
	    }
	}, 500);
}
*/