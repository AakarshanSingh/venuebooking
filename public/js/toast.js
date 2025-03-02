class Toast {
  constructor() {
    this.createToastContainer();
  }

  createToastContainer() {
    if (!document.querySelector('.toast-container')) {
      const container = document.createElement('div');
      container.className = 'toast-container toast-container-center';
      document.body.appendChild(container);
    }
  }

  show(options) {
    const { title, message, type = 'info', duration = 5000 } = options;
    const container = document.querySelector('.toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Create toast content
    let iconSvg = '';
    
    if (type === 'success') {
      iconSvg = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    } else {
      iconSvg = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }
    
    // Create toast HTML structure
    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-content">
        <div class="toast-title">${title || ''}</div>
        <div class="toast-message">${message || ''}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;
    
    // Append to container
    container.appendChild(toast);
    
    // Add event listener for close button
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => this.dismiss(toast));
    
    // Auto dismiss after duration
    setTimeout(() => this.dismiss(toast), duration);
    
    return toast;
  }

  dismiss(toast) {
    toast.classList.add('toast-exiting');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }
}

// Initialize toast
const toast = new Toast();

// Check for alerts on load and convert to toast
document.addEventListener('DOMContentLoaded', () => {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    let type = 'info';
    if (alert.classList.contains('alert-danger')) type = 'error';
    if (alert.classList.contains('alert-success')) type = 'success';
    if (alert.classList.contains('alert-warning')) type = 'warning';
    if (alert.classList.contains('alert-primary')) type = 'info';
    
    toast.show({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      message: alert.textContent.trim(),
      type: type
    });
    
    // Hide original alert
    alert.style.display = 'none';
  });
});