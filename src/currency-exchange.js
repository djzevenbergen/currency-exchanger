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
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let ret = "";

  if (hour > 0) {
    ret += "" + hour + ":" + (min < 10 ? "0" : "");
  }
  ret += "" + min + ":" + (sec < 10 ? "0" : "");
  ret += "" + sec;

  let time = date + ' ' + month + ' ' + year + ' ' + ret;

  return time;
}
