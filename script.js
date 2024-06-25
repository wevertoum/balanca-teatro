document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.querySelector(".arrow");
  const messageDenied = document.getElementById("message-denied");
  const messageApproved = document.getElementById("message-approved");

  const loadingAudio = new Audio("assets/sounds/loading.mp3");
  const successAudio = new Audio("assets/sounds/success.mp3");
  const failAudio = new Audio("assets/sounds/fail.mp3");

  const messageDuration = 8000;
  const animationDuration = 4000;

  function animateArrowDenied() {
    arrow.style.animation = "none";
    arrow.offsetHeight;

    loadingAudio.play();

    arrow.style.animation = "rotateDenied 4s forwards";

    setTimeout(() => {
      loadingAudio.pause();
      loadingAudio.currentTime = 0;
      showMessage(messageDenied, failAudio, "fail");
    }, animationDuration);
  }

  function animateArrowApproved() {
    arrow.style.animation = "none";
    arrow.offsetHeight;

    loadingAudio.play();

    arrow.style.animation = "rotateApproved 4s forwards";

    setTimeout(() => {
      loadingAudio.pause();
      loadingAudio.currentTime = 0;
      showMessage(messageApproved, successAudio, "success");
    }, animationDuration);
  }

  function showMessage(message, sound, type) {
    sound.play();
    message.style.display = "block";
    if (type === "success") {
      showConfetti();
      setTimeout(() => {
        resetScreen(message);
      }, 60000);
    } else {
      document.body.classList.add("denied-bg");
      setTimeout(() => {
        document.body.classList.remove("denied-bg");
        resetScreen(message);
      }, messageDuration);
    }
  }

  function resetScreen(message) {
    message.style.display = "none";
    arrow.style.animation = "rotate 2s linear infinite alternate";
  }

  function showConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "i" || event.key === "I") {
      animateArrowDenied();
    } else if (event.key === "j" || event.key === "J") {
      animateArrowApproved();
    }
  });
});
