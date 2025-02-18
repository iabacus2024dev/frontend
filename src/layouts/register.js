export function registerLayouts(app) {
  const layouts = import.meta.glob('./*.vue');

  Object.entries(layouts).forEach(([, layout]) => {
    app.component(layout?.default?.name, layout?.default);
  });
}
