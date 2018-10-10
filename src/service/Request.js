export default class Request{

  static async GET(url, header, callbacks) {
    await this.request(url, 'get', null, header, callbacks)
  }

  static async POST(url, data, header, callbacks) {
    await this.request(url, 'post', data, header, callbacks)
  }

  static async PUT(url, data, header, callbacks) {
    await this.request(url, 'put', data, header, callbacks)
  }

  static async DELETE(url, data, header, callbacks) {
    await this.request(url, 'delete', data, header, callbacks)
  }

  static async request(url, method, data, header, callbacks){
    let payload = {method};
            
    if(method !== 'get'){
      payload.headers = {
        'Content-Type': 'application/json',
        ...header
      };
      payload.body = JSON.stringify({
          ...data
      });
    } else {
        payload.headers = {
            ...header
        };
    }

    try {
      const response = await fetch(url, payload)
      const json = await response.json()

      if(callbacks[response.status]){
        callbacks[response.status](json)
        return;
      }else{
        if(callbacks.otherwise){
          callbacks.otherwise(json)
          return;
        }
      }
    } catch(err) {
      if(callbacks.fail){
		  console.log('err: ' + err)
        callbacks.fail(err)
      }
      return;
    }
  }
}
