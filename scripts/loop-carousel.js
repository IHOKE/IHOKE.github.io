document.addEventListener("DOMContentLoaded", () => {
	const carousel = document.querySelector(".c-carousel");
	const track = carousel?.querySelector(".c-carousel-track");
	const slides = track ? Array.from(track.querySelectorAll(".c-slide-main")) : [];
	const previousButton = carousel?.querySelector("[data-carousel-prev]");
	const nextButton = carousel?.querySelector("[data-carousel-next]");

	if (!carousel || !track || slides.length < 2) {
		return;
	}

	let currentIndex = Math.floor(Math.random() * slides.length);
	let autoPlayTimer;
	const autoPlayDelay = 4000;

	gsap.set(track, {
		xPercent: -100 * currentIndex
	});

	const showSlide = (index) => {
		currentIndex = (index + slides.length) % slides.length;

		gsap.to(track, {
			xPercent: -100 * currentIndex,
			duration: 0.7,
			ease: "power2.inOut",
			overwrite: true
		});
	};

	const startAutoPlay = () => {
		autoPlayTimer?.kill();
		autoPlayTimer = gsap.delayedCall(autoPlayDelay / 1000, () => {
			showSlide(currentIndex + 1);
			startAutoPlay();
		});
	};

	const stopAutoPlay = () => {
		autoPlayTimer?.kill();
	};

	const navigate = (index) => {
		showSlide(index);
		startAutoPlay();
	};

	previousButton?.addEventListener("click", () => navigate(currentIndex - 1));
	nextButton?.addEventListener("click", () => navigate(currentIndex + 1));

	carousel.tabIndex = 0;
	carousel.addEventListener("mouseenter", stopAutoPlay);
	carousel.addEventListener("mouseleave", startAutoPlay);
	carousel.addEventListener("focusin", stopAutoPlay);
	carousel.addEventListener("focusout", (event) => {
		if (!carousel.contains(event.relatedTarget)) {
			startAutoPlay();
		}
	});

	startAutoPlay();
});
