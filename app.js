/* =========================================================
   ViT-Syrup v2.0

   app.js

   Вся логика приложения.

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


/* =========================================================
   СОСТОЯНИЕ ПРИЛОЖЕНИЯ

   Индексы текущего выбора.

========================================================= */

let companyIndex = 0;

let bottleIndex = 0;

let pumpIndex = 0;


/* =========================================================
   ТЕКУЩИЕ ДАННЫЕ

========================================================= */

function currentCompany(){

    return DATA[companyIndex];

}

function currentBottle(){

    return DATA[companyIndex].bottles[bottleIndex];

}

function currentPump(){

    return PUMPS[pumpIndex];

}


/* =========================================================
   ОБНОВЛЕНИЕ ЭКРАНА

   Вызывается после любого изменения.

========================================================= */

function updateScreen(){

    const company = currentCompany();

    const bottle = currentBottle();

    const pump = currentPump();

    companyName.textContent = company.company;

    bottleName.textContent = bottle.name;

    pumpName.textContent = pump.name;

    note.textContent = company.note;

    /* -----------------------------------------
       Минимальный допустимый вес

       Используется как подсказка
       в поле ввода.

    ----------------------------------------- */

    const minWeight = bottle.tare + pump.weight;

    weight.placeholder = "от " + minWeight + " г";

}


/* =========================================================
   ПЕРЕКЛЮЧЕНИЕ ФИРМЫ
========================================================= */

document.getElementById("companyPrev").onclick=function(){

    companyIndex--;

    if(companyIndex<0){

        companyIndex=DATA.length-1;

    }

    bottleIndex=0;

    updateScreen();

    calculate();

};



document.getElementById("companyNext").onclick=function(){

    companyIndex++;

    if(companyIndex>=DATA.length){

        companyIndex=0;

    }

    bottleIndex=0;

    updateScreen();

    calculate();

};


/* =========================================================
   ПЕРЕКЛЮЧЕНИЕ БУТЫЛКИ
========================================================= */

document.getElementById("bottlePrev").onclick=function(){

    bottleIndex--;

    if(bottleIndex<0){

        bottleIndex=currentCompany().bottles.length-1;

    }

    updateScreen();

    calculate();

};



document.getElementById("bottleNext").onclick=function(){

    bottleIndex++;

    if(bottleIndex>=currentCompany().bottles.length){

        bottleIndex=0;

    }

    updateScreen();

    calculate();

};


/* =========================================================
   ПЕРЕКЛЮЧЕНИЕ ПОМПЫ
========================================================= */

document.getElementById("pumpPrev").onclick=function(){

    pumpIndex--;

    if(pumpIndex<0){

        pumpIndex=PUMPS.length-1;

    }

    updateScreen();

    calculate();

};



document.getElementById("pumpNext").onclick=function(){

    pumpIndex++;

    if(pumpIndex>=PUMPS.length){

        pumpIndex=0;

    }

    updateScreen();

    calculate();

};



/* =========================================================
   АВТООЧИСТКА ПОЛЯ ВВОДА

   Если в поле уже есть число,
   при нажатии оно сразу очищается.

========================================================= */

weight.addEventListener("focus",function(){

    if(weight.value!==""){

        weight.value="";

    }

});



/* =========================================================
   ПЕРЕСЧЁТ ПРИ ВВОДЕ

========================================================= */

weight.addEventListener("input",calculate);



/* =========================================================
   РАСЧЁТ

   Формула:

   (Вес − Тара − Помпа) / Плотность

========================================================= */

function calculate(){

    const bottle=currentBottle();

    const pump=currentPump();

    const value=parseFloat(weight.value);



    if(isNaN(value)){

        result.textContent="Ошибка";

        return;

    }



    const minWeight=bottle.tare+pump.weight;



    if(value<minWeight){

        result.textContent="Ошибка";

        return;

    }



    let volume=(value-bottle.tare-pump.weight)/SETTINGS.density;



    result.textContent=volume.toFixed(SETTINGS.decimals);

}


/* =========================================================
   КОПИРОВАНИЕ РЕЗУЛЬТАТА

   Копируется только число.

========================================================= */

result.addEventListener("click",async function(){

    if(result.textContent==="Ошибка"){

        return;

    }

    try{

        await navigator.clipboard.writeText(result.textContent);

        result.classList.add("copied");

        copyMark.classList.add("show");

        setTimeout(function(){

            result.classList.remove("copied");

            copyMark.classList.remove("show");

        },700);

    }

    catch(error){

        console.log(error);

    }

});



/* =========================================================
   ЗАПРЕТ ОТРИЦАТЕЛЬНЫХ ЗНАЧЕНИЙ

   Если по какой-либо причине
   получилось отрицательное число,
   выводим "Ошибка".

========================================================= */

function validateResult(volume){

    if(volume<0){

        return null;

    }

    return volume;

}

/* =========================================================
   ПЕРВЫЙ ЗАПУСК

   При открытии приложения:

   • загружается первая фирма
   • первая бутылка
   • первая помпа
   • рассчитывается минимальный вес
   • очищается поле результата

========================================================= */

updateScreen();

weight.value = "";

result.textContent = "Ошибка";


/* =========================================================
   ГОТОВО

   ViT-Syrup v2.0

   Если потребуется изменить:

   • внешний вид
       style.css

   • бутылки
       data.js

   • формулу
       app.js

   • расположение элементов
       index.html

========================================================= */



