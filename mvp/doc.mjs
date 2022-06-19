/** @returns {Record<string,HTMLElement>} */
export function docById(){
    let obj = {};
    const o = [...document.querySelectorAll("*[id]")];
    for(const e of o){
        obj[e.getAttribute("id")] = e;
    }
    return obj;
}