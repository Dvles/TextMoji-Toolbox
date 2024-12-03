document.addEventListener('DOMContentLoaded', function () {
    const emojiButtons = document.querySelectorAll('.emoji');
  
    emojiButtons.forEach(button => {
      button.addEventListener('click', function () {
        const emoji = button.getAttribute('data-emoji'); 
  
        // Use the Clipboard API to copy the text to the clipboard
        navigator.clipboard.writeText(emoji).then(() => {
          const feedback = document.createElement('span');
          feedback.textContent = 'Copied!';
          feedback.style.color = 'green';
          feedback.style.marginLeft = '10px';
          button.parentNode.appendChild(feedback);
  
          setTimeout(() => feedback.remove(), 1000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      });
    });
  });
  