document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter');
    const emojiButtons = document.querySelectorAll('.emoji');
    const toolboxButton = document.getElementById("toolboxButton");
    const toolboxDiv = document.getElementById("toolboxDiv");

    toolboxButton.addEventListener('click', function(){
        toolboxDiv.classList.toggle("hidden");

    })

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterClass = button.classList[1]; // Target second class
            if (filterClass === "all") {
                emojiButtons.forEach(emoji => emoji.style.display = "block");
            } else {
                emojiButtons.forEach(emoji => {
                    if (emoji.classList.contains(filterClass)) {
                        emoji.style.display = "block";  // Show the emoji
                    } else {
                        emoji.style.display = "none";   // Hide the emoji
                    }
                });
            }
        });
    });

    // Emoji copy functionality
    emojiButtons.forEach(button => {
        button.addEventListener('click', function () {
            const emoji = button.getAttribute('data-emoji'); // Get the emoji text

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

    // Emoji add functionaliy
    const addTextmojiButton = document.getElementById("addTextmoji");
    addTextmojiButton.addEventListener('click', function(){
        
        const userTextmoji = document.getElementById('userTextmoji').value;
        if (userTextmoji.trim() !==''){
            // create new textmoji button
            const newButton = document.createElement('button');
            newButton.classList.add('emoji', 'happy');
            newButton.setAttribute('data-emoji', userTextmoji);
            newButton.textContent = userTextmoji;

            // append new textmoji to emoji list
            document.querySelector('.emoji-list').appendChild(newButton);

            document.getElementById('userTextmoji').value='';

        }
        



    })
});
