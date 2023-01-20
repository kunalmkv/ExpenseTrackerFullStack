window.addEventListener("DOMContentLoaded", async () => {
    try {
        await axios.get("http://localhost:3000/admin/get-expense").then((response) => {
            console.log(response);
            for (var i = 0; i < response.data.allUsers.length; i++) {
                showMeUser(response.data.allUsers[i]);
            }
        })
    }
    catch (err) {
        console.log(err);
    }
})
async function savetoLocal(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const detail = event.target.desc.value;
    const category = event.target.myCat.value;

    const obj = {
        amount,
        detail,
        category
    }
    try {
        await axios.post("http://localhost:3000/admin/add-expense", obj).then(response => {
            showMeUser(response.data);
        })
    }
    catch (err) {
        document.body.innerHTML = document.body.innerHTML + "<H4>Something went wrong!<h4>";
        console.log(err);
    }

}

/*window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/admin/get-expense").then((response) => {
        console.log(response);
        for (var i = 0; i < response.data.allUsers.length; i++) {
            showMeUser(response.data.allUsers[i]);
        }
    })
        .catch((err) => {
            console.log(err);
        })
})*/


function showMeUser(obj) {

    document.getElementById('details').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';


    const parentNode = document.getElementById('listofUsers');
    const childNode = `<li class="items" id=${obj.id}> ₹${obj.amount} - ${obj.detail}
        <button onclick="deleteUser('${obj.id}')"> Delete expense </button>
        <button onclick="editUser('${obj.detail}','${obj.amount}','${obj.category}','${obj.id}')"> Edit </button>
          </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childNode;
}
async function deleteUser(userId) {
    try {
        await axios.delete(`http://localhost:3000/admin/delete-expense/${userId}`)
            .then((response) => {
                removeFromScreen(userId);
            })
    }
    catch (err) {
        console.log(err);
    }

}
/*function deleteUser(userId) {

    axios.delete(`http://localhost:3000/admin/delete-expense/${userId}`)
        .then((response) => {
            removeFromScreen(userId);
        })

}*/
function editUser(emai, user, cate, userId) {
    document.getElementById('details').value = emai;
    document.getElementById('amount').value = user;
    document.getElementById('category').value = cate;
    deleteUser(userId);
    removeFromScreen(userId);

}
function removeFromScreen(userId) {
    const parent = document.getElementById('listofUsers');
    const childtobeDeleted = document.getElementById(userId);
    if (childtobeDeleted) {
        parent.removeChild(childtobeDeleted);
    }
}