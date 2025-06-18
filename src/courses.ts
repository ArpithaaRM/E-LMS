import { Course } from "./course_model";

const container = document.getElementById("course-container") as HTMLElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;

let courses: Course[] = [];

function renderCourses(courseList: Course[]): void {
  container.innerHTML = "";

  if (courseList.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center" role="alert">
          No courses found.
        </div>
      </div>
    `;
    return;
  }

  courseList.forEach((course: Course) => {
    container.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 mb-4 course-item" data-category="${course.category}" data-title="${course.title.toLowerCase()}">
        <div class="course-card h-100 d-flex flex-column">
          <img src="${course.thumbnail}" alt="${course.title}" class="img-fluid mb-3 w-100" style="height: 180px; object-fit: cover;">
          <h5>${course.title}</h5>
          <p><strong>Instructor:</strong> ${course.instructor}</p>
          <p class="flex-grow-1">${course.description}</p>
          <p><strong>Rating:</strong> ${course.rating} ⭐</p>
          <button 
            class="btn btn-sm btn-outline-secondary mt-auto preview-btn" 
            data-bs-toggle="modal" 
            data-bs-target="#videoModal"
            data-title="${course.title}"
            data-video="${course.video}">
            Preview
          </button>
        </div>
      </div>
    `;
  });
}

// ✅ Corrected path: assuming `data.json` is in root or served from `public/` or `dist/`
fetch("../dist/data.json")
  .then((res) => res.json())
  .then((data: Course[]) => {
    courses = data;
    renderCourses(courses);
  })
  .catch((err) => {
    console.error("Failed to fetch courses:", err);
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center" role="alert">
          Unable to load courses.
        </div>
      </div>
    `;
  });

// Filter by category
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = (btn as HTMLElement).getAttribute("data-category");
    const filtered =
      category === "all"
        ? courses
        : courses.filter((c) => c.category === category);
    renderCourses(filtered);
  });
});

// Search by title
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(query)
  );
  renderCourses(filtered);
});

// Handle video preview modal open
document.addEventListener("click", function (e) {
  const target = e.target as HTMLElement;
  if (target.classList.contains("preview-btn")) {
    const title = target.getAttribute("data-title") ?? "";
    const videoSrc = target.getAttribute("data-video") ?? "";

    const modalTitle = document.getElementById("videoModalLabel");
    if (modalTitle) modalTitle.textContent = title;

    const video = document.getElementById("previewVideo") as HTMLVideoElement;
    if (video) {
      video.src = videoSrc;
      video.load();
    }
  }
});

// Stop video on modal close
const videoModal = document.getElementById("videoModal");
if (videoModal) {
  videoModal.addEventListener("hidden.bs.modal", function () {
    const video = document.getElementById("previewVideo") as HTMLVideoElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });
}
