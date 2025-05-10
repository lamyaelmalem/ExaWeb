document.addEventListener("DOMContentLoaded", () => {
    const title = localStorage.getItem("examTitle");
    const description = localStorage.getItem("examDescription");
    const audience = localStorage.getItem("examAudience");
    const questions = JSON.parse(localStorage.getItem("examQuestions") || "[]");

    document.getElementById("examTitle").textContent = title || "Examen sans titre";
    document.getElementById("examDescription").textContent = description || "Aucune description.";
    document.getElementById("examAudience").textContent = audience || "Non spécifié.";

    const list = document.getElementById("examQuestions");

    // ✅ N'affiche que la dernière question enregistrée
    const latestQuestion = questions.slice(-1); // Prend la dernière question du tableau

    latestQuestion.forEach(q => {
        const li = document.createElement("li");
        let html = `<strong>${q.type.toUpperCase()}</strong> – ${q.enonce}<br>Note : ${q.note}`;

        if (q.type === "directe" && q.tolerance !== "") {
            html += `<br>Tolérance : ${q.tolerance}%`;
        }

        li.innerHTML = html;
        list.appendChild(li);
    });
});
