/* =========================
   GLOBAL DATA
========================= */
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

/* =========================
   BOOK SERVICE
========================= */
function bookService() {
  let name = document.getElementById("name").value;
  let mobile = document.getElementById("mobile").value;
  let service = document.getElementById("service").value;

  if (name === "" || mobile === "" || service === "") {
    alert("Please fill all details");
    return;
  }

  let now = new Date();

  let booking = {
    name: name,
    mobile: mobile,
    service: service,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  };

  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Service Booked Successfully!");

  document.getElementById("name").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("service").value = "";
}

/* =========================
   SHOW BOOKINGS (ADMIN)
========================= */
function showBookings() {
  let tableBody = document.getElementById("bookingData");
  let total = document.getElementById("totalBookings");
  let todayElement = document.getElementById("todayBookings");

  if (!tableBody) return;

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  tableBody.innerHTML = "";

  let todayDate = new Date().toLocaleDateString();
  let todayCount = 0;

  bookings.forEach((b, index) => {

    if (b.date === todayDate) {
      todayCount++;
    }

    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${b.name}</td>
      <td>${b.mobile}</td>
      <td>${b.service}</td>
      <td>${b.date || "-"}</td>
      <td>${b.time || "-"}</td>
      <td>
        <button class="delete-btn" onclick="deleteBooking(${index})">
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  if (total) total.innerText = bookings.length;
  if (todayElement) todayElement.innerText = todayCount;
}

/* =========================
   DELETE BOOKING
========================= */
function deleteBooking(index) {
  let confirmDelete = confirm("Are you sure you want to delete this booking?");
  
  if (confirmDelete) {
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    showBookings();
  }
}

let acCount = 0;
let electricalCount = 0;

/* =========================
   ADMIN LOGIN
========================= */
function adminLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    alert("Invalid Username or Password");
  }
}

/* =========================
   LOGOUT
========================= */
function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "login.html";
}

function searchBooking() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let rows = document.querySelectorAll("#bookingData tr");

  rows.forEach(row => {
    let name = row.children[0].innerText.toLowerCase();

    if (name.includes(input)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}


/* =========================
   PAGE LOAD
========================= */
document.addEventListener("DOMContentLoaded", function () {
  showBookings();
});