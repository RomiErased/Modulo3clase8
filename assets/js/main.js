const id = Symbol('id');
let persona = {}
persona[id] = 18
persona.nombre = "Diego"
persona.apellido = "Sandoval"
persona['edad'] = 29
//console.log(persona)

let llaves = Object.keys(persona) //devuelve la referencia
let valores = Object.values(persona) //devuelve los valores
let atributos = Object.entries(persona) //devuelve valores y referencias
let simbolos = Object.getOwnPropertySymbols(persona)

// console.log("Llaves", llaves); //devuelve la referencia
// console.log("Simbolos", simbolos); //en este ejemplo devuelve el 'id'
// console.log("Valores", valores);//devuelve los valores
// console.log("Atributos", atributos)//devuelve valores y referencias

//for in accede a los objetos y for of al valor
for (const key of atributos) {
    //console.log(key[0], "-", key[1])
}
    
//objeto con valores
let vehiculo = {
    patente: 'ABCD12',
    marca: 'Chevrolet',
    modelo: 'Camaro',
    anio: '2023'
}

//Objeto Proxy (intermediario)
let proxyVehiculo = new Proxy(vehiculo,
    {
        //get nos permite obtener el valor de cualquier propiedad
        get: function (target, property) {
            if(typeof target[property] == 'string') { //el if es para que no falle la funcion, ya que si queremos mostrar un objeto con año, si tenemos el uppercase va a causar conflicto
                return target[property].toUpperCase()
            } else {
                return target[property]
                }
        }
        //set nos permite modificar el valor de cualquier propiedad

    }
)

proxyVehiculo.anio = "Dos mil Veintitres"

//console.log("Proxy Vehiculo - Marca", proxyVehiculo.marca)
//console.log("Proxy Vehiculo - Año", proxyVehiculo.anio)


//Segunda parte, Proxy

let equipo1 = {
    marca: "IBM",
    modelo: "R400",
    ram: 8,
    disco: 240,
    tipo: 'HDD'
}

let equipo2 = { //objeto es todo lo que está en las llaves y propiedad es cada cosa
    marca: "Asus",
    modelo: "A15",
    ram: 32,
    disco: 500,
    tipo: 'SSD'
}

let proxyEquipo1 = new Proxy(equipo1, {
    get: function (objeto, propiedad) {
        if (propiedad == 'tipo') {
            return objeto[propiedad].toUpperCase()
        }
        return objeto[propiedad]
    },
    set: function (objeto, propiedad, nuevo_valor) {
        switch (propiedad) {
            case "ram":
                if (nuevo_valor != 8 && nuevo_valor != 16 && nuevo_valor != 32) {
                    throw "Los valores de la RAM deben ser 8, 16 o 32"
                }
                break;
        
            case "disco":
                if (nuevo_valor != 120 && nuevo_valor != 240 && nuevo_valor != 500) {
                    throw "Los valores de disco deben ser 120, 240 o 500"
                }
                break;
                
            case "tipo":
                if (nuevo_valor.toUpperCase() != "SSD" && nuevo_valor.toUpperCase() != "HDD") {
                    throw "El valor de tipo debe ser SSD o HDD"
                }

                break;
            
            default:
                break;
        }
        objeto[propiedad] = nuevo_valor
    }
})

try {
    proxyEquipo1.ram = 16
proxyEquipo1.disco = 240
proxyEquipo1.tipo = "hdd"
    console.log(proxyEquipo1.tipo);

    //Reflect es una clase de js. Sirve para obtener datos de una variable almacenada en un proxy
    //preguntamos por medio del reflect.has si tenemos en el proxy una propiedad en particular (en este caso preguntamos por disco y procesador. disco devuelve V y procesador F)
    console.log("Reflect has", Reflect.has(proxyEquipo1, "disco"));
    console.log("Reflect has", Reflect.has(proxyEquipo1, "procesador"));

    //nos muestra el resultado de la propiedad que le consultamos. Si no existe muestra undefined
    console.log("Reflect get", Reflect.get(proxyEquipo1, "disco"));
    console.log("Reflect get", Reflect.get(proxyEquipo1, "procesador"));

//ownkeys devuelve las propiedades del objeto (siempre que esté dentro de un proxy)
    console.log("Reflect ownkeys", Reflect.ownKeys(proxyEquipo1))
    
//borra la propiedad que definimos
    Reflect.deleteProperty(proxyEquipo1, "tipo")
    console.log("Reflect deleteproperty", proxyEquipo1)
} catch (error) {
    console.log(error)
}

