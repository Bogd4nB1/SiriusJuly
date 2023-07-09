  var language = "ru";
  var maxDeduction = 120000;

  document.getElementById("calculate").addEventListener("click", function() {
    var expensesInput = document.getElementById("expenses");
    var expenses = parseFloat(expensesInput.value);
    if (isNaN(expenses) || expenses < 1 || expenses > 9999999999) {
      alert(getLocalizedString("Expenses must be between 1 and 10 characters."));
    }else if (expensesInput.value.split(".").length > 2) {
        alert(getLocalizedString("Invalid format for expenses."));
      } else if (expensesInput.value.indexOf(".") !== -1 && expensesInput.value.split(".")[1].length > 2) {
        alert(getLocalizedString("Precision should be no more than 2 decimal places."));
      } else {
      var previousDeductionsInput = document.getElementById("previous-deductions");
      var previousDeductions = parseFloat(previousDeductionsInput.value) || 0;
      if (isNaN(previousDeductions) || previousDeductions < 0 || previousDeductions > 9999999999) {
        alert(getLocalizedString("Previous deductions must be between 0 and 10 characters."));
      } else {
        if (maxDeduction === 0){
            maxDeduction = 9999999999
        }
        var remainingDeduction = maxDeduction - previousDeductions;
        expenses = Math.min(expenses, maxDeduction);
        var deduction = Math.min(expenses * 0.13, remainingDeduction) - previousDeductions;
        var rubles = Math.floor(Math.max(deduction, 0));
        var kopecks = Math.abs(Math.round((deduction - rubles) * 100));
        if (kopecks === 100) {
          rubles += 1;
          kopecks = 0;
        }
        var result = getLocalizedString("Tax deduction is ") + rubles + getLocalizedString(" rubles ") + kopecks + getLocalizedString(" kopecks.");
        if (deduction < 0){
            var result = getLocalizedString("Tax deduction is ") + 0 + getLocalizedString(" rubles ") + 0 + getLocalizedString(" kopecks.");
        }
        document.getElementById("result").innerHTML = result;
        document.getElementById("save").style.display = "block";
      }
    }
  });
  
  document.getElementById("save").addEventListener("click", function() {
    var expensesInput = document.getElementById("expenses");
    var expenses = parseFloat(expensesInput.value);
    var previousDeductionsInput = document.getElementById("previous-deductions");
    var previousDeductions = parseFloat(previousDeductionsInput.value) || 0;
    var remainingDeduction = maxDeduction - previousDeductions;
    if (isNaN(expenses) || expenses < 1 || expenses > 9999999999) {
      alert(getLocalizedString("Expenses must be between 1 and 10 characters."));
    }else if (expensesInput.value.split(".").length > 2) {
        alert(getLocalizedString("Invalid format for expenses."));
      } else if (expensesInput.value.indexOf(".") !== -1 && expensesInput.value.split(".")[1].length > 2) {
        alert(getLocalizedString("Precision should be no more than 2 decimal places."));
      } else {
      var previousDeductionsInput = document.getElementById("previous-deductions");
      var previousDeductions = parseFloat(previousDeductionsInput.value) || 0;
      if (isNaN(previousDeductions) || previousDeductions < 0 || previousDeductions > 9999999999) {
        alert(getLocalizedString("Previous deductions must be between 0 and 10 characters."));
      } else {
        if (maxDeduction === 0){
            maxDeduction = 9999999999
        }
        expenses = Math.min(expenses, maxDeduction);
        var deduction = Math.min(expenses * 0.13, remainingDeduction) - previousDeductions;
        console.log(deduction);
        var rubles = Math.floor(deduction);
        var kopecks = Math.round((deduction - rubles) * 100);
        var result = getLocalizedString("Expenses: ") + expenses + "\n" + getLocalizedString("Previous deductions: ") + previousDeductions + "\n" + getLocalizedString("Tax deduction is ") + rubles + getLocalizedString(" rubles ") + kopecks + getLocalizedString(" kopecks.");
        if (deduction < 0){
            var result = getLocalizedString("Expenses: ") + expenses + "\n" + getLocalizedString("Previous deductions: ") + previousDeductions + "\n" + getLocalizedString("Tax deduction is ") + 0 + getLocalizedString(" rubles ") + 0 + getLocalizedString(" kopecks.");
        }
        var blob = new Blob([result], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "result.txt");
      }
    }
  });

  
  document.getElementById("previous-deductions").addEventListener("input", function() {
    var previousDeductionsInput = document.getElementById("previous-deductions");
    previousDeductionsInput.value = previousDeductionsInput.value.replace(/[^0-9.]/g, "");
    if (previousDeductionsInput.value.split(".").length > 2) {
      alert(getLocalizedString("Invalid format for previous deductions."));
    } else if (previousDeductionsInput.value.indexOf(".") !== -1 && previousDeductionsInput.value.split(".")[1].length > 2) {
      alert(getLocalizedString("Precision should be no more than 2 decimal places."));
    }
  });
  
  document.getElementById("language-selector").addEventListener("click", function() {
    if (language === "ru") {
      language = "en";
      document.getElementById("language-selector").textContent = "Русский";
      document.getElementById("result").innerHTML = "";
      document.getElementById("save").style.display = "none";
    } else {
      language = "ru";
      document.getElementById("language-selector").textContent = "English";
      document.getElementById("result").innerHTML = "";
      document.getElementById("save").style.display = "none";
    }
    updateInterfaceLanguage();
  });
  
  function getLocalizedString(text) {
    if (language === "ru") {
      switch(text) {
        case "Expenses must be between 1 and 10 characters.":
          return "Размер расходов должен составлять от 1 до 10 символов.";
        case "Previous deductions must be between 0 and 10 characters.":
          return "Предыдущие вычеты должны содержать от 0 до 10 символов.";
        case "Invalid formatfor expenses.":
          return "Недопустимый формат для расходов.";
        case "Precision should be no more than 2 decimal places.":
          return "Точность должна составлять не более 2 знаков после запятой.";
        case "Tax deduction is ":
          return "Налоговый вычет - ";
        case " kopecks.":
          return " копеек.";
        case  " rubles ":
         return " рублей "
        case "Expenses: ":
        return "Траты: "
        case "Previous deductions: ":
        return "Предыдущие вычеты: "
        default:
          return text;
      }
    } else {
      return text;
    }
  }
  
  function updateInterfaceLanguage() {
    var expensesLabel = document.querySelector("label[for='expenses']");
    var previousDeductionsLabel = document.querySelector("label[for='previous-deductions']");
    var maxDeduction = document.querySelector("label[for='max-deduction']");
    var calculateButton = document.getElementById("calculate");
    var saveButton = document.getElementById("save");
    var languageSelectorButton = document.getElementById("language-selector");
    var tittle = document.querySelector('h1');
  
    if (language === "en") {
      expensesLabel.textContent = "Expenses:";
      previousDeductionsLabel.textContent = "Previous deductions:";
      calculateButton.textContent = "Calculate";
      saveButton.textContent = "Save";
      tittle.textContent = "Сalculation of tax deduction"
      languageSelectorButton.textContent = "Русский";
      maxDeduction.textContent = "Max deduction(in thousands)";
    } else {
      expensesLabel.textContent = "Расходы:";
      previousDeductionsLabel.textContent = "Предыдущие вычеты:";
      calculateButton.textContent = "Рассчитать";
      saveButton.textContent = "Сохранить";
      tittle.textContent = "Расчет налогового вычета"
      languageSelectorButton.textContent = "English";
      maxDeduction.textContent = "Максимальная сумма лечения(в тысячах)"
    }
  }
  
  updateInterfaceLanguage();

  function updateValue(val) {
    document.getElementById("value").innerHTML = val;
    maxDeduction =  val * 1000;
  }