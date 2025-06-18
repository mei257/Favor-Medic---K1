function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const toggleButton = passwordField.nextElementSibling;

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.classList.add('visible');
    } else {
        passwordField.type = 'password';
        toggleButton.classList.remove('visible');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Populate days
    const daySelect = document.getElementById('day');
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        daySelect.add(option);
    }

    // Populate months
    const monthSelect = document.getElementById('month');
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.text = month;
        monthSelect.add(option);
    });

    // Populate years
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        yearSelect.add(option);
    }

    // Form submission
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Ambil semua input value
        const fullName = document.getElementById('fullName').value.trim();
        const nik = document.getElementById('nik').value.trim();
        const birthPlace = document.getElementById('tempatLahir').value.trim();
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const weight = document.getElementById('weight').value;
        const height = document.getElementById('height').value;
        const bloodType = document.getElementById('bloodType').value;
        const allergy = document.getElementById('allergy').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validasi field kosong
        if (!fullName || !nik || !birthPlace || !day || !month || !year || !gender || !weight || !height || !bloodType || !email || !password || !confirmPassword) {
            alert('Harap isi semua field wajib!');
            return;
        }

        // Validasi password sama
        if (password !== confirmPassword) {
            alert('Password dan Re-Password tidak cocok!');
            return;
        }

        const userProfile = {
            fullName,
            nik,
            birthPlace,
            dob: `${day}-${month}-${year}`,
            gender,
            weight,
            height,
            bloodType,
            allergy,
            email,
            password // Penting: disimpan agar bisa login nanti
        };

        localStorage.setItem('userData', JSON.stringify(userProfile));
        alert('Pendaftaran berhasil!');
        window.location.href = 'signin.html';
    });
});
