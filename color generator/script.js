document.addEventListener('DOMContentLoaded', function() {
  const generateBtn = document.getElementById('generate-btn');
  const colorCount = document.getElementById('color-count');
  const countValue = document.getElementById('count-value');
  const paletteContainer = document.getElementById('palette-container');
  
  // Update the displayed count when slider changes
  colorCount.addEventListener('input', function() {
      countValue.textContent = this.value;
  });
  
  // Generate palette when button is clicked
  generateBtn.addEventListener('click', generatePalette);
  
  // Generate initial palette
  generatePalette();
  
  function generatePalette() {
      const count = parseInt(colorCount.value);
      paletteContainer.innerHTML = '';
      
      for (let i = 0; i < count; i++) {
          const color = generateRandomColor();
          const colorElement = document.createElement('div');
          colorElement.className = 'color';
          colorElement.style.backgroundColor = color;
          
          const colorCode = document.createElement('span');
          colorCode.className = 'color-code';
          colorCode.textContent = color;
          
          colorElement.appendChild(colorCode);
          paletteContainer.appendChild(colorElement);
          
          // Add click event to copy color code
          colorElement.addEventListener('click', function() {
              navigator.clipboard.writeText(color).then(() => {
                  const originalText = colorCode.textContent;
                  colorCode.textContent = 'Copied!';
                  setTimeout(() => {
                      colorCode.textContent = originalText;
                  }, 1000);
              });
          });
      }
  }
  
  function generateRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
});
