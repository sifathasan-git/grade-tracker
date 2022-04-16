const loginEvent = document.getElementById("login");

loginEvent.addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  if (username && password) {
    const response = await login(username, password);
    if (response.length > 20) {
      localStorage.setItem("gradeTrackerUserid", response);
      window.location.href = "/public/index.html";
    } else alert(response);
  }
});

export const login = (username, password) => {
  const courseUrl =
    "http://localhost:3001/api/users/" + username + "/" + password;
  const response = axios.get(courseUrl).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
