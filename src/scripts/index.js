import { renderSemester } from "./semesters.js";
import { addSemesterWindowRender, addSemester } from "./addSemester.js";
import {
  getCourses,
  renderCourses,
  editCourseWindowRender,
} from "./courses.js";
import { addCourseWindowRender, addCourse, editCourse } from "./addCourse.js";
import { renderGradecard } from "./gradeCount.js";
import { fetchSemesters, fetchCourses, fetchSemesterCourses } from "./fetch.js";
import {
  activeDeactiveSemester,
  activeDeactiveCourse,
  deleteSemester,
  deleteSemesterCourses,
  deleteCourse,
} from "./update.js";
import { renderCgpa } from "./cgpaCredit.js";

const logout = document.getElementById("logout");
const semesterDiv = document.getElementById("semesters");
const gradecardsDiv = document.getElementById("gradeCards");
const cgpaDiv = document.getElementById("cgpa");
const title = document.getElementById("title");
const addWindow = document.getElementById("addWindow");
const addWindowBtn = document.getElementById("addWindowBtn");
const runScript = async () => {
  if (window.location.pathname === "/public/index.html") {
    document.getElementById("navSemester").style.borderBottom =
      "2px solid white";
  }
  //fetching data
  const userid = localStorage.getItem("gradeTrackerUserid");
  logout.innerHTML = "Logout";
  let semesters = await fetchSemesters(userid);
  let courses = await fetchCourses(userid);
  semesterDiv.innerHTML = renderSemester(semesters);
  addWindowBtn.innerHTML = "Add Semester";
  gradecardsDiv.innerHTML = renderGradecard(courses);
  cgpaDiv.innerHTML = renderCgpa(courses);

  //add semester
  addWindowBtn.addEventListener("click", (e) => {
    let renderWindow = "";
    console.log(e.target.innerHTML);
    if (e.target.innerHTML === "Add Semester") {
      renderWindow = addSemesterWindowRender();
      addWindow.innerHTML = renderWindow;
      document.getElementById("saveBtn").addEventListener("click", async () => {
        const semesterName = document.getElementById("semesterName").value;
        if (semesterName) {
          const response = await addSemester(semesterName);
          if (response) {
            runScript();
            addWindow.innerHTML = "";
          }
        }
      });
    }
    if (e.target.innerHTML === "Add Course") {
      renderWindow = addCourseWindowRender();
      addWindow.innerHTML = renderWindow;
      document.getElementById("saveBtn").addEventListener("click", async () => {
        const name = document.getElementById("courseName").value.toUpperCase();
        const credit = parseInt(document.getElementById("courseCredit").value);
        const gradeLetter = document
          .getElementById("courseGrade")
          .value.split(",")[0];
        const gradePoint = parseFloat(
          document.getElementById("courseGrade").value.split(",")[1]
        );
        const response = await addCourse(name, credit, gradeLetter, gradePoint);
        if (response) {
          let semesterId = localStorage.getItem("gradeTrackerSemesterId");
          addWindow.innerHTML = "";
          const currentSemesterCourses = await fetchSemesterCourses(
            semesterId,
            userid
          );
          semesterDiv.innerHTML = renderCourses(currentSemesterCourses);
          semesterCourseView(semesters, semesterId);

          let courses = await fetchCourses(userid);
          gradecardsDiv.innerHTML = renderGradecard(courses);
          cgpaDiv.innerHTML = renderCgpa(courses);
        }
      });
    }

    document
      .getElementById("addWindowOverlay")
      .addEventListener("click", (e) => {
        if (e.target.id === "addWindowOverlay") addWindow.innerHTML = "";
      });
  });
  //deleting semester
  document.querySelectorAll(".semesterDelete").forEach((item) => {
    item.addEventListener("click", async (e) => {
      const id = e.target.parentElement.parentElement.id;
      console.log(id);
      await deleteSemester(id);
      await deleteSemesterCourses(id);
      runScript();
    });
  });

  //deactive semester
  document.querySelectorAll(".semester-slider-button").forEach((item) => {
    item.addEventListener("change", async (e) => {
      const userid = localStorage.getItem("gradeTrackerUserid");
      const id = e.target.parentElement.parentElement.parentElement.id;
      const active = e.target.checked;
      await activeDeactiveSemester(id, userid, active);
      runScript();
    });
  });
  //view semester Courses
  let currentSemester = [];
  semesterDiv.addEventListener("click", (e) => {
    let id;
    if (e.target.id) {
      id = e.target.id;
    } else if (
      e.target.className === "semesterName" ||
      e.target.className === "courseName"
    )
      id = e.target.parentElement.id;
    else id = e.target.parentElement.parentElement.id;
    if (id.length >= 18 && e.target.className !== "semesterDelete") {
      semesterCourseView(semesters, id);
    }
  });
  //logout
  logout.addEventListener("click", () => {
    localStorage.removeItem("gradeTrackerUserid");
  });
};

//view semester courses
async function semesterCourseView(semesters, semesterId) {
  localStorage.setItem("gradeTrackerSemesterId", semesterId);
  const userid = localStorage.getItem("gradeTrackerUserid");
  const currentSemester = semesters.filter((item) => item._id === semesterId);
  const currentSemesterCourses = await fetchSemesterCourses(semesterId, userid);
  if (currentSemester) {
    title.innerHTML =
      `<img id="back" src="../src/image/backbtn.svg" alt="" />` +
      currentSemester[0].name;

    addWindowBtn.innerHTML = "Add Course";
    semesterDiv.innerHTML = renderCourses(currentSemesterCourses);

    semesterDiv.addEventListener("click", async (e) => {
      let id;
      if (e.target.id) {
        id = e.target.id;
      } else if (
        e.target.className === "semesterName" ||
        e.target.className === "courseName"
      )
        id = e.target.parentElement.id;
      else id = e.target.parentElement.parentElement.id;
      if (id.length >= 18 && e.target.className !== "semesterDelete") {
        let renderWindow = await editCourseWindowRender(id);
        addWindow.innerHTML = renderWindow;

        document
          .getElementById("saveBtn")
          .addEventListener("click", async () => {
            const name = document
              .getElementById("courseName")
              .value.toUpperCase();
            const credit = parseInt(
              document.getElementById("courseCredit").value
            );
            const gradeLetter = document
              .getElementById("courseGrade")
              .value.split(",")[0];
            const gradePoint = parseFloat(
              document.getElementById("courseGrade").value.split(",")[1]
            );
            const response = await editCourse(
              id,
              name,
              credit,
              gradeLetter,
              gradePoint
            );
            if (response) {
              let courses = await fetchCourses(userid);
              gradecardsDiv.innerHTML = renderGradecard(courses);
              cgpaDiv.innerHTML = renderCgpa(courses);
              addWindow.innerHTML = "";
              semesterCourseView(semesters, semesterId);
            }
          });

        document
          .getElementById("addWindowOverlay")
          .addEventListener("click", (e) => {
            if (e.target.id === "addWindowOverlay") addWindow.innerHTML = "";
          });
      }
    });

    document.getElementById("back").addEventListener("click", async () => {
      title.innerHTML = "Semesters";
      runScript();
    });
  }
  //deactive course
  document.querySelectorAll(".course-slider-button").forEach((item) => {
    item.addEventListener("change", async (e) => {
      const userid = localStorage.getItem("gradeTrackerUserid");
      const id = e.target.parentElement.parentElement.parentElement.id;
      const active = e.target.checked;
      const deactiveCourse = await activeDeactiveCourse(id, userid, active);
      if (deactiveCourse) {
        const currentSemesterCourses = await fetchSemesterCourses(
          semesterId,
          userid
        );
        semesterDiv.innerHTML = renderCourses(currentSemesterCourses);
        semesterCourseView(semesters, semesterId);

        let courses = await fetchCourses(userid);
        gradecardsDiv.innerHTML = renderGradecard(courses);
        cgpaDiv.innerHTML = renderCgpa(courses);
      }
    });
  });
  //deleting course
  document.querySelectorAll(".courseDelete").forEach((item) => {
    const userid = localStorage.getItem("gradeTrackerUserid");
    item.addEventListener("click", async (e) => {
      const id = e.target.parentElement.parentElement.id;
      if (id.length >= 18) {
        const deletedCourse = await deleteCourse(id, semesterId);
        if (deletedCourse) {
          const currentSemesterCourses = await fetchSemesterCourses(
            semesterId,
            userid
          );
          semesterDiv.innerHTML = renderCourses(currentSemesterCourses);
          semesterCourseView(semesters, semesterId);

          let courses = await fetchCourses(userid);
          gradecardsDiv.innerHTML = renderGradecard(courses);
          cgpaDiv.innerHTML = renderCgpa(courses);
        }
      }
    });
  });
}

window.onload = function () {
  runScript();
};
