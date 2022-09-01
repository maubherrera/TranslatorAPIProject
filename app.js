// ENDPOINT
const GET_LANG_URL = "https://text-translator2.p.rapidapi.com/getLanguages";

//OBJETOS NECESARIOS PARA QUE LA API NOS DEVUELVA LA PETICION O LISTA DE LENGUAJES
const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0182915b0dmsh40094891f16da19p14ff0ajsn4ace66313d9e",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
  },
};

//DOM
let translateFrom = document.querySelector("#translate-from");
let translateTo = document.querySelector("#translate-to");
let translator = document.querySelector("#translator");
let inputTranslate = document.querySelector("#inputTranslateFrom");
let outputTranslate = document.querySelector("#outputTranslate");
let source_language = "es";
let target_language = "en";

//PROMESA
fetch(GET_LANG_URL, OPTIONS)
  //PRIMERA RESPUESTA
  .then((res) => res.json())
  //SEGUNDA RESPUESTA PARA LA 2DA PARTE DEL RESULTADO DONDE OBTENEMOS LA DATA
  .then((object) => {
    //BUSCAR LOS DATOS NECESARIOS DENTRO DEL ARREGLO
    let languages = object.data.languages;
    console.log();
    //INGRESAR A LOS OBJETOS PARA PODER OBTENER LOS LENGUAJES A COLOCAR EN LOS SELECTORES DEL HTML
    languages.forEach((element) => {
      translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`;
      translateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`;
      //   console.log(element);
    });

    // ESCUCHA DEL CLICK SOBRE EL LENGUAJE INICIAL A TRADUCIR
    translateFrom.addEventListener("click", () => {
      console.log(translateFrom.value);
      source_language = translateFrom.value;
    });
    // ESCUCHA DEL CLICK SOBRE EL LENGUAJE ELEGIDO DE SALIDA COMO RESPUESTA A LA TRADUCCION
    translateTo.addEventListener("click", () => {
      console.log(translateTo.value);
      target_language = translateTo.value;
    });
  })

  .catch((error) => console.log(error));

// SE RECOGEN LOS DATOS INGRESADOS AL TEXTAREA POR EL USUARIO A TRADUCIR PARA SER ENVIADOS AL SERVIDOR DE LA API
//FUNCIONALIDAD DEL BOTON
translator.addEventListener("click", () => {
  inputTranslate = document.querySelector("#inputTranslateFrom");
  let = textToTranslate = inputTranslate.value;
  //ENVIO DE PARAMETROS DE BUSQUEDA / LENGUAJE DE ENTRADA > LENGUAJE DE SALIDA
  const encodedParams = new URLSearchParams();
  encodedParams.append("source_language", source_language);
  encodedParams.append("target_language", target_language);
  encodedParams.append("text", textToTranslate);

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "0182915b0dmsh40094891f16da19p14ff0ajsn4ace66313d9e",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: encodedParams,
  };
  // RESPUESTA TRADUCIDA DE LA PALABRA INGRESADA
  fetch("https://text-translator2.p.rapidapi.com/translate", options)
    .then((response) => response.json())
    .then((response) => (outputTranslate.value = response.data.translatedText))
    .catch((err) => console.error(err));
});
