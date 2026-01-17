const form = document.getElementById('contact-form');
const result = document.getElementById('result');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Validation
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    let isValid = true;

    // Reset previous styles
    [name, email, subject, message].forEach(el => {
        el.classList.remove('border-red-500');
        el.classList.add('border-[#dbdfe6]', 'dark:border-gray-700');
    });

    if (!name.value.trim()) {
        markError(name);
        isValid = false;
    }

    if (!email.value.trim() || !validateEmail(email.value)) {
        markError(email);
        isValid = false;
    }

    if (!subject.value.trim()) {
        markError(subject);
        isValid = false;
    }

    if (!message.value.trim()) {
        markError(message);
        isValid = false;
    }

    if (!isValid) {
        showResult('Please fill in all fields correctly.', 'text-red-500');
        return;
    }

    // Prepare data
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    showResult('Sending message...', 'text-gray-500');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            const json = await response.json();
            if (response.status == 200) {
                showResult(json.message, 'text-green-500');
                form.reset();
            } else {
                console.log(response);
                showResult(json.message, 'text-red-500');
            }
        })
        .catch(error => {
            console.log(error);
            showResult('Something went wrong!', 'text-red-500');
        })
        .then(function () {
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
});

function markError(element) {
    element.classList.remove('border-[#dbdfe6]', 'dark:border-gray-700');
    element.classList.add('border-red-500');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showResult(message, colorClass) {
    result.innerHTML = message;
    result.className = `text-center mt-4 text-sm font-semibold ${colorClass}`;
    result.style.display = 'block';
}
