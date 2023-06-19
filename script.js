const subjectList = document.getElementById("subject-list");
const addSubjectButton = document.getElementById("add-subject");
const sgpaDiv = document.getElementById("sgpa");

let subjects = [];

function addSubject() {
  const nameInput = document.getElementById("subject-name");
  const gradeInput = document.getElementById("subject-grade");
  const creditInput = document.getElementById("subject-credit");

  const name = nameInput.value;
  const grade = gradeInput.value;
  const credit = parseInt(creditInput.value);

  if (!name || !grade || !credit) {
    alert("Please fill in all fields.");
    return;
  }

  const subject = { name, grade, credit };
  subjects.push(subject);

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>${grade}</td>
    <td>${credit}</td>
    <td class="actions">
      <button class="remove-subject" data-name="${name}">Remove</button>
    </td>
  `;
  subjectList.appendChild(row);

  nameInput.value = "";
  gradeInput.value = "";
  creditInput.value = "";

  calculateSgpa();
}

function removeSubject(name) {
  subjects = subjects.filter(subject => subject.name !== name);
  const row = document.querySelector(`[data-name="${name}"]`).parentNode.parentNode;
  subjectList.removeChild(row);
  calculateSgpa();
}

function calculateSgpa() {
  const totalCredits = subjects.reduce((total, subject) => total + subject.credit, 0);
  const weightedSum = subjects.reduce((sum, subject) => {
    const gradePoints = { O: 10, E: 9, A: 8, B: 7, C: 6,D:5,F:4 };
    return sum + gradePoints[subject.grade] * subject.credit;
  }, 0);
  const sgpa = weightedSum / totalCredits || 0;
  sgpaDiv.textContent = `SGPA: ${sgpa.toFixed(2)}`;
}

addSubjectButton.addEventListener("click", addSubject);
subjectList.addEventListener("click", event => {
  if (event.target.classList.contains("remove-subject")) {
    const name = event.target.dataset.name;
    removeSubject(name);
  }
});
