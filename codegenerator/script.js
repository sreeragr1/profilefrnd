document.addEventListener('DOMContentLoaded', () => {
    const snippetsContainer = document.getElementById('snippets-container');
    const searchInput = document.getElementById('search');
    const newSnippetBtn = document.getElementById('new-snippet-btn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const snippetForm = document.getElementById('snippet-form');
    const tags = document.querySelectorAll('.tag');

    let snippets = JSON.parse(localStorage.getItem('snippets')) || [];

    // Load snippets on page load
    renderSnippets(snippets);

    // Highlight.js for syntax highlighting
    hljs.highlightAll();

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredSnippets = snippets.filter(snippet => 
            snippet.title.toLowerCase().includes(searchTerm) || 
            snippet.code.toLowerCase().includes(searchTerm)
        );
        renderSnippets(filteredSnippets);
    });

    // Filter by tag
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            const selectedTag = tag.dataset.tag;
            if (selectedTag === 'all') {
                renderSnippets(snippets);
            } else {
                const filteredSnippets = snippets.filter(snippet => snippet.language === selectedTag);
                renderSnippets(filteredSnippets);
            }
        });
    });

    // Open modal
    newSnippetBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Save new snippet
    snippetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('snippet-title').value;
        const language = document.getElementById('snippet-language').value;
        const code = document.getElementById('snippet-code').value;

        const newSnippet = {
            id: Date.now(),
            title,
            language,
            code
        };

        snippets.push(newSnippet);
        localStorage.setItem('snippets', JSON.stringify(snippets));
        
        renderSnippets(snippets);
        snippetForm.reset();
        modal.style.display = 'none';
    });

    // Render snippets
    function renderSnippets(snippetsToRender) {
        snippetsContainer.innerHTML = '';
        
        if (snippetsToRender.length === 0) {
            snippetsContainer.innerHTML = '<p>No snippets found.</p>';
            return;
        }

        snippetsToRender.forEach(snippet => {
            const snippetEl = document.createElement('div');
            snippetEl.className = 'snippet';
            snippetEl.innerHTML = `
                <div class="snippet-header">
                    <h3 class="snippet-title">${snippet.title}</h3>
                    <span class="snippet-language">${snippet.language.toUpperCase()}</span>
                </div>
                <pre><code class="language-${snippet.language}">${snippet.code}</code></pre>
                <button class="copy-btn">Copy</button>
            `;
            snippetsContainer.appendChild(snippetEl);

            // Copy functionality
            const copyBtn = snippetEl.querySelector('.copy-btn');
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(snippet.code);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            });
        });

        // Re-highlight code blocks
        hljs.highlightAll();
    }
});
