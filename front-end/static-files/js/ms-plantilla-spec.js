/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)

const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"
const TITULO_LISTADO_PERSONAS = "Listado de personas"
const TITULO_LISTADO_NOMBRES = "Listado de nombres"
const TITULO_MOSTRAR_PERSONA = "Mostrar una persona"
const TITULO_BUSCAR = "Mostrar busqueda"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

const personaParaPruebas = {
    ref: {
        "@ref":{
            id:"358544981055504985"
        }
    },
    ts: 1678193989710000,
    data: {
        nombre: 'jackie chan',
        fecha_nacimiento: [Object],
        titulos: [Array],
        victorias: 999,
        empates: 888,
        derrotas: 777,
        categoria: 'superpesado'
    }  
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.sustituyeTags: ", function () {
    it("sustituyo de una plantiya los tags",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Plantilla.personaComoFormulario: ", () => {
    let plantillaPrueba = {};
    let cuerpo = `
    <tr title="### ID ###">
        <td>### ID ###</td>
        <td>### NOMBRE ###</td>
        <td>### FECHA ###</td>
        <td>### TITULOS ###</td>
        <td>### VICTORIAS ###</td>
        <td>### EMPATES ###</td>
        <td>### DERROTAS ###</td>
        <td>### CATEGORIA ###</td>
        <td>
                    <div><a href="javascript:Plantilla.mostrar('### ID ###')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;
    it("devuelve una plantilla con los atributos cambiados cuando se le pasa una persona", () =>{
        plantillaPrueba = Plantilla.personaComoFormulario(personaParaPruebas);
        //console.log(plantillaPrueba)
        //se comprueba si el nombre esta en la plantilla
        expect(plantillaPrueba.includes(personaParaPruebas.ref['@ref'].id)).toBeTrue();
        expect(plantillaPrueba.includes(personaParaPruebas.data.nombre)).toBeTrue();
        expect(plantillaPrueba.includes(personaParaPruebas.data.categoria)).toBeTrue();
        expect(plantillaPrueba.includes(personaParaPruebas.data.victorias)).toBeTrue();
        expect(plantillaPrueba.includes(personaParaPruebas.data.titulos)).toBeTrue();

    })

    it("devuelve una plantilla por defecto si no se le pasa nada como argumento", ()=>{
        plantillaPrueba = Plantilla.personaComoFormulario();
        //console.log(plantillaPrueba)
        expect(plantillaPrueba.includes(Plantilla.plantillaTags.ID)).toBeTrue();
        expect(plantillaPrueba.includes(Plantilla.plantillaTags.NOMBRE)).toBeTrue();
        expect(plantillaPrueba.includes(Plantilla.plantillaTags.CATEGORIA)).toBeTrue();
        expect(plantillaPrueba.includes(Plantilla.plantillaTags.DERROTAS)).toBeTrue();
        expect(plantillaPrueba.includes(Plantilla.plantillaTags.EMPATES)).toBeTrue();
    })
})

describe("Plantilla.plantillaTablaPersonas.actualiza: ", () => {
    it("devuelve una plantilla actualizada si se le pasa una persona", () =>{
        plantillaPrueba = Plantilla.plantillaTablaPersonas.actualiza(personaParaPruebas);
        //Se comprueba si el id está en la plantilla actualizada
       
        expect(plantillaPrueba.includes(personaParaPruebas.ref['@ref'].id)).toBeTrue();
    })

    it("devuelve una plantilla por defecto si no se le pasa nada", () =>{
        plantillaPrueba = Plantilla.plantillaTablaPersonas.actualiza();
        //Se comprueba si el id está en la plantilla actualizada
       
        expect(plantillaPrueba.includes(Plantilla.plantillaTags.ID)).toBeTrue();
    })
})

describe("Plantilla.imprimeMuchasPersonas: ", () =>{
   
    let vector = [personaParaPruebas];
    it("Se cambia el titulo", ()=>{
        Plantilla.imprimeMuchasPersonas(vector)
        expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_PERSONAS)
    })

    it("Se cambia el contenido del cuerpo", ()=>{ 
        Plantilla.imprimeMuchasPersonas(vector)
        //console.log(elementoContenido.innerHTML)
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.nombre)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.categoria)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.derrotas)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.titulos)).toBeTrue()

    })
})

describe("Plantilla.agregarNombres: ", () =>{
    let cuerpo = '<td style="text-align: center">jackie chan</td>'
    let vector = [personaParaPruebas];
    it("Se cambia el titulo", ()=>{
        Plantilla.agregarNombres(vector)
        expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
    })

    it("Se cambia el contenido del cuerpo", ()=>{ 
        Plantilla.agregarNombres(vector)
        //console.log(elementoContenido.innerHTML)
        expect(elementoContenido.innerHTML.includes(cuerpo)).toBeTrue()
    })
})

describe("Plantilla.ordenarColumna: ", () =>{
    it("Si se pasa id el id se pone a verdadero y los demas en falso", ()=>{
        Plantilla.ordenarColumna('id')
        expect(Plantilla.ordenarColumnas.id).toBeTrue()
        for (const key in Plantilla.ordenarColumnas) {
            if(key!='id'){
                expect(Plantilla.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Plantilla.ordenarColumna('nombre')
        expect(Plantilla.ordenarColumnas.nombre).toBeTrue()
        for (const key in Plantilla.ordenarColumnas) {
            if(key!='nombre'){
                expect(Plantilla.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa fecha la fecha se pone a verdadero y los demas en falso", ()=>{
        Plantilla.ordenarColumna('fecha')
        expect(Plantilla.ordenarColumnas.fecha).toBeTrue()
        for (const key in Plantilla.ordenarColumnas) {
            if(key!='fecha'){
                expect(Plantilla.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Plantilla.ordenarColumna('titulos')
        expect(Plantilla.ordenarColumnas.titulos).toBeTrue()
        for (const key in Plantilla.ordenarColumnas) {
            if(key!='titulos'){
                expect(Plantilla.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Plantilla.ordenarColumna('victorias')
        expect(Plantilla.ordenarColumnas.victorias).toBeTrue()
        for (const key in Plantilla.ordenarColumnas) {
            if(key!='victorias'){
                expect(Plantilla.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Plantilla.ordenarColumna('empates')
        expect(Plantilla.ordenarColumnas.empates).toBeTrue()
        for (const key in Plantilla.ordenarColumnas) {
            if(key!='empates'){
                expect(Plantilla.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Plantilla.ordenarColumna('derrotas')
        expect(Plantilla.ordenarColumnas.derrotas).toBeTrue()
        for (const key in Plantilla.ordenarColumnas) {
            if(key!='derrotas'){
                expect(Plantilla.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })

    it("Si se pasa nombre el nombre se pone a verdadero y los demas en falso", ()=>{
        Plantilla.ordenarColumna('categoria')
        expect(Plantilla.ordenarColumnas.categoria).toBeTrue()
        for (const key in Plantilla.ordenarColumnas) {
            if(key!='categoria'){
                expect(Plantilla.ordenarColumnas[key]).toBe(false)
            }
        }
        
    })
})

describe("Plantilla.imprimeUnaPersona: ", () =>{
    it("Se cambia el titulo", ()=>{
        Plantilla.imprimeUnaPersona(personaParaPruebas)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_PERSONA)
    })

    it("Se cambia el contenido del cuerpo si se le pasa una persona", ()=>{
        Plantilla.imprimeUnaPersona(personaParaPruebas)
        //console.log(elementoContenido.innerHTML)
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.nombre)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.categoria)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.victorias)).toBeTrue()
    })

    it("si no se le pasa nada como argumento devuelve una plantilla por defecto", ()=>{
        Plantilla.imprimeUnaPersona()
        //console.log(elementoContenido.innerHTML)
        expect(elementoContenido.innerHTML.includes(Plantilla.plantillaTags.ID)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(Plantilla.plantillaTags.NOMBRE)).toBeTrue()
        expect(elementoContenido.innerHTML.includes(Plantilla.plantillaTags.CATEGORIA)).toBeTrue()
    })
})

describe("Plantilla.buscar: ", () =>{
    
    it("Se cambia el titulo y se crea un buscador", ()=>{
        Plantilla.buscar()
        expect(elementoTitulo.innerHTML).toBe(TITULO_BUSCAR)
        expect(elementoContenido.innerHTML.includes('input type="text"')).toBeTrue()
    })
})

describe("Plantilla.mostrarPersonaNombreBuscador: ", () =>{
    let vector = [personaParaPruebas];
    it("Si se busca 'jack' da como resultada una lista con solamente Jackie Chan ", ()=>{
        nombreBuscar = "jack"
        Plantilla.mostrarPersonaNombreBuscador(vector)
        expect(elementoTitulo.innerHTML).toBe(TITULO_BUSCAR)
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.nombre)).toBeTrue()
    })

    it("Si se busca la cadena vacia da como resultada una lista con todas las personas ", ()=>{
        nombreBuscar = ""
        Plantilla.mostrarPersonaNombreBuscador(vector)
        expect(elementoTitulo.innerHTML).toBe(TITULO_BUSCAR)
        expect(elementoContenido.innerHTML.includes(personaParaPruebas.data.nombre)).toBeTrue()
    })
})

describe("Plantilla.plantillaFormularioPersona.actualiza", () =>{
    it("Al pasarle una persona devuelve un formulario con los datos de la persona", ()=>{
        let resultado = Plantilla.plantillaFormularioPersona.actualiza(personaParaPruebas)
        expect(resultado.includes(personaParaPruebas.data.nombre)).toBeTrue()
    })
    it("Al pasarle nada devuelve un formulario por defecto", ()=>{
        let resultado = Plantilla.plantillaFormularioPersona.actualiza()
        expect(resultado.includes(Plantilla.plantillaTags.ID)).toBeTrue()
    })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
