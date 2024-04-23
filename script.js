const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const totalPages = Math.ceil(galleryItems.length / 8);
let currentPage = 1;
let currentIndex = 0;

function showImagesForPage(pageNumber) {
  const startIndex = (pageNumber - 1) * 8;
  const endIndex = Math.min(startIndex + 8, galleryItems.length);
  galleryItems.forEach((item, index) => {
    if (index >= startIndex && index < endIndex) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function showImage(index) {
  const imgSrc = galleryItems[index + (currentPage - 1) * 8]
    .querySelector("img")
    .getAttribute("src");
  lightboxImg.setAttribute("src", imgSrc);
  lightbox.style.display = "block";
  lightbox.setAttribute("aria-hidden", "false");
  closeBtn.focus();
}

function closeLightbox() {
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
  galleryItems[currentIndex].focus();
}

closeBtn.addEventListener("click", closeLightbox);

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showImagesForPage(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    showImagesForPage(currentPage);
  }
});

galleryItems.forEach((item, index) => {
  if (index >= 8) {
    item.style.display = "none";
  }
  item.addEventListener("click", () => {
    currentIndex = index % 8;
    showImage(currentIndex);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  } else if (event.key === "ArrowLeft") {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      if (currentPage > 1) {
        currentPage--;
        showImagesForPage(currentPage);
        currentIndex = 7;
      }
    }
    showImage(currentIndex);
  } else if (event.key === "ArrowRight") {
    if (
      currentIndex < 7 &&
      currentIndex < galleryItems.length - (currentPage - 1) * 8 - 1
    ) {
      currentIndex++;
    } else {
      if (currentPage < totalPages) {
        currentPage++;
        showImagesForPage(currentPage);
        currentIndex = 0;
      }
    }
    showImage(currentIndex);
  }
});

showImagesForPage(currentPage);
