function delay(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function changeLevel(level)
{
    const transition = document.getElementById('levelTransition');
    if (transition)
    {
        transition.style.display = 'flex';
        await delay(1500);
        transition.style.opacity = '0';
        await delay(1000);
        transition.style.display = 'none';
    }
    window.location.href = `Level${level}.html`;
}

function setMessage(messageElement, text, className = '', color = '')
{
    messageElement.textContent = text;
    messageElement.className = className;
    messageElement.style.color = color;
}

// ANTI-INSPECTOR /cheat
function setupProtections()
{
    document.addEventListener('contextmenu', function (e)
    {
        e.preventDefault();
        return false;
    });

    document.addEventListener('keydown', function (e)
    {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'U')
        )
        {
            e.preventDefault();
            return false;
        }
    });
}

// Livello 1
function initializeLevel1()
{
    //console.log("initializing 1");
    generateStarsLvl1();
    setupInputCheckLevel1();
}

function generateStarsLvl1()
{
    //console.log("Generating stars 1");
    const hiddenStars = document.getElementById('hiddenStars');
    if (!hiddenStars) return;

    const chars = ['·', '*', '·', '·', '*'];
    const starCount = 1000;
    hiddenStars.innerHTML = '';

    for (let i = 0; i < starCount; i++)
    {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = chars[Math.floor(Math.random() * chars.length)];
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.fontSize = `${Math.random() * 0.5 + 0.8}em`;
        star.style.opacity = Math.random() * 0.7 + 0.3;
        hiddenStars.appendChild(star);
    }
}

function setupInputCheckLevel1()
{
    const secretInput = document.getElementById('secretInputLVL1');
    const message = document.getElementById('message');
    if (!secretInput || !message) return;

    secretInput.addEventListener('input', function ()
    {
        const inputValue = secretInput.value.toLowerCase().trim();

        if (inputValue === 'espressioni nascoste')
        {
            setMessage(message, '                       ', 'success');
            secretInput.style.display = 'none';
            changeLevel(2);
        }
        else if (inputValue.length < 20)
        {
            setMessage(message, 'Parola errata, riprova!', 'error');
        }
        else
        {
            setMessage(message, 'analizza ciò che vedi');
        }
    });
}

// Livello 2
function initializeLevel2()
{
    //console.log("initializing 2");
    const hiddenMorse = document.getElementById('hiddenMorse');
    if (hiddenMorse)
    {
        hiddenMorse.style.opacity = '1';
    }
    generateStarsLvl2();
    setupInputCheckLevel2();
}

function generateStarsLvl2()
{
    //console.log("Generating stars 2");
    let starsContainer = document.getElementById('hiddenStars');

    if (!starsContainer)
    {
        starsContainer = document.createElement('div');
        starsContainer.id = 'hiddenStars';
        starsContainer.style.position = 'fixed';
        starsContainer.style.top = '0';
        starsContainer.style.left = '0';
        starsContainer.style.width = '100vw';
        starsContainer.style.height = '100vh';
        starsContainer.style.pointerEvents = 'none';
        starsContainer.style.zIndex = '1'; // Sopra o sotto? Cambia qui
        document.body.appendChild(starsContainer);
    }

    const chars = ['·', '*', '·', '·', '*'];
    const starCount = 1000;
    starsContainer.innerHTML = '';

    for (let i = 0; i < starCount; i++)
    {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.fontSize = `${Math.random() * 0.5 + 0.8}em`;
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.color = 'black';
        star.textContent = chars[Math.floor(Math.random() * chars.length)];
        starsContainer.appendChild(star);
    }
}

function setupInputCheckLevel2()
{
    const secretInput = document.getElementById('secretInputLVL2');
    const message = document.getElementById('message');
    if (!secretInput || !message) return;

    secretInput.addEventListener('input', function ()
    {
        const inputValue = secretInput.value.toLowerCase().trim();

        if (inputValue === 'adolescenza')
        {
            setMessage(message, 'Periodo giusto', '', 'green');
            secretInput.style.display = 'none';

            setTimeout(function ()
            {
                document.body.innerHTML = '<h1>Livello 3</h1><p>ehm, work in progress penso...</p>';
                changeLevel(3);
            }, 1500);
        }
        else if (inputValue.length !== 11)
        {
            setMessage(message, 'Soluzione errata, riprova!', 'error');
        }
        else
        {
            setMessage(message, 'suggerimento: periodo?');
        }
    });
}


// Livelli gestione centrale per scalabilità
function initializeLevel(level)
{
    switch (level)
    {
        case 1:
        {
            initializeLevel1();
            break;
        }
        case 2:
        {
            initializeLevel2();
            break;
        }
        // Add LEvels
        default:
        {
            console.warn(`Livello ${level} non gestito.`);
        }
    }

    setupProtections();
}

// Start
document.addEventListener('DOMContentLoaded', function ()
{
    const bodyClass = document.body.className;
    //console.log("Body Class: ", bodyClass);    
    if (bodyClass.includes('LVL1'))
    {
        //console.log("Starting Lvl 1");
        initializeLevel(1);
    }
    else if (bodyClass.includes('LVL2'))
    {
        //console.log("Starting Lvl 2");        
        initializeLevel(2);
    }
    else
    {
        // Default o livello non riconosciuto
        console.error("Error Scelta lvl");
        setupProtections();
    }
});
