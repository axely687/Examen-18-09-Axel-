const title = document.getElementById('title');
const button = document.getElementById('btn');
const logsContainer = document.getElementById('terminal-logs');
const regForm = document.getElementById('regForm');

let submissionCount = 0;

// Dynamic Canvas Background
const canvas = document.getElementById('tech-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Tech and informatics related glyphs/objects
    const chars = ['0', '1', '</>', '❖', 'sys', 'db', 'node', 'cpu', 'net', 'io', '{}', '[]', '=>', 'import', 'main', 'var', 'const'];
    const particles = [];
    const maxParticles = 55;

    for (let i = 0; i < maxParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            text: chars[Math.floor(Math.random() * chars.length)],
            fontSize: Math.floor(Math.random() * 15) + 13, // Slightly larger size (13px to 28px) for easier viewing
            speed: (Math.random() * 0.45) + 0.15,
            opacity: (Math.random() * 0.25) + 0.15 // Higher opacity (0.15 to 0.40) so the floating symbols stand out beautifully
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            ctx.fillStyle = `rgba(14, 165, 233, ${p.opacity})`;
            ctx.font = `${p.fontSize}px 'Fira Code', monospace`;
            ctx.fillText(p.text, p.x, p.y);
            
            p.y += p.speed;
            if (p.y > height + 20) {
                p.y = -20;
                p.x = Math.random() * width;
            }
        });
        
        requestAnimationFrame(draw);
    }
    draw();
}

// Toast System
const toastContainer = document.getElementById('toast-container');
const announcements = [
    { tag: "SYSTEM ANNOUNCEMENT", text: "Procesador de núcleos Nexus_OS operando al 100% de eficiencia.", type: "info" },
    { tag: "DATABASE BACKUP", text: "Copia de seguridad incremental del servidor completada con éxito.", type: "success" },
    { tag: "SECURITY ALERT", text: "Tráfico de red encriptado mediante protocolo seguro TLS 1.3.", type: "success" },
    { tag: "NETWORK LATENCY", text: "Nodo regional centralizado reportando ping óptimo de 12ms.", type: "info" },
    { tag: "SYSTEM ADVISORY", text: "Mantenimiento preventivo de base de datos programado en 2 horas.", type: "warning" },
    { tag: "REGISTRY MONITORS", text: "Servicio de registro informática activo y escuchando peticiones.", type: "info" }
];

function triggerToast(tag, text, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-tag">${tag}</span>
            <span class="toast-time">${timeStr}</span>
        </div>
        <div class="toast-body">${text}</div>
    `;

    toastContainer.appendChild(toast);

    // Auto-remove element after animations end (6 seconds total)
    setTimeout(() => {
        toast.remove();
    }, 6000);
}

// Queue initial toast notifications periodically
setTimeout(() => {
    triggerToast("REGISTRY STATUS", "Servidor de inscripciones NEXUS listo para recibir aspirantes.", "success");
}, 1500);

setInterval(() => {
    const item = announcements[Math.floor(Math.random() * announcements.length)];
    triggerToast(item.tag, item.text, item.type);
}, 14000); // Emits a stunning tech announcement every 14 seconds


// Form submission handler
regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submissionCount++;
    
    // Gather form data
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Trigger Success Toast
    triggerToast("REGISTRY SUCCESS", `Usuario ${fullName} registrado correctamente.`, "success");

    // Update status indicator
    title.textContent = 'COMPLETED';
    title.className = 'val val-active';
    
    // Update button styling/text
    button.classList.add('btn-success');
    const btnText = button.querySelector('.btn-text');
    if (btnText) {
        btnText.textContent = `Registro #${submissionCount} Enviado`;
    }

    // Get current time
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

    // Logs sequence
    const logs = [
        `[${timeStr}] [incoming_payload] Capturing form submission...`,
        `[${timeStr}] [validation] Checking field schemas... OK`,
        `[${timeStr}] [encryption] Encrypting personal identifiable information... OK`,
        `[${timeStr}] [db_write] Syncing with core relational cluster... OK`,
        `[${timeStr}] [success] Registry verified. Payload details below:`
    ];

    logsContainer.innerHTML = '';

    logs.forEach((logText, index) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'log-line';
            if (logText.includes('OK')) {
                line.className += ' text-success';
            } else if (logText.includes('success')) {
                line.className += ' text-accent';
            }
            line.textContent = logText;
            logsContainer.appendChild(line);
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }, index * 100);
    });

    // Output formatted registration data as JSON
    setTimeout(() => {
        const jsonBlock = document.createElement('pre');
        jsonBlock.className = 'log-line text-success';
        jsonBlock.style.fontSize = '0.7rem';
        jsonBlock.style.lineHeight = '1.3';
        jsonBlock.style.marginTop = '8px';
        jsonBlock.style.padding = '8px';
        jsonBlock.style.backgroundColor = '#0b0f19';
        jsonBlock.style.border = '1px solid #1e294b';
        jsonBlock.style.borderRadius = '4px';

        const userData = {
            id: `usr_${Math.random().toString(36).substr(2, 9)}`,
            nombre_completo: fullName,
            edad: Number(age),
            genero: gender,
            correo: email,
            telefono: phone,
            timestamp: now.toISOString()
        };

        jsonBlock.textContent = JSON.stringify(userData, null, 2);
        logsContainer.appendChild(jsonBlock);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }, logs.length * 100 + 100);
});
