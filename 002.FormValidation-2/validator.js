function Validator(formSelector) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  let formElement = document.querySelector(formSelector);
  let formRules = {};

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

  if (formElement) {
    // Lấy ra toàn bộ input cần validate => KQ: 3 inputs
    let inputs = formElement.querySelectorAll("[name][rules]");

    // Lặp qua 3 inputs
    for (let input of inputs) {
      // tạo mảng chứa 2 giá trị rule sau khi split => KQ: 3 rules (required, required|email, required|min:6)
      let rules = input.getAttribute("rules").split("|");

      //lặp qua từng rule
      for (rule of rules) {
        let isRuleHasValue = rule.includes(":");
        let ruleInfo;
        //Nếu rule mà có chứa dấu ':' thì split ra, rule là phần tử đầu tiên của mảng ruleInfo
        if (isRuleHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }

        // Tạo hàm xử lý rule
        let ruleFunc = validatorRules[rule];
        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }

        // Đẩy hàm xử lý rule này vào object formRules
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }

      // Lắng nghe sự kiện
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }

    // Hàm thực hiện validate
    function handleValidate(e) {
      let rules = formRules[e.target.name];
      let errorMessage;

      rules.find(function (rule) {
        errorMessage = rule(e.target.value);
        return errorMessage;
      });

      // Hiển thị lỗi
      if (errorMessage) {
        let formGroup = getParent(e.target, ".form-group");
        if (formGroup) {
          formGroup.classList.add("invalid");
          let errorElement = formGroup.querySelector(".form-message");

          if (errorElement) {
            errorElement.innerText = errorMessage;
          }
        }
        return undefined;
      } else return 1;
    }

    function handleClearError(e) {
      let formGroup = getParent(e.target, ".form-group");
      let errorElement = formGroup.querySelector(".form-message");
      if (formGroup.classList.contains("invalid")) {
        formGroup.classList.remove("invalid");
        errorElement.innerText = "";
      }
    }

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
  }
}
