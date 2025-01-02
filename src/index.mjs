// stylesフォルダは src と同じ階層にあるため
import '../styles/style.css';

const onClickAdd = () => {
    //textboxの値を取得し、初期化する
    const inputText = document.getElementById("add-text").value;
    document.getElementById("add-text").value = "";

    //未完了のリストを作成
    createIncompleteTodo(inputText);
};

// 渡された引数を元に未完了のTODOを作成する関数
const createIncompleteTodo = (todo) => {
        //liタグを作成
        const li = document.createElement("li");
        //divタグを作成
        const div = document.createElement("div");
        div.className = "list-row";
    
        //pタグ作成
        const p = document.createElement("p");
        p.className = "todo-item";
        p.innerText = todo;
    
        //完了ボタンを作成
        const completButton = document.createElement("button");
        completButton.innerText = "完了";
        completButton.addEventListener("click", () => {
            //押された完了ボタンの親にあるliタグを未完了リストから削除
            const moveTarget = completButton.closest("li");
            completButton.nextElementSibling.remove();
            completButton.remove();
            //戻すボタンを生成してdivタグ配下に設定
            const backButton = document.createElement("button");
            backButton.innerText = "戻す";
            backButton.addEventListener("click", () => {
                //TODOを未完了リストに戻す
                const todoText = backButton.previousElementSibling.innerText;
                createIncompleteTodo(todoText);
                //戻すボタンを削除
                backButton.closest("li").remove();
            });
            moveTarget.firstElementChild.appendChild(backButton);
            //完了リストに追加
            document.getElementById("complete-list").appendChild(moveTarget);
        });
        
        //削除ボタンを作成
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "削除";
        deleteButton.addEventListener("click", () => {
            //押された削除ボタンの親にあるliタグを未完了リストから削除
            const deleteTarget = deleteButton.closest("li");
            document.getElementById("incomplete-list").removeChild(deleteTarget);
        });
    
        //liタグの子要素に各要素を設定
        div.appendChild(p);
        div.appendChild(completButton);
        div.appendChild(deleteButton);
        li.appendChild(div);
        
    
        //未完了リストに追加
        document.getElementById("incomplete-list").appendChild(li);
};


document.getElementById("add-button").addEventListener("click", onClickAdd);
