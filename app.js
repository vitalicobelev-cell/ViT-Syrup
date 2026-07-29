/* =========================================================
   ViT-Syrup v2.0
   app.js

   Вся логика приложения.

   Формула:

   (Вес × 1000 − Тара − Помпа) / 770

========================================================= */


/* =========================================================
   ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ
========================================================= */

const companyName = document.getElementById("companyName");
const bottleName = document.getElementById("bottleName");
const pumpName = document.getElementById("pumpName");

const note = document.getElementById("note");

const weight = document.getElementById("weight");

const result = document.getElementById("result");

const copyMark = document.getElementById("copyMark");

const bottlePrev = document.getElementById("bottlePrev");
const bottleNext = document.getElementById("bottleNext");


/* =========================================================
   ТЕКУЩИЙ ВЫБОР
========================================================= */

let companyIndex = 0;
let bottleIndex = 0;
let pumpIndex = 0;


/* =========================================================
   БЫСТРЫЙ ДОСТУП К ДАННЫМ
========================================================= */

function currentCompany() {

    return DATA[companyIndex];

}

function currentBottle() {

    return DATA[companyIndex].bottles[bottleIndex];

}

function currentPump() {

    return PUMPS[pumpIndex];

}


/* =========================================================
   ОБНОВЛЕНИЕ ЭКРАНА
========================================================= */

function updateScreen() {

    const company = currentCompany();
    const bottle = currentBottle();
    const pump = currentPump();

    companyName.textContent = company.company;
    bottleName.textContent = bottle.name;
    pumpName.textContent = pump.name;
    note.textContent = company.note;

    /* -----------------------------------------
       Минимальный вес
    ----------------------------------------- */

    const minWeight = bottle.tare + pump.weight;

    weight.placeholder = "от " + minWeight + " г";

    /* -----------------------------------------
       Если бутылка одна —
       стрелки скрываем
    ----------------------------------------- */

    if (company.bottles.length === 1) {

        bottlePrev.style.visibility = "hidden";
        bottleNext.style.visibility = "hidden";

    } else {

        bottlePrev.style.visibility = "visible";
        bottleNext.style.visibility = "visible";

    }

}


/* =========================================================
   ПЕРЕКЛЮЧЕНИЕ ФИРМЫ
========================================================= */

document.getElementById("companyPrev").onclick = function () {

    companyIndex--;

    if (companyIndex < 0) {

        companyIndex = DATA.length - 1;

    }

    bottleIndex = 0;

    updateScreen();

    calculate();

};


document.getElementById("companyNext").onclick = function () {

    companyIndex++;

    if (companyIndex >= DATA.length) {

        companyIndex = 0;

    }

    bottleIndex = 0;

    updateScreen();

    calculate();

};


/* =========================================================
   ПЕРЕКЛЮЧЕНИЕ БУТЫЛКИ
========================================================= */

document.getElementById("bottlePrev").onclick = function () {

    bottleIndex--;

    if (bottleIndex < 0) {

        bottleIndex = currentCompany().bottles.length - 1;

    }

    updateScreen();

    calculate();

};


document.getElementById("bottleNext").onclick = function () {

    bottleIndex++;

    if (bottleIndex >= currentCompany().bottles.length) {

        bottleIndex = 0;

    }

    updateScreen();

    calculate();

};


/* =========================================================
   ПЕРЕКЛЮЧЕНИЕ ПОМПЫ
========================================================= */

document.getElementById("pumpPrev").onclick = function () {

    pumpIndex--;

    if (pumpIndex < 0) {

        pumpIndex = PUMPS.length - 1;

    }

    updateScreen();

    calculate();

};


document.getElementById("pumpNext").onclick = function () {

    pumpIndex++;

    if (pumpIndex >= PUMPS.length) {

        pumpIndex = 0;

    }

    updateScreen();

    calculate();

};

/* =========================================================
   ОЧИСТКА ПОЛЯ ПРИ НАЖАТИИ
========================================================= */

weight.addEventListener("focus", function () {

    weight.value = "";

});


/* =========================================================
   ПЕРЕСЧЁТ ПРИ ВВОДЕ
========================================================= */

weight.addEventListener("input", calculate);


/* =========================================================
   РАСЧЁТ

   Формула:

   (Вес × 1000 − Тара − Помпа) / 770

   Вес вводится в килограммах.
========================================================= */

function calculate() {

    const bottle = currentBottle();
    const pump = currentPump();

    /* -----------------------------------------
       Получаем введённое значение

       Разрешаем ввод и через точку,
       и через запятую.
    ----------------------------------------- */

    let text = weight.value.replace(",", ".");

    let kg = parseFloat(text);

    if (isNaN(kg)) {

        result.textContent = "Ошибка";
        return;

    }

    /* -----------------------------------------
       Переводим кг → граммы
    ----------------------------------------- */

    const grams = kg * 1000;

    /* -----------------------------------------
       Минимально возможный вес
    ----------------------------------------- */

    const minWeight = bottle.tare + pump.weight;

    if (grams < minWeight) {

        result.textContent = "Ошибка";
        return;

    }

    /* -----------------------------------------
       Основная формула
    ----------------------------------------- */

    let volume =
        (grams - bottle.tare - pump.weight)
        / 1300;

    /* -----------------------------------------
       Защита от отрицательных значений
    ----------------------------------------- */

    if (volume < 0) {

        result.textContent = "Ошибка";
        return;

    }

    /* -----------------------------------------
       Вывод результата
    ----------------------------------------- */

    result.textContent =
    volume
        .toFixed(SETTINGS.decimals)
        .replace(".", ",");

}


/* =========================================================
   КОПИРОВАНИЕ РЕЗУЛЬТАТА

   Копируется только число.
========================================================= */

result.addEventListener("click", async function () {

    if (result.textContent === "Ошибка") {

        return;

    }

    try {

        await navigator.clipboard.writeText(result.textContent);

        result.classList.add("copied");
        copyMark.classList.add("show");

        setTimeout(function () {

            result.classList.remove("copied");
            copyMark.classList.remove("show");

        }, 700);

    }

    catch (error) {

        console.log(error);

    }

});


/* =========================================================
   ПЕРВЫЙ ЗАПУСК
========================================================= */

updateScreen();

weight.value = "";

result.textContent = "Ошибка";


/* =========================================================
   КОНЕЦ ФАЙЛА

   Если потребуется изменить:

   • Формулу
       calculate()

   • Копирование
       result.click()

   • Переключение фирм
       companyPrev / companyNext

   • Переключение бутылок
       bottlePrev / bottleNext

   • Переключение помпы
       pumpPrev / pumpNext

========================================================= */
