const app = document.getElementById('app') as HTMLElement;

const routes: Record<string, string> = {
  home: 'views/home.html',
  courses: 'views/courses.html',
  dashboard: 'views/dashboard.html',
  contact: 'views/contact.html',
};

async function loadRoute(route: string) {
  const path = routes[route] || routes['home'];


  try {
    const res = await fetch(path);
    const html = await res.text();
    app.innerHTML = html;

    // Load controller
    await loadController(route);
  } catch (error) {
    app.innerHTML = '<h2>404 - Page Not Found</h2>';
  }
}

function handleHashChange() {
  const route = location.hash.replace('#', '') || 'home';
  loadRoute(route);
}

window.addEventListener('DOMContentLoaded', () => {
  handleHashChange();
});
window.addEventListener('hashchange', handleHashChange);

async function loadController(route: string) {
  try {
    const module = await import(`./${route}.js`);

    const initFnName = `init${capitalize(route)}Page`;
    if (typeof module[initFnName] === 'function') {
      module[initFnName]();
    } else {
      console.warn(`[Router] ${initFnName} not found in ${route}.js`);
    }
  } catch (err) {
    console.warn(`[Router] No controller found for: ${route}`, err);
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
