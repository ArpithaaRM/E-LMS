import { Course } from "./course_model";

export function initHomePage(): void {
  const track = document.getElementById("carousel-track") as HTMLElement;
  if (!track) return;

  const viewport = document.querySelector(".carousel-viewport");

  function getVisibleCount(): number {
    const w = window.innerWidth;
    if (w >= 992) return 3;
    if (w >= 768) return 2;
    return 1;
  }

  let visibleCount: number = getVisibleCount();
  let startIndex: number = 0;
  let isTransitioning: boolean = false;
  let courses: Course[] = [];

  function renderCards(): void {
    const total = courses.length;
    const displayCourses: Course[] = [];

    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % total;
      displayCourses.push(courses[index]);
    }

    track.innerHTML = displayCourses
      .map(
        (course) => `
    <div class="carousel-card">
      <div class="card h-100 shadow-sm">
        <img src="${course.thumbnail}" class="card-img-top" style="height: 200px; object-fit: cover; cursor: pointer;" onclick="openModal('${course.title}', '${course.description}')">
        <div class="card-body text-center">
          <h5 class="card-title">${course.title}</h5>
          <p class="card-text">${course.description}</p>
        </div>
      </div>
    </div>
  `
      )
      .join("");

    track.querySelectorAll(".course-img").forEach((img) => {
      img.addEventListener("click", () => {
        const target = img as HTMLElement;
        const title = target.getAttribute("data-title") || "";
        const description = target.getAttribute("data-desc") || "";
        //openModal(title, description);
      });
    });

    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    track.offsetHeight;
  }

  function nextSlide(): void {
    if (isTransitioning) return;
    isTransitioning = true;

    const moveBy = track.offsetWidth / visibleCount;
    const firstCard = track.children[0].cloneNode(true);
    track.appendChild(firstCard);

    track.style.transition = "transform 0.8s ease";
    track.style.transform = `translateX(-${moveBy}px)`;

    setTimeout(() => {
      track.style.transition = "none";
      track.removeChild(track.children[0]);
      track.style.transform = "translateX(0)";
      startIndex = (startIndex + 1) % courses.length;
      isTransitioning = false;
    }, 800);
  }

  function prevSlide(): void {
    if (isTransitioning) return;
    isTransitioning = true;

    startIndex = (startIndex - 1 + courses.length) % courses.length;
    renderCards();

    const moveBy = track.offsetWidth / (visibleCount + 1);
    track.style.transition = "none";
    track.style.transform = `translateX(-${moveBy}px)`;

    setTimeout(() => {
      track.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      track.style.transform = "translateX(0)";
    }, 50);

    setTimeout(() => {
      isTransitioning = false;
    }, 850);
  }

  // function openModal(title: string, description: string): void {
  //   const modalTitle = document.getElementById("courseModalLabel");
  //   const modalBody = document.getElementById("courseModalBody");
  //   const modalElement = document.getElementById("courseModal");

  //   if (!modalTitle || !modalBody || !modalElement) return;

  //   modalTitle.textContent = title;
  //   modalBody.textContent = description;

  //   const modal = new (window as any).bootstrap.Modal(modalElement);
  //   modal.show();
  // };

  // Auto-slide
  let slideInterval: number = window.setInterval(nextSlide, 2500);

  // Pause/resume on hover
  if (viewport) {
    viewport.addEventListener("mouseenter", () => clearInterval(slideInterval));
    viewport.addEventListener("mouseleave", () => {
      slideInterval = window.setInterval(nextSlide, 2500);
    });
  }

  // Resize listener
  window.addEventListener("resize", () => {
    const newVisible = getVisibleCount();
    if (newVisible !== visibleCount) {
      visibleCount = newVisible;
      renderCards();
    }
  });

  // Fetch courses
  fetch("dist/data.json")
    .then((res) => res.json())
    .then((data: Course[]) => {
      courses = data;
      renderCards();
    })
    .catch((err) => {
      console.error("Failed to load courses:", err);
      track.innerHTML = `<div class="alert alert-danger text-center w-100">Unable to load carousel data.</div>`;
    });

  (window as any).prevSlide = prevSlide;
  (window as any).nextSlide = nextSlide;

  type Testimonial = {
    text: string;
    author: string;
  };

  let currentTestimonial = 0;
  let testimonials: Testimonial[] = [];

  const testimonialText = document.getElementById("testimonial-text");
  const testimonialAuthor = document.getElementById("testimonial-author");

  function showTestimonial(index: number): void {
    if (testimonialText && testimonialAuthor && testimonials.length > 0) {
      testimonialText.textContent = `"${testimonials[index].text}"`;
      testimonialAuthor.textContent = testimonials[index].author;
    }
  }

  // Fetch testimonials from JSON
  fetch("dist/testimonials.json")
    .then((res) => res.json())
    .then((data: Testimonial[]) => {
      testimonials = data;
      showTestimonial(currentTestimonial);

      // Auto-switch every 3 seconds
      setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
      }, 3000);
    })
    .catch((err) => {
      console.error("Failed to load testimonials:", err);
      if (testimonialText)
        testimonialText.textContent = "Unable to load testimonials.";
    });
}
