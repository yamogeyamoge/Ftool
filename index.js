//設定用変数
var num = 6;		//テキストの量
var fps = 8;		//fps
var msgsp = 100;	//メッセージスピード
var id = "box2";	//テキストを表示するタグのID
var id2 = "box1";	//図表を表示するタグのID
var flagTXT=0;//ファイルを読み込んだかどうかのフラグ
var txt = new Array(num);

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


//初期化
var cnt = 0;
var pc = 0;//txtの何行目を読んでいるか
var flag = 0;//今文章を表示してるかどうかのフラグ
var nm = 0;
var world = null;

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