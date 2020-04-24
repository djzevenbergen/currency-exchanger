import { Exchange } from './currency-exchange.js';
import { timeConverter } from './currency-exchange.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';






$(document).ready(function () {

  (async () => {
    let e = new Exchange();
    const res = await e.getCurrencies('USD');
    getSelect(res);
  })();

  function getSelect(res) {
    if (res.result === 'success') {
      const countryCodes = Object.keys(res.conversion_rates);
      $("#from-this").append('<label for="from-text">From:</label><select class="form-style" id="from-text" name="from-text">');
      $("#to-this").append('<label for="to-text">To:</label><select class="form-style" id="to-text" name="to-text">');

      countryCodes.forEach(function (country) {
        $("#from-text").append(`<option value="${country}">${country}</option>`);
        $("#to-text").append(`<option value="${country}">${country}</option>`);

      })
      $("#from-this").append('</select>');
      $("#to-this").append('</select>');
    } else {
      $("#output").text(`Sorry, there was an error "${res.error}"`);
    }
  }

  $("#currency-form").submit(function (event) {
    event.preventDefault();

    let fromCurrency = $("#from-text").val();
    let toCurrency = $("#to-text").val();
    let exchangeAmount = parseFloat($("#money-text").val());

    (async () => {
      let exchange = new Exchange();
      const response = await exchange.getCurrencies(fromCurrency);
      getElements(response);
    })();

    function getElements(response) {
      if (response.result === "success") {
        const time = timeConverter(response.time_last_update);
        const currencies = response.conversion_rates;
        if (currencies[toCurrency]) {
          let conversion = (Math.round((exchangeAmount * (currencies[toCurrency]) * 100))) / 100;
          $("#output").html('<p>' + conversion + ' ' + toCurrency + '</p><br><p>' + 'Last Exchange Update: ' + time + ' ' + ' Local Time </p>');
        } else {
          $("#output").html(`<p>Sorry, ${toCurrency} isn't in our database!</p>`);
        }


      } else {
        if (response.error === "unknown-code") {
          $("#output").html("<p>Sorry, we can't find that currency</p>");
        } else if (response.error === "malformed-request") {
          $("#output").html("<p>Sorry, we're having some problems on our end. We should be up and running soon!");
        } else if (response.error === "invalid-key") {
          $("#output").html("<p>Sorry, we're having some problems on our end. We should be up and running soon!");
        } else {
          $("#output").html("<p>Sorry, we're maxed out on requests for the month. Try again next month!");
        }
      }
    }

  });

});