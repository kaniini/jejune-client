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

Actor.prototype.search = function (term) {
  return new Promise((resolve, reject) => {
    if (!this.data.endpoints.searchEndpoint)
      reject('no search endpoint available')

    fetch(`${this.data.endpoints.searchEndpoint}?q=${term}`, {
      headers: {
        'Accept': 'application/activity+json',
        'Authorization': `Bearer ${this.token.access_token}`,
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

Actor.prototype.like = function (liked_object) {
  let to = [
    'https://www.w3.org/ns/activitystreams#Public',
    liked_object.attributedTo,
  ]

  let cc = [
    this.data.followers,
  ]

  let audience = to.concat(cc)

  let message = {
    '@context': 'https://www.w3.org/ns/activitystreams',
    to: to,
    cc: cc,
    actor: this.data.id,
    audience: audience,
    type: 'Like',
    object: liked_object.id,
  }

  return this.pushMessageToOutbox(message)
}

Actor.prototype.announce = function (announced_object) {
  let to = [
    'https://www.w3.org/ns/activitystreams#Public',
    announced_object.attributedTo,
  ]

  let cc = [
    this.data.followers,
  ]

  let audience = to.concat(cc)

  let message = {
    '@context': 'https://www.w3.org/ns/activitystreams',
    to: to,
    cc: cc,
    actor: this.data.id,
    audience: audience,
    type: 'Announce',
    object: announced_object.id,
  }

  return this.pushMessageToOutbox(message)
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

Actor.prototype.uploadMediaEndpoint = function () {
  return this.data.endpoints.uploadMedia
}

Actor.prototype.uploadMedia = function (file) {
  return new Promise((resolve, reject) => {
    let endpoint = this.uploadMediaEndpoint()
    if (!endpoint)
      reject('Media upload endpoint is not available.')

    let formdata = new FormData()
    formdata.append('file', file)

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/activity+json',
        'Authorization': `Bearer ${this.token.access_token}`,
      },
      body: formdata,
    }).then((response) => {
      return response.json()
    }).then((response) => {
      resolve(response)
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

Actor.prototype.search = function (query) {
  return new Promise((resolve, reject) => {
    if (!this.data.endpoints.searchEndpoint)
      reject('Search endpoint is not present for the session actor.')

    let searchEndpoint = this.data.endpoints.searchEndpoint
    fetch(`${searchEndpoint}?q=${query}`, {
      headers: {
        'Accept': 'application/activity+json',
        'Authorization': `Bearer ${this.token.access_token}`,
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

Actor.prototype.fetchObject = function (uri) {
  if (!this.data.endpoints.proxyUrl)
    return fetchObject(uri)

  return new Promise((resolve, reject) => {
    let proxyUrl = this.data.endpoints.proxyUrl

    let body = new FormData()
    body.append('id', uri)

    fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token.access_token}`,
      },
      body: body
    }).then((response) => {
      return response.json()
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
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