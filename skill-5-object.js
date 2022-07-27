// Задание
// Напишите функцию filter в object-array-filter.js, фильтрующую массив объектов по значению свойства. Массив, название свойства и нужное значение должны передаваться в качестве аргументов. Пример использования:

let objects = [
 { name: 'Василий', surname: 'Васильев' },
 { name: 'Иван', surname: 'Иванов' },
 { name: 'Пётр', surname: 'Петров' }
 ]
 

//  let result = filter(objects, 'name', 'Иван');
 
 /*
 Результат выполнения должен быть:
 [
 { name: 'Иван', surname: 'Иванов' }
 ]
 */

function filterObject(objects, name, value) {
  let newObjects = [];
  for (let obj of objects) {
    if (obj[name] === value) {
      newObjects.push(obj);
    }
  }
  return newObjects;
}

console.log(filterObject(objects, 'name', 'Иван'));

// Recomented menthor
function filterObject_1 (objects, name, value) {
  return objects.filter(obj=> obj[name] === value)
}

console.log(filterObject_1(objects, 'name', 'Василий'));