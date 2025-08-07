function showProfile(profileNumber, buttonElement) {
    const profiles = document.querySelectorAll('.profile');
    profiles.forEach(profile => {
        profile.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const selectedProfile = document.getElementById('profile' + profileNumber);
    selectedProfile.classList.add('active');

    buttonElement.classList.add('active');
}

document.addEventListener('keydown', function(e) {
    if (e.key === '1') {
        const button1 = document.querySelector('.tab-button:first-child');
        showProfile(1, button1);
    } else if (e.key === '2') {
        const button2 = document.querySelector('.tab-button:last-child');
        showProfile(2, button2);
    }
});