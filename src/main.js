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

    console.log(fromCurrency);
    console.log(toCurrency);
    console.log(exchangeAmount);

    console.log(process.env.API_KEY);


    (async () => {
      let exchange = new Exchange();
      const response = await exchangeAmount.getCurrencies(fromCurrency);
      getElements(response);
    })();

    function getElements(response) {
      if (response.result === "success") {
        const time = response.time_last_update;
        const timeZone = response.timeZone;
        const toCurrency = response.conversion_rates;



      } else {
        $("#output").append(response.error);
      }
    }

  });

});