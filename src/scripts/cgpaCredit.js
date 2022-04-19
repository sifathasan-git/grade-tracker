export const renderCgpa = (courses) => {
  const cgpa = cgpaCount(courses);
  const credit = creditCount(courses);
  const stroke = strokeWidth(cgpa);
  let semestersHTML = `<div class="semesterCgpa"><h1>${cgpa}</h1><p>Cumulative GPA</p><div class="cgpaLimit"><p>0</p><p>4</p></div></div><svg id="svg" viewBox="0 0 122 122" fill="none"><path id="circle" d="M2.75 61C2.75 93.1706 28.8294 119.25 61 119.25C93.1706 119.25 119.25 93.1706 119.25 61C119.25 28.8294 93.1706 2.75 61 2.75C28.8294 2.75 2.75 28.8294 2.75 61Z" stroke="#e6e6e6" stroke-width="8" stroke-dasharray="366" stroke-dashoffset="91.5"/></svg><svg id="svg2" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="circle" d="M2.75 61C2.75 93.1706 28.8294 119.25 61 119.25C93.1706 119.25 119.25 93.1706 119.25 61C119.25 28.8294 93.1706 2.75 61 2.75C28.8294 2.75 2.75 28.8294 2.75 61Z" stroke="#47bbff" stroke-width="8" stroke-dasharray="366" stroke-dashoffset=${stroke}></svg>`;
  return semestersHTML;
};
export const renderCredit = (courses) => {
  const credit = creditCount(courses);
  let creditHTML = `
  <h1>Credit Completed</h1>
  <h1>${credit}</h1>`;
  return creditHTML;
};
const cgpaCount = (courses) => {
  let totalGradePoint = 0;
  let totalCredit = 0;
  courses.forEach((course) => {
    totalGradePoint = totalGradePoint + course.credit * course.gradePoint;
    totalCredit = totalCredit + course.credit;
  });
  const cgpa = Number(totalGradePoint / totalCredit).toFixed(2);
  return cgpa;
};
const creditCount = (courses) => {
  let totalCredit = 0;
  courses.forEach((course) => {
    totalCredit = totalCredit + course.credit;
  });
  return totalCredit;
};
function strokeWidth(cgpa) {
  let width = 68.75;
  width = 365 - width * cgpa;
  let strokeValue = width * cgpa;
  if (!cgpa) return 90;
  if (strokeValue < 90) return 90;
  return width;
}
