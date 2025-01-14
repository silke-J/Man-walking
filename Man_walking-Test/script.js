const characterImages = [
    'knight/0_Warrior_Walk_000.png',
    'knight/0_Warrior_Walk_001.png',
    'knight/0_Warrior_Walk_002.png',
    'knight/0_Warrior_Walk_003.png',
    'knight/0_Warrior_Walk_004.png',
    'knight/0_Warrior_Walk_005.png',
    'knight/0_Warrior_Walk_006.png',
    'knight/0_Warrior_Walk_007.png',
    'knight/0_Warrior_Walk_008.png',
    'knight/0_Warrior_Walk_009.png',
    'knight/0_Warrior_Walk_010.png',
    'knight/0_Warrior_Walk_011.png',
    'knight/0_Warrior_Walk_012.png',
    'knight/0_Warrior_Walk_013.png',
    'knight/0_Warrior_Walk_014.png',
    'knight/0_Warrior_Walk_015.png',
    'knight/0_Warrior_Walk_016.png',
    'knight/0_Warrior_Walk_017.png',
    'knight/0_Warrior_Walk_018.png',
    'knight/0_Warrior_Walk_019.png',
    'knight/0_Warrior_Walk_020.png',
    'knight/0_Warrior_Walk_021.png',
    'knight/0_Warrior_Walk_022.png',
    'knight/0_Warrior_Walk_023.png',
    'knight/0_Warrior_Walk_024.png',
    'knight/0_Warrior_Walk_025.png',
    'knight/0_Warrior_Walk_026.png',
    'knight/0_Warrior_Walk_027.png',
    'knight/0_Warrior_Walk_028.png',
    'knight/0_Warrior_Walk_029.png'
];

const attackImages = [
    'Attacking/0_Warrior_Attack_2_000.png',
    'Attacking/0_Warrior_Attack_2_001.png',
    'Attacking/0_Warrior_Attack_2_002.png',
    'Attacking/0_Warrior_Attack_2_003.png',
    'Attacking/0_Warrior_Attack_2_004.png',
    'Attacking/0_Warrior_Attack_2_005.png',
    'Attacking/0_Warrior_Attack_2_006.png',
    'Attacking/0_Warrior_Attack_2_007.png',
    'Attacking/0_Warrior_Attack_2_008.png',
    'Attacking/0_Warrior_Attack_2_009.png',
    'Attacking/0_Warrior_Attack_2_010.png',
    'Attacking/0_Warrior_Attack_2_011.png',
    'Attacking/0_Warrior_Attack_2_012.png',
    'Attacking/0_Warrior_Attack_2_013.png',
    'Attacking/0_Warrior_Attack_2_014.png',
];

const backgrounds = [
    'skov/2.png',
    // 'skov/2.png',
    // 'skov/2.png',
    // 'skov/2.png',
    // 'skov/2.png',
    // 'skov/2.png'
];

let lastScrollPosition = 0; // Track the last scroll position
let ticking = false; // Prevent multiple scroll events from firing
let isAttacking = false; // Track if the character is currently attacking

window.addEventListener('scroll', function () {
    lastScrollPosition = window.scrollY; // Update scroll position

    if (!ticking) {
        window.requestAnimationFrame(function() {
            const road = document.getElementById('road');
            
            // Move the road background relative to scroll
            const speedFactor = 1; // Adjust for how fast the road moves
            road.style.backgroundPositionY = `-${lastScrollPosition * speedFactor}px`;

            // Fade out the character before changing the image
            const character = document.getElementById('character');
            character.style.opacity = 0; // Start fading out

            // Update character image based on scroll positiown
            const frameIndex = Math.floor(lastScrollPosition / 10) % characterImages.length; // Change frame every 10px
            character.src = characterImages[frameIndex]; // Update character image

            // Fade in the character after changing the image
            character.style.opacity = 1; // Fade back in

            // Update background image based on scroll position
            const backgroundIndex = Math.floor(lastScrollPosition / 500) % backgrounds.length; // Change background every 500px
            road.style.backgroundImage = `url('${backgrounds[backgroundIndex]}')`; // Update background image

            ticking = false; // Reset ticking
        });
        ticking = true; // Set ticking to true to prevent further calls
    }
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'w' && !isAttacking) { // Check if 'W' is pressed and not already attacking
        isAttacking = true; // Set attacking state
        let attackFrameIndex = 0; // Initialize attack frame index

        const character = document.getElementById('character');
        const attackInterval = setInterval(() => {
            if (attackFrameIndex < attackImages.length) {
                character.src = attackImages[attackFrameIndex]; // Update character image to attack frame
                attackFrameIndex++; // Move to the next frame
            } else {
                clearInterval(attackInterval); // Stop the attack animation
                isAttacking = false; // Reset attacking state
                character.src = characterImages[Math.floor(lastScrollPosition / 10) % characterImages.length]; // Reset to walking image
            }
        }, 10); // Adjust the interval for frame rate of attack animation
    }
});