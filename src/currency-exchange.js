// https://prime.exchangerate-api.com/v5/1daee50969844330f0def97b/latest/USD

export class Exchange {
  async getCurrencies(from) {
    try {
      let response = await fetch(`https://prime.exchangerate-api.com/v5/${process.env.API_KEY}/latest/${from}`);
      let jsonifiedResponse;
      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();

  var ret = "";

  if (hour > 0) {
    ret += "" + hour + ":" + (min < 10 ? "0" : "");
  }

  ret += "" + min + ":" + (sec < 10 ? "0" : "");
  ret += "" + sec;


  var time = date + ' ' + month + ' ' + year + ' ' + ret;
  return time;
}
