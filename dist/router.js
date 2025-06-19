"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const app = document.getElementById('app');
const routes = {
    home: 'views/home.html',
    courses: 'views/courses.html',
    dashboard: 'views/dashboard.html',
    contact: 'views/contact.html',
};
function loadRoute(route) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = routes[route] || routes['home'];
        try {
            const res = yield fetch(path);
            const html = yield res.text();
            app.innerHTML = html;
            // Load controller
            yield loadController(route);
        }
        catch (error) {
            app.innerHTML = '<h2>404 - Page Not Found</h2>';
        }
    });
}
function handleHashChange() {
    const route = location.hash.replace('#', '') || 'home';
    loadRoute(route);
}
window.addEventListener('DOMContentLoaded', () => {
    handleHashChange();
});
window.addEventListener('hashchange', handleHashChange);
function loadController(route) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const module = yield import(`./${route}.js`);
            const initFnName = `init${capitalize(route)}Page`;
            if (typeof module[initFnName] === 'function') {
                module[initFnName]();
            }
            else {
                console.warn(`[Router] ${initFnName} not found in ${route}.js`);
            }
        }
        catch (err) {
            console.warn(`[Router] No controller found for: ${route}`, err);
        }
    });
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
