const container = document.getElementById("course-container");
const searchInput = document.getElementById("searchInput");
let courses = [];
function renderCourses(courseList) {
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
    courseList.forEach((course) => {
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
    .then((data) => {
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
        const category = btn.getAttribute("data-category");
        const filtered = category === "all"
            ? courses
            : courses.filter((c) => c.category === category);
        renderCourses(filtered);
    });
});
// Search by title
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = courses.filter((c) => c.title.toLowerCase().includes(query));
    renderCourses(filtered);
});
// Handle video preview modal open
document.addEventListener("click", function (e) {
    var _a, _b;
    const target = e.target;
    if (target.classList.contains("preview-btn")) {
        const title = (_a = target.getAttribute("data-title")) !== null && _a !== void 0 ? _a : "";
        const videoSrc = (_b = target.getAttribute("data-video")) !== null && _b !== void 0 ? _b : "";
        const modalTitle = document.getElementById("videoModalLabel");
        if (modalTitle)
            modalTitle.textContent = title;
        const video = document.getElementById("previewVideo");
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
        const video = document.getElementById("previewVideo");
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });
}
export {};
