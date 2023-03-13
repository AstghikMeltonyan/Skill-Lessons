(function () {
  let listArray = [];
  let keyList = '';

  function createTodoTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    button.textContent = 'Добавить дело';
    input.placeholder = 'Добавить дело';

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');

    button.disabled = true;
    input.addEventListener('input', function () {
      button.disabled = false;
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button
    }
  }

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(obj) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    deleteButton.classList.add('btn', 'btn-danger');

    doneButton.textContent = 'Готово';
    deleteButton.textContent = 'Удалить';

    item.textContent = obj.name;
    item.id = obj.id;

    if (obj.done) item.classList.add('list-group-item-success');

    doneButton.addEventListener('click', function () {
      item.classList.toggle('list-group-item-success');

      for (const item of listArray) {
        if (item.id === obj.id) {
          item.done = !item.done;
        }
      }
      saveInLocaleStorage(keyList, listArray);
    });

    deleteButton.addEventListener('click', function () {
      if (confirm('Вы уверены?')) {
        item.remove()

        for (let i = 0; i < listArray.length; i++) {
          if (listArray[i].id == obj.id) {
            listArray.splice(i, 1)
          }
        }
      }
      saveInLocaleStorage(keyList, listArray);
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton
    }
  }

  function getNewID(arr) {
    let max = 0;
    for (let item of arr) {
      if (item.id > max) max = item.id;
    }
    return max + 1;
  }

  function saveInLocaleStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr))
  }

  function createTodoApp(container, title, key, todosArr) {
    let todoTitle = createTodoTitle(title);
    let todoForm = createTodoForm();
    let todoList = createTodoList();

    container.append(todoTitle);
    container.append(todoForm.form);
    container.append(todoList);

    keyList = key;
    let localData = localStorage.getItem(keyList);

    if (localData !== null && localData !== '') {
      listArray = JSON.parse(localData)
    } else {
      listArray = todosArr;
      saveInLocaleStorage(keyList, listArray)
    }

    for (const item of listArray) {
      let todoItem = createTodoItem(item)
      todoList.append(todoItem.item);
    }

    todoForm.form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!todoForm.input.value.trim()) {
        return;
      }

      let newTodo = {
        id: getNewID(listArray),
        name: todoForm.input.value,
        done: false
      }

      let todoItem = createTodoItem(newTodo);

      listArray.push(newTodo);

      todoList.append(todoItem.item);

      saveInLocaleStorage(keyList, listArray);

      todoForm.input.value = '';
      todoForm.button.disabled = true;
    })
  }
  window.createTodoApp = createTodoApp;
})()
