$(document).ready(function () {
  $('.money').mask('000,000,000,000,000.00', { reverse: true });
  $('.input-custom').mask('00', { reverse: true });
});

let tipPercent = 0.0;


function tipWasSelected(value, e) {
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
    calc(valueCustom)
  } else {
    calc(value)
  }
}

function calc(tipPercent) {
  const inputNumberOfPeople = document.getElementById("input-number-of-people");

   var billValue = document.getElementById("input-bill");
   
    let teste = 0.0;
    let teste2 = 0.0;

    teste2 = billValue.addEventListener('keyup', function (e) {
    console.log(e.target.value)
    teste = e.target.value;
    return e.target.value;
  })
    console.log("TRes ", teste)
    console.log("TRes2 ", teste2)


  inputNumberOfPeople.addEventListener('keyup', function (e) {
    numberOfPeople = e.target.value;
  console.log("nsad ", numberOfPeople)

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


