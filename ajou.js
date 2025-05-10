document.addEventListener("DOMContentLoaded", () => {
    const title = localStorage.getItem("examTitle");
    const slug = localStorage.getItem("examSlug");

    if (!title || !slug) {
        alert("Aucun examen trouvé. Veuillez d'abord créer un examen.");
        window.location.href = "creer.html";
        return;
    }

    
    const h2 = document.querySelector("h2");
    h2.textContent += ` – ${title}`;

    const typeSelect = document.getElementById("type");
    const directeOptions = document.getElementById("directeOptions");
    const qcmOptions = document.getElementById("qcmOptions");
    const qcmContainer = document.getElementById("qcmContainer");
    const addOptionBtn = document.getElementById("addOption");
    const questionForm = document.getElementById("questionForm");
    const questionsList = document.getElementById("questions");

    typeSelect.addEventListener("change", () => {
        if (typeSelect.value === "qcm") {
            qcmOptions.style.display = "block";
            directeOptions.style.display = "none";
        } else {
            qcmOptions.style.display = "none";
            directeOptions.style.display = "block";
        }
    });

    function createOptionElement() {
        const option = document.createElement("div");
        option.className = "qcm-option";
        const uniqueId = "checkbox-" + Date.now();

        option.innerHTML = `
      <input type="text" placeholder="Option" class="qcm-text">
      <input type="checkbox" class="qcm-correct" id="${uniqueId}">
      <label for="${uniqueId}" class="qcm-label">Bonne réponse</label>
      <button type="button" class="supprimer-option">Supprimer</button>
    `;

        option.querySelector(".supprimer-option").addEventListener("click", () => {
            option.remove();
        });

        return option;
    }

    addOptionBtn.addEventListener("click", () => {
        const option = createOptionElement();
        qcmContainer.appendChild(option);
    });

    questionForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const type = typeSelect.value;
        const enonce = document.getElementById("enonce").value;
        const note = document.getElementById("note").value;
        const duree = document.getElementById("duree").value;

        const questionData = {
            type,
            enonce,
            note: parseInt(note),
            duree: parseInt(duree),
            examen: slug
        };

        if (type === "directe") {
            questionData.reponse = document.getElementById("reponse").value;
            questionData.tolerance = document.getElementById("tolerance").value;
        } else {
            questionData.options = [];
            qcmContainer.querySelectorAll(".qcm-option").forEach(opt => {
                questionData.options.push({
                    text: opt.querySelector(".qcm-text").value,
                    correct: opt.querySelector(".qcm-correct").checked
                });
            });
        }

        const allQuestions = JSON.parse(localStorage.getItem("examQuestions") || "[]");
        allQuestions.push(questionData);
        localStorage.setItem("examQuestions", JSON.stringify(allQuestions));

    
        let html = `<strong>${type.toUpperCase()}</strong> - ${enonce}<br>Note: ${note} - Durée: ${duree}s`;

        if (type === "directe") {
            html += `<br>Réponse: ${questionData.reponse} (Tolérance: ${questionData.tolerance}%)`;
        } else {
            html += `<ul>`;
            questionData.options.forEach(opt => {
                html += `<li>${opt.text} ${opt.correct ? "(✔)" : ""}</li>`;
            });
            html += `</ul>`;
        }

        const li = document.createElement("li");
        li.innerHTML = html;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Supprimer";
        delBtn.onclick = () => li.remove();
        li.appendChild(delBtn);

        questionsList.appendChild(li);
        questionForm.reset();
        qcmContainer.innerHTML = "";
        addOptionBtn.click();
        typeSelect.dispatchEvent(new Event("change"));
    });

    
    addOptionBtn.click();
});
const finishBtn = document.getElementById("finishExam");
finishBtn.addEventListener("click", () => {
    window.location.href = "resume.html";
});
