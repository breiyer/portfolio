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
      rootMargin: '-50% 0px -50% 0px',  // A cuántas unidades (se debe especificar si en PX, REM etc) 
      // de margin debe estar el objeto observado. Se trabaja como en css, si envias solo 
      // un parámetro asigna ese valor para las 4 direcciones (top, right, bottom, left), si 
      // envías 2 el primero será asignado para las direcciones de top y bottom, y el segundo 
      // será asignado para las direcciones de left y right, y si envias 4 se tomarán para las 
      // direcciones de top, right, bottom, y left respectivamente.
      threshold: 0  // Indica cuánto porcentaje del objeto HTML observado debe se va a considerar.
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
    SkillCard: SkillCard,
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
      // Secciones de la página.
      // El atributo intersectionRatio se usa para saber qué
      // secciones están siendo intersectadas, y qué porcentaje de
      // ellas se está viendo, y así decidir cuál activar en el navbar.
      navbarSections: {
        about:
          {
            id: 'about',
            num: '01',
            active: false,
            intersectionRatio: 0,
          },
        skills:
          {
            id: 'skills',
            num: '02',
            active: false,
            intersectionRatio: 0,
          },
        work:
          {
            id: 'work',
            num: '03',
            active: false,
            intersectionRatio: 0,
          },
      },

      // Para mostrar o no el navbar menu cuando está en responsive
      showResponsiveNavBarMenu: false,

      // Lista con las habilidades.
      // El atributo name se usa para:
      // 1) Buscar la imagen de la habilidad en
      //    la ruta: `img/skills/${skill.name.toLowerCase()}.png`
      // 2) El nombre de la tarjeta (que aparecerá debajo de
      //    la imagen) si el atributo label === true
      skillsArray: [
        {
          label: 'Frontend',
          list: [
            { name: 'Nuxt Js', label: true },
            { name: 'Vue Js', label: true },
            { name: 'React Js', label: true },
            { name: 'JavaScript', label: true },
            { name: 'Bootstrap', label: false },
            { name: 'CSS 3', label: false },
            { name: 'HTML 5', label: false },
            { name: 'Node Js', label: false },
            { name: 'Sass', label: false },
          ],
        },
        {
          label: 'Backend',
          list: [
            { name: 'Django', label: true },
            { name: 'TypeScript', label: true },
            { name: 'PHP', label: false },
            { name: 'GraphQL', label: true },
            { name: 'Flask', label: false },
            { name: 'Python', label: true },
            { name: 'Java', label: false },
            { name: 'MySQL', label: false },
            { name: 'Sql', label: false },
            { name: 'Sql Lite', label: false },
          ],
        },
        {
          label: 'Development',
          list: [
            { name: 'AWS', label: false },
            { name: 'Azure DevOps', label: true },
            { name: 'Docker', label: false },
            { name: 'Git', label: true },
            { name: 'GitHub', label: false },
            { name: 'SCRUM', label: true },
          ],
        },
      ],
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
     * - Esta función es el callback del objeto "IntersectionObserver",
     *   cada vez que una entrada del IntersectionObserver sufre un cambio
     *   en su isIntersecting, esta función es llamada.
     * - Recorre las entradas, y actualiza el atributo intersectionRatio de
     *   la sección del this.navbarSections que corresponda con el id de la
     *   entrada, y además llama a this.activateMenuOpt() para que mueva la barra.
     * 
     * @param {Dict} entries - Diccionario con los objetos HTML que el observador está monitorizando y tuvieron un cambio en su attr isIntersecting.
     * @param {Object} observador - Objeto "IntersectionObserver".
     */
    watchSiteSections(entries, observador) {
      for (const entry of entries) {
        const entryId = entry.target.getAttribute('id')
        const entryIntersectionRatio = entry.isIntersecting ? entry.intersectionRatio : 0
        this.navbarSections[entryId].intersectionRatio = entryIntersectionRatio
      }
      this.activateMenuOpt(this.sectionActive())
    },

    /**
     * 
     * - Mueve la barra del navbar a la posición del item activo,
     *   y lo ajusta a su width.
     * 
     * @param {String} sectionId Id de la sección donde se está.
     */
    async activateMenuOpt(sectionId) {
      // Delay de 100ms para que le de tiempo al DOM de
      // renderizar los elementos y así cuando se quiera
      // obtener sus propiedades en esta función, se obtengan
      // correctamente.
      // Aplica para cuando carga por primera vez la página, y
      // para cuando está en responsive que tarda renderizando
      // el item del navbar que corresponde a la sección activa.
      await new Promise(resolve => setTimeout(resolve, 100))

      const menuOptToActive = document.querySelector(`a[href="#${sectionId}"]`)
      const navBar = document.querySelector('.top_bar__navbar_line')
      const navBarLinePosX = menuOptToActive.offsetLeft
      const navBarLineWidth = menuOptToActive.offsetWidth

      navBar.style.left = `${navBarLinePosX}px`
      navBar.style.width = `${navBarLineWidth}px`
    },

    /**
     * 
     * - Recorre las secciones, y devuelve el id de la sección
     *   que tiene mayor intersectionRatio.
     * 
     * @returns Id de la sección que está activa
     */
    sectionActive() {
      const sectionActive = Object.keys(this.navbarSections).reduce((lastValue, currentValue) => {
        const lValue = this.navbarSections[lastValue].intersectionRatio
        const cValue = this.navbarSections[currentValue].intersectionRatio
        return lValue > cValue ? lastValue : currentValue
      })
      return this.navbarSections[sectionActive].id
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
