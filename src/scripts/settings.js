import {
  fetchUserDetails,
  changeName,
  changeUsername,
  changePassword,
  changeEmail,
} from "./user.js";
const logout = document.getElementById("logout");
logout.innerHTML = "Logout";

const nameEdit = document.getElementById("nameEdit");
const usernameEdit = document.getElementById("usernameEdit");
const passwordEdit = document.getElementById("passwordEdit");
const emailEdit = document.getElementById("emailEdit");
const editWindow = document.getElementById("editWindow");
const settingsScript = async () => {
  if (window.location.pathname === "/public/settings.html") {
    document.getElementById("navSettings").style.borderBottom =
      "2px solid white";
  }
  const username = localStorage.getItem("gradeTrackerUserid");
  const userDetails = await fetchUserDetails(username);
  document.getElementById("name").innerHTML = `${userDetails.name}`;
  document.getElementById("username").innerHTML = `${userDetails.username}`;
  document.getElementById("email").innerHTML = `${userDetails.email}`;

  nameEdit.addEventListener("click", () => {
    editWindow.innerHTML = `
    <div id="editWindowOverlay" class="editWindow">
      <div class="editInputWindow">
        <input id="usersName" type="text" placeholder="Name" value="${userDetails.name}" />
        <div class="button">
          <button id="saveBtn">Save</button>
        </div>
      </div>
    </div>`;
    document.getElementById("saveBtn").addEventListener("click", async () => {
      const id = localStorage.getItem("gradeTrackerUserid");
      const name = document.getElementById("usersName").value;
      if (name.length === 0) alert("Please Enter Name");
      await changeName(id, name);
      editWindow.innerHTML = "";
      settingsScript();
    });
    document
      .getElementById("editWindowOverlay")
      .addEventListener("click", (e) => {
        if (e.target.id === "editWindowOverlay") editWindow.innerHTML = "";
      });
  });
  usernameEdit.addEventListener("click", () => {
    editWindow.innerHTML = `
    <div id="editWindowOverlay" class="editWindow">
      <div class="editInputWindow">
        <input id="usersUsername" type="text" placeholder="username" value="${userDetails.username}" />
        <div class="button">
          <button id="saveBtn">Save</button>
        </div>
      </div>
    </div>`;

    document.getElementById("saveBtn").addEventListener("click", async () => {
      const id = localStorage.getItem("gradeTrackerUserid");
      const username = document.getElementById("usersUsername").value;
      if (username.length === 0) alert("Please Enter Username");
      await changeUsername(id, username);
      editWindow.innerHTML = "";
      settingsScript();
    });
    document
      .getElementById("editWindowOverlay")
      .addEventListener("click", (e) => {
        if (e.target.id === "editWindowOverlay") editWindow.innerHTML = "";
      });
  });
  passwordEdit.addEventListener("click", () => {
    editWindow.innerHTML = `
    <div id="editWindowOverlay" class="editWindow">
      <div class="editInputWindow">
      <h1>Enter New Password</h1>
        <input id="usersPassword" type="text" placeholder="6 digit password" />
        <div class="button">
          <button id="saveBtn">Save</button>
        </div>
      </div>
    </div>`;
    document.getElementById("saveBtn").addEventListener("click", async () => {
      const id = localStorage.getItem("gradeTrackerUserid");
      const password = document.getElementById("usersPassword").value;
      if (password.length === 0) alert("Please Enter Password");
      await changePassword(id, password);
      editWindow.innerHTML = "";
      settingsScript();
    });

    document
      .getElementById("editWindowOverlay")
      .addEventListener("click", (e) => {
        if (e.target.id === "editWindowOverlay") editWindow.innerHTML = "";
      });
  });
  emailEdit.addEventListener("click", () => {
    editWindow.innerHTML = `
    <div id="editWindowOverlay" class="editWindow">
      <div class="editInputWindow">
        <input id="usersEmail" type="text" placeholder="email" value="${userDetails.email}" />
        <div class="button">
          <button id="saveBtn">Save</button>
        </div>
      </div>
    </div>`;
    document.getElementById("saveBtn").addEventListener("click", async () => {
      const id = localStorage.getItem("gradeTrackerUserid");
      const email = document.getElementById("usersEmail").value;
      if (email.length === 0) alert("Please Enter a valid Email");
      await changeEmail(id, email);
      editWindow.innerHTML = "";
      settingsScript();
    });
    document
      .getElementById("editWindowOverlay")
      .addEventListener("click", (e) => {
        if (e.target.id === "editWindowOverlay") editWindow.innerHTML = "";
      });
  });
};

settingsScript();
