document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter');
    const emojiButtons = document.querySelectorAll('.emoji');
    const toolboxButton = document.getElementById("toolboxButton");
    const toolboxDiv = document.getElementById("toolboxDiv");
    const seperator = document.getElementById("seperator");
    const userTextmoji = document.getElementById("userTextmoji");

    toolboxButton.addEventListener('click', function () {
        toolboxDiv.classList.toggle("hidden");
        seperator.classList.toggle("hidden");
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterClass = button.classList[1]; // Target second class
            const updatedEmojiButtons = document.querySelectorAll('.emoji'); 

            // Show all emojis if "all" is selected
            if (filterClass === "all") {
                updatedEmojiButtons.forEach(emoji => emoji.style.display = "block");
            } else {
                updatedEmojiButtons.forEach(emoji => {
                    emoji.style.display = emoji.classList.contains(filterClass) ? "block" : "none";
                });
            }
        });
    });

    // Emoji copy functionality
    function attachEmojiCopyListeners() {
        document.querySelectorAll(".emoji").forEach(button => {
            button.addEventListener('click', function () {
                const emoji = button.getAttribute('data-emoji');

                navigator.clipboard.writeText(emoji).then(() => {
                    const feedback = document.createElement('span');
                    feedback.textContent = 'Copied!';
                    feedback.style.color = 'green';
                    feedback.style.marginLeft = '10px';
                    button.parentNode.appendChild(feedback);

                    setTimeout(() => feedback.remove(), 1000);
                }).catch(err => console.error('Failed to copy text: ', err));
            });
        });
    }
    attachEmojiCopyListeners(); // Call function after initial page load

    // Add new emoji functionality
    const addTextmojiButton = document.getElementById("addTextmoji");
    if (addTextmojiButton) {
        addTextmojiButton.addEventListener('click', function () {
            const addFilterDiv = document.getElementById('addFilterDiv');
            addFilterDiv.classList.toggle("hidden");

            const filterAddButtons = document.querySelectorAll('.filterAdd');

            filterAddButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const userTextmojiValue = userTextmoji.value.trim();

                    if (userTextmojiValue !== '') {
                        const newButton = document.createElement('button');
                        newButton.classList.add('emoji');

                        if (button.classList.contains("happyBtn")) {
                            newButton.classList.add('happy');
                        } else if (button.classList.contains("angryBtn")) {
                            newButton.classList.add('angry');
                        } else if (button.classList.contains("danceBtn")) {
                            newButton.classList.add('dance');
                        }

                        newButton.setAttribute('data-emoji', userTextmojiValue);
                        newButton.textContent = userTextmojiValue;

                        document.querySelector('.emoji-list').appendChild(newButton);
                        userTextmoji.value = '';
                        addFilterDiv.classList.toggle("hidden");
                        toolboxDiv.classList.toggle("hidden");
                        seperator.classList.toggle("hidden");

                        attachEmojiCopyListeners(); // Reattach event listeners to new buttons
                    }
                });
            });
        });
    }

    // ---- CUSTOM EMOJI ----
    const eyesBtn = document.getElementById("eyesBtn");
    const armsBtn = document.getElementById("armsBtn");
    const mouthBtn = document.getElementById("mouthBtn");

    function showCategory(category) {
        console.log(`Filtering: ${category}`);
        
        const emojiParts = document.querySelectorAll(".emojiPart");
        emojiParts.forEach(part => {
            part.style.display = part.classList.contains(category) ? "block" : "none";
        });
    }

    if (eyesBtn) eyesBtn.addEventListener("click", () => showCategory("eyes"));
    if (armsBtn) armsBtn.addEventListener("click", () => showCategory("arm"));
    if (mouthBtn) mouthBtn.addEventListener("click", () => showCategory("mouth"));

    // Add clicked emoji to text input
    function attachEmojiPartListeners() {
        document.querySelectorAll(".emojiPart").forEach(button => {
            button.addEventListener("click", function () {
                const emoji = this.getAttribute("data-emoji");
                userTextmoji.value += emoji;
            });
        });
    }
    attachEmojiPartListeners();
});
