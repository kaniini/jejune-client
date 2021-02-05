function Actor(data) {
  this.data = data
}

Actor.prototype.inboxURL = function () {
  if (this.data.inbox)
    return this.data.inbox

  return null
}

Actor.prototype.iconURL = function () {
  if (this.data.icon && this.data.icon.url)
    return this.data.icon.url

  return null
}

Actor.prototype.pushMessageToOutbox = function (message) {
  return new Promise((resolve, reject) => {
    let outbox_uri = this.data.outbox

    fetch(outbox_uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/activity+json',
        'Authorization': `Bearer ${this.token.access_token}`,
        'Content-Type': 'application/activity+json',
      },
      body: JSON.stringify(message),
    }).then((response) => {
      return response.json()
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

Actor.prototype.fetchMailboxWithToken = function (mailbox_uri) {
  return new Promise((resolve, reject) => {
    fetch(mailbox_uri, {
      headers: {
        'Accept': 'application/activity+json',
        'Authorization': `Bearer ${this.token.access_token}`
      }
    }).then((response) => {
      return response.json()
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

Actor.prototype.fetchInbox = function () {
  return new Promise((resolve, reject) => {
    if (!this.token)
      reject('no token for fetching inbox')

    // XXX: add pagination support
    let mailbox = this.inboxURL() + '?page=0'
    this.fetchMailboxWithToken(mailbox).then((result) => {
      resolve(result)
    }).catch((err) => {
      reject(err)
    })
  })
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

let fetchObject = (uri) => {
  return new Promise((resolve, reject) => {
    fetch(uri, {
      headers: {'Accept': 'application/activity+json'}
    }).then((response) => {
      return response.json()
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

export default {
  fetchActor,
  fetchObject,
}