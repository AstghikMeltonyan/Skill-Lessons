// Задание 1
// Напишите функцию filter() в filter-black-list.js, которая создаёт массив email-адресов, не попавших в чёрный список. В качестве аргументов функция должна принимать: массив строк с исходными email адресами, массив строк с email адресами в чёрном списке.
// В конце файла с кодом домашнего задания напишите конструкцию export default {название функции}, чтобы была возможность автоматической проверки получившейся функции.
function cartTotal(cost, count, promotion = null) {
    let sum = cost;
    if (promotion === 'ДАРИМ300') {
        if (sum < 300) {
            sum = 0;
        } else {
            sum -= 300;
        }
    }
    if (count >= 10) {
        sum -= sum * (5 / 100);
    }
    if (sum > 50000) {
        sum -= (sum - 50000) * (20 / 100);
    }
    if (promotion === 'СКИДКА15' && sum >= 20000) {
        sum -= sum * (15 / 100);
    }
    return sum;
}

console.log(cartTotal(20000, 2, 'СКИДКА15'));
console.log(cartTotal(100, 15, 'ДАРИМ300'));

// Recomended menthor
function cartTotal_1(cost, count, promotion = null) {
    let sum = cost;
    if (promotion === 'ДАРИМ300') {
        // this part menthor recomented to change
        // if (sum < 300) {
        //     sum = 0;
        // } else {
        //     sum -= 300;
        // }
        sum = sum < 300 ? 0 : sum - 300;
    }

    if (count >= 10) {
        sum -= sum * (5 / 100);
    }
    if (sum > 50000) {
        sum -= (sum - 50000) * (20 / 100);
    }
    if (promotion === 'СКИДКА15' && sum >= 20000) {
        sum -= sum * (15 / 100);
    }
    return sum;
}

console.log(cartTotal_1(20000, 2, 'СКИДКА15'));
console.log(cartTotal_1(100, 15, 'ДАРИМ300'));

// Задание 2
// Напишите функцию calculate() в cart-total.js, которая вычисляет и возвращает стоимость корзины товаров после применения всех скидок. В качестве аргументов функция принимает 3 параметра:
// Общая сумма корзины
// Количество товаров в корзине
// Промокод (по умолчанию null)
// Правила и порядок (порядок важен!) начисления скидок:

// Если промокод равен 'ДАРИМ300', то из суммы вычитается 300 рублей. При этом если сумма меньше 300 рублей, то итоговая стоимость будет 0.
// При количестве товаров в корзине ≥10 применяется скидка 5% ко всей сумме
// При сумме, превышающей 50 000, применяется скидка 20% к сумме превышения (то есть к разнице суммы корзины и 50 000)
// Если промокод равен 'СКИДКА15', то ко всей сумме применяется скидка 15%, но только если сумма ≥20 000
// Каждая следующая скидка должна проверяться и применяться к сумме после применения предыдущих скидок.
function getResponsibleUser(usersList, blackListUsers) {
    let validEmailes = [];
    for (let user of usersList) {
        if (blackListUsers.includes(user)) continue;
        validEmailes.push(user);
    }
    return validEmailes;
}

console.log(getResponsibleUser(['1', '2', '3', '4', '5'], ['3', '4']));
console.log(getResponsibleUser(['1', '2', '3', '4', '5'], []));

// Recomented menthor
function getResponsibleUser_1(usersList, blackListUsers) {
    return usersList.filter((el) => !blackListUsers.includes(el));
}

console.log(getResponsibleUser_1(['1', '2', '3', '4', '5'], ['3', '4']));
console.log(getResponsibleUser_1(['1', '2', '3', '4', '5'], []));

// 2 tarberak indexOf-ov
function func(arr1, arr2) {
    let arr =[];
    for ( let i in arr1) {
        if(arr2.indexOf(arr1[i]) === -1){
            arr.push(arr1[i])
        }
    }
    return arr;
}
console.log(func(['1', '2', '3', '4', '5'], ['0', '3', '4']));