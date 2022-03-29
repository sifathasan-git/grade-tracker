import { renderSemester } from "./semesters.js";
import { renderGradecard } from "./gradeCount.js";
import { fetchSemesters, fetchCourses } from "./fetch.js";
import { renderCgpa } from "./cgpaCredit.js";

const semesterDiv = document.getElementById("semesters");
const gradecardsDiv = document.getElementById("gradeCards");
const cgpaDiv = document.getElementById("cgpa");
const runScript = async () => {
  //fetching data
  const semesters = await fetchSemesters();
  const courses = await fetchCourses("624086ffc716437ce824724f");
  semesterDiv.innerHTML = renderSemester(semesters);
  gradecardsDiv.innerHTML = renderGradecard(courses);
  cgpaDiv.innerHTML = renderCgpa(courses);

  //add semester

  //deleting semester
  const semesterDelete = document.getElementById("semesterDelete");
  semesterDelete.addEventListener("click", () => {
    console.log("clicked");
  });
};

window.onload = function () {
  runScript();
};
