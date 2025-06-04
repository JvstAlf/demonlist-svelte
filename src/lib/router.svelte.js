// router.svelte.js

export let routerState = $state({
  currentRoute: window.location.pathname,
  position: null,
});

function parseRoute(route) {
  if (route.startsWith('/level/')) {
    routerState.position = route.slice(7);
  } else {
    routerState.position = null;
  }
  routerState.currentRoute = route;
}

parseRoute(routerState.currentRoute);

window.addEventListener('popstate', () => {
  parseRoute(window.location.pathname);
});

export function navigateTo(route) {
  history.pushState({}, '', route);
  parseRoute(route);
}
