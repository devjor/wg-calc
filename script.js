
const hourlyRate = 13.441;
const basicHours = 162.95;
const basicPay = hourlyRate * basicHours;
const mileageRate = 0.56;
const taxCode = 13970;
const NiPrimaryThreshold = 823;
const niRate = 0.1325;
const parking = 0 // 12.5;
const pensionRate = 0.093;

var satHoursField = document.querySelector('.satHoursField');
var sunHoursField = document.querySelector('.sunHoursField');
var bhHoursField = document.querySelector('.bhHoursField');
var mileageField = document.querySelector('.mileageField');
var calcButton = document.querySelector('.calculate');
var result = document.querySelector('.result');
var inputs = document.querySelectorAll('input[type="number"]');
// var labels = document.querySelectorAll('label');


calcButton.addEventListener('click', calculateWage);
satHoursField.focus();

function calculateWage() {
  var satPay = (Number(satHoursField.value) * 0.3) * hourlyRate;
  var sunPay = (Number(sunHoursField.value) * 0.6) * hourlyRate;
  var bhPay = (Number(bhHoursField.value) * 0.6) * hourlyRate;
  var mileagePay = Number(mileageField.value) * mileageRate;
  var mileage = Number(mileageField.value);
  var wtdPay = (satPay + sunPay) * 0.1205;
  var taxable = basicPay + satPay + sunPay + bhPay + wtdPay + (mileage * 0.11);
  var pension_cont = taxable * pensionRate;
  var paye = ((taxable - pension_cont) - (taxCode / 12)) * 0.2;
  var ni = (taxable - NiPrimaryThreshold) * niRate;
  var netPay = (basicPay + satPay + sunPay + bhPay + wtdPay + mileagePay) - (paye + ni + parking) - pension_cont;
  if(!isNaN(netPay)) {
    result.textContent = '£' + (Math.round(netPay * 100) / 100).toFixed(2);
  } else {
    result.textContent = "D'oh!";
  }
  
  
  disableForm();
}

function disableForm() {
  calcButton.removeEventListener('click', calculateWage);
  calcButton.addEventListener('click', resetForm);
  calcButton.textContent = "Reset";

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
    // inputs[i].style.visibility = "hidden";
    // labels[i].style.visibility = "hidden";
  }
}

function resetForm() {
  calcButton.removeEventListener('click', resetForm);
  calcButton.addEventListener('click', calculateWage);
  calcButton.textContent = "Calc";
  

  for (var i = 0; i < inputs.length; i++) {
    // inputs[i].style.visibility = "visible";
    // labels[i].style.visibility = "visible";
    inputs[i].disabled = false;
    inputs[i].value = '';
  }

  result.textContent = '';
  satHoursField.focus();
}
