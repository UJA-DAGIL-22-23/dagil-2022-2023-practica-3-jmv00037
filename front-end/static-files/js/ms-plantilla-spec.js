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

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

const personaParaPruebas = {
    ref: {
        "@ref":{
            id:"23123213"
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
        plantillaPrueba = Plantilla.sustituyeTags(cuerpo,personaParaPruebas);
        //console.log(plantillaPrueba)
        //se comprueba si el nombre esta en la plantilla
        expect(plantillaPrueba.includes(personaParaPruebas.data.nombre)).toBeTrue();
    })
})

describe("Plantilla.plantillaTablaPersonas.actualiza: ", () => {
    it("devuelve una plantilla actualizada", () =>{
        plantillaPrueba = Plantilla.plantillaTablaPersonas.actualiza(personaParaPruebas);
        //Se comprueba si el id está en la plantilla actualizada
        expect(plantillaPrueba.includes(personaParaPruebas.ref['@ref'].id)).toBeTrue();
    })
})

describe("Plantilla.imprimeMuchasPersonas: ", () =>{
    let vector = [personaParaPruebas];
    it("Se cambia el titulo", ()=>{
        Plantilla.imprimeMuchasPersonas(vector)
        expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_PERSONAS)
    })
})

describe("Plantilla.agregarNombres: ", () =>{
    let vector = [personaParaPruebas];
    it("Se cambia el titulo", ()=>{
        Plantilla.agregarNombres(vector)
        expect(elementoTitulo.innerHTML).toBe(TITULO_LISTADO_NOMBRES)
    })
})

//NO HAGO MAS COMPROBACIONES PORQUE SE LLAMA A UNA FUNCION ASINCRONA Y NO SIEMPRE DA EL MISMO HTML
describe("ordenarNombresPersonas: ", () =>{
    Plantilla.ordenarNombresPersonas()
    it("Se cambia el boleano", ()=>{
        expect(Plantilla.ordenarColumnas.nombre).toBeTrue()
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
