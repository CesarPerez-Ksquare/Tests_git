

// Cesar US
 
// User Story 7.
  const element = document.getElementById("restartButton");
  element.addEventListener("click", myFunction);
  element.addEventListener("click", us8);
  let pattern = 0;

  function myFunction() {
      document.getElementById("restarted").innerHTML = "Game have been restarted. ";
      pattern = 0;
  };

  // User Story 8.
  function us8() {
    pattern = 20;
    if (pattern === 20) {
    confirm("Congratulations!! You are the winner! \n Do you want to start a new game? ");
}
}
  