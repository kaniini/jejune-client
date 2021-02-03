let finger = (acct) => {
  return new Promise((resolve, reject) => {
    if (!acct) {
      reject(new Error('invalid account'))
    }

    let acct_split = acct.split('@', 2)
    if (acct_split.length != 2) {
      reject(new Error('must use username@domain format'))
    }

    console.log('[WEBFINGER] Discovering', acct_split)

    fetch(`https://${acct_split[1]}/.well-known/webfinger?resource=acct:${acct}`).then((response) => {
      return response.json()
    }).then((response) => {
      console.log('[WEBFINGER] Response:', response)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

let discoverActor = (acct) => {
  return new Promise((resolve, reject) => {
    finger(acct).then((response) => {
      let links = response.links || []

      links.forEach((link) => {
        if (link.type === 'application/activity+json')
          resolve(link.href)
      })

      reject('no ActivityPub actor found!')
    }).catch((err) => {
      reject(err)
    })
  })
}

export default {
  finger,
  discoverActor,
}