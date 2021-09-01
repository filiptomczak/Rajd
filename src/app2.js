const ul = document.getElementById("ulitems");
console.log(ul);
ul.addEventListener("click", (event) => {
  console.log(event.target);
  const allP = document.querySelectorAll(".info-text");
  allP.forEach((p) => p.classList.remove("show"));

  const li = event.target.closest("li");
  if (li) {
    const p = li.querySelector("p");

    if (p.classList.contains("show")) {
      p.classList.remove("show");
    } else {
      p.classList.add("show");
    }
  }
});
