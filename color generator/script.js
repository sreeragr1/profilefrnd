document.addEventListener('DOMContentLoaded', function() {
    const paletteContainer = document.getElementById('palette');
    const generateBtn = document.getElementById('generateBtn');
  
    function getRandomColor() {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 60 + Math.floor(Math.random() * 30); // 60-90%
      const lightness = 40 + Math.floor(Math.random() * 20); // 40-60%
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
  
    function generatePalette(count = 5) {
      paletteContainer.innerHTML = '';
      for (let i = 0; i < count; i++) {
        const color = getRandomColor();
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;
  
        const colorCode = document.createElement('div');
        colorCode.className = 'color-code';
        colorCode.textContent = color;
  
        // Add click to copy functionality
        colorBox.addEventListener('click', function() {
          navigator.clipboard.writeText(color).then(() => {
            colorCode.textContent = 'Copied!';
            setTimeout(() => {
              colorCode.textContent = color;
            }, 1000);
          });
        });
  
        colorBox.appendChild(colorCode);
        paletteContainer.appendChild(colorBox);
      }
    }
  
    generateBtn.addEventListener('click', generatePalette);
  
    // Initial load
    generatePalette();
  });