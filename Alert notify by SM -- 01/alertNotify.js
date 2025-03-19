// alert.js - Alert system logic
(function() {
    // Create alert container if it doesn't exist
    let container = document.getElementById('alert-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'alert-container';
        document.body.appendChild(container);
    }

    // Attach showAlert to window object
    window.alertNotify = function(message, type = 'info', duration = 3000) {
        const alert = document.createElement('div');
        alert.className = `custom-alert alert-${type}`;
        alert.textContent = message;
        
        container.appendChild(alert);
        setTimeout(() => alert.classList.add('show'), 50);

        setTimeout(() => {
            alert.classList.remove('show');
            alert.classList.add('hide');
            
            alert.addEventListener('transitionend', () => {
                alert.remove();
            }, { once: true });
        }, duration);
    };
})();