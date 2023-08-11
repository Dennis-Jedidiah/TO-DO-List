
function addListeners(params) {
    let checkboxList = document.getElementsByName("checkbox");
    checkboxList.forEach(element => {
        element.addEventListener("click", ()=>{
            let prevesib = element.previousElementSibling;
            console.log(prevesib.classList.toggle("text-decoration-line-through"));
        })
    });
}