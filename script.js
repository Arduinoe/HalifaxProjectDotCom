const menuButton = document.querySelector(".menu-button");
const siteMenu = document.querySelector(".site-menu");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox__close");
const lightboxPrev = document.querySelector(".lightbox__arrow--prev");
const lightboxNext = document.querySelector(".lightbox__arrow--next");
const linksPopover = document.querySelector(".links-popover");
const linksOpen = document.querySelector("[data-links-open]");
const linksClose = document.querySelector(".links-popover__close");
const photoTiles = Array.from(document.querySelectorAll(".photo-tile"));
let currentPhotoIndex = 0;

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  siteMenu.setAttribute("aria-hidden", String(!open));
  siteMenu.toggleAttribute("inert", !open);
  siteMenu.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

siteMenu.addEventListener("click", (event) => {
  if (event.target.matches("a, button")) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }

  if (lightbox.open && event.key === "ArrowLeft") {
    showPhoto(currentPhotoIndex - 1);
  }

  if (lightbox.open && event.key === "ArrowRight") {
    showPhoto(currentPhotoIndex + 1);
  }
});

window.addEventListener(
  "scroll",
  () => {
    if (menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
    }
  },
  { passive: true }
);

function showPhoto(index) {
  currentPhotoIndex = (index + photoTiles.length) % photoTiles.length;
  const tile = photoTiles[currentPhotoIndex];
  const image = tile.querySelector("img");
  lightboxImage.src = tile.dataset.full;
  lightboxImage.alt = image.alt;
}

photoTiles.forEach((tile, index) => {
  tile.addEventListener("click", () => {
    showPhoto(index);
    lightbox.showModal();
  });
});

lightboxPrev.addEventListener("click", () => {
  showPhoto(currentPhotoIndex - 1);
});

lightboxNext.addEventListener("click", () => {
  showPhoto(currentPhotoIndex + 1);
});

lightboxClose.addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

linksOpen.addEventListener("click", () => {
  linksPopover.showModal();
});

linksClose.addEventListener("click", () => {
  linksPopover.close();
});

linksPopover.addEventListener("click", (event) => {
  if (event.target === linksPopover) {
    linksPopover.close();
  }
});
