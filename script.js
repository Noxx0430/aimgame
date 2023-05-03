// 要素取得
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const checkbox = document.getElementById("checkbox");
const timer = document.getElementById("timer");
const targetArea = document.getElementById("targetArea");
const cover = document.getElementById("cover");
const easterEgg = document.getElementById("easterEgg");

// ターゲットサイズの変数
targetSize = "30px";

// スタートボタン => ゲーム開始
startBtn.onclick = function(){
  targetSize = "30px";
  start();
}

// 隠しボタン => 隠しモードでゲーム開始
easterEgg.ondblclick = function(){
  if(event.ctrlKey == true){
    if(event.altKey == true){
      targetSize = "180vmax";
      start();
    }else{
      alert("Ctrl + Alt + Dblclick = ???");
    }
  }else{
    alert("Ctrl + Alt + Dblclick = ???");
  }
}

// リセットボタン => もう一度
resetBtn.onclick = function(){
  easterEgg.style.display = "block";
  startBtn.style.display = "block";
  checkbox.parentElement.style.display = "block";
  resetBtn.style.display = "none";
  resetBtn.style.opacity = "0";
  resetBtn.setAttribute("disabled", true);
  timer.style.display = "none";
  timer.textContent = "3";
  Count = 0;
  wave = 1;
}

// ターゲット生成数のカウント
Count = 0;

// ダーミ生成数の変数
wave = 1;

// 開始後の動作と最初のターゲット生成
function start(){
  easterEgg.style.display = "none";
  startBtn.style.display = "none";
  checkbox.parentElement.style.display = "none";
  timer.style.display = "block";
  setTimeout(function(){
    timer.textContent = "2";
  }, 1000)
  setTimeout(function(){
    timer.textContent = "1";
  }, 2000)
  setTimeout(function(){
    timer.textContent = "";
    createTarget();
  }, 3000)
}

// ターゲット生成
function createTarget(){
  // ウィンドウサイズを取得
  const height = window.innerHeight - 15;
  const width = window.innerWidth - 15;
  
  // ダーミの変数を変更
  if(Count < 10){
    wave = 1;
  }else if(Count < 20){
    wave = 3;
  }else if(Count < 30){
    wave = 5;
  }else if(Count < 40){
    wave = 8;
  }else if(Count < 50){
    wave = 10;
  }else if(Count < 60){
    wave = 12;
  }else if(Count < 70){
    wave = 14;
  }else if(Count < 80){
    wave = 16;
  }else if(Count < 90){
    wave = 18;
  }else if(Count < 100){
    wave = 20;
  }else if(Count > 100){
    wave = Math.floor(Count / 5);
  }

  // ターゲットとダミーをランダム位置に生成
  for(let i=0; i<wave; i++){
    const top = Math.floor(Math.random() * (height - 15)) + 15;
    const left = Math.floor(Math.random() * (width - 15)) + 15;
    const div = document.createElement("div");
    div.className = "target target" + (i + 1);
    div.id = "target";
    div.style.top = top + "px";
    div.style.left = left + "px";
    div.style.width = targetSize;
    div.setAttribute("data-target", Count)
    div.setAttribute("data-target-state", i + 1);
    targetArea.appendChild(div);
  }

  // 生成数カウントを1増加
  Count += 1;
}

// ターゲット削除
document.onmouseover = function(){
  // ホバー中の要素のデータ取得
  const targetNum = event.target.getAttribute("data-target");
  const targetState = Number(event.target.getAttribute("data-target-state"));
  if(targetNum){
    if(targetState == 1){
      // カーソル位置取得 => カバー生成
      const top = event.clientY;
      const left = event.clientX;
      cover.style.top = top + "px";
      cover.style.left = left + "px";

      // ターゲットとダミー削除
      const elem = document.querySelectorAll("[data-target='" + targetNum + "']");
      for(let i=0; i<elem.length; i++){
        elem[i].remove();
      }

      // 次のターゲット生成
      createTarget();
    }else{
      // ターゲットとダミーを削除
      const elem = document.querySelectorAll("#target");
      for(let i=0; i<elem.length; i++){
        elem[i].remove();
      }

      // ゲームオーバー時の動作 => タイトル画面へ
      timer.textContent = "GAME OVER";
      resetBtn.style.display = "block";
      cover.style.left = "-10000px"
      setTimeout(function(){
        resetBtn.style.opacity = "1";
        resetBtn.removeAttribute("disabled");
      }, 2000)
    }
  }
}

// カーソル位置
Top = 0;
Left = 0;
CCount = 0;

// カーソル移動時エフェクト
window.onmousemove = function(){
  const top = event.clientY;
  const left = event.clientX;
  Top = top;
  Left = left;
}
window.onload = function(){
  setInterval(function(){
    if(checkbox.checked){
      const count = CCount;
      const div = document.createElement("div");
      div.className = "effect";
      div.id = "C" + count;
      div.style.top = Top + "px";
      div.style.left = ((Left == 0) ? -100 : Left) + "px";
      document.querySelector("body").appendChild(div);
      if(CCount > 100){
        CCount = 0;
      }
      CCount += 1;
      setTimeout(function(){
        document.getElementById("C" + count).remove();
      }, 300)
    }
  }, 50)
}
