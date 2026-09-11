const storyData = {
  jobs: {
    src: "images/ui/story-musteri-jobs.png",
    alt: "Penz müşteri kartında İşler ve Satışlar görünümü"
  },
  ledger: {
    src: "images/ui/story-musteri-ledger.png",
    alt: "Penz müşteri kartında Cari Hareketler görünümü"
  },
  profit: {
    src: "images/ui/story-musteri-profit.png",
    alt: "Penz müşteri kartında Kârlılık görünümü"
  }
};

const storyImage = document.getElementById("storyImage");
const tabs = [...document.querySelectorAll(".story-tab")];
let current = 0;

function showStory(index) {
  current = index;
  const tab = tabs[index];
  const key = tab.dataset.key;
  storyImage.classList.remove("fade");
  void storyImage.offsetWidth;
  storyImage.src = storyData[key].src;
  storyImage.alt = storyData[key].alt;
  storyImage.classList.add("fade");
  tabs.forEach((t, i) => t.classList.toggle("active", i === index));
}

tabs.forEach((tab, i) => tab.addEventListener("click", () => showStory(i)));
setInterval(() => showStory((current + 1) % tabs.length), 3600);
