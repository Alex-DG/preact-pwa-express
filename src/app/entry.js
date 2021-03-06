import { h, render } from 'preact' // eslint-disable-line no-unused-vars
import App from './components/App'
import createStore from './store/createStore'
import { fetchPostsIfNeeded } from './store/actions/posts'
import { updateLocation } from './store/actions/meta'
import { getUrl } from './store/selectors/meta'
import ensurePolyfills from './utils/ensurePolyfills'

const app = document.getElementById('app')

// navigator.getInstalledRelatedApps().then(relatedApps => {
//   console.log('======>>>>>>>> relatedApps');
//   console.log(relatedApps);
//   // for (let app of relatedApps) {
//   //   console.log(app);
//   //   console.log(app.name);
//   // }
// });

console.log('sadasdasdasdadasda');

window.addEventListener("beforeinstallprompt", e => {
  alert('->' + navigator.getInstalledRelatedApps);
  if (navigator.getInstalledRelatedApps) {
    e.preventDefault();  // Stop automated install prompt.

    navigator.getInstalledRelatedApps().then(relatedApps => {
      if (relatedApps.length == 0) {
        e.prompt();
      }
    });
  }
});

// window.addEventListener("beforeinstallprompt", function(e) {
//   // log the platforms provided as options in an install prompt
//   console.log(e.platforms); // e.g., ["web", "android", "windows"]
//   alert('->' + e.platforms);
//   e.userChoice.then(function(outcome) {
//     alert('->' + e.platforms);
//     console.log(outcome); // either "installed", "dismissed", etc.
//   }, handleError);
// });


ensurePolyfills(() => {

  const store = createStore(window.__STATE__, window.fetch)
  window.addEventListener('popstate', (e) => {
    store.dispatch(updateLocation(window.location.pathname + window.location.search))
  })
  store.subscribe(() => {
    const url = getUrl(store.getState())
    if (window.location.pathname + window.location.search !== url) {
      window.history.pushState({}, '', url)
    }
  })
  store.dispatch(updateLocation(window.location.pathname + window.location.search))
  store.dispatch(fetchPostsIfNeeded())
  render(<App store={store} />, app, app.lastChild)
})
