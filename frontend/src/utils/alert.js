import Swal from 'sweetalert2';

// Function to show an alert using SweetAlert2
export const showAlert = (title, text, icon = "info") => {
  return Swal.fire({
    title,
    text,
    icon,
  });
};

// Create success alert
export const confirmCreate = () => {
  return Swal.fire({
    title: "Do you want to create this system?",
    showCancelButton: true,
    confirmButtonText: "Create",
    cancelButtonText: "Cancel",
  });
};

// Update confirmation + response
export const confirmUpdate = () => {
  return Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  });
};

// Delete confirmation
export const confirmDelete = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};

// Success alerts after action
export const showCreateSuccess = () => {
  return Swal.fire(
    "Created!", 
    "System created successfully.", 
    "success"
  );
};

// Success alerts after action
export const showUpdateSuccess = () => {
  return Swal.fire(
    "Saved", 
    "System updated successfully.", 
    "success"
  );
};

// Delete alert after success
export const showDeleteSuccess = () => {
  return Swal.fire(
    "Deleted", 
    "System deleted successfully.", 
    "success"
  );
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
