document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('registerForm');

    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = Object.fromEntries(new FormData(regForm));

            try {
                const res = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await res.json();
                alert(result.message);

                if (res.ok) {
                    if (result.role === 'enseignant') {
                        window.location.href = "creer.html";
                    } else {
                        alert("Étudiant inscrit. Interface étudiant à implémenter.");
                    }
                }

            } catch (err) {
                alert("Erreur réseau");
                console.error(err);
            }
        });
    }
});
