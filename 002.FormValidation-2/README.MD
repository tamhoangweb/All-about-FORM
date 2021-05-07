# FORM VALIDATOR - 2
Xây dựng thư viện validator.js dùng được cho nhiều form.

Hiển thị cảnh báo khi nhập sai input.

Lấy được tất cả giá trị nhập vào của user.

## Chuẩn bị HTML
Có sử dụng attibutes riêng 
```html
.main 
    form#form-1.form
        h3>{Đăng ký thành viên}
        .spacer
        
        .form-group
             label.form-label>{Họ tên đầy đủ}
             input.form-control#fullname[type="text"][name="fullname"]
             span.form-message

        .form-group
             label.form-label>{Email}
             input.form-control#email[type="text"][name="email"]
             span.form-message

        .form-group
             label.form-label>{Mật khẩu}
             input.form-control#password[type="password"][name="password"]
             span.form-message

        .form-group
             label.form-label>{Nhập lại mật khẩu}
             input.form-control#password_confirmation[type="password"][name="password_confirmation"]
             span.form-message

        button.form-submit>{Đăng ký}
```

## Cách dùng thư viện
Bước 1: Thêm attribute vào thẻ input muốn validate 
```html
<input type="text" class="form-control" id="fullname" name="fullname" rules="required"
          placeholder="VD: Tâm Hoàng">

<input type="email" class="form-control" id="email" name="email" rules="required|email"
          placeholder="VD: tamhoangweb@gmail.com">

<input type="password" class="form-control" id="password" name="password" rules="required|min:6">
```
Bước 2: Chèn file javascript 
```html
<script src="./validator.js"></script>

<script> 
  Validator("#form-1');
</script>
```

## Tạo thư viện validator.js
### Các method, syntax sử dụng
```javascript

```

### 1. Thông qua tham số truyền vào hàm validator => lấy được element form
```javascript
function Validator(selector) {
  let formElement = document.querySelector(selector);
}
```

### 2. Thông qua attributes rules lấy ra các element input cần validate
```javascript
if (formElement) {
    let inputs = formElement.querySelectorAll("[name][rules]");
}
```

### 3. Tạo object formRules 
Key  : là name của input

Value: là mảng các hàm xử lý rule, vd: Array [ function required(value) ]

VD:
```javascript
formRules = {
email: Array [ required(value), email(value)
 ],
​
fullname: Array [ required(value)
 ],
​
password: Array [ required(value), min(value) ]
}
```

### 4. Tạo object validatorRules
Key     : là tên rule 

Method  : là hàm validate rule

VD:
```javascript
let validatorRules = {
    required: function (value) {
      return value ? undefined : `Vui lòng nhập trường này`;
    },
    email: function (value) {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return regex.test(value) ? undefined : `Vui lòng nhập email`;
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Vui lòng nhập ít nhất ${min} ký tự`;
      };
    },
  };
```

### 5. Lặp qua từng input, để tạo key và value cho object formRules
```javascript
for (let input of inputs) {
      
}
```
#### Bước 1: Với mỗi input, dùng method getAttribute('rules') để lấy ra giá trị của attributes rules, được ghi ở file html.
```javascript
for (let input of inputs) {
      let rules = input.getAttribute("rules").split("|");
}
/* Kết quả thu về 3 rules (required, required|email, required|min:6) */
```
#### Bước 2: Xử lý các giá trị nhận về:
- Nếu rule nhận về có ký tự '|' => Cần tách rule này thành các rule con => KQ: mỗi input sẽ tạo ra được 1 mảng các phần tử rule.
```javascript
let rules = input.getAttribute("rules").split("|");
```
- Lặp qua mảng rules, nếu rule nhận về có ký tự ':' => Nghĩa là rule cần có giá trị đi kèm để validate => rule sẽ là phần tử đầu tiên, sau khi split ký tự ':'
```javascript
for (rule of rules) {
        let isRuleHasValue = rule.includes(":");
        let ruleInfo;
        if (isRuleHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];
}
```

#### Bước 3: Tạo hàm xử lý rule bằng object validatorRules

```javascript
let ruleFunc = validatorRules[rule];
if (isRuleHasValue) {
    ruleFunc = ruleFunc(ruleInfo[1]);
}
```

#### Bước 4: Đẩy hàm xử lý rule này vào object formRules
```javascript
if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
} else {
          formRules[input.name] = [ruleFunc];
        }
```

### 6. Lắng nghe sự kiện để validate
Vẫn đang trong vòng lặp duyệt qua từng thẻ input

Nếu user bấm vào ô input rồi bấm chuột ra ngoài, thì validate.

Nếu validate rồi, user bấm chuột vào lại ô input thì xóa thông báo lỗi.
```javascript
input.onblur = handleValidate;
input.oninput = handleClearError;
```

### 7. Viết hàm xử lý handleValidate
Vẫn đang bên trong Validator constructor 
```javascript
function handleValidate(e) {
      let rules = formRules[e.target.name];

      let errorMessage;
      rules.find(function (rule) {
        return (errorMessage = rule(e.target.value));
      });
      console.log(errorMessage);
    }
```

### 8. Hiển thị thông báo lỗi ra ngoài trình duyệt
#### Bước 1: Lấy ra element chứa thông báo lỗi 
Logic: 
- Từ element input truy ngược lấy thẻ cha có class là '.form-group'
- Từ thẻ cha đó, dùng querySelector, lấy element có class là '.form-message'

Hàm getParent
```javascript
function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
```

### Bước 2: Hiển thị lỗi vào element có class là '.form-message'
```javascript
if (errorMessage) {
        let formGroup = getParent(e.target, ".form-group");
        if (formGroup) {
          let errorElement = formGroup.querySelector(".form-message");
          if (errorElement) {
            errorElement.innerText = errorMessage;
            formGroup.classList.add("invalid");
          }
        } else return;
```

### Bước 3: Xóa hiển thị lỗi khi user bấm vào lại ô input
```javascript
function handleClearError(e) {
      let formGroup = getParent(e.target, ".form-group");
      let errorElement = formGroup.querySelector(".form-message");
      if (formGroup.classList.contains("invalid")) {
        formGroup.classList.remove("invalid");
        errorElement.innerText = "";
      }
    }

```

### 9. Validate tất input khi user bấm vào nút Đăng ký.
Khi user bấm vào nút đăng ký, tất cả input đều được validate, và thông báo lỗi nếu có.

Nếu không có lỗi thì form được submit.

#### Bước 1: Tránh hành vi form submit mặc định
```javascript
formElement.onsubmit = (e) => {
      e.preventDefault();
}
``` 
#### Bước 2: Duyệt qua từng input trong form, gọi hàm handleValidate

```javascript
for (input of inputs) {
        handleValidate({
          target: input,
        });
}
```
Giải thích:

Do hàm handleValidate phải có đối số truyền vào là object e để xử lý sự kiện.

Mặc định, khi user tương tác với từng input sẽ có object e.

Nhưng ở đây, user bấm vào nút form submit, chứ ko phải tương tác với ô input. Nên không có object e mà hàm handleValidate cần.


Khi này, mình sẽ truyền vào hàm handleValite 1 object có dạng 
```javascript
{target: input}
```

Với key là target, value của target là element input. 

Khi đó, hàm handleValidate sẽ dùng object này giống như object e mặc định.

VD:
```javascript
/* Nhận name của thẻ input */
e.target.name 
/* Nhận value của thẻ input */
e.target.value 
```
#### Bước 3: Khi tất cả input được nhập hợp lệ thì tiến hành submit form lên server như bình thường.

Gắn 1 biến cờ, theo dõi sự hợp lệ của form

Biến cờ isValid ban đầu sẽ là true

Sau khi handleValidate nếu xuất hiện lỗi thì isValid sẽ chuyển thành false => không submit form

Đến cuối cùng, mà isValid vẫn là true => tiến hành submit Form
```javascript
formElement.onsubmit = (e) => {
      e.preventDefault();
      let isValid = true;

      for (let input of inputs) {
        if (handleValidate({ target: input }) === undefined) {
          isValid = false;
        }
      }

      if (isValid) {
        formElement.submit();
      }
};
```
### 10. Sau khi validate thành công, lấy toàn bộ giá trị nhập vào input của user
