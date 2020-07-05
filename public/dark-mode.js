window.addEventListener("DOMContentLoaded", (event) => {
    const darkSwitch = document.getElementById("darkSwitch");
    
    const style = document.querySelector('#tema');
    
    let href = style.getAttribute('href');

    let icono = document.querySelector('#iconoDM i');
    
    darkSwitch.addEventListener("click", function(){
        if (darkSwitch.checked) {
            href = "https://bootswatch.com/4/darkly/bootstrap.min.css";
            style.setAttribute('href', href);
            icono.classList.remove('fa-sun');
            icono.classList.add('fa-moon');
        }else {
            href = "https://bootswatch.com/4/journal/bootstrap.min.css";
            style.setAttribute('href', href);
            icono.classList.remove('fa-moon');
            icono.classList.add('fa-sun');
        }
    });
});
