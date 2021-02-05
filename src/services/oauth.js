let registerApp = (actor) => {
  return new Promise((resolve, reject) => {
    let data = new FormData()
    data.append('client_name', 'Jejune Client')
    data.append('redirect_uris', 'urn:ietf:wg:oauth:2.0:oob')
    data.append('scopes', 'read write follow push')

    let endpoints = actor.oAuthEndpoints()
    fetch(endpoints.registration, {
      method: 'POST',
      body: data
    }).then((response) => {
      return response.json()
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

let authorizeWithPassword = (actor, app_token, username, password) => {
  return new Promise((resolve, reject) => {
    let endpoints = actor.oAuthEndpoints()
    let real_username = username.split('@', 2)[0]

    let data = new FormData()
    data.append('username', real_username)
    data.append('password', password)
    data.append('grant_type', 'password')
    data.append('client_id', app_token.client_id)
    data.append('client_secret', app_token.client_secret)

    fetch(endpoints.token, {
      method: 'POST',
      body: data
    }).then((response) => {
      if (!response.ok)
        reject('Unable to acquire an OAuth session token with the supplied credentials.')

      return response.json()
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

let getToken = (actor, username, password) => {
  return new Promise((resolve, reject) => {
    registerApp(actor).then((app_token) => {
      console.log('[OAUTH] App token:', app_token)

      authorizeWithPassword(actor, app_token, username, password).then((token) => {
        resolve(token)
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

export default {
  getToken
}