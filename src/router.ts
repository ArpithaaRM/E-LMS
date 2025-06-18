const app = document.getElementById('app') as HTMLElement;

const routes: Record<string, string> = {
  home: 'views/home.html',
  courses: 'views/courses.html',
  dashboard: 'views/dashboard.html',
  contact: 'views/contact.html',
};

async function loadRoute(route: string) {
  const path = routes[route] || routes['home'];
  console.log(`[Router] Navigating to: ${route}`);
  console.log(`[Router] Fetching HTML from: ${path}`);

  try {
    const res = await fetch(path);
    const html = await res.text();
    console.log(`[Router] HTML content loaded for ${route}`);
    app.innerHTML = html;

    // Load controller
    await loadController(route);
  } catch (error) {
    console.error(`[Router] Failed to load route: ${route}`, error);
    app.innerHTML = '<h2>404 - Page Not Found</h2>';
  }
}

function handleHashChange() {
  const route = location.hash.replace('#', '') || 'home';
  console.log(`[Router] Hash changed, loading route: ${route}`);
  loadRoute(route);
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('[Router] DOM fully loaded. Initializing route...');
  handleHashChange();
});
window.addEventListener('hashchange', handleHashChange);

async function loadController(route: string) {
  try {
    console.log(`[Router] Attempting to load controller: ${route}.js`);
    const module = await import(`./${route}.js`);

    const initFnName = `init${capitalize(route)}Page`;
    if (typeof module[initFnName] === 'function') {
      console.log(`[Router] Found ${initFnName}, calling it now...`);
      module[initFnName]();
    } else {
      console.warn(`[Router] ${initFnName} not found in ${route}.js`);
    }
    console.log(`[Router] ${route} controller loaded successfully`);
  } catch (err) {
    console.warn(`[Router] No controller found for: ${route}`, err);
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
