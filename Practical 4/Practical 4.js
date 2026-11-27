// GreenLife Hospital - Patient Registration validation
const form = document.getElementById("registrationForm");
const password = document.getElementById("password");
const strengthBox = document.getElementById("passwordStrength");

function setError(id, msg) {
    document.getElementById(id).textContent = msg;
    return msg === "";
}

// Password strength indicator
password.addEventListener("input", function () {
    const v = password.value;
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;
    const levels = [["", ""], ["Weak", "#d32f2f"], ["Fair", "#f57c00"], ["Good", "#fbc02d"], ["Strong", "#2e7d32"]];
    strengthBox.textContent = v ? levels[score][0] : "";
    strengthBox.style.color = levels[score][1];
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let ok = true;

    const name = document.getElementById("fullName").value.trim();
    ok = setError("nameError", /^[A-Za-z ]{3,}$/.test(name) ? "" : "Enter a valid name (letters only, min 3 characters).") && ok;

    const email = document.getElementById("email").value.trim();
    ok = setError("emailError", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a valid email address.") && ok;

    const mobile = document.getElementById("mobile").value.trim();
    ok = setError("mobileError", /^[6-9]\d{9}$/.test(mobile) ? "" : "Enter a valid 10-digit mobile number.") && ok;

    const emergency = document.getElementById("emergency").value.trim();
    let emMsg = "";
    if (!/^[6-9]\d{9}$/.test(emergency)) emMsg = "Enter a valid 10-digit emergency number.";
    else if (emergency === mobile) emMsg = "Emergency number must differ from your mobile number.";
    ok = setError("emergencyError", emMsg) && ok;

    const dob = document.getElementById("dob").value;
    let dobMsg = "";
    if (!dob) dobMsg = "Please select your date of birth.";
    else if (new Date(dob) > new Date()) dobMsg = "Date of birth cannot be in the future.";
    ok = setError("dobError", dobMsg) && ok;

    ok = setError("genderError", document.querySelector('input[name="gender"]:checked') ? "" : "Please select a gender.") && ok;
    ok = setError("bloodError", document.getElementById("bloodGroup").value ? "" : "Please select a blood group.") && ok;
    ok = setError("addressError", document.getElementById("address").value.trim().length >= 10 ? "" : "Address must be at least 10 characters.") && ok;

    const pw = password.value;
    ok = setError("passwordError", /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(pw) ? "" : "Password must be 8+ characters with letters and numbers.") && ok;
    ok = setError("confirmPasswordError", pw === document.getElementById("confirmPassword").value && pw !== "" ? "" : "Passwords do not match.") && ok;

    const file = document.getElementById("document").files[0];
    let fileMsg = "";
    if (file && file.size > 2 * 1024 * 1024) fileMsg = "File must be smaller than 2 MB.";
    ok = setError("fileError", fileMsg) && ok;

    ok = setError("termsError", document.getElementById("terms").checked ? "" : "Please confirm the information is correct.") && ok;

    const msg = document.getElementById("successMessage");
    if (ok) {
        msg.textContent = "Registration successful! Welcome to GreenLife Hospital, " + name + ".";
        form.reset();
        strengthBox.textContent = "";
    } else {
        msg.textContent = "";
    }
});
