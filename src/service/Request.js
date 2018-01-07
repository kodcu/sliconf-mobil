
export default class Request{


  static async GET(url,callbacks) {
    await this.request(url,'get',null,callbacks)
  }

  static async POST(url,data,callbacks) {
      await this.request(url,'post',data,callbacks)
  }

  static async PUT(url,data,callbacks) {
      await this.request(url,'put',data,callbacks)
  }

  static async DELETE(url,data,callbacks) {
      await this.request(url,'delete',data,callbacks)
  }

  static async request(url,method,data,callbacks){
    let payload = {method};

    if(method != 'get'){
      payload.headers = {
        'Content-Type': 'application/json'
      };
      payload.body = JSON.stringify({
          ...data
      });
    }

    try{
      const response = await fetch(url,payload)
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
    }catch(err){
      if(callbacks.fail){
        callbacks.fail(err)
      }
      return;
    }


  }

}
