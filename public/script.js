let currentIndex = 0;
let totalScore = 0;
let wrong = 0;

fetch("/questions")
  .then((response) => response.json())
  .then((data) => {
    displayQuestion(data);
  });

function displayQuestion(data) {
  if (currentIndex >= data.length) {
    document.getElementById("options").innerHTML = "";
    document.getElementById("question").innerHTML = "You finished the quiz!";
    document.getElementById("score").innerHTML = "";

    document.getElementById("total").textContent =
      "Your Total Score: " + totalScore + " Wrong: " + wrong;
    return;
  }

  let q = data[currentIndex];
  document.getElementById("question").innerHTML = q.question;
  let choicesContainer = document.getElementById("options");
  choicesContainer.innerHTML = "";

  for (let i = 0; i < q.options.length; i++) {
    let btn = document.createElement("button");
    btn.innerHTML = q.options[i]; // Show option text instead of index
    btn.setAttribute("data-answer", q.options[i]); // Store the answer in an attribute
    btn.onclick = function () {
      let selected = this.getAttribute("data-answer");
      if (selected === q.answer) {
        totalScore++;
        document.getElementById("score").innerHTML =
          "Score: " + totalScore + " Wrong: " + wrong;
      } else {
        wrong++;
        document.getElementById("score").innerHTML =
          "Score: " + totalScore + " Wrong: " + wrong;
      }
      currentIndex++;
      displayQuestion(data);
    };
    choicesContainer.appendChild(btn);
  }
}
