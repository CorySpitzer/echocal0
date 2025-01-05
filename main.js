// Current reference time (2025-01-05)
const REFERENCE_TIME = new Date('2025-01-05T09:39:02-05:00');

// Spaced repetition patterns (in days)
const PATTERNS = {
    'Classic': [1, 2, 4, 7, 14, 30, 60, 120],
    'Aggressive': [1, 3, 7, 14, 30, 45, 90],
    'Gentle': [1, 2, 3, 5, 8, 13, 21, 34],
    'Custom': [1, 4, 10, 20, 40, 80, 160]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', addSkill);

    // Set default date to today
    document.getElementById('startDate').valueAsDate = new Date(REFERENCE_TIME);
});

function addSkill() {
    const skillInput = document.getElementById('skillInput');
    const startDateInput = document.getElementById('startDate');
    const skillList = document.getElementById('skillList');

    if (!skillInput.value || !startDateInput.value) {
        alert('Please enter both skill name and start date');
        return;
    }

    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';

    // Create pattern selector
    const patternSelect = document.createElement('select');
    patternSelect.className = 'pattern-select';
    Object.keys(PATTERNS).forEach(pattern => {
        const option = document.createElement('option');
        option.value = pattern;
        option.textContent = pattern;
        patternSelect.appendChild(option);
    });

    // Create schedule display
    const scheduleSpan = document.createElement('span');
    
    // Add elements to skill item
    skillItem.innerHTML = `<strong>${skillInput.value}</strong>`;
    skillItem.appendChild(patternSelect);
    skillItem.appendChild(scheduleSpan);

    // Update schedule when pattern changes
    patternSelect.addEventListener('change', () => {
        updateSchedule(scheduleSpan, startDateInput.value, patternSelect.value);
    });

    // Initial schedule update
    updateSchedule(scheduleSpan, startDateInput.value, 'Classic');

    skillList.appendChild(skillItem);
    skillInput.value = '';
}

function updateSchedule(scheduleSpan, startDate, patternName) {
    const pattern = PATTERNS[patternName];
    const dates = generateDates(new Date(startDate), pattern);
    scheduleSpan.textContent = dates.map(date => 
        date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        })
    ).join(' → ');
}

function generateDates(startDate, pattern) {
    const dates = [];
    let currentDate = new Date(startDate);
    
    for (const days of pattern) {
        currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + days);
        dates.push(new Date(currentDate));
    }
    
    return dates;
}