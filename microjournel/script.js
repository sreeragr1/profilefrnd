document.addEventListener('DOMContentLoaded', function() {
    const promptElement = document.getElementById('journalPrompt');
    const entryTextarea = document.getElementById('journalEntry');
    const charCountElement = document.getElementById('charCount');
    const saveBtn = document.getElementById('saveEntry');
    const entriesContainer = document.getElementById('journalEntries');
    
    const prompts = [
        "What are you grateful for today?",
        "What was the highlight of your day?",
        "What challenged you today?",
        "What did you learn today?",
        "How are you feeling right now?",
        "What are you looking forward to?",
        "What made you smile today?"
    ];
    
    // Set random prompt
    function setRandomPrompt() {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        promptElement.textContent = randomPrompt;
        return randomPrompt;
    }
    
    // Update character count
    function updateCharCount() {
        const currentLength = entryTextarea.value.length;
        charCountElement.textContent = currentLength;
        
        if (currentLength >= 180) {
            charCountElement.style.color = '#e74c3c';
        } else if (currentLength >= 150) {
            charCountElement.style.color = '#f39c12';
        } else {
            charCountElement.style.color = '#666';
        }
    }
    
    // Save journal entry
    function saveEntry() {
        const prompt = promptElement.textContent;
        const content = entryTextarea.value.trim();
        
        if (content) {
            const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            const newEntry = {
                date: new Date().toLocaleString(),
                prompt,
                content
            };
            
            entries.unshift(newEntry); // Add to beginning
            localStorage.setItem('journalEntries', JSON.stringify(entries));
            
            // Clear textarea
            entryTextarea.value = '';
            updateCharCount();
            
            // Refresh entries
            loadEntries();
            
            // Set new prompt
            setRandomPrompt();
        }
    }
    
    // Load journal entries
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        entriesContainer.innerHTML = '';
        
        entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = 'journal-entry';
            
            entryElement.innerHTML = `
                <div class="date">${entry.date}</div>
                <div class="prompt">${entry.prompt}</div>
                <div class="content">${entry.content}</div>
            `;
            
            entriesContainer.appendChild(entryElement);
        });
    }
    
    // Event listeners
    entryTextarea.addEventListener('input', updateCharCount);
    saveBtn.addEventListener('click', saveEntry);
    
    // Initialize
    setRandomPrompt();
    updateCharCount();
    loadEntries();
});