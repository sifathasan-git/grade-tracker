export const renderGradecard = (courses) => {
  let gradeCardHtml = "";
  const gradeCounts = gradeCounter(courses);
  gradeCounts.forEach((grade) => {
    gradeCardHtml =
      gradeCardHtml +
      `<div class="gradeCard"><div class="frow"><h1>${grade.name}</h1><h1>${grade.count}</h1></div><p>Grade Counts</p></div>`;
  });
  return gradeCardHtml;
};

export function gradeCounter(courses) {
  let Amiddle = 0,
    Aminus = 0,
    Bplus = 0,
    Bmiddle = 0,
    Bminus = 0,
    Cplus = 0,
    Cmiddle = 0,
    Cminus = 0,
    Dplus = 0,
    Dmiddle = 0;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].gradeLetter === "A") Amiddle++;
    else if (courses[i].gradeLetter === "A-") Aminus++;
    else if (courses[i].gradeLetter === "B+") Bplus++;
    else if (courses[i].gradeLetter === "B") Bmiddle++;
    else if (courses[i].gradeLetter === "B-") Bminus++;
    else if (courses[i].gradeLetter === "C+") Cplus++;
    else if (courses[i].gradeLetter === "C") Cmiddle++;
    else if (courses[i].gradeLetter === "C-") Cminus++;
    else if (courses[i].gradeLetter === "D+") Dplus++;
    else if (courses[i].gradeLetter === "D") Dmiddle++;
  }
  return [
    {
      id: 1,
      name: "A",
      count: Amiddle,
    },
    {
      id: 2,
      name: "A-",
      count: Aminus,
    },
    {
      id: 3,
      name: "B+",
      count: Bplus,
    },
    {
      id: 4,
      name: "B",
      count: Bmiddle,
    },
    {
      id: 5,
      name: "B-",
      count: Bminus,
    },
    {
      id: 6,
      name: "C+",
      count: Cplus,
    },
    {
      id: 7,
      name: "C",
      count: Cmiddle,
    },
    {
      id: 8,
      name: "C-",
      count: Cminus,
    },
    {
      id: 9,
      name: "D+",
      count: Dplus,
    },
    {
      id: 10,
      name: "D",
      count: Dmiddle,
    },
  ];
}
