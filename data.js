const SETTINGS = {
    coefficient: 0.77,

    pumps: [
        {
            id: "none",
            name: "Без помпы",
            weight: 0
        },
        {
            id: "small",
            name: "Маленькая помпа",
            weight: 0.035
        },
        {
            id: "1883",
            name: "Помпа 1883",
            weight: 0.035
        }
    ]
};

const DATA = [

{
    brand:"1883",

    materials:[

        {
            name:"Стекло",

            bottles:[

                {
                    volume:"1 л",
                    tare:0.463,
                    note:"Можно с линейкой"
                }

            ]

        }

    ]

},

{
    brand:"Maribell",

    materials:[

        {
            name:"Стекло",

            bottles:[

                {
                    volume:"0.7 л",
                    tare:0.454,
                    note:"Все сиропы"
                }

            ]

        }

    ]

},

{
    brand:"Monin",

    materials:[

        {
            name:"Стекло",

            bottles:[

                {
                    volume:"1 л",
                    tare:0.532,
                    note:"Банан"
                },

                {
                    volume:"0.7 л",
                    tare:0.464,
                    note:"Дыня"
                }

            ]

        },

        {
            name:"Пластик",

            bottles:[

                {
                    volume:"1 л",
                    tare:0.075,
                    note:"Карамель / Клубника"
                }

            ]

        }

    ]

},

{
    brand:"Rioba",

    materials:[

        {
            name:"Стекло",

            bottles:[

                {
                    volume:"0.7 л",
                    tare:0.498,
                    note:"Кокос"
                }

            ]

        }

    ]

}

];