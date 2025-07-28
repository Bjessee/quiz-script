document.addEventListener("DOMContentLoaded", function () {
  if (!window.location.pathname.includes("/quiz")) return;

  const form = document.querySelector("form");

  if (!form) {
    console.error("❌ Form not found!");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const answers = Object.fromEntries(formData.entries());

    let points = 0;

    const ageAnswer = answers["What is your age?"]?.toLowerCase();
    if (ageAnswer === "under 16") points -= 10;

    const surveyAnswer = answers["YOU ARE...."]?.toLowerCase();
    if (surveyAnswer === "strongly agree") points += 5;
    else if (surveyAnswer === "agree") points += 4;
    else if (surveyAnswer === "neutral") points += 3;
    else if (surveyAnswer === "disagree") points += 1;
    else if (surveyAnswer === "strongly disagree") points -= 5;

    const budgetAnswer = answers["What is your budget?"]?.toLowerCase();
    switch (budgetAnswer) {
      case "<$100/mo":
        points -= 25;
        break;
      case "$200/mo":
      case "$300/mo":
        break;
      case "$400/mo":
        points += 5;
        break;
      case "$500/mo":
        points += 10;
        break;
      default:
        points += 12;
        break;
    }

    console.log("✅ Total Points:", points);
    sessionStorage.setItem("quizComplete", "true");

    if (points >= 20) {
      window.location.href = "/gas";
    } else {
      window.location.href = "/training-program";
    }
  });
});
