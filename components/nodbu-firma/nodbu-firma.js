/*!
 * NODBU · Firma de autor para webs · v2.0.0 · https://nodbu.com
 * Logo v4, «la palanca con volumen» (NODBU_BRAND_KIT_v4).
 *
 *   <nodbu-firma></nodbu-firma>
 *
 * Sin dependencias, sin peticiones externas, sin cookies.
 * Estilos encapsulados (Shadow DOM): ni el CSS del cliente la rompe
 * ni ella toca el CSS del cliente.
 *
 * Atributos opcionales
 *   texto="Diseño web por"          cambia el texto previo a la marca
 *   fondo="claro|oscuro|naranja"    fuerza la variante del logo (y el color del texto);
 *                                   por defecto se elige sola con el color del texto del pie
 *   mono                            logo de una tinta, la del texto del pie (sin naranja)
 *   quieto                          sin el empujón periódico (conserva la entrada y el hover)
 *   nofollow                        añade rel="nofollow" al enlace
 *
 * Variables CSS (se ponen desde fuera)
 *   --nodbu-firma-tamano            tamaño del texto (13px por defecto). El logotipo mide
 *                                   6,8 veces ese tamaño de ancho y nunca menos de 96 px
 *                                   (manual de marca § 4: por debajo no se lee).
 *
 * El logotipo es el del kit tal cual (01_logo/1_logotipo-horizontal), con sus colores:
 * principal sobre fondos claros, «blanco» sobre oscuros y «sobre naranja» sobre el
 * naranja de la marca. Solo la barra y el apoyo van en grupos propios para moverse.
 */
(() => {
  if (!('customElements' in window) || customElements.get('nodbu-firma')) return;

  const WEB = 'https://nodbu.com/';
  const reducido = matchMedia('(prefers-reduced-motion: reduce)');
  const oscuroSO = matchMedia('(prefers-color-scheme: dark)');

  // Para saber si el texto del pie es claro u oscuro se pinta su color en un píxel:
  // así vale cualquier formato que devuelva el navegador (rgb, oklab, color-mix…).
  let pixel = null;
  const esClaro = (color) => {
    try {
      pixel ||= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
      pixel.fillStyle = '#010203';
      pixel.fillStyle = color;
      if (pixel.fillStyle === '#010203') return false; // color que el lienzo no entiende
      pixel.clearRect(0, 0, 1, 1);
      pixel.fillRect(0, 0, 1, 1);
      const [r, g, b] = pixel.getImageData(0, 0, 1, 1).data;
      const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
      // 0,179: donde el contraste con el blanco y con el negro se igualan.
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) > 0.179;
    } catch {
      return false;
    }
  };

  const plantilla = document.createElement('template');
  plantilla.innerHTML = `<style>
:host{display:inline-block;vertical-align:middle;font-size:var(--nodbu-firma-tamano,13px);line-height:1}
:host([hidden]){display:none}
:host([fondo="claro"]),:host([fondo="naranja"]){color:#090909}
:host([fondo="oscuro"]){color:#fff}
a{--alto:max(19.753px,1.3991em);--sobra:calc(var(--alto) - .8em);
  position:relative;display:inline-flex;align-items:baseline;
  padding:calc(.5em + var(--sobra)) .35em .5em;margin:calc(-.5em - var(--sobra)) -.35em -.5em;
  color:inherit;font:inherit;letter-spacing:.01em;text-decoration:none;white-space:nowrap;
  border-radius:6px;-webkit-tap-highlight-color:transparent}
a:focus-visible{outline:2px solid currentColor;outline-offset:2px}
.texto{opacity:.68;margin-inline-end:.5em;transition:opacity 220ms cubic-bezier(.2,0,0,1)}
svg{flex:none;overflow:visible}
/* La palabra del logo se apoya en la línea base del texto y lo que sobresale por arriba no
   cuenta para el alto: la firma ocupa lo mismo que una línea de texto y se alinea con el ©. */
.logo{width:max(96px,6.8em);height:var(--alto);margin-top:calc(-1 * var(--sobra))}
.logo{--tinta:#090909;--cara:#2E2A28;--luz:#FF5C00;--sombra:#B03D00}
[data-variante="oscuro"] .logo{--tinta:#fff;--cara:#E3DED9}
[data-variante="naranja"] .logo{--luz:#fff;--sombra:#E3DED9}
:host([mono]) .logo{--tinta:currentColor;--luz:currentColor}
.palabra,.barra{fill:var(--tinta)}
.cara-luz,.cara-sombra{fill:var(--cara)}
.apoyo-luz{fill:var(--luz)}
.apoyo-sombra{fill:var(--sombra)}
.cara-sombra,[data-variante="oscuro"] .cara-luz,
:host([mono]) .cara-luz,:host([mono]) .cara-sombra,:host([mono]) .apoyo-sombra{display:none}
[data-variante="oscuro"] .cara-sombra{display:inline}
.apoyo,.sube,.late,.empuja{transform-box:view-box;transform-origin:0 0}
.flecha{width:.72em;height:.72em;margin-inline-start:.4em;fill:none;stroke:currentColor;stroke-width:1.7;
  stroke-linecap:round;stroke-linejoin:round;opacity:0;transform:translate(-3px,3px);
  transition:opacity 220ms cubic-bezier(.2,0,0,1),transform 220ms cubic-bezier(.2,0,0,1)}
a:hover .texto,a:focus-visible .texto{opacity:.92}
a:hover .flecha,a:focus-visible .flecha{opacity:.75;transform:none}
.oculto{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}

@media (prefers-reduced-motion:no-preference){
  .espera .apoyo{transform:scale(1,0)}
  .espera .sube{transform:rotate(26.565deg)}
  .entra .apoyo{animation:apoyo 420ms cubic-bezier(.34,1.56,.64,1) both}
  .entra .sube{animation:sube 760ms 300ms cubic-bezier(.34,1.4,.64,1) both}
  .vivo .late{animation:late 7s 2.5s cubic-bezier(.45,0,.2,1) infinite}
  .pausa .late{animation-play-state:paused}
  :host([quieto]) .vivo .late{animation:none}
  .empuja.ya{animation:empuja 680ms cubic-bezier(.45,0,.2,1)}
}
@keyframes apoyo{from{transform:scale(1,0)}to{transform:none}}
@keyframes sube{from{transform:rotate(26.565deg)}to{transform:none}}
@keyframes late{0%,22%,100%{transform:none}7%{transform:rotate(-6deg)}15%{transform:rotate(1deg)}}
@keyframes empuja{0%,100%{transform:none}32%{transform:rotate(-9deg)}68%{transform:rotate(1.5deg)}}
</style><a part="enlace" target="_blank" data-variante="claro"><span class="texto"></span><svg class="logo" viewBox="0 0 784.9 161.5" aria-hidden="true" focusable="false"><g class="palabra" transform="translate(216.9 0)"><path d="M0,160V108.5A50,50 0 0 1 100,108.5V160H78V108.5A28,28 0 0 0 22,108.5V160Z"/><path d="M165.5,58.5A51.5,51.5 0 1 1 165.5,161.5A51.5,51.5 0 1 1 165.5,58.5ZM165.5,80.5A29.5,29.5 0 1 0 165.5,139.5A29.5,29.5 0 1 0 165.5,80.5Z"/><path d="M279.5,58.5A51.5,51.5 0 1 1 279.5,161.5A51.5,51.5 0 1 1 279.5,58.5ZM279.5,80.5A29.5,29.5 0 1 0 279.5,139.5A29.5,29.5 0 1 0 279.5,80.5Z"/><polygon points="309,11 331,0 331,160 309,160"/><polygon points="351,11 373,0 373,160 351,160"/><path d="M402.5,58.5A51.5,51.5 0 1 1 402.5,161.5A51.5,51.5 0 1 1 402.5,58.5ZM402.5,80.5A29.5,29.5 0 1 0 402.5,139.5A29.5,29.5 0 1 0 402.5,80.5Z"/><path d="M468,60V111.5A50,50 0 0 0 568,111.5V60H546V111.5A28,28 0 0 1 490,111.5V60Z"/></g><g transform="translate(-8.55 -12.9) scale(1.9)"><g transform="translate(38 91)"><g class="apoyo"><g transform="translate(-38 -91)"><polygon class="apoyo-luz" points="38,52.603 16.64,91 59.36,91"/><polygon class="apoyo-sombra" points="38,52.603 38,91 59.36,91"/></g></g></g><g transform="translate(38 52.603)"><g class="sube"><g class="late"><g class="empuja"><g transform="translate(-38 -52.603)"><path class="barra" d="M16.801,64.603L90.801,27.603A8.5,8.5 0 0 0 83.199,12.397L9.199,49.397A8.5,8.5 0 0 0 16.801,64.603Z"/><path class="cara-luz" d="M5.397,60.801A8.5,8.5 0 0 1 9.199,49.397L83.199,12.397A8.5,8.5 0 0 1 94.603,16.199Z"/><path class="cara-sombra" d="M5.397,60.801A8.5,8.5 0 0 0 16.801,64.603L90.801,27.603A8.5,8.5 0 0 0 94.603,16.199Z"/></g></g></g></g></g></g></svg><span class="oculto">NODBU</span><svg class="flecha" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M3.5 8.5l5-5M4.5 3.5h4v4"/></svg><span class="oculto aviso"></span></a>`;

  class NodbuFirma extends HTMLElement {
    static observedAttributes = ['texto', 'nofollow', 'lang', 'fondo'];

    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).append(plantilla.content.cloneNode(true));
      this.enlace = this.shadowRoot.querySelector('a');
      this.palanca = this.shadowRoot.querySelector('.empuja');
      this.alCambiarTema = () => this.variante();

      this.enlace.addEventListener('animationend', (e) => {
        if (e.animationName === 'empuja') this.palanca.classList.remove('ya');
        if (e.animationName === 'sube' && this.enlace.classList.contains('entra')) {
          this.enlace.classList.replace('entra', 'vivo');
        }
      });
      // Al pasar el ratón o llegar con el teclado, la palanca empuja una vez.
      const empujar = () => { if (!reducido.matches) this.palanca.classList.add('ya'); };
      this.enlace.addEventListener('pointerenter', empujar);
      this.enlace.addEventListener('focus', empujar);
    }

    connectedCallback() {
      this.pintar();
      oscuroSO.addEventListener?.('change', this.alCambiarTema);
      if (this.observador || !('IntersectionObserver' in window)) return;

      // La palanca espera a que el pie sea visible para subir, y el empujón periódico
      // se congela cuando sale de pantalla: no gasta nada mientras nadie mira.
      this.enlace.classList.add('espera');
      this.observador = new IntersectionObserver(([registro]) => {
        const lista = this.enlace.classList;
        if (registro.isIntersecting) this.variante();
        if (registro.isIntersecting && lista.contains('espera')) lista.replace('espera', 'entra');
        lista.toggle('pausa', !registro.isIntersecting);
      }, { threshold: 0.5 });
      this.observador.observe(this);
    }

    disconnectedCallback() {
      oscuroSO.removeEventListener?.('change', this.alCambiarTema);
      this.observador?.disconnect();
      this.observador = null;
      this.enlace.classList.remove('espera', 'entra', 'vivo', 'pausa');
      this.palanca.classList.remove('ya');
    }

    attributeChangedCallback() {
      if (this.isConnected) this.pintar();
    }

    // Variante del kit: la que pide «fondo» o, si no hay, la que contrasta con el color del
    // texto del pie (texto claro = fondo oscuro = logotipo blanco).
    variante() {
      const fondo = this.getAttribute('fondo');
      this.enlace.dataset.variante = ['claro', 'oscuro', 'naranja'].includes(fondo)
        ? fondo
        : esClaro(getComputedStyle(this).color) ? 'oscuro' : 'claro';
    }

    pintar() {
      const idioma = this.getAttribute('lang') || document.documentElement.lang || 'es';
      const ingles = /^en\b/i.test(idioma);

      const url = new URL(WEB);
      url.searchParams.set('utm_source', location.hostname || 'local');
      url.searchParams.set('utm_medium', 'referral');
      url.searchParams.set('utm_campaign', 'firma-web');

      this.enlace.href = url.href;
      this.enlace.rel = this.hasAttribute('nofollow') ? 'noopener nofollow' : 'noopener';
      // El espacio final no se ve (flex lo descarta) pero los lectores de pantalla lo necesitan.
      this.shadowRoot.querySelector('.texto').textContent =
        (this.getAttribute('texto') || (ingles ? 'Built by' : 'Desarrollado por')) + ' ';
      this.shadowRoot.querySelector('.aviso').textContent =
        ingles ? ' (opens in a new tab)' : ' (se abre en una pestaña nueva)';
      this.variante();
    }
  }

  customElements.define('nodbu-firma', NodbuFirma);
})();
