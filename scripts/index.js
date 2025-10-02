const questionsData = [
    { q: "Você gosta de trabalhar com cores e formas?", options: ["Sim, adoro", "Mais ou menos", "Prefiro lógica", "Não gosto"] },
    { q: "Você tem interesse em tipografia?", options: ["Muito", "Algum", "Pouco", "Nenhum"] },
    { q: "Prefere organizar layouts ou escrever algoritmos?", options: ["Layouts", "Ambos", "Algoritmos", "Nenhum"] },
    { q: "Costuma usar softwares gráficos (Figma, Photoshop)?", options: ["Sim, sempre", "Às vezes", "Raramente", "Nunca"] },
    { q: "Gosta de pensar na experiência do usuário?", options: ["Sim", "Talvez", "Pouco", "Não"] },
    { q: "Você se sente criativo?", options: ["Muito", "Médio", "Pouco", "Não"] },
    { q: "Prefere aulas de artes ou de matemática?", options: ["Artes", "Ambos", "Matemática", "Nenhum"] },
    { q: "Você gosta de observar design em sites/apps?", options: ["Sim, bastante", "Às vezes", "Pouco", "Nunca"] },
    { q: "Você já criou algo visual por hobby?", options: ["Sim, várias", "Algumas", "Poucas", "Nunca"] },
    { q: "Se tivesse que escolher uma carreira, qual mais atrai?", options: ["Design", "Ambas", "Programação", "Nenhuma"] }
];

const weights = { 0: 0.95, 1: 0.7, 2: 0.4, 3: 0.1 };
let answers = [];
let current = 0;

function renderQuestion(i) {
    const q = questionsData[i];
    return `<div class="card ${i === 0 ? 'active' : ''}" id="card${i}">
    <div class="question">${i + 1}. ${q.q}</div>
    <div class="options">
      ${q.options.map((opt, idx) => `<button onclick="selectAnswer(${i},${idx})">${String.fromCharCode(65 + idx)}) ${opt}</button>`).join('')}
    </div>
  </div>`;
}

document.getElementById('quiz').innerHTML = questionsData.map((q, i) => renderQuestion(i)).join('');

function selectAnswer(qIdx, optIdx) {
    answers[qIdx] = optIdx;
    document.getElementById(`card${qIdx}`).classList.remove('active');
    if (qIdx + 1 < questionsData.length) {
        document.getElementById(`card${qIdx + 1}`).classList.add('active');
    } else {
        showResults();
    }
}

function showResults() {
    let total = 0;
    answers.forEach(a => total += weights[a]);
    const percent = Math.round((total / answers.length) * 100);

    const area = document.getElementById('resultArea');
    area.innerHTML = `
    <div class="result-title">${percent >= 70 ? "Alta afinidade com Design" : "Afinidade moderada/baixa"}</div>
    <div class="percent">${percent}%</div>
    <div class="progress-large"><div id="progressFill" class="progress-fill"></div></div>
    <p>${percent >= 70 ? "Você tende a preferir estética, tipografia e ferramentas de design — ótimo sinal para carreira em design visual." : "Você demonstra interesse parcial em design. Talvez combine bem com áreas técnicas e criativas."}</p>
  `;
    area.classList.add('active');
    setTimeout(() => { document.getElementById('progressFill').style.width = percent + '%'; }, 100);
}