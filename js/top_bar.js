/**
 * - Esta función le agrega la clase --active al item del navbar del
 *   portafolio que corresponda a la sección del portafolio en la que
 *   se encuentra el usuario.
 * - También mueve la barra del navbar a la posición del item activo,
 *   y lo ajusta a su width.
 * 
 * @param {String} sectionId Id de la sección del portafolio en la que se está.
 */
function updateNavBarLine(sectionId) {
	document.querySelectorAll('.top_bar__navbar_item').forEach(element => {
    // Se les quita la clase active a todos los item, para luego
		// agregarla al item activo.
    element.classList.remove('top_bar__navbar_item--active')
  })

  const menuOptToActive = document.querySelector(`a[href="#${sectionId}"]`)
  menuOptToActive.classList.add('top_bar__navbar_item--active')

  const navBar = document.querySelector('.top_bar__navbar_line')
  const navBarLinePosX = menuOptToActive.offsetLeft
  const navBarLineWidth = menuOptToActive.offsetWidth
  
  navBar.style.left = `${navBarLinePosX}px`
  navBar.style.width = `${navBarLineWidth}px`

	const contactInTopBar = document.querySelector('#top_bar__contact')
	if (sectionId !== 'about')
		contactInTopBar.classList.add('top_bar__contact--reveal')
	else contactInTopBar.classList.remove('top_bar__contact--reveal')
}


/**
 * 
 * - Esta función es el callback del objeto "IntersectionObserver" que 
 * monitoriza cuando un elemento HTML entra en la parte visible de la 
 * pantalla del dispositivo y le asigna una animación de entrada. 
 * 
 * @param {Dict} entradas - Diccionario con los objetos HTML que el observador está monitorizando (y sus estados, es decir, si están intersectados o no).
 * @param {Object} observador - Objeto "IntersectionObserver".
 */
 function activeMenuOpt(entradas, observador){
	entradas.forEach((entrada) => {
		if(entrada.isIntersecting){
			const sectionId = entrada.target.getAttribute('id')
      updateNavBarLine(sectionId)
		}
	});
}


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
const observador = new IntersectionObserver(activeMenuOpt, {
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


/**
 * - Función para agregar los eventos de IntersectionObserver (observadores) 
 * a todos los objetos HTML con el atributo "i_watcher".
 */
function startNavbarIntersectionObserver(){
	// Objetos HTML con la clase "animateOnScroll"
  const elementsToAnimate = document.querySelectorAll('[i_watcher]')

	// Se recorren los objetos HTML con la clase "animateOnScroll"
  elementsToAnimate.forEach(element => {
    // Se les agrega el observador
    observador.observe(element)
  })
}


document.querySelector('#fancy_btn').addEventListener('click', toggleResponsiveNavBar, false)
/**
 * - Activa/Desactiva las clases para mostrar el menú
 * 	 de navegación en responsive.
 */
function toggleResponsiveNavBar() {
  document.querySelector('#fancy_btn').classList
    .toggle('fancy_btn--active')
  document.querySelector('#top_bar__navbar').classList
    .toggle('top_bar__navbar--responsive')
}


document.querySelectorAll('.top_bar__navbar_item').forEach(element => {
	// Se les agrega el evento
	element.addEventListener('click', watchNavBarItemClick, false)
})
/**
 * - Recursivamente llama a la función que hace toggle
 *   de las clases para activar/desactivar el navbar responsive
 * 	 si está activo cuando presionan click en uno de los item
 * 	 del mismo.
 */
function watchNavBarItemClick() {
	const navBar = document.querySelector('#top_bar__navbar')
  console.log(navBar.classList.contains('top_bar__navbar--responsive'))
	if (navBar.classList.contains('top_bar__navbar--responsive')) toggleResponsiveNavBar()
}


document.querySelector('#top_bar__language').addEventListener('click', toggleLanguageList, false)
/**
 * - Despliega la lista de idiomas disponibles
 */
function toggleLanguageList() {
  document.querySelector('#top_bar__language_list').classList
    .toggle('top_bar__language_list--active')
  document.querySelector('#top_bar__language_arrow').classList
    .toggle('top_bar__language_icon--arrow_down')
}
