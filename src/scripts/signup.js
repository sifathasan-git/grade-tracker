const signupEvent = document.getElementById("signup");

signupEvent.addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const name =
    document.getElementById("fname").value +
    " " +
    document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const response = await signup({ name, username, password, email });
  console.log(response);
  if (response.status) {
    localStorage.setItem("gradeTrackerUserid", response.message);
    window.location.href = "/public/index.html";
  } else alert(response.message);
});

export const signup = (data) => {
  const url = "http://localhost:3001/api/users";
  const response = axios.post(url, data).then((res) => {
    if (res.data) return res.data;
  });
  return response;
};
