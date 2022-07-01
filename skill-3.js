//Задание 4
//Сгенерировать массив чисел 1–31 включительно (числа месяца). Вывести с помощью console.log для каждого из чисел строку ${число} января, ${день недели}. День недели 1 января должен задаваться с помощью переменной, то есть программа должна корректно работать для любого дня недели, с которого начинается месяц. Подсказка 1: для дней недели можно создать массив с названиями дней, чтобы обращаться к нему по индексу. 
// Подсказка 2: индекс дня недели можно вычислить с помощью операции остатка от деления.

function januaryDays(firstWeekDay) {
    let month = [];
    let week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

    for (let i = 1; i <= 31; i++) {
        month.push(i);
    }

    for (let i = 0; i < 31; i++) {
        let index = week.indexOf(firstWeekDay);
        let a = (index + i) % 7;
        console.log(`${month[i]} января, ${week[a]}`);
    }
}

januaryDays('понедельник');
januaryDays('среда');
januaryDays('воскресенье');

// Задание 3
// Танк едет по дороге, на которой могут быть противотанковые мины. 
// Дорога должна быть представлена в виде массива roadMines из 10 boolean-элементов. 
// Если элемент равен true, то это мина. Движение танка должно быть представлено как цикл, в котором одна итерация — продвижение танка на следующий участок дороги (следующий элемент массива). При передвижении выводить в консоль сообщение «танк переместился на ${position}», где position — номер ячейки + 1. Если танк попал на мину, то нужно вывести сообщение «танк повреждён», если это 1-й взрыв, и «танк уничтожен», если это 2-й взрыв. После 2-го взрыва танк считается уничтоженным и прекращает движение.

function moveTank(roadMines) {
    let position = 1;
    let amount = 0;
    for (let i = 0; i < roadMines.length; i++) {
        if (roadMines[i] === true) {
            amount++;
            if (amount === 1) {
                console.log('Танк повреждён');
                console.log(`Танк переместился на ${position}`);
                position++;
            } if (amount === 2) {
                console.log(`Танк переместился на ${position}`);
                console.log('Танк уничтожен');
                break;
            }
        } else {
            console.log(`Танк переместился на ${position}`);
            position++;
        }
    }
}
moveTank([false, false, false, false, false, false, false, false, false, false]);
moveTank([false, false, false, true, false, false, false, false, false, false]); //вывод: танк переместился на 1, 2, 3, 4, танк повреждён, танк переместился на 5, 6, 7, 8, 9, 10.

// Задание 2
// С помощью цикла создать перевёрнутый вариант произвольной строки. Например, строка «Привет, мир!» должна превратиться в «!рим ,тевирП».
function reverseString(str) {
    let strReturn = [];
    for (let i = str.length - 1; i >= 0; i--) {
        strReturn.push(str[i]);
    }
    console.log(strReturn.join(''));
}

reverseString('abc'); // cba
reverseString('12345');

//  Задание 1
// Напишите генератор массивов длиной count со случайными числами от n до m. Учтите, что n и m могут быть отрицательными, а также может быть n > m или n < m. Выведите результат с помощью console.log.
function randomArray(count, n, m) {
    let min = Math.min(n, m);
    let max = Math.max(n, m);
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(Math.round(Math.random() * (max - min) + min));
    }
    console.log(arr);
}
randomArray(10, 10, 100);
randomArray(2, 5, 1); 