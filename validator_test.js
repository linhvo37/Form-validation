// Đối tượng validator
function Validator(options) {

    //Hàm validate
    function Validate(inputElement,rule) {
        // value: inputElement.value
        // test func: rule.test
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            errorElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            errorElement.parentElement.classList.remove('invalid');
        }
    };

    // Hàm remove error
    function removeError (errorElement) {
        if (errorElement) {
            errorElement.innerText = '';
            errorElement.parentElement.classList.remove('invalid');
        }
    };

    // Lấy ra form cần validate
    var formElement = document.querySelector(options.form);
    
    if (formElement) {
        options.rules.forEach(function (rule) {
            // Lấy ra inputElement của form
            var inputElement = formElement.querySelector(rule.selector);
            // Lấy ra error element 
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

            if (inputElement) {
                // Thông báo lỗi khi người dùng blur ra khỏi thẻ input
                inputElement.onblur = function () {
                    Validate(inputElement,rule);
                }
                // Xử lý khi người dùng nhập vào input
                inputElement.oninput = function () {
                    removeError(errorElement);
                }
            }
        });
    }
};


// Các rules
// Selector ở đây là các id của thẻ input
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này !';
        }
    }
};

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return regex.test(value) ? undefined : 'Trường này phải là email !';
        }
    }
};

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Mật khẩu chứa ít nhất ${min} ký tự !`;
        }
    }
};