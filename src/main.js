import { Exchange } from './currency-exchange.js';
import { timeConverter } from './currency-exchange.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

$(document).ready(function () {

  $("#currency-form").submit(function (event) {
    event.preventDefault();

    let fromCurrency = $("#from-text").val();
    let toCurrency = $("#to-text").val();
    let exchangeAmount = parseInt($("#money-text").val());

    // console.log(fromCurrency);
    // console.log(toCurrency);
    // console.log(exchangeAmount);

    // console.log(process.env.API_KEY);


    (async () => {
      let exchange = new Exchange();
      const response = await exchange.getCurrencies(fromCurrency);
      getElements(response);
    })();

    function getElements(response) {
      if (response.result === "success") {
        const time = timeConverter(response.time_last_update);
        const currencies = response.conversion_rates;
        console.log(response.time_last_update);
        console.log(response);
        console.log(toCurrency);
        console.log(currencies[toCurrency]);
        if (currencies[toCurrency]) {
          let conversion = exchangeAmount * (currencies[toCurrency]);
          $("#output").html('<p>' + conversion + ' ' + toCurrency + '</p><br><p>' + 'Last Update: ' + time + ' ' + ' Local Time </p>');
        } else {
          $("#output").html(`<p>Sorry, ${toCurrency} isn't in our database!</p>`);
        }


      } else {
        $("#output").append(response.error);
      }
    }

  });

});