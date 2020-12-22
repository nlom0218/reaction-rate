const $screen = document.querySelector("#js-screen");
const $result = document.querySelector("#js-result");
const $resetBtn = document.querySelector("#js-resetBtn");

let startTime;
let endTime;
let resultTime;
let resultArr = [];
let changeBackgroundColor;
const resultOrder = ["첫번째", "두번째", "세번째", "네번째", "다섯번째"];
let set = 0;

printResult = () => {
  $result.textContent = "";
  resultArr.forEach((item, index) => {
    const resultText = document.createElement("div");
    resultText.textContent = `${resultOrder[index]} : ${item}ms`;
    $result.appendChild(resultText);
  });
};

error = () => {
  clearTimeout(changeBackgroundColor);
  $screen.classList.remove("ready");
  $screen.classList.add("waiting");
  $screen.textContent = "배경이 노란색일 때 클릭입니다! 다시!";
};

endGame = () => {
  $screen.removeEventListener("click", handleClickScreen);
  $screen.textContent = "게임 종료!";
  console.log(resultArr);
  const totalScore = resultArr.reduce((acc, cur) => acc + cur, 0);
  const avgScore = totalScore / 5;
  const div = document.createElement("div");
  div.textContent = `평균 반응속도는 ${avgScore}ms 입니다`;
  $result.appendChild(div);
  $resetBtn.classList.remove("hiding");
};

handleClickScreen = () => {
  if ($screen.classList.contains("waiting")) {
    $screen.classList.remove("waiting");
    $screen.classList.add("ready");
    $screen.textContent = "배경이 노란색으로 바뀌면 클릭하세요";
    changeBackgroundColor = setTimeout(() => {
      $screen.classList.remove("ready");
      $screen.classList.add("now");
      $screen.textContent = "지금 클릭하세요!";
      startTime = Date.now();
    }, Math.floor(Math.random() * 3000 + 1000));
  } else if ($screen.classList.contains("now")) {
    $screen.classList.remove("now");
    $screen.classList.add("waiting");
    endTime = Date.now();
    resultTime = endTime - startTime;
    resultArr.push(resultTime);
    printResult();
    set += 1;
    if (set === 5) {
      endGame();
      return;
    }
    $screen.textContent = `클릭해서 시작하세요 남은횟수:${5 - set}`;
  } else if ($screen.classList.contains("ready")) {
    error();
  }
};

handleClickResetBtn = () => {
  $resetBtn.classList.add("hiding");
  $result.textContent = "";
  resultArr = [];
  set = 0;
  $screen.addEventListener("click", handleClickScreen);
  $screen.textContent = "클릭해서 시작하세요";
};

function init() {
  $screen.addEventListener("click", handleClickScreen);
  $resetBtn.addEventListener("click", handleClickResetBtn);
}

init();
