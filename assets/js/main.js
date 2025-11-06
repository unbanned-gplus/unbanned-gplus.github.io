document.addEventListener("DOMContentLoaded", function () {
  // Select all images inside game containers
  const images = document.querySelectorAll(".game-card img, .item-grid img, .game-thumb");
  images.forEach(img => {
    // If no alt attribute is set
    if (!img.hasAttribute("alt") || img.alt.trim() === "") {
      // Try to use filename as alt text
      let altText = "";
      if (img.src) {
        const fileName = img.src.split("/").pop().split(".")[0];
        altText = fileName.replace(/[-_]/g, " "); // Replace dashes/underscores with spaces
      }
      // If there's a title attribute, prefer that
      if (img.getAttribute("title")) {
        altText = img.getAttribute("title");
      }
      // If parent link has text, fallback to that
      if (!altText && img.closest("a") && img.closest("a").textContent.trim()) {
        altText = img.closest("a").textContent.trim();
      }
      // Final fallback
      if (!altText) {
        altText = "Game Image";
      }
      img.setAttribute("alt", altText);
    }
  });
});
function initMenu() {
const nav = document.querySelector("nav.greedy");
const btn = nav.querySelector("button");
const vlinks = nav.querySelector(".links");
const hlinks = nav.querySelector(".hidden-links");
let numOfItems = 0;
let totalSpace = 0;
const breakWidths = [];
// Calculate the total width of visible links
Array.from(vlinks.children).forEach((child) => {
  const width = child.offsetWidth;
  totalSpace += width;
  numOfItems += 1;
  breakWidths.push(totalSpace);
});
let availableSpace, numOfVisibleItems, requiredSpace;
function check() {
  availableSpace = vlinks.clientWidth - 10; // Subtracting some padding
  numOfVisibleItems = vlinks.children.length;
  requiredSpace = breakWidths[numOfVisibleItems - 1];
  if (requiredSpace > availableSpace) {
    // Move last item to hidden links
    hlinks.insertBefore(vlinks.lastElementChild, hlinks.firstChild);
    numOfVisibleItems -= 1;
    check();
  } else if (availableSpace > breakWidths[numOfVisibleItems]) {
    // Move first hidden item to visible links
    vlinks.appendChild(hlinks.firstElementChild);
    numOfVisibleItems += 1;
  }
  // Update button count and visibility
  btn.setAttribute("count", numOfItems - numOfVisibleItems);
  if (numOfVisibleItems === numOfItems) {
    btn.classList.add("hidden");
  } else {
    btn.classList.remove("hidden");
  }
}
// Resize event listener
window.addEventListener("resize", check);
// Button click event listener
btn.addEventListener("click", () => {
  hlinks.classList.toggle("hidden");
});
// Initial check
check();
}
initMenu();
