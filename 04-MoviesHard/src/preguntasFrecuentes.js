const funciones = require("../customFunctions");

let faqsTotal = funciones.leer("./data/faqs.json");
let faqs = faqsTotal.faqs;
let cantFaqs = faqsTotal.total_faqs;

let tituloFaq = "Preguntas frecuentes";
let listadoFaq = "";
faqs.forEach(elemento => listadoFaq += `${elemento.faq_title}\n${elemento.faq_answer}\n\n`)
module.exports = `${tituloFaq}\n\n\nTotal de Preguntas y Respuestas: ${cantFaqs}\n\n\n${listadoFaq}`;