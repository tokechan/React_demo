# moduler bandler 
複数のJs(css/image)を一つのファイルにまとめることができるもの

## メリット
- ファイルの読み込みを減らすことができる
- ファイルの読み込みを減らすことができる
- ファイルの読み込みを減らすことができる

## デメリット
- ファイルの読み込みを減らすことができる
- ファイルの読み込みを減らすことができる
- ファイルの読み込みを減らすことができる


Jsは細かく分けて開発しt方が良いよね！
再利用性も開発効率も上がるしね
でも、本番環境で実行するときは分かれている必要ないよね？
読み込みの数も増えてパフォーマンスも良くなさそう。。。。
じゃあ本番用にビルドするときに１つのファイルにまとめるか！
依存関係は？
それも判定して良い感じにまとめてくれるモノにしよう！
それがモジュールバンドラーだよ！

代表的なもの
- webpack
- vite
- rollup？？　調べてみようかな

## トランスパイラ
新しいJSの記法を古い記法に変換してくれる

ES6でめちゃくちゃ便利な機能増えたね！
どんどん使おう！
待てよ、、、まだ対応していないブラウザがいっぱいあるね。。。
IEとかIEとか。。。。。。。。
くそーじゃああきらめて古い記法にしてみるか。。。。。。。。
いや、開発は新しい記法でやって
ビルドするときに古い記法に変換してくれるモノがあればいいんじゃない
それがトランスパイラだよ！

Babelが有名だよ！
SWCも新進気鋭でrustで書かれているよ！（next.jsでも使われているよ！）

開発効率よく、本番実行時はうまく変換
最近はフレームワーク/ライブラリでもデフォルトで使われているので、割と面倒見てくる！
まずは概念を押さえておきましょう。


## SPA (SinglePageApplication)
モダンJavaScriptではSPAが基本
HTMLは１つのみでJavaScriptで画面を書き換える


従来のWebシステム
- ページ遷移するときにHTMLを読み込む
- リクエストに応じてHTMLを読み込むのでページ遷移が遅い


SPA
- ページ遷移するときにHTMLを読み込む
- リクエストに応じて必要なデータのみを読み込むのでページ遷移が速い

メリット
ページ遷移毎にちらつきがなくなる
表示速度のアップによるユーザ体験向上
コンポーネント分割が容易になることで開発効率アップ



### const,let varの変数宣言
var変数は上書き可能
var変数は再宣言可能
var val1 = "hoge1";  OK
var val1 = "fuga1";  OK　

let変数は上書き可能
let変数は再宣言不可
let val2 = "hoge2";  
let val2 = "fuga2";  NG 再宣言不可

const変数は上書き不可
const変数は再宣言不可
const val3 = "hoge3";  OK
const val3 = "fuga3";  NG 再宣言不可
val3 = "hoge4";  NG  上書き不可

constではオブジェクト型と言われる変数の中身は上書き可能
const val4 = {
    name:"toke",
    age: 38
    };
console.log(val4); // {name:"toke",age:38}
val4.name = "yuta";
val4.address = "kanagawa";
console.log(val4); // {name:"yuta",age:38,address:"kanagawa"}

基本的にES2015以降ではconstを使うことが推奨されている

constで定義した配列はプロパティの変更が可能
const val5 = ["dog","cat","bird"];
val5[0] = "fish";   
console.log(val5); // ["fish","cat","bird"]
val5.push("monkey");
console.log(val5); // ["fish","cat","bird","monkey"]

Reactではconstを使うことが推奨されている
ほとんどの場合はconstを使うことが推奨されている
配列やオブジェクトはほとんどconstで宣言する
動的に変わるものに関してはstateを使う

/**
*テンプレート文字列
*テンプレート文字列はバッククォートで囲んだ文字列
*テンプレート文字列は改行や変数の埋め込みが可能
*/
const name = "toke";
const age = 38;

//従来の方法
const message1 = "私の名前は" + name + "です。年齢は" + age;
console.log(message1)   ;
//私の名前はtokeです。年齢は38です。 
  
//テンプレート文字列
const message2 = `私の名前は${name}です。年齢は${age}です。`;
console.log(message2);
//私の名前はtokeです。年齢は38です。


/**
 *アロー関数
 */

//従来の関数
function func1(str){
    return str;
};
console.log(func1("func1 desu!")); // func1 desu!

//アロー関数
const func2 = (str) => {
    return str;
};
console.log(func2("func2 desu!")); // func2 desu!

アロー関数は引数が１つの場合は()を省略できる

const func3 = str => {
    return str;
};
console.log(func3("func3 desu!")); // func3 desu!   

アロー関数はreturnを省略できる　
関数の中の処理が単一の場合は{}を省略できる

const func4 = str => str;
console.log(func4("func4 desu!")); // func4 desu!   

二つの引数を受け取る場合は()を省略できない
const func5 = (str1, str2) => {
    return str1 + str2;
};
console.log(func5(5 + 36)); // 41

省略バージョン
波括弧とリターンを省略できる
const func6 = (str1, str2) => str1 + str2;
console.log(func6(5 + 36)); // 41   

Reactでよく出る記法
関数の結果としてオブジェクトを返す場合は波括弧をつける
オブジェクトを返すだけなので単一式で書ける

const func7 = (num1, num2) => ({
    toke: num1,
    yuta: num2,
});
console.log(func7(30 , 20)); // {toke:30,yuta:20}


/**
 * 分割代入
 */

const myProfile = {
    name: "toke",
    age: 38,
};
通常の代入
const massage2 = `私の名前は${myProfile.name}です。年齢は${myProfile.age}です。`;
console.log(massage2); // 私の名前はtokeです。年齢は38です。
　
//分割代入　Reactではよく使われるので覚えること
const  { name, age } = myProfile; ここでmyProfileのnameとageを取得している
const message3 = `my name is ${name} and also my age is ${age}.`;
console.log(message3); // my name is toke and also my age is 38.


//配列の分割代入
その配列が持っている順番が重要
分割代入はReactでよく使われるので理解しておくこと

const myProfile = ["toke", 38];

const message4 = `my name is ${name} and also my age is ${age}.`;
console.log(message4); // my name is toke and also my age is 38.

const [name, age] = myProfile;  配列の命名は好きなようにつけれる
const message5 = `my name is ${name} and also my age is ${age}.`;
console.log(message5); // my name is toke and also my age is 38.


/**
 * デフォルト値（引数、分割代入）
 */
const sayHello = (name) => console.log(`Hello, ${name}san!`);
sayHello("toke"); // Hello, toke!
sayHello(); // Hello, undefinedsan!

//デフォルト値を設定 引数にデフォルト値を設定することができる
const sayHello2 = (name = "guset") => console.log(`Hello, ${name}san!`);
sayHello2("toke"); // Hello, toke!
sayHello2(); // Hello, guest!

//分割代入でデフォルト値を設定
const myProfile = {
    age: 38
};
const { age, name = "guest" } = myProfile;
console.log(age); // 38
console.log(name); // guest デフォルト値が設定されている

/**
 * オブジェクトの省略記法
 */
Reactでかなりよく出てくるので覚えておくこと
const name = "toke";
const age = 38;

const myProfile = {
    name: name,
    age: age,
};
console.log(myProfile); // {name: "toke", age: 38}

//省略記法 キーと変数名が同じ場合は省略できる
const myProfile2 = {
     name, 
     age 
};
console.log(myProfile2); // {name: "toke", age: 38}

/**
 * スプレッド演算子　...　ドットを３つつける
 */

//配列のスプレッド演算子　配列の展開 配列の中身を順番に展開してくれる
const arr1 = [1, 2];
console.log(arr1); // [1, 2]
console.log(...arr1); // 1 2

const sumFunc = (num1, num2) => console.log(num1 + num2);
sumFunc(arr1[0], arr1[1]); // 3

//スプレッド演算子を使うと配列の中身を展開してくれる
const sumFunc2 = (num1, num2) => console.log(num1 + num2);
sumFunc2(...arr1); // 3

//まとめる
const arr2 = [1, 2, 3, 4, 5];
const [num1, num2, ...arr3] = arr2;
console.log(num1); // 1  一つのみ
console.log(num2); // 2　一つのみ
console.log(arr3); // [3, 4, 5]　まとめて取得

//配列のコピー、結合　　これがよく使うものかもしれない
const arr4 = [10, 20];
const arr5 = [30, 40];

const arr6 = [...arr4];
console.log(arr6); // [10, 20] コピー

const arr7 = [...arr4, ...arr5];    
console.log(arr7); // [10, 20, 30, 40] 結合

//参照渡し　オブジェクトの場合は注意 
const arr8 = arr4;
arr8[0] = 100;
console.log(arr8); // [100, 20] 参照渡し
console.log(arr4); // [100, 20] 参照渡し    

//オブジェクトのスプレッド演算子　オブジェクトの展開 オブジェクトの中身を展開してくれる
const obj1 = {
    name: "toke",
    age: 38,
};
console.log(obj1); // {name: "toke", age: 38}
console.log(...obj1); // toke 38


/*
 * map,filterを使った配列の処理
 */
//通常のfor文
const nameArray = ["toke", "yuta", "kazuma", "yuki"];
for (let index = 0; index < nameArr.length; index++>) {
    console.log(nameArr[index]);
}
//toke yuta kazuma yuki　順番に出力される

//mapを使った配列の処理
nameArray.map((name) => {
    console.log(name);
});
//toke yuta kazuma yuki　順番に出力される

nameArray.map(name => console.log(name));
//toke yuta kazuma yuki　順番に出力される
//必ずしも返却値を受け取る必要はないので、アロー関数で処理するのもよくある
//シンプルに記述できるので覚えておくこと


//mapを使った配列の処理の特徴
//mapは元の配列を変更しない
//mapは新しい配列を返す 下の例はnameArrayを変更していない
nameArr2という新しい配列を作成している


const nameArr2 = nameArray.map((name) => {
    return name;
});
console.log(nameArr2); // ["toke", "yuta", "kazuma", "yuki"]

//filterを使った配列の処理
const numArray = [1, 2, 3, 4, 5];
const newNumarr = numArray.filter((num) => {
    return num % 2 === 1;
});
console.log(newNumarr); // [1, 3, 5]

//配列のループと言えば何番目の要素か？というのを取得するのが一般的
//for文の場合
const nameArr2 = ["toke", "yuta", "kazuma", "yuki"];
for (let index = 0; index < nameArr2.length: index++) {
    console.log(${index + 1}番目は${nameArr2[index]}です);
}
//1番目はtokeです。2番目はyutaです。3番目はkazumaです。4番目はyukiです。

//mapを使った場合
nameArr2.map((name, index) => {
    console.log(${index + 1}番目は${name}です);
});
//1番目はtokeです。2番目はyutaです。3番目はkazumaです。4番目はyukiです。

//mapを使ったちょっと実践的な処理
//tokeさんとそれ以外の人を区別して表示したいとき
//なので、if文を使ってtokeさんの場合はtokeと表示し、それ以外の人はnameさんと表示する

const nameArr3 = ["toke", "yuta", "kazuma", "yuki"];

const newNameArr2 = nameArr3.map((name) => {
    if(name === "toke") {
        return "toke";
    } else {
        return `${name}さん`;
    }
});
console.log(newNameArr2); // ["toke", "yutaさん", "kazumaさん", "yukiさん"]

//mapはReactで画面表示するときによく使う    
//ループしながら配列の中身を表示するときによく使う
//画面の出し分け、UIの出し分けの中でmapでループしながら表示することがよくある

//三項演算子　Reactでよく使うが多用しすぎると可読性が下がるので注意
//三項演算子はif文のシンプルな記述方法
//if文の条件式 ? 条件式がtrueの場合の処理 : 条件式がfalseの場合の処理

const val5 =1 > 0 ? "true desu" : "false desu";
console.log(val5); // true desu

//特定の条件を反転させて表示させる時によく使う
//ある変数に新しく定義して中で、こういう条件の時はこうしけど、それ以外の時はこうしたいという時に一行で書けるのでよく使う

const num = 1300;
console.log(num.toLocaleString()); 
// 1,300  数値に対して、３桁くぎりにカンマをつけて表示する
const formattedNum = typeof num === 'number' ? num.toLocaleString() : "数値を入力してください";
console.log(formattedNum); // 1,300

const checSum = (num1, num2) => {
    return num1 + num2 > 100 ? "100を超えています" : "許容範囲内です";
};
console.log(checSum(50, 60)); // 100を超えています
console.log(checSum(50, 40)); // 許容範囲内です

関数の結果とかでリターンしてワンラインで書くときによく使う

/*
 * 論理演算子の本当の意味を知ろう　
 */

//JSではtruty falsyという概念がある
//暗黙的にどちらかに変換されるものがあるので覚えておくほうがいい
//trueとfalseは論理演算子でよく使われる 

//truty falsyの例
//true : 1, -1, "0", "false", [], {}, function(){}
//false : 0, "", null, undefined, NaN

const val6 = "ABC";
if (val6) {
    console.log("val6はtruthyです");
} else {
    console.log("val6はfalsyです");
}
//val6はtruthyです

const flag1 = true;
const flag2 = true;

if (flag1 || flag2) {
    console.log("1か2はtrueになります");
}
if (flag1 && flag2) {
    console.log("1も2もtrueになります");
}

//論理演算子は&&と||と!がある
//&&はAND演算子　両方の条件がtrueの場合はtrueを返す
//||はOR演算子　片方の条件がtrueの場合はtrueを返す
//!はNOT演算子　条件がtrueの場合はfalseを返す、falseの場合はtrueを返す

//論理演算子の注意点
//&&は左辺がfalseの場合は右辺を評価しない
//||は左辺がtrueの場合は右辺を評価しない

// ||は左辺がtrueの場合は右辺を評価しないので、右辺が評価されない
//短絡評価や短絡演算というふうに呼ばれる
const num = undefined;
const fee = num || "金額未設定です";
console.log(fee); // 金額未設定です

//&&は左辺がfalseの場合は右辺を評価しないので、右辺が評価されない
//短絡評価や短絡演算というふうに呼ばれる
const num2 = 100;
const fee2 = num2 || "金額未設定です";
console.log(fee2); // 100
 


