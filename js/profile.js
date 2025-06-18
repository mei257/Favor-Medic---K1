document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('userData'));
  if (!user) {
    alert('Data tidak ditemukan. Silakan registrasi.');
    window.location.href = 'register.html';
    return;
  }

  document.getElementById('fullName').value = user.fullName || '';
  document.getElementById('gender').value = user.gender || '';
  document.getElementById('birthPlace').value = user.birthPlace || '';
  document.getElementById('birthDate').value = user.dob || '';
  document.getElementById('email').value = user.email || '';
  document.getElementById('nik').value = user.nik || '';
  document.getElementById('weight').value = user.weight || '';
  document.getElementById('height').value = user.height || '';
  document.getElementById('bloodType').value = user.bloodType || '';
  document.getElementById('allergy').value = user.allergy || '';
});

function signOut() {
  localStorage.removeItem('userData');
  alert('Berhasil keluar!');
  window.location.href = 'login.html';
}

function editProfile() {
  window.location.href = 'register.html';
}
