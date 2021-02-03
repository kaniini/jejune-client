import WebfingerService from '@/services/webfinger'
import ActivityPubService from '@/services/activitypub'
import OAuthService from '@/services/oauth'

let login = function(username, password) {
  console.log(`[TOPLEVEL] Attempting login for ${username}`)

  return new Promise((resolve, reject) => {
    WebfingerService.discoverActor(username).then((uri) => {
      ActivityPubService.fetchActor(uri).then((actor) => {
        OAuthService.getToken(actor, username, password).then((token) => {
          actor.setToken(token)
          resolve(actor)
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}

export default {
  login
}