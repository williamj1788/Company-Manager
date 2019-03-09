let selectedRow = null;
let form = document.getElementsByClassName('modal')[0];

function addData(url){
    let formData = new FormData(form);
    formData.append('username', JSON.parse(localStorage.getItem('user')).username);
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(res => {return res.json()})
    .then(res => {
        localStorage.setItem('user', JSON.stringify(res))
    }).then(updateTable)
    .then(toggleModal);
}

function deleteData(url,type){
    url += `?username=${JSON.parse(localStorage.getItem('user')).username}&${type}=${selectedRow}`
    fetch(url, {
        method: 'DELETE',
    })
    .then(res => {return res.json()})
    .then(res => {localStorage.setItem('user', JSON.stringify(res))})
    .then(updateTable);
}

function editData(url){
    let formData = new FormData(form);
    formData.append('username', JSON.parse(localStorage.getItem('user')).username);
    formData.append('id', parseInt(selectedRow));
    fetch(url, {
        method: 'PUT',
        body: formData,
    })
    .then(res => {return res.json()})
    .then(res => {localStorage.setItem('user', JSON.stringify(res))})
    .then(updateTable)
    .then(toggleModal);
}

function toggleModal(){
    let modal = document.getElementsByClassName('pop-up')[0];
    
    form.removeEventListener('submit',onSubmit2);
    form.addEventListener('submit', onSubmit);
    
    if(modal.style.display === 'none'){
        modal.style.display = 'block';
    }else{
        modal.style.display = 'none';
    }
}

function SetSelectedRow(event){
    selectedRow = event.target.parentElement.id;
    updateTable();
}

function back(){
    window.location.pathname = '/company';
}
