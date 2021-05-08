# FORM
Mục đích của form là để user tương tác với server.

Khi tương tác thì cần 2 thông số, url của server xử lý, và data.

Để gửi data lên server, thì user sẽ điền thông tin vào các ô input.



## Tạo Form - HTML
### Thẻ Form
Thuộc tính action: url nào sẽ xử lý khi submit form

Thuộc tính method: 
- Nếu là GET: giá trị điền vào ô input sẽ đặt trong url, phía sau dấu ?
- Nếu là POST: không hiển thị value của input trên url

Demo:
```html
<form action="results.html" method="GET">

</form>
```

### Thẻ input
#### 1. attribute name: Là thuộc tính quan trọng nhất
```html
<input name="name" >
```
Thông qua thuộc tính name, mà form có thể xử lý được giá trị nhập vào của user.

#### 2. attribute id
```html
<input id="name" >
```
1. Giúp dễ dàng selector trong css hoặc js #name
2. Kết hợp với thuộc tính for của thẻ label để tăng cường trải nghiệm người dùng. Ví dụ:
```html
<label for="name"> Name </lable>
<input id="name" >
```

#### 3. attribute type
Các loại input:
1. text
2. password
3. email
4. color
5. number: đi kèm với attribute min, max, step
6. date: đi kèm với attribute min, max, step
7. checkbox

#### 4. attribute value
Là giá trị mà form sẽ gửi đi.
```html
<input type="text" value="User">
```

Nếu người dùng nhập giá trị vào ô input, thì giá trị gửi đi sẽ là giá trị mà người dùng nhập vào. Ngược lại sẽ gửi đi giá trị trong thuộc tính value.

#### 5. attribute required
Ô input không được bỏ trống

### Thẻ button
#### type="submit" 
Tác dụng để submit form

#### type="reset"
Tác dụng để reset các ô input trong form về giá trị mặc định.






## CSS cho FORM
Nên cho các input, label của form vào bên trong 1 thẻ div.

## Xử lý FORM


| Loại Input  | text, textarea |
| ----------- | -------------- |
| Lấy giá trị | .value         |

Các type của input:

- text
- textarea
- select option
- checkbox

## 1. Cách lấy giá trị user nhập vào input theo từng loại

Bước 1: Select element input cần lấy giá trị.
Bước 2: Dùng property value của element đó.

```javascript
let el = document.querySelector(".gender:checked");
let valueInput = el.value;
```
