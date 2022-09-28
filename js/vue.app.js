class SiteNavService {

  constructor(callBack) {

    /**
     * - El IntersectionObserver se encarga de monitorizar si dicho 
     *   objeto HTML al que observa se encuentra a cierta distancia de 
     *   la parte visible de la pantalla del dispositivo, o de otro objeto 
     *   HTML.
     * 
     * - El primer parámetro es la función a la que va a llamar cada vez que 
     *   uno de los elementos a los que observa cumple con las condiciones 
     *   establecidas o cuando ya no cumple con estas, es decir, cuando ha sido 
     *   intersectado y cuando ya no lo está.
     * - El segundo parámetro es un diccionario con las opciones que establecen 
     *   las condiciones para que un objeto sea considerado como intersectado.
     */
    this.navObserver = new IntersectionObserver(callBack, {
      root: null,  // Si se establece en null se toma como referencia la 
      // parte visible de la ventana del dispositivo al momento de medir la 
      // distancia del objeto HTML observado. En el caso de que se quiera medir 
      // desde la parte visible de otro objeto HTML se debe enviar el objeto como 
      // tal, por ejemplo: document.querySelector('#referenceObject')
      rootMargin: '0px',  // A cuántas unidades (se debe especificar si en PX, REM etc) 
      // de margin debe estar el objeto observado. Se trabaja como en css, si envias solo 
      // un parámetro asigna ese valor para las 4 direcciones (top, right, bottom, left), si 
      // envías 2 el primero será asignado para las direcciones de top y bottom, y el segundo 
      // será asignado para las direcciones de left y right, y si envias 4 se tomarán para las 
      // direcciones de top, right, bottom, y left respectivamente.
      threshold: .7  // Indica cuánto porcentaje del objeto HTML observado debe se va a considerar.
      // Si se coloca .1; se entiende que con cuando el 10% del objeto HTML observado esté a la distancia 
      // esperada, basta para considerar que está intersectado, y si se coloca 1; se entiende que la 
      // totalidad del objeto HTML observado debe estar a la distancia esperada para considerar que está 
      // intersectado.
    })
  }


  /**
   * - Función para agregar los eventos de IntersectionObserver (observadores) 
   * a todos los objetos HTML con el atributo "i_watcher".
   */
  startNavbarIntersectionObserver() {
    // Objetos HTML con el atributo "i_watcher"
    const elementsToAnimate = document.querySelectorAll('[i_watcher]')

    // Se recorren los objetos HTML
    elementsToAnimate.forEach(element => {
      // Se les agrega el observador
      this.navObserver.observe(element)
    })
  }
}

const { createApp } = Vue
const vueApp = createApp({
  components: {
    DropDown: DropDown,
    IconLink: IconLink,
    ToggleBtn: ToggleBtn,
  },
  data() {
    return {
      // Clase para lo relacionado con el menú de navegación del sitio
      siteNavService: null,

      // -- Language config
      // Idioma del sitio
      appLanguage: 'en',
      // Para desplegar/replegar la lista de idiomas
      showLangList: false,
      // Diccionario con los textos en sus diferentes idiomas
      // para traducir la página.
      translationDict: { empty: true },
      // Array para la lista plegable de idiomas
      langList: {
        es: { code: 'es', label: 'Español', icon: 'es_flag.svg', alt: 'Spain Flag' },
        en: { code: 'en', label: 'English', icon: 'en_flag.svg', alt: 'EEUU Flag' },
      },

      // -- Contact list
      contactLinks: [
        {
          hoverColor: 'white',
          href: 'https://github.com/breiyer',
          title: 'Visitar perfil',
          fwIcon: 'fa-brands fa-square-github',
        },
        {
          hoverColor: 'rgb(10, 99, 188)',
          href: 'https://www.linkedin.com/in/breiyer-corpas-amaya-97a1531b9/',
          title: 'Visitar perfil',
          fwIcon: 'fa-brands fa-linkedin',
        },
        {
          hoverColor: 'rgb(188, 10, 10)',
          href: 'mailto:breiyer@gmail.com',
          title: 'Enviar correo',
          fwIcon: 'fa-solid fa-square-envelope',
        },
      ],

      // -- Navbar menu
      // Secciones de la página
      navbarSections: {
        about: { id: 'about', num: '01', active: false },
        skills: { id: 'skills', num: '02', active: false },
        work: { id: 'work', num: '03', active: false },
      },

      // Para mostrar o no el navbar menu cuando está en responsive
      showResponsiveNavBarMenu: false,

      // -- Generación de id únicos
      idCount: 0,
    }
  },

  async created() {
    const api = await fetch('./js/translation_dict.json')
    this.translationDict = { ...await api.json(), empty: false }
  },

  async mounted() {
    this.siteNavService = new SiteNavService(this.watchSiteSections)
    this.siteNavService.startNavbarIntersectionObserver()
  },

  methods: {
    // Lang feat
    /**
     * - Cambia el idioma del sitio.
     * - Además, reconoce la sección en la que está
     *   llama a la sección que actualiza la posición
     *   y tamaño de la barra del navbar para que se
     *   ajuste debido a las nueva dimensiones por el
     *   cambio de idioma.
     * 
     * @param {String} lang - Lenguage a cambiar (formato de 2 letras: es, en, etc)
     */
    setLanguage(lang) {
      // Se traduce el idioma del sitio al especificado
      this.appLanguage = lang.code

      // Se toma el item del navbar menu que está activo, y se llama al método que
      // activa el item activo, ya que al traducir el texto de las opciones del menú,
      // estos cambian de longitud y se descuadra todo.
      const sectionActive = document.querySelector('.top_bar__navbar_item--active')
        .getAttribute('href')
        .slice(1)
      this.activateMenuOpt(sectionActive)

      // Se cambia el idioma del sitio
      document.documentElement.setAttribute('lang', this.appLanguage)
    },

    /**
     * 
     * - Esta función es para traducir la página según sea
     *   el idioma escogido.
     * 
     * @param {String} element Nombre del elemento del diccionario
     * @returns Devuelve el valor del elemento del diccionario según el idioma.
     */
    setTranslationPoint(element) {
      if (this.translationDict.empty) return ''
      return this.translationDict[element][this.appLanguage]
    },

    /**
     * - Hace toggle de las clases necesarias para
     *   desplegar/replegar la lista de idiomas disponibles.
     */
    toggleLanguageList() {
      this.showLangList = !this.showLangList
    },

    // IntersectionObserver and navbar site feat
    /**
     * 
     * - Esta función es el callback del objeto "IntersectionObserver", se 
     *   asegura de monitorizar cada cambio en el scroll y verifica cuando
     *   una de las entradas (objetos HTML monitorizados) está siendo intersectado
     *   según las reglas del observador.
     * - Cuando un objeto está siendo intersectado, 
     * 
     * @param {Dict} entradas - Diccionario con los objetos HTML que el observador está monitorizando (y sus estados, es decir, si están intersectados o no).
     * @param {Object} observador - Objeto "IntersectionObserver".
     */
    watchSiteSections(entradas, observador) {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) {
          const sectionId = entrada.target.getAttribute('id')
          this.activateMenuOpt(sectionId)
        }
      }
    },

    /**
     * 
     * - Activa las clases necesaria para que el item del navbar que
     *   corresponda a la sección en la que se está, se active.
     * - Además, mueve la barra del navbar a la posición del item activo,
     *   y lo ajusta a su width.
     * 
     * @param {String} sectionId Id de la sección donde se está.
     */
    async activateMenuOpt(sectionId) {
      // Se les quita la clase active a todos los item, para luego
      // agregarla al item activo.
      for (const section of Object.keys(this.navbarSections)) {
        this.navbarSections[section].active = false
      }
      this.navbarSections[sectionId].active = true

      // Se actualiza la posición y width de la línea para que se ajuste
      // al nuevo elemento activo del navbar. Se esperan 100ms para que en
      // responsive le de tiempo al DOM de renderizar el item activo del navbar
      // menu y así poder tomar sus dimensiones y posición.
      await new Promise(resolve => setTimeout(resolve, 100))

      const menuOptToActive = document.querySelector(`a[href="#${sectionId}"]`)
      const navBar = document.querySelector('.top_bar__navbar_line')
      const navBarLinePosX = menuOptToActive.offsetLeft
      const navBarLineWidth = menuOptToActive.offsetWidth

      navBar.style.left = `${navBarLinePosX}px`
      navBar.style.width = `${navBarLineWidth}px`
    },

    /**
     * - Activa/Desactiva las clases para mostrar el menú
     * 	 de navegación en responsive.
     */
    toggleResponsiveNavBar() {
      this.showResponsiveNavBarMenu = !this.showResponsiveNavBarMenu
    },

    /**
     * - Recursivamente llama a la función que hace toggle
     *   de las clases para activar/desactivar el navbar responsive,
     * 	 si éste está activo cuando presionan click en uno de los item
     * 	 del mismo.
     */
    watchNavBarItemClick() {
      if (this.showResponsiveNavBarMenu) this.toggleResponsiveNavBar()
    },
  }
}).mount('#app')
