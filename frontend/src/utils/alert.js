import Swal from 'sweetalert2';

// Function to show an alert using SweetAlert2
export const showAlert = (title, text, icon = 'info') => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'OK'
  });
};

// Function to hide any existing alert
export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
  
// Function to show a custom alert message
export const showsAlert = (type, msg, time = 7) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
};
