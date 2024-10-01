// Get references to the form and display area
var resumeForm = document.getElementById('form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('skills').value; // Corrected assignment
    var skills = document.getElementById('experience').value; // Corrected assignment
    // Save form data in localStorage with the username as the key
    var resumeData = { name: name, email: email, phone: phone, education: education, skills: skills, experience: experience };
    localStorage.setItem(username, JSON.stringify(resumeData));
    // Generate the resume content dynamically
    var resumeHTML = generateResumeHTML(resumeData);
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    if (shareableLinkContainer) { // Null check
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    }
});
// Generate HTML for the resume
function generateResumeHTML(data) {
    return "\n        <h2>Editable Resume</h2>\n        <h3>Personal Information</h3>\n        <p><b>Name:</b> <span contenteditable=\"true\">".concat(data.name, "</span></p>\n        <p><b>Email:</b> <span contenteditable=\"true\">").concat(data.email, "</span></p>\n        <p><b>Phone:</b> <span contenteditable=\"true\">").concat(data.phone, "</span></p>\n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(data.education, "</p>\n        <h3>Experience</h3>\n        <p contenteditable=\"true\">").concat(data.skills, "</p>\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(data.experience, "</p>\n    ");
}
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('skills').value = resumeData.experience; // Corrected assignment
            document.getElementById('experience').value = resumeData.skills; // Corrected assignment
        }
    }
});
