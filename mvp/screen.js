export function setScreen(to=""){
    document.querySelectorAll('*[screen]').forEach(e=>e.setAttribute('hidden','true'));
    document.querySelectorAll(`*[screen=${to}]`).forEach(e=>e.setAttribute('hidden','false'));
}