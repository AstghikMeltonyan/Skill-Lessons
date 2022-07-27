// Задание 1
// Запишите в переменные x и y координаты двух произвольных точек: x1, y1 — первая точка, x2, y2 — вторая точка. Вычислите площадь прямоугольника, 
// противоположные углы которого представлены указанными точками. Выведите результат с помощью console.log.
let x1 = 3, y1 = 5, x2 = 8, y2 = -7;

let cathetusX = Math.abs(x1 - x2);
let cathetusY = Math.abs(y1 - y2);

let square = cathetusX * cathetusY

console.log('Площадь прямоугольника равна ' + square);

// Задание 2
// Вычислите дробные части чисел a и b с точностью n. 
// Выведите получившиеся числа с помощью console.log. 
// Выведите результаты их сравнения >, <, ≥, ≤, ===, ≠ с помощью console.log.
let a = 13.123456789, b = 2.123, n = 5 // дробные части: 12345, 12300
let a1 = 13.890123, b1 = 2.891564, n1 = 2 // дробные части: 89, 89
let a2 = 13.890123, b2 = 2.891564, n2 = 3 // дробные части: 890, 891


let fractA = Math.floor(a%1 * Math.pow(10,n))
let fractB = Math.floor(b%1 * Math.pow(10,n))
console.log(fractA); // 12345
console.log(fractB); // 12300
console.log(fractA > fractB); // true
console.log(fractA < fractB); // false
console.log(fractA >= fractB); // true
console.log(fractA <= fractB); // false
console.log(fractA === fractB); // false
console.log(fractA !== fractB); // true



let fractA1 = Math.floor(a1%1 * Math.pow(10,n1))
let fractB1 = Math.floor(b1%1 * Math.pow(10,n1))
console.log(fractA1); // 89
console.log(fractB1); // 89
console.log(fractA1 > fractB1); // false
console.log(fractA1 < fractB1); // false
console.log(fractA1 >= fractB1); // true
console.log(fractA1 <= fractB1); // true
console.log(fractA1 === fractB1); // true
console.log(fractA1 !== fractB1); // false



let fractA2 = Math.floor(a2%1 * Math.pow(10,n2))
let fractB2 = Math.floor(b2%1 * Math.pow(10,n2))
console.log(fractA2); // 890
console.log(fractB2); // 891
console.log(fractA2 < fractB2); // true
console.log(fractA2 > fractB2); // false
console.log(fractA2 <= fractB2); // true
console.log(fractA2 >= fractB2); // false
console.log(fractA2 === fractB2); // false
console.log(fractA2 !== fractB2); // true


// Задание 3
// Написать генератор нечётных случайных чисел в диапазоне между n и m включительно.
// Учесть, что n и m могут быть отрицательными, а также может быть n > m или n < m. 
// Вывести результат с помощью console.log.
let n5 = 3;
let m = -5;
let num = Math.round(Math.random() * (m - n5) + n5)
console.log(num + 1 - Math.abs(num%2))