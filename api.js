// ================================
// CDPP FRONTEND API CONFIG
// ================================

// 🔥 IMPORTANT: Replace with your real backend URL
const API_BASE = "https://cdpp-backend.onrender.com/api";// 
// ================================
// HELPER: GET TOKEN
// ================================
function getToken() {
  return localStorage.getItem("token");
}

// ================================
// GENERIC REQUEST FUNCTION
// ================================
async function apiRequest(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json"
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("API Error:", error);
    return { success: false, message: "Server error" };
  }
}

// ================================
// AUTH FUNCTIONS
// ================================

async function login(email, password) {
  const data = await apiRequest("/auth/login", "POST", { email, password });

  if (data.success) {
    // 🔥 FIXED TOKEN PATH
    localStorage.setItem("token", data.data.token);
  }

  return data;
}

async function register(userData) {
  return await apiRequest("/auth/register", "POST", userData);
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// ================================
// MEMBER FUNCTIONS
// ================================

async function getMembers() {
  return await apiRequest("/members");
}

async function addMember(memberData) {
  return await apiRequest("/members", "POST", memberData);
}

// ================================
// PROGRAMS
// ================================

async function getPrograms() {
  return await apiRequest("/programs");
}

// ================================
// EVENTS
// ================================

async function getEvents() {
  return await apiRequest("/events");
}

// ================================
// TESTIMONIES
// ================================

async function getTestimonies() {
  return await apiRequest("/testimonies");
}

async function addTestimony(testimonyData) {
  return await apiRequest("/testimonies", "POST", testimonyData);
}

// ================================
// ADMIN
// ================================

async function changePassword(passwordData) {
  return await apiRequest("/admin/change-password", "PUT", passwordData);
}

// ================================
// DASHBOARD (OPTIONAL)
// ================================

async function getDashboardStats() {
  return await apiRequest("/admin/dashboard");
}