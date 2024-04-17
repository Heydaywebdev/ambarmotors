export default function({ $axios, store, redirect }) {
  $axios.onRequest(config => {
    config.headers.common.key = store.state.sharedEnv.ezlead_key
    config.headers.common["origin"] = "ambarmotors.com"
  })

  $axios.onError(error => {
    if (error.response.status === 500) {
      redirect('/500')
    } else if (error.response.status === 404) {
      redirect('/404')
    }
  })
}
