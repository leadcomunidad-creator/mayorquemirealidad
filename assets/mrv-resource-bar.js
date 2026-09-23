(() => {
  const script = document.currentScript;
  const currentType = script?.dataset.type;
  const slug = script?.dataset.slug;

  // Fuente unica del contenido del menu para portada y paginas internas.
  const menuDefinition = {
    phases: [
      {
        id:'f1', title:'F1 · Umbral', messages:[
          ['msg-f1-1','Mayor que mi Realidad'],
          ['msg-f1-2','Arquitectos de Su Verdad'],
          ['msg-f1-3','Cruzar el Umbral'],
          ['msg-f1-4','Una Vida Editada'],
          ['msg-f1-5a','Obediencia Larga — Parte 1'],
          ['msg-f1-5b','Obediencia Larga — Parte 2'],
          ['msg-f1-6a','La Pregunta Equivocada'],
          ['msg-f1-6b','Un Discípulo Atento'],
          ['msg-f1-6c','Lávate las Manos'],
          ['msg-f1-6d','La Enfermedad de lo Ordinario']
        ]
      },
      {
        id:'f2', title:'F2 · Diagnóstico', current:true, messages:[
          ['msg-f2-1','El Pez No Sabe'],
          ['msg-f2-2','Cerdos y Coronas'],
          ['msg-f2-3a','La Narrativa'],
          ['msg-f2-3b','Perdida en Casa'],
          ['msg-f2-3c','Las Cuatro Fuentes'],
          ['msg-f2-3d','Entre el Ruido y Su Voz'],
          ['msg-f2-3e','La Verdad Tiene Nombre'],
          ['msg-f2-4','Todo lo Mío es Tuyo'],
          ['msg-f2-5','Podemos Hacerlo'],
          ['msg-f2-6a','Otro Espíritu'],
          ['msg-f2-7','La Última Palabra'],
          ['msg-f2-8','Cada Día'],
          ['msg-f2-9a','Hundan los Barcos'],
          ['msg-f2-9b','No Dejes tu Mente Vacía'],
          ['msg-f2-9c','Corazón Valiente'],
          ['msg-f2-10','Esclavos de Nadie',{recent:true}]
        ]
      },
      { id:'f3', title:'F3 · Protocolo', pending:true }
    ]
  };

  const renderSeasonMenu = mode => {
    const inIndex = mode === 'index';
    const general = inIndex
      ? `<div class="marca">LHSCOL</div><div class="serie"><span>MAYOR QUE MI REALIDAD</span><span>TEMPORADA 2026</span></div><div class="bloque-nav"><button type="button" class="nav-item nav-portada" onclick="mostrarPortada()"><span class="num">—</span> Portada</button><button type="button" class="nav-item" onclick="ir('intro')"><span class="num">—</span> ¿De qué se trata esta temporada?</button><button type="button" class="nav-item" onclick="ir('indice')"><span class="num">—</span> Tabla de contenido</button><button type="button" class="nav-item sala-item" onclick="irFase('fesp')"><span class="num">★</span> Episodios de La Sala <span class="estado-dot"></span></button></div>`
      : `<div class="marca">LHSCOL</div><div class="serie"><span>MAYOR QUE MI REALIDAD</span><span>TEMPORADA 2026</span></div><div class="bloque-nav"><a class="nav-item nav-portada" href="/">Portada</a><a class="nav-item" href="/?view=intro">¿De qué se trata esta temporada?</a><a class="nav-item" href="/?view=indice">Tabla de contenido</a><a class="nav-item nav-sala" href="/?view=sala"><span class="sala-star">★</span><span>Episodios de La Sala</span><span class="sala-dot"></span></a></div>`;
    const phases = menuDefinition.phases.map(phase => {
      if (phase.pending) {
        return inIndex
          ? `<div class="bloque-nav"><button type="button" class="fase-toggle" onclick="irFase('${phase.id}')">${phase.title} <span class="badge-pronto">Pronto</span></button></div>`
          : `<div class="fase-grupo"><span class="nav-item fase-toggle pendiente">${phase.title} <span class="badge-estado badge-pronto">PRONTO</span></span></div>`;
      }
      const messages = phase.messages.map(([id,label,state={}]) => {
        const classes = `nav-item sub${state.recent?' mensaje-reciente':''}${state.pending?' pendiente':''}`;
        if (state.pending) return inIndex ? `<button type="button" class="${classes}">${label}</button>` : `<span class="${classes}">${label}</span>`;
        return inIndex
          ? `<button type="button" class="${classes}" onclick="irFase('${phase.id}','${id}')">${label}</button>`
          : `<a class="${classes}" href="/?fase=${phase.id}&msg=${id}">${label}</a>`;
      }).join('');
      return inIndex
        ? `<div class="bloque-nav fase-grupo${phase.current?' fase-actual abierto':''}"><button type="button" class="fase-toggle" onclick="toggleFaseGrupo(this)">${phase.title}${phase.current?' <span class="badge-nuevo">Nuevo</span>':''}<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button><div class="fase-sub">${messages}</div></div>`
        : `<div class="fase-grupo${phase.current?' fase-actual abierto':''}"><button class="nav-item fase-toggle" type="button">${phase.title}${phase.current?' <span class="badge-estado badge-nuevo">NUEVO</span>':''}</button><div class="fase-contenido">${messages}</div></div>`;
    }).join('');
    return general + (inIndex ? phases : `<div class="bloque-nav">${phases}</div>`);
  };

  window.MRVSeasonMenu = Object.freeze({ definition:menuDefinition, render:renderSeasonMenu });

  if (script?.dataset.mode === 'site-menu') {
    const initSiteMenu = () => {
      const target = document.querySelector('[data-mrv-season-menu]');
      if (target) target.innerHTML = renderSeasonMenu('index');
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initSiteMenu,{once:true});
    else initSiteMenu();
    return;
  }
  if (!currentType || !slug) return;
  const isLocal = ['127.0.0.1','localhost'].includes(location.hostname);
  document.documentElement.classList.add('mrv-resource-loading');

  const waitForDom = () => document.readyState === 'loading'
    ? new Promise(resolve => document.addEventListener('DOMContentLoaded',resolve,{once:true}))
    : Promise.resolve();

  const waitForResourceStyles = () => new Promise((resolve,reject) => {
    let styles = document.querySelector('link[data-mrv-resource-bar]');
    const ready = () => resolve(styles);
    const failed = () => reject(new Error('No se pudo cargar mrv-resource-bar.css'));

    if (styles) {
      if (styles.sheet) { ready(); return; }
      styles.addEventListener('load',ready,{once:true});
      styles.addEventListener('error',failed,{once:true});
      return;
    }

    styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = '/assets/mrv-resource-bar.css?v=20260923-css-ready-1';
    styles.dataset.mrvResourceBar = '';
    styles.addEventListener('load',ready,{once:true});
    styles.addEventListener('error',failed,{once:true});
    document.head.append(styles);
  });

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
    podemoshacerlo: { video:'https://youtu.be/lzNg1zdQC5k', blog:'/Blog/podemoshacerlo', info:'/Info/podemoshacerlo', mesa:'/Mesa/podemoshacerlo' },
    otroespiritu: { video:'https://youtu.be/VXcrFGL7mPc', blog:'/Blog/otroespiritu', info:'/Info/otroespiritu', mesa:'/Mesa/otroespiritu' },
    laultimapalabra: { info:'/Info/laultimapalabra' },
    cadadia: { info:'/Info/cadadia' },
    hundanlosbarcos: { video:'https://youtu.be/y-n2CZ1Bm_0?si=xOO5IHpETwHZWYQb', blog:'/Blog/hundanlosbarcos', info:'/Info/hundanlosbarcos', mesa:'/Mesa/hundanlosbarcos' },
    nodejestumentevacia: { info:'/Info/nodejestumentevacia' },
    corazonvaliente: { blog:'/Blog/corazonvaliente', info:'/Info/corazonvaliente', mesa:'/Mesa/corazonvaliente' },
    esclavosdenadie: { blog:'/Blog/esclavosdenadie', info:'/Info/esclavosdenadie', mesa:'/Mesa/esclavosdenadie' }
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
  localFiles.info.laultimapalabra = '/infografias/13-mrv-f2-msg7-la-ultima-palabra-inf.html';
  localFiles.info.cadadia = '/infografias/13-mrv-f2-msg8-cada-dia-inf.html';
  localFiles.info.hundanlosbarcos = '/infografias/13-mrv-f2-msg9a-hundan-los-barcos-inf.html';
  localFiles.blog.hundanlosbarcos = '/blogs/10-mrv-f2-msg9a-hundan-los-barcos-blg.html';
  localFiles.mesa.hundanlosbarcos = '/mesa/12-mrv-f2-msg9a-hundan-los-barcos-mes.html';
  localFiles.info.nodejestumentevacia = '/infografias/13-mrv-f2-msg9b-no-dejes-tu-mente-vacia-inf.html';
  localFiles.info.corazonvaliente = '/infografias/13-mrv-f2-msg9c-corazon-valiente-inf.html';
  localFiles.blog.corazonvaliente = '/blogs/10-mrv-f2-msg9c-corazon-valiente-blg.html';
  localFiles.mesa.corazonvaliente = '/mesa/12-mrv-f2-msg9c-corazon-valiente-mes.html';
  localFiles.info.esclavosdenadie = '/infografias/13-mrv-f2-msg10-esclavos-de-nadie-inf.html';
  localFiles.blog.esclavosdenadie = '/blogs/10-mrv-f2-msg10-esclavos-de-nadie-blg.html';
  localFiles.mesa.esclavosdenadie = '/mesa/12-mrv-f2-msg10-esclavos-de-nadie-mes.html';

  const icons = {
    home:'<path d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    video:'<polygon points="5 3 19 12 5 21"/>',
    blog:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    info:'<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>',
    mesa:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  };
  const svg = (name, fill=false) => `<svg width="13" height="13" viewBox="0 0 24 24" fill="${fill?'currentColor':'none'}" stroke="currentColor" stroke-width="2">${icons[name]}</svg>`;
  const makeButton = (type, label, href) => {
    if (currentType === type) return '';
    if (isLocal && localFiles[type]?.[slug]) href = localFiles[type][slug];
    const classes = ['mrv-resource-button', `mrv-button-${type}`];
    if (!href) classes.push('is-disabled');
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
      <button type="button" class="mrv-menu-button" aria-label="Abrir menú"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
      <div class="mrv-resource-actions">
        ${makeButton('home','Inicio','/')}
        ${makeButton('video','Video',item.video)}
        ${makeButton('blog','Blog',item.blog)}
        ${makeButton('info','Info',item.info)}
        ${makeButton('mesa','La Mesa',item.mesa)}
      </div>
      <a class="mrv-lhscol" href="https://lhscolweb.netlify.app/" target="_blank" rel="noopener">LHSCOL<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7 17L17 7M17 7H9M17 7v8"/></svg></a>`;
    document.body.prepend(bar);

    const overlay = document.createElement('div');
    overlay.className = 'mrv-menu-overlay';
    const sidebar = document.createElement('aside');
    sidebar.className = 'mrv-sidebar';
    sidebar.setAttribute('aria-label','Menú de la temporada');
    sidebar.innerHTML = `<button type="button" class="mrv-sidebar-close" aria-label="Cerrar menú"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>${renderSeasonMenu('resource')}`;
    const salaLink = sidebar.querySelector('.nav-sala');
    if (salaLink) salaLink.innerHTML = '<span class="sala-star">★</span><span>Episodios de La Sala</span><span class="sala-dot"></span>';
    document.body.append(overlay,sidebar);

    const openMenu = () => { overlay.classList.add('is-open'); sidebar.classList.add('is-open'); document.documentElement.style.overflow='hidden'; };
    const closeMenu = () => { overlay.classList.remove('is-open'); sidebar.classList.remove('is-open'); document.documentElement.style.overflow=''; };
    bar.querySelector('.mrv-menu-button').addEventListener('click',openMenu);
    overlay.addEventListener('click',closeMenu);
    sidebar.querySelector('.mrv-sidebar-close').addEventListener('click',closeMenu);
    sidebar.querySelectorAll('.fase-toggle').forEach(btn => btn.addEventListener('click',() => btn.parentElement.classList.toggle('abierto')));
    document.addEventListener('keydown',event => { if(event.key==='Escape') closeMenu(); });
    requestAnimationFrame(() => document.documentElement.classList.remove('mrv-resource-loading'));
  };

  Promise.all([waitForDom(),waitForResourceStyles()])
    .then(init)
    .catch(error => {
      document.documentElement.classList.remove('mrv-resource-loading');
      console.error('[MRV resource bar]',error);
    });
})();
