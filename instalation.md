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


