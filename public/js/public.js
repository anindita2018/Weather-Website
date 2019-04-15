console.log("Client side javascript file is loaded");

//targeting the form in home page of weather application
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');


//adding event listener to the targeted element
weatherForm.addEventListener('submit', (e) => {
    const location = search.value;
    e.preventDefault();

    //displaying some messages 
    msg1.textContent = 'Loading...';
    msg2.textContent = '';


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
                msg2.textContent = '';
            }
            else {
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
            }
        })
    })
})