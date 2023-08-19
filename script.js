const students = [
    // Your student data here
  ];
  
  const studentTable = document.getElementById('studentTable');
  const studentForm = document.getElementById('studentForm');
  const submitBtn = document.getElementById('submitBtn');
  const searchInput = document.getElementById('searchInput');
  
//   function renderStudents() {
//     studentTable.querySelector('tbody').innerHTML = '';
    
//     students.forEach(student => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${student.ID}</td>
//         <td>${student.name}</td>
//         <td>${student.age}</td>
//         <td>${student.grade}</td>
//         <td>${student.degree}</td>  
//         <td>${student.email}</td>
//         <td><button class="editBtn" data-id="${student.ID}">Edit</button></td>
//         <td><button class="deleteBtn" data-id="${student.ID}">Delete</button></td>
//       `;
//       studentTable.querySelector('tbody').appendChild(row);
//     });
//   }
  
function renderStudents(){
    studentTable.querySelector('tbody').innerHTML='';

    students.forEach(student =>{
        const row = document.createElement('tr');
        
        row.innerHTML=`
        <td>${student.ID}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.grade}</td>
                <td>${student.degree}</td>  
                <td>${student.email}</td>
                <td><button class="editBtn" data-id="${student.ID}">Edit</button></td>
                <td><button class="deleteBtn" data-id="${student.ID}">Delete</button></td>
        `;
        
        studentTable.querySelector('tbody').appendChild(row);
          
    });
    
}

  function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('degree').value = '';
    document.getElementById('email').value = '';
    submitBtn.innerText = 'Add Student';
    submitBtn.removeAttribute('data-edit-id');
  }
  
  function addStudent(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const grade = document.getElementById('grade').value;
    const degree = document.getElementById('degree').value;
    const email = document.getElementById('email').value;
    
    if (submitBtn.hasAttribute('data-edit-id')) {
      // Edit existing student
      const editId = parseInt(submitBtn.getAttribute('data-edit-id'));
      const studentIndex = students.findIndex(student => student.ID === editId);
      if (studentIndex !== -1) {
        students[studentIndex] = { ID: editId, name, age, grade, degree, email };
      }
    } else {
      // Add new student
      const newID = students.length + 1;
      students.push({ ID: newID, name, age, grade, degree, email });
    }
        
    renderStudents();
    clearForm();
  }
// function addStudent(event){
// event.preventDefault();
// const name =document.getElementById('name').value;
// const age = parseInt(document.getElementById('age').value);
// const grade = document.getElementById('grade').value;
// const degree = document.getElementById('degree').value;
// const email = document.getElementById('email').value;

// if(submitBtn.hasAttributes('data-edit-id')){
//     const editId = parseInt(submitBtn.getAttribute('data-edit-id'));
//     const studentIndex = students.findIndex(student => student.ID === editId);

//     if(studentIndex!==-1){
//         students[studentIndex]={ID: editId,name,age,grade,degree,email};

//     }
// }
// else{
//     const  newID = students.length+1;
//     students.push({ID: newID, name, age, grade, degree,email});
// }

// renderStudents();
// clearForm();

// }
  
  function editStudent(event) {
    const editId = parseInt(event.target.getAttribute('data-id'));
    const student = students.find(student => student.ID === editId);
    if (student) {
      document.getElementById('name').value = student.name;
      document.getElementById('age').value = student.age;
      document.getElementById('grade').value = student.grade;
      document.getElementById('degree').value = student.degree;
      document.getElementById('email').value = student.email;
      submitBtn.innerText = 'Edit Student';
      submitBtn.setAttribute('data-edit-id', editId);
    }
  }
  
  function deleteStudent(event) {
    const deleteId = parseInt(event.target.getAttribute('data-id'));
    const studentIndex = students.findIndex(student => student.ID === deleteId);
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      renderStudents();
    }
  }
  
  function searchStudents() {
    const searchText = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student => {
      return (
        student.name.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.degree.toLowerCase().includes(searchText)
      );
    });
    renderFilteredStudents(filteredStudents);
  }
  
  function renderFilteredStudents(filteredStudents) {
    studentTable.querySelector('tbody').innerHTML = '';
  
    filteredStudents.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td><button class="editBtn" data-id="${student.ID}">Edit</button></td>
        <td><button class="deleteBtn" data-id="${student.ID}">Delete</button></td>
      `;
      row.querySelector('td').style.color="white";
      studentTable.querySelector('tbody').appendChild(row);
    });
  }
  
  // Event listeners
  submitBtn.addEventListener('click', addStudent);
  studentTable.addEventListener('click', event => {
    if (event.target.classList.contains('editBtn')) {
      editStudent(event);
    } else if (event.target.classList.contains('deleteBtn')) {
      deleteStudent(event);
    }
  });
  searchInput.addEventListener('input', searchStudents);
  
  // Initial rendering
  renderStudents();