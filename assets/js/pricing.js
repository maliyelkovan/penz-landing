
const monthlyBtn = document.getElementById("monthlyBtn");
const yearlyBtn = document.getElementById("yearlyBtn");
const price = document.getElementById("price");
const period = document.getElementById("period");
const saving = document.getElementById("saving");

function setPlan(plan) {
  const yearly = plan === "yearly";
  monthlyBtn.classList.toggle("active", !yearly);
  yearlyBtn.classList.toggle("active", yearly);
  price.textContent = yearly ? "₺4.000" : "₺400";
  period.textContent = yearly ? "/ yıl" : "/ ay";
  saving.style.display = yearly ? "block" : "none";
}
monthlyBtn.addEventListener("click", () => setPlan("monthly"));
yearlyBtn.addEventListener("click", () => setPlan("yearly"));

document.querySelectorAll(".faq-q").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("open");
    btn.lastElementChild.textContent = item.classList.contains("open") ? "−" : "+";
  });
});
