// ===============================
// ViT-Syrup v1.0
// Часть 1
// ===============================

// ---------- Элементы ----------

const brandName = document.getElementById("brandName");
const materialName = document.getElementById("materialName");
const volumeName = document.getElementById("volumeName");
const pumpName = document.getElementById("pumpName");

const note = document.getElementById("note");
const weight = document.getElementById("weight");
const result = document.getElementById("result");

const materialCard = document.getElementById("materialCard");
const volumeCard = document.getElementById("volumeCard");

const copyBtn = document.getElementById("copyBtn");

// ---------- Индексы ----------

let brandIndex = 0;
let materialIndex = 0;
let bottleIndex = 0;
let pumpIndex = 0;


// ---------- Сохранение ----------

const SAVE_KEY = "vit-syrup-state";

function saveState() {

    localStorage.setItem(SAVE_KEY, JSON.stringify({

        brandIndex,
        materialIndex,
        bottleIndex,
        pumpIndex

    }));

}

function loadState() {

    const saved = localStorage.getItem(SAVE_KEY);

    if (!saved) return;

    try {

        const state = JSON.parse(saved);

        brandIndex = state.brandIndex ?? 0;
        materialIndex = state.materialIndex ?? 0;
        bottleIndex = state.bottleIndex ?? 0;
        pumpIndex = state.pumpIndex ?? 0;

    }

    catch {

        console.log("Не удалось загрузить состояние");

    }

}

// ---------- Быстрый доступ ----------

function brand() {
    return DATA[brandIndex];
}

function material() {
    return brand().materials[materialIndex];
}

function bottle() {
    return material().bottles[bottleIndex];
}

function pump() {
    return SETTINGS.pumps[pumpIndex];
}

// ---------- Обновление экрана ----------

function refreshScreen() {

    brandName.textContent = brand().brand;

    materialName.textContent = material().name;

    volumeName.textContent = bottle().volume;

    pumpName.textContent = pump().name;

    note.textContent = bottle().note;

    materialCard.style.display =
        brand().materials.length > 1
            ? "block"
            : "none";

    volumeCard.style.display =
        material().bottles.length > 1
            ? "block"
            : "none";
saveState();
    calculate();

}

// ---------- Переключение фирмы ----------

function nextBrand() {

    brandIndex++;

    if (brandIndex >= DATA.length)
        brandIndex = 0;

    materialIndex = 0;
    bottleIndex = 0;

    refreshScreen();

}

function prevBrand() {

    brandIndex--;

    if (brandIndex < 0)
        brandIndex = DATA.length - 1;

    materialIndex = 0;
    bottleIndex = 0;

    refreshScreen();

}

// ---------- Переключение материала ----------

function nextMaterial() {

    materialIndex++;

    if (materialIndex >= brand().materials.length)
        materialIndex = 0;

    bottleIndex = 0;

    refreshScreen();

}

function prevMaterial() {

    materialIndex--;

    if (materialIndex < 0)
        materialIndex = brand().materials.length - 1;

    bottleIndex = 0;

    refreshScreen();

}

// ---------- Переключение объема ----------

function nextBottle() {

    bottleIndex++;

    if (bottleIndex >= material().bottles.length)
        bottleIndex = 0;

    refreshScreen();

}

function prevBottle() {

    bottleIndex--;

    if (bottleIndex < 0)
        bottleIndex = material().bottles.length - 1;

    refreshScreen();

}

// ---------- Переключение помпы ----------

function nextPump() {

    pumpIndex++;

    if (pumpIndex >= SETTINGS.pumps.length)
        pumpIndex = 0;

    refreshScreen();

}

function prevPump() {

    pumpIndex--;

    if (pumpIndex < 0)
        pumpIndex = SETTINGS.pumps.length - 1;

    refreshScreen();

}

// ===============================
// ViT-Syrup v1.0
// Часть 2
// ===============================

// ---------- Расчет ----------

function calculate() {

    let value = weight.value
        .replace(",", ".");

    value = parseFloat(value);

    if (isNaN(value)) {

        result.textContent = "0.000";
        result.style.color = "#22c55e";

        return;
    }

    let ml = (

        value
        - bottle().tare
        - pump().weight

    ) * SETTINGS.coefficient;

    if (ml < 0) {

        result.style.color = "#ef4444";
        ml = 0;

    } else {

        result.style.color = "#22c55e";

    }

    result.textContent = ml.toFixed(3);

}

// ---------- Автоматический пересчет ----------

weight.addEventListener("input", calculate);

// ---------- ENTER ----------

weight.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        copyBtn.click();

    }

});

// ---------- Обновление результата ----------

refreshScreen();
calculate();

// ===============================
// ViT-Syrup v1.0
// Часть 3
// ===============================

// ---------- Кнопки ----------

document.getElementById("brandNext").onclick = nextBrand;
document.getElementById("brandPrev").onclick = prevBrand;

document.getElementById("materialNext").onclick = nextMaterial;
document.getElementById("materialPrev").onclick = prevMaterial;

document.getElementById("volumeNext").onclick = nextBottle;
document.getElementById("volumePrev").onclick = prevBottle;

document.getElementById("pumpNext").onclick = nextPump;
document.getElementById("pumpPrev").onclick = prevPump;

// ---------- Копирование ----------

copyBtn.onclick = async function () {

    if (result.textContent === "0.000")
        return;

    try {

        await navigator.clipboard.writeText(result.textContent);

        copyBtn.textContent = "✅ Скопировано";

        setTimeout(function () {

            copyBtn.textContent = "📋 КОПИРОВАТЬ";

        }, 900);

    } catch {

        alert("Не удалось скопировать.");

    }

    weight.value = "";

    result.textContent = "0.000";
    result.style.color = "#22c55e";

    weight.focus();

};

// ---------- Запуск ----------

loadState();

refreshScreen();

setTimeout(function(){

    weight.focus();

},300);