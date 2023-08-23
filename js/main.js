$(document).ready(function () {
  $('.money').mask('#,##0.00', { reverse: true });
  $('.input-custom').mask('00', { reverse: true });
});

var inputNumberOfPeople = document.getElementById("input-number-of-people");
var billValue = document.getElementById("input-bill");
var inputCustom = document.getElementById("input-custom").value

var btn5Perc = document.getElementById("btn-5-perc");
var btn10Perc = document.getElementById("btn-10-perc");
var btn15Perc = document.getElementById("btn-15-perc");
var btn25Perc = document.getElementById("btn-25-perc");
var btn50Perc = document.getElementById("btn-50-perc");

btn5Perc.addEventListener('click', function (e) {
  addRemoveClass(e)
  selectValues(0.05)
  finalCalc(inputNumberOfPeople, billValue, 0.05)
})

btn10Perc.addEventListener('click', function (e) {
  addRemoveClass(e)
  selectValues(0.10)
  finalCalc(inputNumberOfPeople, billValue, 0.10)
})

btn15Perc.addEventListener('click', function (e) {
  addRemoveClass(e)
  selectValues(0.15)
  finalCalc(inputNumberOfPeople, billValue, 0.15)
})

btn25Perc.addEventListener('click', function (e) {
  addRemoveClass(e)
  selectValues(0.25)
  finalCalc(inputNumberOfPeople, billValue, 0.25)
})

btn50Perc.addEventListener('click', function (e) {
  addRemoveClass(e)
  selectValues(0.50)
  finalCalc(inputNumberOfPeople, billValue, 0.50)
})

function addRemoveClass(e)
{
  inputNumberOfPeople.disabled = false;
  
  var classList = e.target.classList;
  var classActive = document.getElementsByClassName("active");

  if (classActive.length == 0) {
    classList.add("active")
  } else {
    Array.from(document.querySelectorAll('.active')).forEach(
      (el) => el.classList.remove('active')
    );
    classList.add("active")
  }
}

function tipWasSelected(e) {
  valueCustom = e.target.value / 100;

  addRemoveClass(e)
  selectValues(valueCustom)
  finalCalc(inputNumberOfPeople, billValue, valueCustom)
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
  inputNumberOfPeople.value = "";
  billValue.value = "";
  inputCustom.value = "";
  document.getElementById("tipAmount").innerHTML = "$0.00";
  document.getElementById("total").innerHTML = "$0.00";
  inputNumberOfPeople.disabled = true;

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


