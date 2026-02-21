/**
 * Teacher Dashboard Management
 * Handles section navigation, homework creation, attendance, and grading.
 */

const API_BASE = (window.SCHOOL_CONFIG && window.SCHOOL_CONFIG.apiBase) || 'http://localhost:8000';

// ──────────────────────────────────────────────
//  Section Navigation
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link[data-section]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateTo(section);
        });
    });
});

function navigateTo(section) {
    // Update active nav link
    document.querySelectorAll('.nav-link[data-section]').forEach(l => {
        l.classList.remove('bg-purple-100', 'text-purple-700', 'font-bold');
        l.classList.add('text-gray-600', 'hover:bg-gray-50');
    });
    const activeLink = document.querySelector(`.nav-link[data-section="${section}"]`);
    if (activeLink) {
        activeLink.classList.add('bg-purple-100', 'text-purple-700', 'font-bold');
        activeLink.classList.remove('text-gray-600', 'hover:bg-gray-50');
    }

    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    switch (section) {
        case 'dashboard': loadDashboardStats(); break;
        case 'classes':   renderClassesSection(mainContent); break;
        case 'homework':  renderHomeworkSection(mainContent); break;
        case 'attendance': renderAttendanceSection(mainContent); break;
        case 'announcements': renderAnnouncementsSection(mainContent); break;
    }
}

// ──────────────────────────────────────────────
//  Helpers
// ──────────────────────────────────────────────
function authHeaders() {
    return { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' };
}

function loadingHTML(msg = 'Loading...') {
    return `<div class="text-center py-12"><i class="fas fa-spinner fa-spin text-3xl text-purple-500"></i><p class="mt-3 text-gray-500">${msg}</p></div>`;
}

function errorHTML(msg = 'Failed to load data.') {
    return `<div class="text-center py-12"><i class="fas fa-exclamation-triangle text-3xl text-red-400"></i><p class="mt-3 text-red-500">${msg}</p></div>`;
}

// ──────────────────────────────────────────────
//  Classes Section
// ──────────────────────────────────────────────
async function renderClassesSection(container) {
    container.innerHTML = `<div class="bg-white rounded-2xl p-8 shadow-lg">${loadingHTML('Loading classes...')}</div>`;

    try {
        const res = await fetch(`${API_BASE}/api/teacher/classes`, { headers: authHeaders() });
        const data = await res.json();
        const classes = (data.data && data.data.classes) || [];

        container.innerHTML = `
        <div class="bg-white rounded-2xl p-8 shadow-lg">
            <h2 class="font-fredoka text-2xl text-purple-700 mb-6">🏫 My Classes</h2>
            ${classes.length === 0 ? '<p class="text-gray-500">No classes assigned yet.</p>' :
              `<div class="grid md:grid-cols-2 gap-6">
                ${classes.map(cls => `
                  <div class="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                    <h3 class="font-bold text-xl text-gray-800 mb-1">${cls.name || 'Class'}</h3>
                    <p class="text-sm text-gray-500 mb-3">Grade: ${cls.grade || 'N/A'}</p>
                    <div class="flex items-center gap-2 text-purple-600">
                      <i class="fas fa-users"></i>
                      <span>${(cls.students && cls.students.length) || 0} students</span>
                    </div>
                  </div>`).join('')}
              </div>`}
        </div>`;
    } catch {
        container.innerHTML = `<div class="bg-white rounded-2xl p-8 shadow-lg">${errorHTML()}</div>`;
    }
}

// ──────────────────────────────────────────────
//  Homework Section
// ──────────────────────────────────────────────
async function renderHomeworkSection(container) {
    container.innerHTML = `<div class="bg-white rounded-2xl p-8 shadow-lg">${loadingHTML('Loading homework...')}</div>`;

    try {
        const res = await fetch(`${API_BASE}/api/homework`, { headers: authHeaders() });
        const data = await res.json();
        const list = (data.data && data.data.homework) || [];

        container.innerHTML = `
        <div class="bg-white rounded-2xl p-8 shadow-lg">
            <div class="flex justify-between items-center mb-6">
                <h2 class="font-fredoka text-2xl text-purple-700">📚 Homework</h2>
                <button onclick="showCreateHomeworkForm()" class="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl font-semibold transition">
                    <i class="fas fa-plus mr-2"></i>Create
                </button>
            </div>
            ${list.length === 0 ? '<p class="text-gray-500">No homework assigned yet.</p>' :
              `<div class="space-y-4">
                ${list.map(hw => `
                  <div class="border border-gray-100 rounded-xl p-5 hover:shadow-md transition">
                    <div class="flex justify-between items-start">
                      <div>
                        <h4 class="font-bold text-gray-800">${hw.title}</h4>
                        <p class="text-sm text-gray-500 mt-1">${hw.description || ''}</p>
                        <p class="text-xs text-gray-400 mt-2">Due: ${hw.dueDate ? new Date(hw.dueDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <span class="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                        ${(hw.submissions && hw.submissions.length) || 0} submissions
                      </span>
                    </div>
                  </div>`).join('')}
              </div>`}
        </div>`;
    } catch {
        container.innerHTML = `<div class="bg-white rounded-2xl p-8 shadow-lg">${errorHTML()}</div>`;
    }
}

// ──────────────────────────────────────────────
//  Attendance Section
// ──────────────────────────────────────────────
async function renderAttendanceSection(container) {
    container.innerHTML = `<div class="bg-white rounded-2xl p-8 shadow-lg">${loadingHTML('Loading classes...')}</div>`;

    try {
        const res = await fetch(`${API_BASE}/api/teacher/classes`, { headers: authHeaders() });
        const data = await res.json();
        const classes = (data.data && data.data.classes) || [];

        container.innerHTML = `
        <div class="bg-white rounded-2xl p-8 shadow-lg">
            <div class="flex justify-between items-center mb-6">
                <h2 class="font-fredoka text-2xl text-purple-700">📅 Attendance</h2>
                <button onclick="showMarkAttendanceForm()" class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold transition">
                    <i class="fas fa-check-circle mr-2"></i>Mark Today
                </button>
            </div>
            ${classes.length === 0 ? '<p class="text-gray-500">No classes assigned yet.</p>' :
              `<div class="grid md:grid-cols-2 gap-6">
                ${classes.map(cls => `
                  <div class="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <h3 class="font-bold text-lg text-gray-800 mb-1">${cls.name}</h3>
                    <p class="text-sm text-gray-500">${(cls.students && cls.students.length) || 0} students</p>
                    <button onclick="showMarkAttendanceForm('${cls._id}', '${cls.name}')"
                            class="mt-3 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition">
                        Mark Attendance
                    </button>
                  </div>`).join('')}
              </div>`}
        </div>`;
    } catch {
        container.innerHTML = `<div class="bg-white rounded-2xl p-8 shadow-lg">${errorHTML()}</div>`;
    }
}

// ──────────────────────────────────────────────
//  Announcements Section
// ──────────────────────────────────────────────
async function renderAnnouncementsSection(container) {
    container.innerHTML = `<div class="bg-white rounded-2xl p-8 shadow-lg">${loadingHTML('Loading announcements...')}</div>`;

    try {
        const res = await fetch(`${API_BASE}/api/announcements`, { headers: authHeaders() });
        const data = await res.json();
        const list = (data.data && data.data.announcements) || [];

        container.innerHTML = `
        <div class="bg-white rounded-2xl p-8 shadow-lg">
            <h2 class="font-fredoka text-2xl text-purple-700 mb-6">📢 Announcements</h2>
            ${list.length === 0 ? '<p class="text-gray-500">No announcements yet.</p>' :
              `<div class="space-y-4">
                ${list.map(a => `
                  <div class="border-l-4 border-purple-400 bg-purple-50 rounded-xl p-5">
                    <h4 class="font-bold text-gray-800">${a.title}</h4>
                    <p class="text-sm text-gray-600 mt-1">${a.content || ''}</p>
                    <p class="text-xs text-gray-400 mt-2">${a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ''}</p>
                  </div>`).join('')}
              </div>`}
        </div>`;
    } catch {
        container.innerHTML = `<div class="bg-white rounded-2xl p-8 shadow-lg">${errorHTML()}</div>`;
    }
}

// ──────────────────────────────────────────────
//  Create Homework Modal
// ──────────────────────────────────────────────
function showCreateHomeworkForm() {
    removeModal();
    const modal = document.createElement('div');
    modal.id = 'teacherModal';
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl" onclick="event.stopPropagation()">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-fredoka text-2xl text-purple-700">📝 Create Homework</h3>
          <button onclick="removeModal()" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <form id="hwForm" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
            <input name="title" required class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-300 outline-none" placeholder="e.g. Count to 10">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea name="description" rows="3" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-300 outline-none" placeholder="Instructions for students..."></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Due Date *</label>
              <input name="dueDate" type="date" required class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-300 outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Max Score</label>
              <input name="maxScore" type="number" value="100" min="1" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-300 outline-none">
            </div>
          </div>
          <div id="hwFormMsg"></div>
          <div class="flex gap-3 pt-2">
            <button type="submit" class="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition">
              <i class="fas fa-paper-plane mr-2"></i>Assign
            </button>
            <button type="button" onclick="removeModal()" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition">Cancel</button>
          </div>
        </form>
      </div>`;
    modal.addEventListener('click', removeModal);
    document.body.appendChild(modal);

    document.getElementById('hwForm').addEventListener('submit', async e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const msg = document.getElementById('hwFormMsg');
        msg.innerHTML = loadingHTML('Saving...');
        try {
            const res = await fetch(`${API_BASE}/api/homework`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({
                    title: fd.get('title'),
                    description: fd.get('description'),
                    dueDate: fd.get('dueDate'),
                    maxScore: fd.get('maxScore') || 100
                })
            });
            const data = await res.json();
            if (res.ok) {
                msg.innerHTML = `<div class="bg-green-100 text-green-700 p-3 rounded-xl text-sm font-semibold">✅ Homework created successfully!</div>`;
                setTimeout(removeModal, 1200);
            } else {
                msg.innerHTML = `<div class="bg-red-100 text-red-600 p-3 rounded-xl text-sm">${data.message || 'Error creating homework.'}</div>`;
            }
        } catch {
            msg.innerHTML = `<div class="bg-red-100 text-red-600 p-3 rounded-xl text-sm">Server error. Please try again.</div>`;
        }
    });
}

// ──────────────────────────────────────────────
//  Mark Attendance Modal
// ──────────────────────────────────────────────
async function showMarkAttendanceForm(classId = '', className = '') {
    removeModal();

    // Fetch class list if no specific class chosen
    let classes = [];
    if (!classId) {
        try {
            const res = await fetch(`${API_BASE}/api/teacher/classes`, { headers: authHeaders() });
            const data = await res.json();
            classes = (data.data && data.data.classes) || [];
        } catch { /* ignore */ }
    }

    const today = new Date().toISOString().split('T')[0];
    const modal = document.createElement('div');
    modal.id = 'teacherModal';
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl" onclick="event.stopPropagation()">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-fredoka text-2xl text-green-700">✅ Mark Attendance</h3>
          <button onclick="removeModal()" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <form id="attForm" class="space-y-4">
          ${!classId && classes.length > 0 ? `
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Select Class *</label>
            <select name="classId" required id="attClassSelect" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-300 outline-none">
              <option value="">-- Choose class --</option>
              ${classes.map(c => `<option value="${c._id}">${c.name}</option>`).join('')}
            </select>
          </div>` : `<input type="hidden" name="classId" value="${classId}">`}
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Date *</label>
              <input name="date" type="date" value="${today}" required class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-300 outline-none">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Status *</label>
              <select name="status" required class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-300 outline-none">
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Notes (optional)</label>
            <input name="notes" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-300 outline-none" placeholder="Any remarks...">
          </div>
          <div id="attFormMsg"></div>
          <div class="flex gap-3 pt-2">
            <button type="submit" class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition">
              <i class="fas fa-check mr-2"></i>Save
            </button>
            <button type="button" onclick="removeModal()" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition">Cancel</button>
          </div>
        </form>
      </div>`;
    modal.addEventListener('click', removeModal);
    document.body.appendChild(modal);

    document.getElementById('attForm').addEventListener('submit', async e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const msg = document.getElementById('attFormMsg');
        msg.innerHTML = loadingHTML('Saving...');
        try {
            const res = await fetch(`${API_BASE}/api/attendance`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({
                    classId: fd.get('classId'),
                    date: fd.get('date'),
                    status: fd.get('status'),
                    notes: fd.get('notes')
                })
            });
            const data = await res.json();
            if (res.ok) {
                msg.innerHTML = `<div class="bg-green-100 text-green-700 p-3 rounded-xl text-sm font-semibold">✅ Attendance saved!</div>`;
                setTimeout(removeModal, 1200);
            } else {
                msg.innerHTML = `<div class="bg-red-100 text-red-600 p-3 rounded-xl text-sm">${data.message || 'Error saving.'}</div>`;
            }
        } catch {
            msg.innerHTML = `<div class="bg-red-100 text-red-600 p-3 rounded-xl text-sm">Server error. Please try again.</div>`;
        }
    });
}

// ──────────────────────────────────────────────
//  Grade Submission Modal
// ──────────────────────────────────────────────
function gradeSubmission(homeworkId, submissionId) {
    removeModal();
    const modal = document.createElement('div');
    modal.id = 'teacherModal';
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl" onclick="event.stopPropagation()">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-fredoka text-2xl text-blue-700">⭐ Grade Submission</h3>
          <button onclick="removeModal()" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <form id="gradeForm" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Score (out of 100) *</label>
            <input name="grade" type="number" min="0" max="100" required
              class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none text-2xl font-bold text-center"
              placeholder="85">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Feedback (optional)</label>
            <textarea name="feedback" rows="3" class="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-300 outline-none" placeholder="Great work! Keep it up..."></textarea>
          </div>
          <div id="gradeFormMsg"></div>
          <div class="flex gap-3 pt-2">
            <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
              <i class="fas fa-star mr-2"></i>Save Grade
            </button>
            <button type="button" onclick="removeModal()" class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition">Cancel</button>
          </div>
        </form>
      </div>`;
    modal.addEventListener('click', removeModal);
    document.body.appendChild(modal);

    document.getElementById('gradeForm').addEventListener('submit', async e => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const msg = document.getElementById('gradeFormMsg');
        msg.innerHTML = loadingHTML('Saving grade...');
        try {
            const res = await fetch(`${API_BASE}/api/homework/${homeworkId}/submissions/${submissionId}/grade`, {
                method: 'PATCH',
                headers: authHeaders(),
                body: JSON.stringify({
                    grade: Number(fd.get('grade')),
                    feedback: fd.get('feedback')
                })
            });
            const data = await res.json();
            if (res.ok) {
                msg.innerHTML = `<div class="bg-green-100 text-green-700 p-3 rounded-xl text-sm font-semibold">✅ Grade saved!</div>`;
                setTimeout(() => { removeModal(); loadDashboardStats(); }, 1200);
            } else {
                msg.innerHTML = `<div class="bg-red-100 text-red-600 p-3 rounded-xl text-sm">${data.message || 'Error saving grade.'}</div>`;
            }
        } catch {
            msg.innerHTML = `<div class="bg-red-100 text-red-600 p-3 rounded-xl text-sm">Server error. Please try again.</div>`;
        }
    });
}

// ──────────────────────────────────────────────
//  Utility
// ──────────────────────────────────────────────
function removeModal() {
    const m = document.getElementById('teacherModal');
    if (m) m.remove();
}
