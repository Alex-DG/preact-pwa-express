import { h, render } from 'preact' // eslint-disable-line no-unused-vars
import App from './components/App'
import createStore from './store/createStore'
import { fetchPostsIfNeeded } from './store/actions/posts'
import { updateLocation } from './store/actions/meta'
import { getUrl } from './store/selectors/meta'
import ensurePolyfills from './utils/ensurePolyfills'

const app = document.getElementById('app')

console.log('--> entry');

ensurePolyfills(() => {

  console.log('--> ensurePolyfills');

  const store = createStore(window.__STATE__, window.fetch)

  window.addEventListener('beforeinstallprompt', function(e) {
    console.log('-> beforeinstallprompt Event fired');
    // beforeinstallprompt Event fired

    // e.userChoice will return a Promise.
    // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
    e.userChoice.then(function(choiceResult) {

      console.log(choiceResult.outcome);

      if(choiceResult.outcome == 'dismissed') {
        console.log('[x] User cancelled home screen install');
      }
      else {
        console.log('[v] User added to home screen');
      }
    });
  });
  // 
  // window.addEventListener('popstate', (e) => {
  //   store.dispatch(updateLocation(window.location.pathname + window.location.search))
  // })
  //
  // store.subscribe(() => {
  //   const url = getUrl(store.getState())
  //   if (window.location.pathname + window.location.search !== url) {
  //     window.history.pushState({}, '', url)
  //   }
  // })
  //
  // store.dispatch(updateLocation(window.location.pathname + window.location.search))
  // store.dispatch(fetchPostsIfNeeded())

  render(<App store={store} />, app, app.lastChild)
})
