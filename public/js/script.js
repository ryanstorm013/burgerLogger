const burgerInput = document.querySelector("#burger_input");
const burgerSub = document.querySelector("#subButton");
const deleteBurg = document.querySelectorAll(".deleteBurg");
var form = document.forms["burger-form"]["name"].value;
var form2 = document.getElementById("burger_input").value;

burgerSub.addEventListener("click", (e) => {
        const newBurg = {
            burger_name: burgerInput.value.trim()
        };

        fetch("/api/burgers", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBurg)
        }).then(() => {
           
            
                document.getElementById("burger_input").value = "";
                
            
            console.log("taco");
        });
        
    
});

const devoured = document.querySelectorAll(".devouredId");

if(devoured) {
    devoured.forEach((el) => {
        el.addEventListener("click", (e) => {
            

            const newDev = e.target.getAttribute("data-newdevoured");

            const burgSitu = {
                devoured: newDev
            };

            const burgerid = el.getAttribute("id");

            fetch(`/api/burgers/${burgerid}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(burgSitu)
            }).then((res) => {
                if(res.ok) {
                    location.reload("/");
                }
                else {
                    alert('Something went wrong');
                }
            })
        })
    })
}


deleteBurg.forEach(function(button) {
    button.addEventListener("click", (e) => {
        const id = e.target.getAttribute(`data-id`);

        fetch(`/api/burgers/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            console.log(`Deleted cat: ${id}`)
            location.reload();
        })
    });
})

