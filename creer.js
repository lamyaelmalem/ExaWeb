document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("examForm");
    const linkSection = document.getElementById("linkSection");
    const generatedLink = document.getElementById("generatedLink");

    
    const nextStepBtn = document.createElement("button");
    nextStepBtn.textContent = "Étape suivante : Ajouter des questions";
    nextStepBtn.type = "button"; 
    nextStepBtn.className = "next-step-btn"; 
    nextStepBtn.style.display = "none"; 
    linkSection.appendChild(nextStepBtn);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const audience = document.getElementById("audience").value.trim();

        if (title && description && audience) {
            // Génération du lien d'examen
            const slug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));
            const examLink = `https://exaweb.app/exam/${slug}`;

            generatedLink.textContent = examLink;
            linkSection.style.display = "block";
            nextStepBtn.style.display = "inline-block"; // Afficher le bouton "Étape suivante"

            
            localStorage.setItem("examSlug", slug);
            localStorage.setItem("examTitle", title);
            localStorage.setItem("examDescription", description);
            localStorage.setItem("examAudience", audience);

            form.reset();
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    });

    nextStepBtn.addEventListener("click", () => {
        window.location.href = "ajou.html";
    });
});
