document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('artCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('color');
    const sizeSlider = document.getElementById('size');
    const sizeValue = document.getElementById('size-value');
    const clearBtn = document.getElementById('clear-btn');
    const randomBtn = document.getElementById('random-btn');
    
    // Set canvas size
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth - 4; // account for border
        canvas.height = 500;
        redrawCanvas();
    }
    
    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Drawing functions
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = sizeSlider.value;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    // Clear canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    clearBtn.addEventListener('click', clearCanvas);
    
    // Random art generator
    function generateRandomArt() {
        clearCanvas();
        const shapes = Math.floor(Math.random() * 10) + 5;
        
        for (let i = 0; i < shapes; i++) {
            ctx.beginPath();
            
            // Random shape type
            const shapeType = Math.random();
            
            if (shapeType < 0.3) {
                // Circle
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = Math.random() * 100 + 20;
                ctx.arc(x, y, radius, 0, Math.PI * 2);
            } else if (shapeType < 0.6) {
                // Rectangle
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const width = Math.random() * 150 + 50;
                const height = Math.random() * 150 + 50;
                ctx.rect(x, y, width, height);
            } else {
                // Lines
                const points = Math.floor(Math.random() * 5) + 3;
                ctx.moveTo(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                );
                
                for (let j = 0; j < points; j++) {
                    ctx.lineTo(
                        Math.random() * canvas.width,
                        Math.random() * canvas.height
                    );
                }
            }
            
            // Random styles
            ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`;
            ctx.strokeStyle = `hsl(${Math.random() * 360}, 70%, 60%)`;
            ctx.lineWidth = Math.random() * 10 + 2;
            
            // Random fill or stroke
            if (Math.random() > 0.5) {
                ctx.fill();
            } else {
                ctx.stroke();
            }
        }
    }
    
    randomBtn.addEventListener('click', generateRandomArt);
    
    // Update size display
    function updateSizeValue() {
        sizeValue.textContent = sizeSlider.value;
    }
    
    sizeSlider.addEventListener('input', updateSizeValue);
    
    // Redraw canvas on resize
    function redrawCanvas() {
        // You could implement saving/restoring canvas content here
    }
});