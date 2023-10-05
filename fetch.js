let listSubjectBlock = document.querySelector('#list-subject')
let subjectAPI = 'http://localhost:3000/student';

function start() {
    getSubject(renderSubject);
    handleForm();
}
start();


function getSubject(callback) {
    fetch(subjectAPI)
        .then(function (respond) {
            return respond.json();
        })
        .then(callback);

}

//read
function renderSubject(subject) {
    let listSubjectBlock = document.querySelector('#list-subject')
    let html = subject.map(function (sub) {
        return `
    <li>
    <h4>${sub.name}</h4>
    <button onclick="deleteSubject(${sub.id})">Xóa</button> 
    <!-- thêm nút xóa -->
    <button onclick="handleUpdateSubject(${sub.id})">Sửa</button>
    </li>
    `;
    });

    listSubjectBlock.innerHTML = html.join('');

}
function handleForm() {
    let createButton = document.querySelector('#create');
    createButton.onclick = function () {
        let name = document.querySelector('input[name="name"]').value;
        console.log(name);
        let formData = {
            name: name,
        };
        createSubject(formData, function () {
            getSubject(renderSubject);
        });
    }
}
//create
function createSubject(data, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(subjectAPI, options)
        .then(function (respond) {
            respond.json();
        }
        )
        .then(callback);
}

//delete
function deleteSubject(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(subjectAPI + '/' + id, options)
        .then(function (respond) {
            respond.json();
        }
        )
        .then(callback);
}

//update
function updateSubject(id, data, callback) {
    let options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)

    }

    fetch(subjectAPI + '/' + id, options)
        .then(function (respond) {
            respond.json();
        })
        .then(callback);
}

function handleUpdateSubject(id) {
    let name = document.querySelector('.name' + id);
    let editButton = document.querySelector('#create');
    
    let nameInput = document.querySelector('input[name="name"]');
    if (name) {
        nameInput.value = name.innerText;   
        editButton.innerText = "Save";
    }
    editButton.onclick = function () {
        var formData = {
            name: nameInput.value
        }
       updateSubject(id, formData, function () {
            getSubject(renderSubject);
        })

        // sửa xong thì trả về lại tạo form
        editButton.innerText = "Create";
        nameInput.value = '';
        handleForm();
    }

}








