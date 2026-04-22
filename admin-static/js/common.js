/* 骑行平台管理后台 - 公共组件 */
const NAV_CONFIG = [
 { group: '核心', items: [
 { icon: '📊', label: '工作台', href: 'index.html', id: 'dashboard' },
 { icon: '🏃', label: '活动管理', href: 'activities.html', id: 'activities' },
 { icon: '📋', label: '报名管理', href: 'signups.html', id: 'signups', badge: 12 },
 ]},
 { group: '内容', items: [
 { icon: '🚴', label: '车辆管理', href: 'bikes.html', id: 'bikes' },
 { icon: '👥', label: '俱乐部管理', href: 'clubs.html', id: 'clubs' },
 ]},
 { group: '运营', items: [
 { icon: '👤', label: '用户管理', href: 'users.html', id: 'users' },
 ]},
];

function renderLayout(activeId, breadcrumbText) {
  const sidebar = document.getElementById('sidebar');
  const breadcrumb = document.getElementById('breadcrumb');
  
  // Render sidebar nav
  let navHTML = '';
  NAV_CONFIG.forEach(group => {
    navHTML += `<div class="nav-group-title">${group.group}</div>`;
    group.items.forEach(item => {
      const isActive = item.id === activeId;
      const badgeHTML = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
      navHTML += `
        <a href="${item.href}" class="nav-item${isActive ? ' active' : ''}">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
          ${badgeHTML}
        </a>`;
    });
  });
  
  const sidebarContent = `
    <div class="sidebar-logo">
      <div class="sidebar-logo-icon">🚴</div>
      <span class="sidebar-logo-text">骑行平台后台</span>
    </div>
    <nav class="sidebar-nav">${navHTML}</nav>
    <div style="padding:12px 20px;border-top:1px solid rgba(255,255,255,0.08);">
      <div class="nav-item" onclick="handleLogout()" style="color:rgba(255,255,255,0.4);">
        <span class="nav-icon">🚪</span>
        <span class="nav-label">退出登录</span>
      </div>
    </div>`;
  sidebar.innerHTML = sidebarContent;
  
  // Breadcrumb
  if (breadcrumb) {
    breadcrumb.innerHTML = `<a href="index.html">首页</a><span>/</span><span class="current">${breadcrumbText}</span>`;
  }
  
  // Collapse toggle
  const collapseBtn = document.getElementById('collapseBtn');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      localStorage.setItem('sidebar_collapsed', sidebar.classList.contains('collapsed'));
    });
    if (localStorage.getItem('sidebar_collapsed') === 'true') {
      sidebar.classList.add('collapsed');
    }
  }
  
  // User dropdown
  const userMenu = document.querySelector('.user-menu');
  const userDropdown = document.querySelector('.user-dropdown');
  if (userMenu && userDropdown) {
    userMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenu.classList.toggle('open');
      userDropdown.classList.toggle('show');
    });
    document.addEventListener('click', () => {
      userMenu.classList.remove('open');
      userDropdown.classList.remove('show');
    });
  }
}

function handleLogout() {
  localStorage.removeItem('admin_logged_in');
  localStorage.removeItem('admin_user');
  window.location.href = 'login.html';
}

/* Toast system */
function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', warning: '⚠️', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || '✅'}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* Modal helpers */
function openModal(id) {
  document.getElementById(id)?.classList.add('show');
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('show');
}

/* Tab switcher */
function initTabs(container) {
  const tabBtns = container.querySelectorAll('[data-tab]');
  const panes = container.querySelectorAll('[data-pane]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const target = container.querySelector(`[data-pane="${btn.dataset.tab}"]`);
      if (target) target.style.display = '';
    });
  });
  // Activate first
  if (tabBtns[0]) tabBtns[0].click();
}

/* Format date */
function formatDate(d) {
  if (!d) return '-';
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

/* Status tag helpers */
function statusTag(status) {
  const map = {
    '已报名': 'tag-success', '报名中': 'tag-info', '进行中': 'tag-info',
    '待支付': 'tag-warning', '已结束': 'tag-default', '已取消': 'tag-danger',
    '已上线': 'tag-success', '已下线': 'tag-default', '草稿': 'tag-warning',
    '报名未开始': 'tag-default', '报名已截止': 'tag-danger',
  };
  return `<span class="tag ${map[status] || 'tag-default'}">${status}</span>`;
}
