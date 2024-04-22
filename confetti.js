document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');

    // Set the canvas size to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confettiPieces = [];
    const baseColors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#fff', '#b8292f'];
    const numConfettiPieces = 200; // Increased number of confetti pieces
    const confettiSize = { x: 15, y: 15 }; // Increased confetti size
    let animationRunning = true;

    // Function to generate lighter and darker shades for each color
    function generateShades(hex, shades = 3) {
        const colorArray = [];
        let [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));

        // Generate lighter shades
        for (let i = 1; i <= shades; i++) {
            const factor = i / shades * 0.5; // Adjust for lighter shades
            colorArray.push(
                `#${[r, g, b].map(x =>
                    Math.floor(x + (255 - x) * factor).toString(16).padStart(2, '0')
                ).join('')}`
            );
        }

        // Add original color
        colorArray.push(hex);

        // Generate darker shades
        for (let i = 1; i <= shades; i++) {
            const factor = i / shades * 0.5; // Adjust for darker shades
            colorArray.push(
                `#${[r, g, b].map(x =>
                    Math.floor(x * (1 - factor)).toString(16).padStart(2, '0')
                ).join('')}`
            );
        }

        return colorArray;
    }

    // Generate more colors including shades of each base color
    const colors = baseColors.flatMap(color => generateShades(color));

    // Generate each piece of confetti
    for (let i = 0; i < numConfettiPieces; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height * 0.5, // Start higher for staggered falling
            r: confettiSize.x / 2,
            d: Math.random() * numConfettiPieces, // density
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 20) - 10,
            tiltAngleIncrement: Math.random() * 0.1 + 0.05,
            tiltAngle: 0
        });
    }

    function draw() {
        if (!animationRunning) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach((confetti, index) => {
            ctx.beginPath();
            ctx.lineWidth = confetti.r;
            ctx.strokeStyle = confetti.color;
            ctx.moveTo(confetti.x + confetti.tilt + (confetti.r / 4), confetti.y);
            ctx.lineTo(confetti.x + confetti.tilt, confetti.y + confetti.tilt + (confetti.r / 4));
            ctx.stroke();

            confetti.tiltAngle += confetti.tiltAngleIncrement;
            confetti.y += (Math.cos(confetti.d) + 3 + confetti.r / 2) / 2;
            confetti.tilt = Math.sin(confetti.tiltAngle) * 12;

            // Remove the piece if it's out of view
            if (confetti.y > canvas.height) {
                confettiPieces.splice(index, 1);
            }
        });

        // Stop the animation if no confetti is left
        if (confettiPieces.length === 0) {
            animationRunning = false;
        }

        requestAnimationFrame(draw);
    }

    draw(); // Start the animation
});

// Handling window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
