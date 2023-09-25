// Get references to the HTML elements
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const genderSelect = document.getElementById('gender');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');
const resultText = document.getElementById('assessmentResult');

// Age groups
const ageGroups = {
    babies: { minAge: 0, maxAge: 4 },
    youngAdults: { minAge: 5, maxAge: 24 },
    middleAgedAdults: { minAge: 25, maxAge: 59 },
    oldAdults: { minAge: 60, maxAge: Infinity },
};

// Questions for each age group and gender (customize as needed)
const questions = {
    babies: [
        'How often does your baby sleep through the night?',
        'How often does your baby cry for long periods?',
        'How often does your baby show interest in toys?',
        'How often does your baby respond to your voice?',
        'How often do you worry about your baby\'s feeding habits?',
    ],
    youngAdults: [
        'How often have you felt stressed about school or work?',
        'How often have you felt overwhelmed by social pressures?',
        'How often do you experience difficulty in maintaining relationships?',
        'How often do you feel motivated to achieve your goals?',
        'How often do you engage in physical activity?',
    ],
    middleAgedAdults: [
        'How often have you felt stressed about your career?',
        'How often have you felt worried about financial stability?',
        'How often do you experience work-related burnout?',
        'How often do you engage in stress-relief activities?',
        'How often do you find time for leisure activities?',
    ],
    oldAdults: [
        'How often have you felt lonely or isolated?',
        'How often have you felt anxious about health issues?',
        'How often do you stay connected with friends and family?',
        'How often do you engage in physical exercise?',
        'How often do you feel satisfied with your retirement lifestyle?',
    ],
};

// Gender-specific questions (customize as needed)
const genderQuestions = {
    male: [
        'How often have you felt stressed about your career?',
        'How often have you felt worried about financial stability?',
        'How often do you experience work-related burnout?',
        'How often do you engage in stress-relief activities?',
        'How often do you find time for leisure activities?',
    ],
    female: [
        'How often have you felt stressed about school or work?',
        'How often have you felt overwhelmed by social pressures?',
        'How often do you experience difficulty in maintaining relationships?',
        'How often do you feel motivated to achieve your goals?',
        'How often do you engage in physical activity?',
    ],
    other: [
        'How often have you felt lonely or isolated?',
        'How often have you felt anxious about health issues?',
        'How often do you stay connected with friends and family?',
        'How often do you engage in physical exercise?',
        'How often do you feel satisfied with your lifestyle?',
    ],
};

let ageGroup; // To store the determined age group

// Add event listener to the "Next" button on page 1
nextBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);
    const gender = genderSelect.value;

    if (name === '' || isNaN(age) || age < 0) {
        alert('Please enter a valid name and age.');
        return;
    }

    // Determine the age group
    ageGroup = determineAgeGroup(age);

    // Hide page 1 and show page 2
    page1.style.display = 'none';
    page2.style.display = 'block';

    // Generate questionnaire based on age group and gender
    generateQuestions(ageGroup, gender);

    // Show the "Submit" button
    submitBtn.style.display = 'block';
});

// Function to generate questions based on age group and gender
function generateQuestions(ageGroup, gender) {
    const questionnaireDiv = document.getElementById('page2');
    questionnaireDiv.innerHTML = ''; // Clear previous questions

    // Get questions based on age group and gender
    const ageGroupQuestions = questions[ageGroup];
    const genderSpecificQuestions = genderQuestions[gender];
    const allQuestions = [...new Set([...ageGroupQuestions, ...genderSpecificQuestions])];

    for (let i = 0; i < allQuestions.length; i++) {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <h2>Question ${i + 1}</h2>
            <p>${allQuestions[i]}</p>
            <label for="q${i + 1}"></label>
            <select id="q${i + 1}" class="input-box">
            <option value="0">Not at all</option>
            <option value="1">Rarely</option>
            <option value="2">Sometimes</option>
            <option value="3">Often</option>
            <option value="4">Always</option>
        </select>
        <label for="q${i + 1}"></label>
    `;
    questionnaireDiv.appendChild(questionElement);
}
}

// Function to display the assessment result
function displayAssessmentResult(result) {
// Set the result text
resultText.textContent = result;

// Show the result div
resultDiv.style.display = 'block';
}

// Add event listener to the "Submit" button on page 2
submitBtn.addEventListener('click', () => {
// Calculate the assessment result (customize this logic)
const assessmentResult = calculateAssessmentResult();

// Display a prompt with the recommended solution
const solution = getRecommendedSolution(assessmentResult);

const userName = nameInput.value;

if (solution) {
    const message = `Dear ${userName}, based on your assessment, we recommend the following solution:\n\n${solution}`;
    
    // Display the assessment result on the same page
    displayAssessmentResult(message);
} else {
    alert("There was an error processing your assessment. Please try again.");
}
});

// Function to determine the age group
function determineAgeGroup(age) {
for (const group in ageGroups) {
    if (age >= ageGroups[group].minAge && age <= ageGroups[group].maxAge) {
        return group;
    }
}
}

// Function to calculate the assessment result (customize as needed)
function calculateAssessmentResult() {
const ageGroupQuestions = questions[ageGroup];
let totalScore = 0;

for (let i = 1; i <= ageGroupQuestions.length; i++) {
    const score = parseInt(document.getElementById(`q${i}`).value);
    totalScore += score;
}

return totalScore / ageGroupQuestions.length;
}
