document.addEventListener("mousemove", (event) => {
    const cursor = document.querySelector('.cursor-glow');
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
});
