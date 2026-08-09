(() => {
  const script = document.currentScript;
  const currentType = script?.dataset.type;
  const slug = script?.dataset.slug;
  if (!currentType || !slug) return;
  const isLocal = ['127.0.0.1','localhost'].includes(location.hostname);
  document.documentElement.classList.add('mrv-resource-loading');
  if (!document.querySelector('link[data-mrv-resource-bar]')) {
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = '/assets/mrv-resource-bar.css?v=20260804-mobile-1';
    styles.dataset.mrvResourceBar = '';
    document.head.append(styles);
  }

  const catalog = {
    mayorquemirealidad: { video:'https://youtu.be/vOo8MTZ0a5k?si=ZhdFkOJZWpKf0tLP', blog:'/Blog/mayorquemirealidad', info:'/Info/mayorquemirealidad' },
    arquitectosdelaverdad: { video:'https://youtu.be/7TkmPtQg2mc?si=-7ScDbmGWMwPznZY', blog:'/Blog/arquitectosdelaverdad', info:'/Info/arquitectosdelaverdad' },
    cruzarelumbral: { video:'https://youtu.be/G_pesESYY9c?si=aquEmK66_PI1OHnE', blog:'/Blog/cruzarelumbral', info:'/Info/cruzarelumbral' },
    lanarrativa: { video:'https://youtu.be/yYvJAYEZOjo?si=DIOcW5sNZEro6aP5', info:'/Info/lanarrativa' },
    perdidaencasa: { video:'https://youtu.be/t14hY2iWFFo', blog:'/Blog/perdidaencasa', info:'/Info/perdidaencasa' },
    lascuatrofuentes: { blog:'/Blog/lascuatrofuentes', info:'/Info/lascuatrofuentes' },
    entreelruidoysuvoz: { video:'https://youtu.be/SR98toUSMT4', blog:'/Blog/entreelruidoysuvoz', info:'/Info/entreelruidoysuvoz' },
    laverdadtienenombre: { video:'https://youtu.be/yfgyWHVhhtI?si=JP-NQE9gzQZG_UO7', blog:'/Blog/laverdadtienenombre', info:'/Info/laverdadtienenombre' },
    todolomioestuyo: { video:'https://youtu.be/5mE1QjchZ-4?si=r3MZbiL74oksj9Hz', blog:'/Blog/todolomioestuyo', info:'/Info/todolomioestuyo', mesa:'/Mesa/todolomioestuyo' },
    podemoshacerlo: { video:'https://youtu.be/lzNg1zdQC5k', blog:'/Blog/podemoshacerlo', info:'/Info/podemoshacerlo', mesa:'/Mesa/podemoshacerlo', expediente:'/expedientes/18-mrv-f2-msg5-podemos-hacerlo-exp.html' },
    otroespiritu: { video:'https://youtu.be/VXcrFGL7mPc', blog:'/Blog/otroespiritu', info:'/Info/otroespiritu', mesa:'/Mesa/otroespiritu' },
    otroespiritub: { info:'/Info/otroespiritub' }
  };

  const item = catalog[slug] || {};
  const localFiles = {
    blog: {
      mayorquemirealidad:'/blogs/10-mrv-f1-msg1-mayor-que-mi-realidad-blg.html', arquitectosdelaverdad:'/blogs/10-mrv-f1-msg2-arquitectos-de-la-verdad-blg.html', cruzarelumbral:'/blogs/10-mrv-f1-msg3-cruzar-el-umbral-blg.html', perdidaencasa:'/blogs/10-mrv-f2-msg3b-perdida-en-casa-blg.html', lascuatrofuentes:'/blogs/10-mrv-f2-msg3c-las-cuatro-fuentes-blg.html', entreelruidoysuvoz:'/blogs/10-mrv-f2-msg3d-entre-el-ruido-y-su-voz-blg.html', laverdadtienenombre:'/blogs/10-mrv-f2-msg3e-la-verdad-tiene-nombre-blg.html', todolomioestuyo:'/blogs/10-mrv-f2-msg4-todo-lo-mio-es-tuyo-blg.html', podemoshacerlo:'/blogs/10-mrv-f2-msg5-podemos-hacerlo-blg.html', otroespiritu:'/blogs/10-mrv-f2-msg6-otro-espiritu-blg.html'
    },
    info: {
      mayorquemirealidad:'/infografias/13-mrv-f1-msg1-mayor-que-mi-realidad-inf.html', arquitectosdelaverdad:'/infografias/13-mrv-f1-msg2-arquitectos-de-la-verdad-inf.html', cruzarelumbral:'/infografias/13-mrv-f1-msg3-cruzar-el-umbral-inf.html', lanarrativa:'/infografias/13-mrv-f2-msg3a-la-narrativa-inf.html', perdidaencasa:'/infografias/13-mrv-f2-msg3b-perdida-en-casa-inf.html', lascuatrofuentes:'/infografias/13-mrv-f2-msg3c-las-cuatro-fuentes-inf.html', entreelruidoysuvoz:'/infografias/13-mrv-f2-msg3d-entre-el-ruido-y-su-voz-inf.html', laverdadtienenombre:'/infografias/13-mrv-f2-msg3e-la-verdad-tiene-nombre-inf.html', todolomioestuyo:'/infografias/13-mrv-f2-msg4-todo-lo-mio-es-tuyo-inf.html', podemoshacerlo:'/infografias/13-mrv-f2-msg5-podemos-hacerlo-inf.html', otroespiritu:'/infografias/13-mrv-f2-msg6-otro-espiritu-inf.html'
    },
    mesa: {
      todolomioestuyo:'/mesa/12-mrv-f2-msg4-todo-lo-mio-es-tuyo-mes.html', podemoshacerlo:'/mesa/12-mrv-f2-msg5-podemos-hacerlo-mes.html', otroespiritu:'/mesa/12-mrv-f2-msg6-otro-espiritu-mes.html'
    }
  };
  localFiles.info.otroespiritub = '/infografias/13-mrv-f2-msg6b-otro-espiritu-inf.html';

  const icons = {
    home:'<path d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    video:'<polygon points="5 3 19 12 5 21"/>',
    blog:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    info:'<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>',
    mesa:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    expediente:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>'
  };
  const svg = (name, fill=false) => `<svg viewBox="0 0 24 24" fill="${fill?'currentColor':'none'}" stroke="currentColor" stroke-width="2">${icons[name]}</svg>`;
  const makeButton = (type, label, href, adminOnly=false) => {
    if (currentType === type) return '';
    if (isLocal && localFiles[type]?.[slug]) href = localFiles[type][slug];
    const classes = ['mrv-resource-button', `mrv-button-${type}`];
    if (!href) classes.push('is-disabled');
    if (adminOnly) classes.push('is-admin-only');
    const attrs = href ? `href="${href}"${type==='video'?' target="_blank" rel="noopener"':''}` : 'aria-disabled="true"';
    return `<a class="${classes.join(' ')}" ${attrs}>${svg(type,type==='video')}${label}</a>`;
  };

  const init = () => {
    if (document.querySelector('.mrv-resource-bar')) return;
    document.body.classList.add('mrv-resource-page', `mrv-type-${currentType}`);
    const oldTopNav = [...document.body.children].find(el => el.tagName === 'NAV' && el.id !== 'sidebar');
    if (oldTopNav) oldTopNav.classList.add('mrv-original-nav');

    const bar = document.createElement('nav');
    bar.className = 'mrv-resource-bar';
    bar.setAttribute('aria-label','Recursos del mensaje');
    bar.innerHTML = `
      <button type="button" class="mrv-menu-button" aria-label="Abrir menú"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
      <div class="mrv-resource-actions">
        ${makeButton('home','Inicio','/')}
        ${makeButton('video','Video',item.video)}
        ${makeButton('blog','Blog',item.blog)}
        ${makeButton('info','Info',item.info)}
        ${makeButton('mesa','La Mesa',item.mesa)}
        ${makeButton('expediente','Expediente',item.expediente,true)}
      </div>
      <a class="mrv-lhscol" href="https://lhscolweb.netlify.app/" target="_blank" rel="noopener">LHSCOL<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7 17L17 7M17 7H9M17 7v8"/></svg></a>`;
    document.body.prepend(bar);

    const overlay = document.createElement('div');
    overlay.className = 'mrv-menu-overlay';
    const sidebar = document.createElement('aside');
    sidebar.className = 'mrv-sidebar';
    sidebar.setAttribute('aria-label','Menú de la temporada');
    sidebar.innerHTML = `<button type="button" class="mrv-sidebar-close" aria-label="Cerrar menú"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button><div class="marca">LHSCOL</div><div class="serie"><span>MAYOR QUE MI REALIDAD</span><span>TEMPORADA 2026</span></div><div class="bloque-nav"><a class="nav-item nav-portada" href="/">Portada</a><a class="nav-item" href="/?view=intro">¿De qué se trata esta temporada?</a><a class="nav-item" href="/?view=indice">Tabla de contenido</a><a class="nav-item nav-sala" href="/?view=sala">Episodios de La Sala</a></div><div class="bloque-nav"><div class="fase-grupo"><button class="nav-item fase-toggle" type="button">F1 · Umbral</button><div class="fase-contenido"><a class="nav-item sub" href="/?fase=f1&msg=msg-f1-1">Mayor que mi Realidad</a><a class="nav-item sub" href="/?fase=f1&msg=msg-f1-2">Arquitectos de Su Verdad</a><a class="nav-item sub" href="/?fase=f1&msg=msg-f1-3">Cruzar el Umbral</a><a class="nav-item sub" href="/?fase=f1&msg=msg-f1-4">Una Vida Editada</a><a class="nav-item sub" href="/?fase=f1&msg=msg-f1-5a">Obediencia Larga — Parte 1</a><a class="nav-item sub" href="/?fase=f1&msg=msg-f1-5b">Obediencia Larga — Parte 2</a><a class="nav-item sub" href="/?fase=f1&msg=msg-f1-6a">La Pregunta Equivocada</a><a class="nav-item sub" href="/?fase=f1&msg=msg-f1-6b">Un Discípulo Atento</a><a class="nav-item sub" href="/?fase=f1&msg=msg-f1-6c">Lávate las Manos</a><a class="nav-item sub" href="/?fase=f1&msg=msg-f1-6d">La Enfermedad de lo Ordinario</a></div></div><div class="fase-grupo fase-actual abierto"><button class="nav-item fase-toggle" type="button">F2 · Diagnóstico <span class="badge-estado badge-nuevo">NUEVO</span></button><div class="fase-contenido"><a class="nav-item sub" href="/?fase=f2&msg=msg-f2-1">El Pez No Sabe</a><a class="nav-item sub" href="/?fase=f2&msg=msg-f2-2">Cerdos y Coronas</a><a class="nav-item sub" href="/?fase=f2&msg=msg-f2-3a">La Narrativa</a><a class="nav-item sub" href="/?fase=f2&msg=msg-f2-3b">Perdida en Casa</a><a class="nav-item sub" href="/?fase=f2&msg=msg-f2-3c">Las Cuatro Fuentes</a><a class="nav-item sub" href="/?fase=f2&msg=msg-f2-3d">Entre el Ruido y Su Voz</a><a class="nav-item sub" href="/?fase=f2&msg=msg-f2-3e">La Verdad Tiene Nombre</a><a class="nav-item sub" href="/?fase=f2&msg=msg-f2-4">Todo lo Mío es Tuyo</a><a class="nav-item sub" href="/?fase=f2&msg=msg-f2-5">Podemos Hacerlo</a><a class="nav-item sub mensaje-reciente" href="/?fase=f2&msg=msg-f2-6">Otro Espíritu</a><span class="nav-item sub pendiente">La Generación que Llegó</span><span class="nav-item sub pendiente">¿Cuál es tu Marco?</span><span class="nav-item sub pendiente">El Nombre del Agua</span></div></div><div class="fase-grupo"><span class="nav-item fase-toggle pendiente">F3 · Manifiesto <span class="badge-estado badge-pronto">PRONTO</span></span></div><div class="fase-grupo"><span class="nav-item fase-toggle pendiente">F4 · Protocolo <span class="badge-estado badge-pronto">PRONTO</span></span></div><div class="fase-grupo"><span class="nav-item fase-toggle pendiente">F5 · Estilo de Vida <span class="badge-estado badge-pronto">PRONTO</span></span></div></div>`;
    sidebar.innerHTML = sidebar.innerHTML
      .replace('<a class="nav-item sub mensaje-reciente" href="/?fase=f2&msg=msg-f2-6">Otro Espíritu</a>','<a class="nav-item sub" href="/?fase=f2&msg=msg-f2-6a">Otro Espíritu — Parte A</a><a class="nav-item sub mensaje-reciente" href="/?fase=f2&msg=msg-f2-6b">Otro Espíritu — Parte B</a>')
      .replace('F3 · Manifiesto','F3 · Protocolo')
      .replace('F4 · Protocolo','F4 · Manifiesto');
    const salaLink = sidebar.querySelector('.nav-sala');
    if (salaLink) salaLink.innerHTML = '<span class="sala-star">★</span><span>Episodios de La Sala</span><span class="sala-dot"></span>';
    sidebar.insertAdjacentHTML('beforeend',`<div class="mrv-sidebar-admin"><button type="button" class="mrv-sidebar-admin-toggle" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20.3h-3v-.08a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7 15a1.7 1.7 0 0 0-1.56-1.03H5.3v-3h.14A1.7 1.7 0 0 0 7 9.94a1.7 1.7 0 0 0-.34-1.88L6.6 8l2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 11.69 4.7V4.6h3v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 8l-.06.06a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.96 11h.14v3h-.14A1.7 1.7 0 0 0 19.4 15z"/></svg>Zona administrativa<span class="admin-chevron">›</span></button><div class="mrv-sidebar-admin-panel"><span class="mrv-admin-state">Acceso privado</span><button type="button" class="mrv-admin-action">Ingresar como administrador</button></div></div>`);
    document.body.append(overlay,sidebar);

    const openMenu = () => { overlay.classList.add('is-open'); sidebar.classList.add('is-open'); document.documentElement.style.overflow='hidden'; };
    const closeMenu = () => { overlay.classList.remove('is-open'); sidebar.classList.remove('is-open'); document.documentElement.style.overflow=''; };
    bar.querySelector('.mrv-menu-button').addEventListener('click',openMenu);
    overlay.addEventListener('click',closeMenu);
    sidebar.querySelector('.mrv-sidebar-close').addEventListener('click',closeMenu);
    sidebar.querySelectorAll('.fase-toggle').forEach(btn => btn.addEventListener('click',() => btn.parentElement.classList.toggle('abierto')));
    const adminBox=sidebar.querySelector('.mrv-sidebar-admin');
    const adminBoxToggle=sidebar.querySelector('.mrv-sidebar-admin-toggle');
    const adminState=sidebar.querySelector('.mrv-admin-state');
    const adminAction=sidebar.querySelector('.mrv-admin-action');
    adminBoxToggle.addEventListener('click',()=>{ const open=adminBox.classList.toggle('is-open'); adminBoxToggle.setAttribute('aria-expanded',String(open)); });
    document.addEventListener('keydown',event => { if(event.key==='Escape') closeMenu(); });

    const updateAdmin = admin => {
      document.body.classList.toggle('admin-preview',admin);
      adminState.textContent=admin?'Vista administrador':'Acceso privado';
      adminAction.textContent=admin?'Cambiar a público':'Ingresar como administrador';
    };
    if (isLocal) {
      const admin = new URLSearchParams(location.search).get('admin')==='1' || localStorage.getItem('mrv-local-admin')==='true';
      updateAdmin(admin);
      adminAction.addEventListener('click',()=>{ const next=!document.body.classList.contains('admin-preview'); if(next) localStorage.setItem('mrv-local-admin','true'); else localStorage.removeItem('mrv-local-admin'); updateAdmin(next); });
    } else {
      const identity = document.createElement('script');
      identity.src='https://identity.netlify.com/v1/netlify-identity-widget.js';
      identity.onload=()=>{ if(!window.netlifyIdentity) return; const apply=user=>{ const roles=user?.app_metadata?.roles||[]; updateAdmin(user?.email?.toLowerCase()==='lead.comunidad@gmail.com'&&roles.includes('admin')); }; netlifyIdentity.on('init',apply); netlifyIdentity.on('login',user=>{ apply(user); netlifyIdentity.close(); }); netlifyIdentity.on('logout',()=>apply(null)); netlifyIdentity.init(); adminAction.addEventListener('click',()=>{ if(document.body.classList.contains('admin-preview')) netlifyIdentity.logout(); else location.href='/login.html'; }); };
      document.head.append(identity);
    }
    requestAnimationFrame(() => document.documentElement.classList.remove('mrv-resource-loading'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  window.addEventListener('load',() => { if(!document.querySelector('.mrv-resource-bar')) init(); },{once:true});
})();
