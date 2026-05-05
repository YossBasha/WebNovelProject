document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("userToken") || sessionStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  if (!token || userRole !== "Admin") {
    alert("Access Denied. Admin privileges required.");
    window.location.href = "index.html";
    return;
  }

  const API_BASE = "https://premedical-dismally-tillie.ngrok-free.dev";
  const usersTableBody = document.getElementById("usersTableBody");
  
  async function fetchUsers() {
    try {
      const response = await fetch(`${API_BASE}/api/admin/users`, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        }
      });
      if (response.ok) {
        const users = await response.json();
        renderUsers(users);
      } else if (response.status === 401 || response.status === 403) {
        alert("Session expired or access denied.");
        window.location.href = "index.html";
      } else {
        const err = await response.json().catch(() => ({}));
        alert("Failed to load users: " + (err.message || response.status));
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Network error fetching users.");
    }
  }

  function renderUsers(users) {
    usersTableBody.innerHTML = "";
    users.forEach(u => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="text-white-50">#${u.Id}</td>
        <td class="fw-bold">${u.Username}</td>
        <td>${u.Email}</td>
        <td>
          <span class="badge ${u.Role === 'Admin' ? 'bg-danger' : (u.Role === 'Author' ? 'bg-warning text-dark' : 'bg-primary')}">
            ${u.Role}
          </span>
        </td>
        <td class="text-white-50">${u.AuthorId || '-'}</td>
        <td>
          <button class="btn btn-sm btn-outline-warning edit-role-btn" 
                  data-id="${u.Id}" 
                  data-username="${u.Username}" 
                  data-role="${u.Role}" 
                  data-authorid="${u.AuthorId || ''}">
            <i class="bi bi-pencil-square"></i> Edit
          </button>
        </td>
      `;
      usersTableBody.appendChild(tr);
    });

    // Attach event listeners for edit buttons
    document.querySelectorAll(".edit-role-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const t = e.currentTarget;
        document.getElementById("editUserId").value = t.getAttribute("data-id");
        document.getElementById("editUsername").value = t.getAttribute("data-username");
        document.getElementById("editRoleSelect").value = t.getAttribute("data-role");
        document.getElementById("editAuthorId").value = t.getAttribute("data-authorid");
        
        const modal = new bootstrap.Modal(document.getElementById('editRoleModal'));
        modal.show();
      });
    });
  }

  document.getElementById("editRoleForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("editUserId").value;
    const role = document.getElementById("editRoleSelect").value;
    const authorId = document.getElementById("editAuthorId").value;

    try {
      const response = await fetch(`${API_BASE}/api/admin/users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ role, authorId: authorId ? parseInt(authorId) : null })
      });

      if (response.ok) {
        const modalEl = document.getElementById('editRoleModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        fetchUsers();
      } else {
        const errData = await response.json().catch(() => ({}));
        alert("Failed to update role: " + (errData.message || response.statusText));
      }
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Network error updating role.");
    }
  });

  // Initial load
  fetchUsers();
});
