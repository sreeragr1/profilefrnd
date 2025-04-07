document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('snippetLanguage');
    const titleInput = document.getElementById('snippetTitle');
    const codeTextarea = document.getElementById('snippetCode');
    const saveBtn = document.getElementById('saveSnippet');
    const snippetsList = document.getElementById('snippetsList');
    
    function saveSnippet() {
        const language = languageSelect.value;
        const title = titleInput.value.trim();
        const code = codeTextarea.value.trim();
        
        if (title && code) {
            const snippets = JSON.parse(localStorage.getItem('snippets') || [];
            const newSnippet = {
                id: Date.now(),
                language,
                title,
                code
            };
            
            snippets.push(newSnippet);
            localStorage.setItem('snippets', JSON.stringify(snippets));
            
            // Clear inputs
            titleInput.value = '';
            codeTextarea.value = '';
            
            // Refresh list
            loadSnippets();
        }
    }
    
    function loadSnippets() {
        const snippets = JSON.parse(localStorage.getItem('snippets')) || [];
        snippetsList.innerHTML = '';
        
        snippets.forEach(snippet => {
            const snippetItem = document.createElement('div');
            snippetItem.className = 'snippet-item';
            
            const header = document.createElement('h3');
            header.innerHTML = `
                ${snippet.title}
                <span class="language">${snippet.language.toUpperCase()}</span>
            `;
            
            const codeBlock = document.createElement('pre');
            codeBlock.textContent = snippet.code;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-snippet';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function() {
                deleteSnippet(snippet.id);
            });
            
            snippetItem.appendChild(header);
            snippetItem.appendChild(codeBlock);
            snippetItem.appendChild(deleteBtn);
            snippetsList.appendChild(snippetItem);
        });
    }
    
    function deleteSnippet(id) {
        let snippets = JSON.parse(localStorage.getItem('snippets')) || [];
        snippets = snippets.filter(snippet => snippet.id !== id);
        localStorage.setItem('snippets', JSON.stringify(snippets));
        loadSnippets();
    }
    
    saveBtn.addEventListener('click', saveSnippet);
    
    // Load snippets on startup
    loadSnippets();
});