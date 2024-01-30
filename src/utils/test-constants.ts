export const baseUrl = 'http://localhost:3000'

export const user = {
    name: 'Виктория Воробьева',
    email: 'vorobeva.vik.99@mail.ru'
};

export const userRegister = {
        name: 'Виктория Воробьева',
        email: 'vorobeva.vik.99@mail.ru',
        password: '123456'
}

export const email = 'vorobeva.vik.99@mail.ru';

export const number = 11111

export const fluorescentBun = {
    "_id": "60d3b41abdacab0026a733c7",
    "type": "bun",
    "uniqueId": '26763hbfjb'
}

export const craterBun = {
    "_id": "60d3b41abdacab0026a733c6",
    "type": "bun",
    "uniqueId": '84bbdmnc'
}

export const ingredientSauce = {
    "type": "sauce",
    "_id": "60d3b41abdacab0026a733ce",
    "uniqueId": 'mdskvndnvdj'
}

export const ingredientMain = {
    "type": "main",
    "_id": "60d3b41abdacab0026a733d3",
    "uniqueId": 'ksmklmji84'
}

export const ingredients = [
    { "_id": "60d3b41abdacab0026a733c6", "name": "Краторная булка N-200i", "type": "bun", "proteins": 80, "fat": 24, "carbohydrates": 53, "calories": 420, "price": 1255, "image": "https://code.s3.yandex.net/react/code/bun-02.png", "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png", "__v": 0 },
    { "_id": "60d3b41abdacab0026a733cc", "name": "Соус Spicy-X", "type": "sauce", "proteins": 30, "fat": 20, "carbohydrates": 40, "calories": 30, "price": 90, "image": "https://code.s3.yandex.net/react/code/sauce-02.png", "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png", "__v": 0 },
    { "_id": "60d3b41abdacab0026a733c8", "name": "Филе Люминесцентного тетраодонтимформа", "type": "main", "proteins": 44, "fat": 26, "carbohydrates": 85, "calories": 643, "price": 988, "image": "https://code.s3.yandex.net/react/code/meat-03.png", "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png", "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png", "__v": 0 },
];

export const allOrders = {
    "success": true,
    "orders": [
        {
            "_id": "653ea81c52b4cf001d86eb9d",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Space флюоресцентный бургер",
            "createdAt": "2023-10-29T18:44:44.971Z",
            "updatedAt": "2023-10-29T18:44:45.254Z",
            "number": 24707
        },
        {
            "_id": "653ea82e52b4cf001d86eb9e",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Space флюоресцентный бургер",
            "createdAt": "2023-10-29T18:45:02.800Z",
            "updatedAt": "2023-10-29T18:45:03.147Z",
            "number": 24708
        },
        {
            "_id": "653eea4d52b4cf001d86ec83",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Space флюоресцентный бургер",
            "createdAt": "2023-10-29T23:27:09.380Z",
            "updatedAt": "2023-10-29T23:27:09.607Z",
            "number": 24728
        },
        {
            "_id": "653eec2152b4cf001d86ec8c",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0945",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Антарианский флюоресцентный бургер",
            "createdAt": "2023-10-29T23:34:57.557Z",
            "updatedAt": "2023-10-29T23:34:57.758Z",
            "number": 24730
        },
        {
            "_id": "653eed1352b4cf001d86ec8d",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Space флюоресцентный бургер",
            "createdAt": "2023-10-29T23:38:59.149Z",
            "updatedAt": "2023-10-29T23:38:59.359Z",
            "number": 24731
        },
        {
            "_id": "653f89bd52b4cf001d86ee21",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Space флюоресцентный бургер",
            "createdAt": "2023-10-30T10:47:25.040Z",
            "updatedAt": "2023-10-30T10:47:25.282Z",
            "number": 24749
        },
        {
            "_id": "653f8a2852b4cf001d86ee25",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Space флюоресцентный бургер",
            "createdAt": "2023-10-30T10:49:12.702Z",
            "updatedAt": "2023-10-30T10:49:12.964Z",
            "number": 24750
        },
    ],
    "total": 32078,
    "totalToday": 76
}

export const userOrders = {
    "success": true,
    "orders": [
        {
            'createdAt': "2024-01-22T22:05:24.213Z",
            'ingredients': [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            'name': "Флюоресцентный space бургер",
            'number': 32449,
            'status': "done",
            'updatedAt': "2024-01-22T22:05:24.772Z",
            '_id': "65aee6a487899c001b82ac9b"
        },
        {
            'createdAt': "2024-01-22T22:05:24.213Z",
            'ingredients': [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            'name': "Флюоресцентный space бургер",
            'number': 32449,
            'status': "done",
            'updatedAt': "2024-01-22T22:05:24.772Z",
            '_id': "65aee6a487899c001b82ac9b"
        }
    ]
}

export const ingredientClass = '[class^=burger-card_card]';
export const closeButtonClass = '[data-cy=close-button]';
export const burgerConstructorClass = '[data-cy=constructor_list]';
export const modal = '[data-cy=modal]';
export const constructorSubmit = '[data-cy=submit-button]';