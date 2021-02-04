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

var ACTOR_CACHE = {}

let fetchActor = (uri) => {
  return new Promise((resolve, reject) => {
    fetch(uri, {
      headers: {'Accept': 'application/activity+json'}
    }).then((response) => {
      return response.json()
    }).then((response) => {
      ACTOR_CACHE[uri] = new Actor(response)
      resolve(ACTOR_CACHE[uri])
    }).catch((err) => {
      reject(err)
    })
  })
}

export default {
  fetchActor
}