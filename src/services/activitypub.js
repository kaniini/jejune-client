function Actor(data) {
  this.data = data
}

Actor.prototype.setToken = function (token) {
  this.token = token
}

Actor.prototype.oAuthEndpoints = function () {
  let obj = {}

  if (this.data.endpoints.oauthRegistrationEndpoint)
    obj.registration = this.data.endpoints.oauthRegistrationEndpoint

  if (this.data.endpoints.oauthAuthorizationEndpoint)
    obj.authorization = this.data.endpoints.oauthAuthorizationEndpoint

  if (this.data.endpoints.oauthTokenEndpoint)
    obj.token = this.data.endpoints.oauthTokenEndpoint

  return obj
}

let fetchActor = (uri) => {
  return new Promise((resolve, reject) => {
    fetch(uri, {
      headers: {'Accept': 'application/activity+json'}
    }).then((response) => {
      return response.json()
    }).then((response) => {
      resolve(new Actor(response))
    }).catch((err) => {
      reject(err)
    })
  })
}

export default {
  fetchActor
}