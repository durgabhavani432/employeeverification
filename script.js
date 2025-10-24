    // Users stored in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = null; // no auto-login on refresh

    const registerSection = document.getElementById('registerSection');
    const loginSection = document.getElementById('loginSection');
    const systemSection = document.getElementById('systemSection');

    // Show login/register toggles
    function showLogin() {
      registerSection.style.display = "none";
      loginSection.style.display = "block";
    }

    function showRegister() {
      loginSection.style.display = "none";
      registerSection.style.display = "block";
    }

    function logout() {
      currentUser = null;
      systemSection.style.display = "none";
      loginSection.style.display = "block";
    }

    // Registration
    document.getElementById('registerForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;

      if (users.find(u => u.email === email)) {
        alert("Email already registered!");
        return;
      }
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Please login.");
      showLogin();
      e.target.reset();
    });

    // Login
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        currentUser = user;
        loginSection.style.display = "none";
        registerSection.style.display = "none";
        systemSection.style.display = "block";
        e.target.reset();
      } else {
        alert("Invalid credentials!");
      }
    });

    // Employee System
    document.addEventListener("DOMContentLoaded", () => {
      let employeeID = 1;
      const employees = [];
      const form = document.getElementById('employeeForm');
      const tableBody = document.querySelector('#employeeTable tbody');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const employee = {
          id: employeeID++,
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          position: document.getElementById('position').value,
          company: document.getElementById('company').value,
          education: document.getElementById('education').value,
          avatar: "https://img.icons8.com/ios-filled/50/user.png",
          status: 'Pending'
        };
        employees.push(employee);
        renderTable();
        form.reset();
      });

      function renderTable() {
        tableBody.innerHTML = '';
        employees.forEach(emp => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${emp.id}</td>
            <td><img src="${emp.avatar}" class="avatar"></td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td><span class="badge ${emp.status}">${emp.status}</span></td>
            <td>
              <button class="action verify" onclick="updateStatus(${emp.id}, 'Verified')">Verify</button>
              <button class="action fail" onclick="updateStatus(${emp.id}, 'Failed')">Fail</button>
              <button class="action delete" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>`;
          tableBody.appendChild(row);
        });
      }

      window.updateStatus = function(id, status) {
        const emp = employees.find(e => e.id === id);
        if (emp) emp.status = status;
        renderTable();
      };

      window.deleteEmployee = function(id) {
        const index = employees.findIndex(e => e.id === id);
        if (index > -1) employees.splice(index, 1);
        renderTable();
      };
    });