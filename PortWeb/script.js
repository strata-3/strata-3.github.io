const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const internalLinks = document.querySelectorAll('[data-target]');

// --- 0. STRICT INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    navItems.forEach(nav => nav.classList.remove('active-nav'));
    views.forEach(v => {
        v.classList.remove('active');
        gsap.set(v, { opacity: 0 }); 
    });

    const defaultNav = document.querySelector('[data-target="welcome-view"]');
    const defaultView = document.getElementById('welcome-view');
    
    if (defaultNav && defaultView) {
        defaultNav.classList.add('active-nav');
        defaultView.classList.add('active');
        gsap.set(defaultView, { opacity: 1 });

        gsap.from(".nav-item", { x: -20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" });
        gsap.from(defaultView.querySelectorAll('.fade-in'), { y: 30, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 });
    }
    
    initMagneticElements(); 
});

// --- 1. SPA Navigation & View Switching ---
function switchView(targetId) {
    const currentView = document.querySelector('.view.active');
    const targetView = document.getElementById(targetId);

    if (!targetView || currentView === targetView) return;

    navItems.forEach(nav => {
        if(nav.getAttribute('data-target') === targetId) {
            nav.classList.add('active-nav');
        } else {
            nav.classList.remove('active-nav');
        }
    });

    gsap.to(currentView, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            currentView.classList.remove('active');
            targetView.classList.add('active');
            
            gsap.set(targetView, { opacity: 0, y: 30 });
            document.querySelector('.dashboard').scrollTop = 0;
            
            gsap.to(targetView, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });

            const elementsToAnimate = targetView.querySelectorAll('.fade-in');
            if(elementsToAnimate.length > 0) {
                gsap.fromTo(elementsToAnimate, 
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.1 }
                );
            }
        }
    });
}

internalLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetId = link.getAttribute('data-target');
        switchView(targetId);
    });
});

// --- 2. Magnetic Hover Physics ---
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach((elem) => {
        elem.addEventListener('mousemove', function(e) {
            const position = elem.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            gsap.to(elem, { x: x * 0.2, y: y * 0.2, duration: 0.5, ease: "power3.out" });
        });

        elem.addEventListener('mouseleave', function() {
            gsap.to(elem, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        });
    });
}

// --- 3. AI Support Integration (G2.5F) ---
const helpBtn = document.getElementById('help-btn');
const closeAiBtn = document.getElementById('close-ai');
const aiOverlay = document.getElementById('ai-overlay');
const aiInput = document.getElementById('ai-input');
const aiSend = document.getElementById('ai-send');
const chatBox = document.getElementById('chat-box');
const aiGreeting = document.getElementById('ai-greeting');
const editLabel = document.getElementById('edit-label'); // New Edit Label

const API_KEY = "AIzaSyDBq_OebHXzaJqYv4JPM7i1p9vLoruNT68"; 

// MASSIVELY EXPANDED KNOWLEDGE BASE & STRICT TONE RULES
const systemInstructionText = `
You are G2.5F, an integrated AI assistant built into Enriko Straubis's APEL portfolio website.
Enriko is 16, a highly capable 3D interior designer and full-stack game developer applying for the BTEC L2 Art & Design program at Bishop Burton College.

STRICT PERSONALITY & TONE RULES:
1. Anti-corporate. Never say "As an AI..." or "As a large language model...". Speak naturally, directly, and confidently.
2. Be friendly, genuinely helpful, and concise. No lectures. 
3. You can lightly roast the user IF they are casual, BUT if they specify they are a teacher, Head of Department, or admissions staff, be extremely respectful and professional.
4. NEVER refer to Enriko as a "kid," "child," or "student" in a diminishing way. Refer to him as a "young professional," "driven developer," or "designer." Respect his high-level technical achievements.
5. Enriko built this entire SPA (Single Page Application) portfolio from scratch using HTML/CSS/JS, custom GSAP animations, and integrated you (this AI) via Google's API. 

KNOWLEDGE BASE (Use this to answer accurately without hallucinating):
- Welcome Tab: Overview. Enriko is 16. Career goal: 3D Interior Design & Video Game Tech Design.
- Inspirations Tab: Enriko shifted from just playing games (like Rainbow Six Siege) to critically analyzing backend architecture, asking how UX and asset quality can be optimized without losing visual fidelity. He studies YouTubers @SebastianLague and @DevDuck ONLY because academic peers recommended them for their technical rigor and transparent breakdowns of complex rendering pipelines. The game "Ready or Not" is his primary technical inspiration for optimizing heavy AI systems while keeping photorealistic environments.
- Projects Tab:
  1. CallSignDJ (001): Built actively in Unreal Engine 5 using C++ and Blueprint visual scripting for optimization. A tactical sim inspired by Ready or Not. Lore: Set in 2029 during global hostility. Player is Sgt. M. Grayves in UNMOC SpecOps. Core objectives: peacekeeping, direct action, SIGINT/HUMINT, counter-terrorism.
  2. Damn You, Manager! (DYM!): An archived/abandoned project. First-person sim managing a photorealistic nightclub with stylized/cartoonish mechanics as 19yo Dan Brockner. Enriko deliberately abandoned it because he critically analyzed the mechanics and realized the long-term scope and scaling were limited—proving his mature ability to assess project viability.
- Gallery Tab: Vertical masonry layout showcasing: Rigged character models (Sgt.Grayves), wireframes (Insurgent recce-class), UE5 environments for CallSignDJ and DYM!, and independent architectural renders built in Blender and 3DS Max (Rustic Bar, Bathroom, Living Room, Bedroom).
- CV/Resume Tab: Showcases immense operational readiness and endurance. Work experience: Laborer/Assistant Plasterer (Mud on Walls Ltd) handling heavy materials, and Detailing Tech (Star! Car Wash) handling client communication. Natural leadership via Rugby League (Myton Warriors) and Jujitsu (Blue Belt). Technical certs: Harvard CS50, Google Cybersecurity, Microsoft C#.
- Ending Tab: Formal sign-off for Bishop Burton College, contact info (enrikostraubis@gmail.com, 07383882283), and ArtStation link (https://www.artstation.com/sheii).
`;

let hasTypedGreeting = false;
let isFirstMessage = true;

// Custom fast-type effect for all AI responses
function typeHTML(element, htmlString, speed = 8) {
    element.innerHTML = '';
    let i = 0;
    let isTag = false;
    let textBuffer = '';

    function type() {
        if (i < htmlString.length) {
            if (htmlString.charAt(i) === '<') {
                isTag = true;
            }
            textBuffer += htmlString.charAt(i);
            i++;

            if (isTag) {
                if (htmlString.charAt(i - 1) === '>') {
                    isTag = false;
                }
                type(); // Process full HTML tag instantly so it doesn't break styling
            } else {
                element.innerHTML = textBuffer;
                chatBox.scrollTop = chatBox.scrollHeight;
                setTimeout(type, speed);
            }
        }
    }
    type();
}

function typeGreeting() {
    if (hasTypedGreeting) return;
    const text = "Hello! Im G2.5, how can I help?";
    typeHTML(aiGreeting, text, 30);
    hasTypedGreeting = true;
}

helpBtn.addEventListener('click', () => {
    aiOverlay.classList.add('active');
    setTimeout(typeGreeting, 300);
    aiInput.focus();
});

closeAiBtn.addEventListener('click', () => {
    aiOverlay.classList.remove('active');
});

aiInput.addEventListener('keydown', function hidePlaceholder() {
    aiInput.placeholder = "";
    aiInput.removeEventListener('keydown', hidePlaceholder);
});

// Appends message, formats markdown, and adds edit logic for user
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add(sender === 'user' ? 'msg-user' : 'msg-ai');
    
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    if (sender === 'user') {
        // Add pencil icon wrapper
        msgDiv.innerHTML = `
            <span class="msg-text">${formattedText}</span>
            <i class="ph ph-pencil-simple edit-icon" title="Edit prompt"></i>
        `;
        
        // Edit Functionality
        const editBtn = msgDiv.querySelector('.edit-icon');
        const rawText = text; // Keep raw text without HTML tags for editing
        
        editBtn.addEventListener('click', () => {
            aiInput.value = rawText;
            aiInput.focus();
            editLabel.classList.remove('hidden');
            
            // Remove the old message and the AI's response to it to keep chat clean
            let nextAiResponse = msgDiv.nextElementSibling;
            if (nextAiResponse && nextAiResponse.classList.contains('msg-ai')) {
                chatBox.removeChild(nextAiResponse);
            }
            chatBox.removeChild(msgDiv);
        });
    } else {
        // If it's the AI, use the fast typewriter
        typeHTML(msgDiv, formattedText);
    }
    
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msgDiv;
}

async function handleUserMessage() {
    const text = aiInput.value.trim();
    if (!text) return;

    if (isFirstMessage) {
        aiGreeting.style.display = 'none';
        isFirstMessage = false;
    }

    // Hide edit label if it was active
    editLabel.classList.add('hidden');

    appendMessage(text, 'user');
    aiInput.value = '';

    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('msg-ai', 'ai-loading');
    loadingIndicator.innerHTML = "Thinking...";
    chatBox.appendChild(loadingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemInstructionText }] },
                contents: [{ parts: [{ text: text }] }],
                generationConfig: { temperature: 0.7 }
            })
        });

        const data = await response.json();
        
        if (chatBox.contains(loadingIndicator)) chatBox.removeChild(loadingIndicator);

        if (response.status !== 200) {
            throw new Error(data.error?.message || `API returned ${response.status}`);
        }

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            appendMessage(data.candidates[0].content.parts[0].text, 'ai');
        } else {
            appendMessage("I ran into a server glitch. Probably Enriko tinkering with the backend again.", 'ai');
        }
    } catch (error) {
        if (chatBox.contains(loadingIndicator)) chatBox.removeChild(loadingIndicator);
        appendMessage("Network error or invalid key. " + error.message, 'ai');
        console.error("AI Request Failed:", error);
    }
}

aiSend.addEventListener('click', handleUserMessage);
aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserMessage();
});