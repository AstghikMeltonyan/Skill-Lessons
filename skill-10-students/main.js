(() => {
  class Student {
    constructor(name, surname, patronymic, studyStart, birthDate, faculty) {
      this.name = name
      this.surname = surname
      this.patronymic = patronymic
      this.studyStart = studyStart
      this.birthDate = birthDate
      this.faculty = faculty
    }

    get fio() {
      return this.surname + ' ' + this.name + ' ' + this.patronymic
    }

    get studyEnd() {
      return this.studyStart + 4
    }

    getStudyPeriod() {
      const currentYear = new Date().getFullYear()
      return currentYear - this.studyStart
    }

    getBirthDate() {
      let year = this.birthDate.getFullYear();
      let month = this.birthDate.getMonth();
      let day = this.birthDate.getDate();
      day < 10 ? day = '0' + day : day;
      month < 10 ? month = '0' + month : month;
      return day + '.' + month + '.' + year;
    }

    getAge() {
      const today = new Date();
      let age = today.getFullYear() - this.birthDate.getFullYear();
      let m = today.getMonth() - this.birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
        age--;
      }
      return age
    }
  }

  const students = [
    new Student('Олег', 'Иванов', 'Иванович', 2011, new Date(1995, 10, 9), 'Экономический'),
    new Student('Наталья', 'Румянцева', 'Владимировна', 2020, new Date(2000, 4, 24), 'Журналистики'),
    new Student('Владимир', 'Беляков', 'Вадимович', 2018, new Date(1994, 6, 26), 'Компьютерных наук'),
    new Student('Наталья', 'Волкова', 'Андреевна', 2021, new Date(2002, 8, 24), 'Биологии'),
    new Student('Олег', 'Беляков', 'Вадимович', 2017, new Date(1994, 3, 2), 'Компьютерных наук')
  ]

  const htmlInner = () => {
    const container = document.createElement('div');
    const h1 = document.createElement('h1');
    const addForm = formAddInit()

    container.classList.add('container');
    h1.classList.add('mb-3')

    h1.textContent = 'Список студентов'

    container.append(h1)
    container.append(addForm)

    return {
      container,
      addForm
    }
  }

  const formAddInit = () => {

    const form = document.createElement('form');
    form.classList.add('form_add', 'mb-3');

    const fields = [
      {
        type: 'text',
        label: 'Фамилия',
        id: 'surname'
      },
      {
        type: 'text',
        label: 'Имя',
        id: 'name'
      },
      {
        type: 'text',
        label: 'Отчество',
        id: 'patronymic'
      },
      {
        type: 'date',
        label: 'Дата рождения',
        id: 'birthDate'
      },
      {
        type: 'number',
        label: 'Год начала обучения',
        id: 'studyStart'
      },
      {
        type: 'text',
        label: 'Факультет',
        id: 'faculty'
      }
    ];

    fields.forEach((item) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');

      label.classList.add('mb-4', 'label');
      span.classList.add('span', 'mb-2')
      input.classList.add('form-control');

      input.setAttribute('type', item.type);
      input.setAttribute('placeholder', item.label + ' *')
      input.setAttribute('id', item.id);

      span.innerText = item.label

      label.append(span)
      label.append(input)
      form.append(label)
    })

    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-primary', 'btn_add');
    btn.innerHTML = 'Добавить студента'

    form.append(btn);

    return form;
  }

  const htmlLayout = htmlInner();
  document.body.append(htmlLayout.container);

  const studentsThead = ['ФИО', 'Дата рождение', 'Начала обучения', 'Факультет'];

  function searchStudentBlock() {
    const searchInputs = document.createElement('div');
    searchInputs.classList.add('input-group');
    const filterArr = ['search-fio', 'search-start-study', 'search-end-study', 'search-faculty']

    for (let i = 0; i <= 3; i++) {
      const searchInput = document.createElement('input');
      searchInput.classList.add('form-control');
      searchInput.setAttribute('id', filterArr[i])
      searchInput.setAttribute('placeholder', studentsThead[i])
      searchInputs.append(searchInput);
    }

    return searchInputs
  }

  function addTable() {
    const saerchBlock = searchStudentBlock()

    const studentsList = document.createElement('tbody');
    studentsList.setAttribute('id', 'student-list');

    const studentsTable = document.createElement('table');
    studentsTable.classList.add('table', 'table-striped', 'studentsTable');

    const thead = document.createElement('thead');

    studentsTable.append(thead)
    studentsTable.append(studentsList)
    htmlLayout.container.append(saerchBlock)
    htmlLayout.container.append(studentsTable)

    return {
      studentsList,
      studentsTable,
      thead
    }
  }

  const addStudentsTable = addTable()

  function newStudentTR(student) {
    const studentTR = document.createElement('tr'),
      fioTD = document.createElement('td'),
      birthDateTD = document.createElement('td'),
      studyStartTD = document.createElement('td'),
      facultyTD = document.createElement('td');

    fioTD.textContent = student.fio;
    birthDateTD.textContent = student.getBirthDate() + ' (' + student.getAge() + ' лет )';

    if (student.getStudyPeriod() > 4 || student.getStudyPeriod() === 4 && (new Date().getMonth() + 1) > 9) {
      studyStartTD.textContent = student.studyStart + '-' + (student.studyStart + 4) + '( Закончил )'
    } else {
      studyStartTD.textContent = student.studyStart + '-' + (student.studyStart + 4) + ' (' + student.getStudyPeriod() + ' курс)'
    }
    facultyTD.textContent = student.faculty;

    studentTR.append(fioTD);
    studentTR.append(birthDateTD)
    studentTR.append(studyStartTD)
    studentTR.append(facultyTD)

    return studentTR
  }

  const dataArr = ['fio', 'birthDate', 'studyStart', 'faculty'];
  const btnArr = [];
  let columnDir = true,
    column;

  for (let i = 0; i <= 3; i++) {
    const theadTh = document.createElement('th');
    const span = document.createElement('span');
    const sortBtn = document.createElement('button');

    span.classList.add('mr-3')
    sortBtn.classList.add('button', 'btn', 'sort_btn');
    sortBtn.setAttribute('data-column', dataArr[i])
    theadTh.innerText = studentsThead[i]
    btnArr.push(sortBtn)

    theadTh.append(span)
    theadTh.append(sortBtn)
    addStudentsTable.thead.append(theadTh)
  }

  function getSortStudents(prop, dir) {
    const studentsCopy = [...students];

    return studentsCopy.sort(function (studentA, studentB) {
      if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
        return -1;
    })
  }

  btnArr.forEach(element => {
    element.addEventListener('click', function () {
      column = this.dataset.column;
      columnDir = !columnDir
      render()
    })
  });

  function filter(students, prop, value) {
    let copyStudents = [...students]
    let studentsFilteredList = copyStudents.filter(student => (String(student[prop]).includes(value) === true))
    return studentsFilteredList
  }

  function filterStudent(students) {
    addStudentsTable.studentsList.innerHTML = '';

    const fioValue = document.getElementById('search-fio').value,
      studyStartValue = document.getElementById('search-start-study').value,
      endStudyValue = document.getElementById('search-end-study').value,
      facultyValue = document.getElementById('search-faculty').value;

    let studentsFilter = [...students]

    studentsFilter = filter(studentsFilter, 'fio', fioValue)
    studentsFilter = filter(studentsFilter, 'birthDate', studyStartValue)
    studentsFilter = filter(studentsFilter, 'studyStart', endStudyValue)
    studentsFilter = filter(studentsFilter, 'faculty', facultyValue)

    for (const student of studentsFilter) {
      addStudentsTable.studentsList.append(newStudentTR(student))
    }
  }

  document.querySelectorAll('.input-group').forEach(el => {
    el.addEventListener('input', function () {
      filterStudent(students)
    })
  })

  const getTodayDate = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    day < 10 ? day = '0' + day : day;
    month < 10 ? month = '0' + month : month;
    return day + '.' + month + '.' + year;
  }

  const errorsMap = {
    surname: 'Заполните фамилию студента',
    name: 'Заполните имя студента',
    patronymic: 'Заполните отчество',
    birthDate: `Введите число в диапазоне от 01.01.1900г до ${getTodayDate()}`,
    studyStart: `Введите число в диапазоне от 2000г до ${new Date().getFullYear()}`,
    faculty: 'На каком факультете?'
  }

  const checkInputs = () => {

    htmlLayout.addForm.querySelectorAll('form .form-control').forEach((input) => {

      const invalidMessage = input.parentElement.querySelector('.invalid-feedback')

      if (invalidMessage) {
        invalidMessage.remove()
      }

      input.classList.remove('is-invalid');

      if (!input.value.trim().length) {
        const errorMessage = document.createElement('span');

        errorMessage.classList.add('invalid-feedback');
        input.classList.add('is-invalid');

        errorMessage.textContent = errorsMap[input.id];

        input.parentElement.append(errorMessage)
        return false
      }
    })

    if ((studyStart.value < 2000) || (studyStart.value > new Date().getFullYear())) {
      studyStart.classList.add('is-invalid');
    }

    const checkBirthDate = new Date('01.01.1900');
    if ((birthDate.valueAsDate < checkBirthDate) || (birthDate.valueAsDate > new Date())) {
      birthDate.classList.add('is-invalid');
    }

    if (htmlLayout.addForm.querySelectorAll('.is-invalid').length) {
      return false;
    }
    return true;
  }

  htmlLayout.addForm.querySelectorAll('form .form-control').forEach((input) => {
    input.addEventListener('input', () => {
      checkInputs()
    });
  });

  htmlLayout.addForm.addEventListener('submit', e => {
    e.preventDefault()

    let checkResult = checkInputs()

    if (!checkResult) {
      return;
    }

    addTrueStudent()
  })

  function addTrueStudent() {
    students.push(new Student(
      document.getElementById('name').value,
      document.getElementById('surname').value,
      document.getElementById('patronymic').value,
      Number(document.getElementById('studyStart').value),
      new Date(document.getElementById('birthDate').value),
      document.getElementById('faculty').value,
    ))

    for (let input of htmlLayout.addForm.querySelectorAll('form .form-control')) {
      input.value = '';
    }
    render()
  }

  function render() {
    let studentsCopy = [...students];
    studentsCopy = getSortStudents(column, columnDir);

    addStudentsTable.studentsList.innerHTML = '';

    for (const student of studentsCopy) {
      addStudentsTable.studentsList.append(newStudentTR(student))
    }
  }
  render()
})()
