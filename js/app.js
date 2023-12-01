$(".phone_mask").mask("+7(999)999-99-99"); 
$(document).ready(function () {
    var cartItems = [];
    var total = 0;

    // Функция для добавления товара в корзину
    function addToCart(itemName, itemPrice) {
        if (isNaN(itemPrice)) {
            console.error(`Неверное значение цены для товара: ${itemName}`);
            return;
        }

        // Проверяем, есть ли уже такой товар в корзине
        var existingItem = cartItems.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity++; // Увеличиваем количество, если товар уже в корзине
        } else {
            cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
        }

        total += itemPrice;
        updateCart();
    }

    // Функция для обновления отображения корзины
    function updateCart() {
        var cartList = $("#cart-items");
        cartList.empty();

        cartItems.forEach(function (item) {
            if (isNaN(item.price)) {
                console.error(`Неверное значение цены для товара: ${item.name}`);
                return;
            }

            cartList.append("<li>" + item.name + " x" + item.quantity + " - " + item.price * item.quantity + "р</li>");
        });

        if (!isNaN(total)) {
            $("#total").text("Итого: " + total + "р");
        } else {
            console.error("Неверное значение общей суммы корзины");
        }
    }

    // Функция для очистки корзины
    function clearCart() {
        cartItems = [];
        total = 0;
        updateCart();
    }

    // Обработчик кнопок заказа
    $(".btn").click(function () {
        var itemName = $(this).siblings("p").text();
        var itemPrice = parseInt($(this).text());

        addToCart(itemName, itemPrice);
    });

    // Обработчик кнопки очистки корзины
    $("#clear-cart").click(function () {
        clearCart();
    });

    // Обработчик кнопки "Заказать" из корзины
    $("#checkout").click(function () {
        document.getElementById("desserts").style.display = "none";
        document.getElementById("form").style.display = "block";
        fillUserData(); // Возможно, вам нужно будет вызвать fillUserData() здесь, в зависимости от логики вашего приложения
    });

    let tg = window.Telegram.WebApp;
    var buy = $("#buy");
    var order = $("#order");

    tg.expand();

    buy.click(function () {
        $("#main").hide();
        $("#desserts").show();
        $("#form").hide();
        $("#cart").show();
    });

    order.click(function () {
    $("#error").text('');
    let name = $("#user_name").val();
    let email = $("#user_email").val();
    let phone = $("#user_phone").val();
    let koment = $("#user_koment").val();
    let items = $("#cart-items").text();
    let total = $("#total").text();

    if (name.length < 5) {
        $("#error").text("Ошибка в имени");
        return;
    }
    if (email.length < 5) {
        $("#error").text("Ошибка в email");
        return;
    }
    if (phone.length < 5) {
        $("#error").text("Ошибка в номере телефона");
        return;
    }

    let data = {
        name: name,
        email: email,
        phone: phone,
        koment: koment,
        items: items,
        total: total
    }

    tg.sendData(JSON.stringify(data));
    tg.close();
});
});
