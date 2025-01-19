// Theme Management
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.body.className = themeName;
}

function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
    
    // Update active state in theme modal
    const themeButtons = document.querySelectorAll('.theme-option');
    themeButtons.forEach(button => {
        if (button.getAttribute('data-theme') === savedTheme) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    
    // Add click handlers for theme buttons
    const themeButtons = document.querySelectorAll('.theme-option');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            setTheme(theme);
            
            // Close modal after selection (optional)
            const modal = document.getElementById('themeModal');
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        });
    });
});

// Optional: Add theme-specific CSS variables
const themeColors = {
    light: {
        background: '#ffffff',
        text: '#212529',
        primary: '#007bff'
    },
    dark: {
        background: '#343a40',
        text: '#ffffff',
        primary: '#007bff'
    },
    // Add other theme colors as needed
};

function applyThemeColors(theme) {
    const colors = themeColors[theme];
    if (colors) {
        const root = document.documentElement;
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }
}

