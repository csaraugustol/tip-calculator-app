$(document).ready(function () {
  $('.money').mask('000,000,000,000,000.00', { reverse: true });
  $('.input-custom').mask('00', { reverse: true });
});

var inputNumberOfPeople = document.getElementById("input-number-of-people");
var billValue = document.getElementById("input-bill");
let tipPercent = 0.0;

function tipWasSelected(value, e) {
  document.getElementById("input-number-of-people").disabled = false;
  
  var classList = e.target.classList;
  tipPercent = value;
  var classActive = document.getElementsByClassName("active");

  if (classActive.length == 0) {
    classList.add("active")
  } else {
    Array.from(document.querySelectorAll('.active')).forEach(
      (el) => el.classList.remove('active')
    );
    classList.add("active")
  }

  if (value == "") {
    valueCustom = e.target.value / 100;
    selectValues(valueCustom)
  } else {
    selectValues(value)
  }
}

function selectValues(tipPercent) {

   billValue.addEventListener('keyup', function (e) {
    finalCalc(inputNumberOfPeople, billValue, tipPercent)
  })

  inputNumberOfPeople.addEventListener('keyup', function (e) {
    finalCalc(inputNumberOfPeople, billValue, tipPercent)
  });
}


function limpaCampos() {
  document.getElementById("input-number-of-people").value = "";
  document.getElementById("input-bill").value = "";
  document.getElementById("input-custom").value = "";
  document.getElementById("tipAmount").innerHTML = "$0.0";
  document.getElementById("total").innerHTML = "$0.0";

  Array.from(document.querySelectorAll('.active')).forEach(
    (el) => el.classList.remove('active')
  );
}

function finalCalc(inputNumberOfPeople, billValue, tipPercent)
{
  var numberOfPeople = inputNumberOfPeople.value;

  if (numberOfPeople == 0) {
    document.getElementById("error-message").style.display = "block";
    inputNumberOfPeople.style.borderColor = "red";
  } else {
    document.getElementById("error-message").style.display = "none";
    inputNumberOfPeople.style.borderColor = "var(--color-strong-cyan)";
  }


  var billPercenteValue = billValue.value.replace(',', '') * tipPercent;
  var tipAmount = billPercenteValue / numberOfPeople;
  var totalPerson = tipAmount + (billValue.value.replace(',', '') / numberOfPeople);

  if (numberOfPeople > 0) {
    document.getElementById("tipAmount").innerHTML = tipAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });;

    document.getElementById("total").innerHTML = totalPerson.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });;
  } else {
    document.getElementById("tipAmount").innerHTML = "$0.0";
    document.getElementById("total").innerHTML = "$0.0";
  }
}


