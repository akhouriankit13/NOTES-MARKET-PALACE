// ===== ADMIN LOGIN =====
function adminLogin(){
  const adminUser = "admin";
  const adminPass = "admin123";

  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if(u === adminUser && p === adminPass){
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    document.getElementById("error").innerText = "Invalid credentials ❌";
  }
}

// ===== CHECK LOGIN =====
function checkAdmin(){
  if(localStorage.getItem("adminLoggedIn") !== "true"){
    window.location.href = "admin-login.html";
  }
}

// ===== LOGOUT =====
function logout(){
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin-login.html";
}

// ===== NOTES LOGIC =====
let notes = JSON.parse(localStorage.getItem("notes")) || [
  "DSA Notes - PDF",
  "DBMS Notes - PDF",
  "OS Notes - PDF"
];

function displayNotes(){
  let table = document.getElementById("notesTable");
  if(!table) return;

  table.innerHTML = `
    <tr>
      <th>Note Title</th>
      <th>Type</th>
    </tr>
  `;

  notes.forEach(note => {
    let parts = note.split(" - ");
    table.innerHTML += `
      <tr>
        <td>${parts[0]}</td>
        <td>${parts[1]}</td>
      </tr>
    `;
  });
}
displayNotes();

function addNote(){
  let title = document.getElementById("noteTitle").value;
  let type = document.getElementById("noteType").value;

  if(title === "" || type === ""){
    document.getElementById("msg").innerText = "Fill all fields";
    return;
  }

  notes.push(title + " - " + type);
  localStorage.setItem("notes", JSON.stringify(notes));

  document.getElementById("msg").innerText = "Note Added Successfully ✅";
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteType").value = "";

  displayNotes();
}
function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}

if(localStorage.getItem("theme") === "light"){
  document.body.classList.add("light");
}
if(document.getElementById("notesChart")){
  const ctx = document.getElementById("notesChart");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['DSA', 'DBMS', 'OS', 'CN'],
      datasets: [{
        label: 'Notes Count',
        data: [4, 6, 3, 5],
      }]
    }
  });
}
// ===== USER REGISTRATION =====
function registerUser(){
  let name = document.getElementById("regName").value;
  let email = document.getElementById("regEmail").value;
  let password = document.getElementById("regPassword").value;

  if(name === "" || email === "" || password === ""){
    document.getElementById("regMsg").innerText = "All fields required ❌";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exists = users.find(user => user.email === email);
  if(exists){
    document.getElementById("regMsg").innerText = "User already exists ❌";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("regMsg").innerText = "Registration successful ✅";
}

// ===== USER LOGIN =====
function loginUser(){
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === email && u.password === password);

  if(user){
    localStorage.setItem("loggedUser", JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    document.getElementById("loginMsg").innerText = "Invalid credentials ❌";
  }
}

// ===== CHECK USER LOGIN =====
function checkUser(){
  let user = JSON.parse(localStorage.getItem("loggedUser"));
  if(!user){
    alert("Please login first");
    window.location.href = "user-login.html";
  }
}

// ===== USER LOGOUT =====
function userLogout(){
  localStorage.removeItem("loggedUser");
  window.location.href = "user-login.html";
}
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if(loggedUser && document.getElementById("userName")){
  document.getElementById("userName").innerText = "Welcome, " + loggedUser.name;
}
function toggleChat(){
  let bot = document.getElementById("chatbot");
  bot.style.display = bot.style.display === "flex" ? "none" : "flex";
}

function sendMessage(){
  let input = document.getElementById("chatInput");
  let msg = input.value.trim();
  if(msg === "") return;

  let chatBody = document.getElementById("chatBody");

  chatBody.innerHTML += `<div class="user">${msg}</div>`;
  input.value = "";

  setTimeout(() => {
    chatBody.innerHTML += `<div class="bot">${botReply(msg)}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 500);
}
function botReply(msg){
  msg = msg.toLowerCase();

  // 👋 Greetings
  if(msg.includes("hi") || msg.includes("hello") || msg.includes("hey"))
    return "Hello 👋 How can I help you today?";

  // 👨‍💻 Developer Info
  if(
    msg.includes("who developed this") ||
    msg.includes("who made this") ||
    msg.includes("developer") ||
    msg.includes("creator")
  )
    return "This project is developed by Akhouri Ankit Kumar 👨‍💻";

  // 📧 Customer Support Email
  if(
    msg.includes("contact") ||
    msg.includes("email") ||
    msg.includes("customer service") ||
    msg.includes("support") ||
    msg.includes("help desk")
  )
    return "📧 You can contact our customer support at: support.notesplatform@gmail.com";

  // 🔐 Login Help
  if(msg.includes("login"))
    return "You can login using your registered email and password.";

  // 📝 Register Help
  if(msg.includes("register") || msg.includes("signup"))
    return "Click on User Register to create a new account.";

  // 🧑‍💼 Admin Help
  if(msg.includes("admin"))
    return "Admin can add, edit, and delete notes using the admin dashboard.";

  // 📚 Notes Info
  if(msg.includes("notes"))
    return "Notes are available in PDF and DOC format for different subjects.";

  // 🌙 Theme
  if(msg.includes("dark") || msg.includes("light"))
    return "Use the 🌙 button to switch between Dark and Light mode.";

  // 📱 Mobile
  if(msg.includes("mobile"))
    return "Yes 👍 This website is fully mobile responsive.";

  // ❓ Help
  if(msg.includes("help"))
    return "You can ask about login, register, admin, notes, or contact email.";

  // ❌ Default
  return "Sorry 😅 I didn’t understand. Try asking about support, notes, or login.";
}
