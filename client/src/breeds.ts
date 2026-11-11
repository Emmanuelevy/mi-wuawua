// Catálogo local de razas de Mi Wuawua: las 31 tarjetas originales del
// prototipo (30 razas + Red Nose Pitbull) más el catálogo ampliado de
// breeds-extra.ts (334 razas del mundo), para un total de 365 razas.
// Datos de estatura, peso, vida y origen: Dog API (dogapi.dog), compilados al construir la app.
// Fotos: Wikimedia Commons vía Dog API, descargadas y guardadas dentro de la app.

import { EXTRA_BREEDS } from "./breeds-extra";

import img_chihuahua from "./assets/breeds/chihuahua.webp";
import img_pomerania from "./assets/breeds/pomerania.webp";
import img_yorkshire_terrier from "./assets/breeds/yorkshire-terrier.webp";
import img_maltes from "./assets/breeds/maltes.webp";
import img_shih_tzu from "./assets/breeds/shih-tzu.webp";
import img_dachshund from "./assets/breeds/dachshund.webp";
import img_bichon_frise from "./assets/breeds/bichon-frise.webp";
import img_pug from "./assets/breeds/pug.webp";
import img_bulldog_frances from "./assets/breeds/bulldog-frances.webp";
import img_cavalier from "./assets/breeds/cavalier.webp";
import img_beagle from "./assets/breeds/beagle.webp";
import img_cocker_spaniel from "./assets/breeds/cocker-spaniel.webp";
import img_bulldog_ingles from "./assets/breeds/bulldog-ingles.webp";
import img_basset_hound from "./assets/breeds/basset-hound.webp";
import img_chow_chow from "./assets/breeds/chow-chow.webp";
import img_border_collie from "./assets/breeds/border-collie.webp";
import img_pastor_australiano from "./assets/breeds/pastor-australiano.webp";
import img_husky_siberiano from "./assets/breeds/husky-siberiano.webp";
import img_american_staffordshire from "./assets/breeds/american-staffordshire.webp";
import img_dalmata from "./assets/breeds/dalmata.webp";
import img_pastor_aleman from "./assets/breeds/pastor-aleman.webp";
import img_labrador from "./assets/breeds/labrador.webp";
import img_golden_retriever from "./assets/breeds/golden-retriever.webp";
import img_rottweiler from "./assets/breeds/rottweiler.webp";
import img_doberman from "./assets/breeds/doberman.webp";
import img_boxer from "./assets/breeds/boxer.webp";
import img_gran_danes from "./assets/breeds/gran-danes.webp";
import img_malamute from "./assets/breeds/malamute.webp";
import img_boyero_de_berna from "./assets/breeds/boyero-de-berna.webp";
import img_caniche_grande from "./assets/breeds/caniche-grande.webp";
import img_rednose from "./assets/breeds/red-nose-pitbull.webp";
import img_mestizo from "./assets/mestizo.webp";

export type Tamano = "pequeno" | "mediano" | "grande";
export type Orejas = "puntiagudas" | "caidas" | "dobladas";
export type Pelaje = "corto" | "largo" | "rizado" | "doble";
export type Cola = "larga" | "corta" | "enroscada";
export type Hocico = "corto" | "mediano" | "largo";

export interface Breed {
  slug: string; nombre: string; tamano: Tamano; origen: string;
  estaturaMin: number; estaturaMax: number; pesoMin: number; pesoMax: number;
  vidaMin: number; vidaMax: number;
  orejas: Orejas; pelaje: Pelaje; cola: Cola; hocico: Hocico;
  colores: string[]; numColores: number; coloresTexto: string;
  cuidados: string; foto: string; nota?: string;
  credito?: string;
  alias?: string[];
}

const BASE_BREEDS: Breed[] = [
  {
    slug: "chihuahua", nombre: "Chihuahua", tamano: "pequeno", origen: "México",
    estaturaMin: 15, estaturaMax: 23, pesoMin: 1, pesoMax: 3, vidaMin: 14, vidaMax: 16,
    orejas: "puntiagudas", pelaje: "corto", cola: "larga", hocico: "corto",
    colores: ["cafe", "crema", "negro", "blanco"], numColores: 2, coloresTexto: "Casi cualquier color: café, crema, negro, blanco o combinaciones.",
    cuidados: "Es muy leal y se apega mucho a su persona favorita. Necesita paseos cortos diarios, juegos suaves y abrigarse en clima frío porque es muy pequeño.",
    foto: img_chihuahua,
    credito: "Foto: Caterinarufo (Public domain), vía Wikimedia Commons",
  },
  {
    slug: "pomerania", nombre: "Pomerania", tamano: "pequeno", origen: "Alemania",
    alias: ["spitz", "spitz aleman", "pom"],
    estaturaMin: 18, estaturaMax: 24, pesoMin: 1, pesoMax: 3, vidaMin: 12, vidaMax: 16,
    orejas: "puntiagudas", pelaje: "doble", cola: "enroscada", hocico: "corto",
    colores: ["rojo", "crema", "negro", "blanco"], numColores: 1, coloresTexto: "Naranja, rojo, crema, blanco, negro o sable; su pelo es muy esponjoso.",
    cuidados: "Su pelaje doble y esponjoso necesita cepillado varias veces por semana. Es vivaz y curioso: le encantan los juegos cortos y estar siempre cerca de su familia.",
    foto: img_pomerania,
    credito: "Foto: Blackoranges (Public domain), vía Wikimedia Commons",
  },
  {
    slug: "yorkshire-terrier", nombre: "Yorkshire Terrier", tamano: "pequeno", origen: "Inglaterra",
    alias: ["terrier", "terriers", "yorkie"],
    estaturaMin: 18, estaturaMax: 23, pesoMin: 2, pesoMax: 3, vidaMin: 12, vidaMax: 15,
    orejas: "puntiagudas", pelaje: "largo", cola: "corta", hocico: "corto",
    colores: ["negro", "cafe"], numColores: 2, coloresTexto: "Azul acero con dorado (de cachorro nace negro con café).",
    cuidados: "Su pelo largo y sedoso se cepilla a diario para que no se enrede. Es valiente y juguetón; disfruta paseos diarios y aprender trucos.",
    foto: img_yorkshire_terrier,
    credito: "Foto: Portraitlady4306 (Public domain), vía Wikimedia Commons",
  },
  {
    slug: "maltes", nombre: "Maltés", tamano: "pequeno", origen: "Italia",
    alias: ["bichon", "bichones", "bichon maltes"],
    estaturaMin: 18, estaturaMax: 25, pesoMin: 2, pesoMax: 3, vidaMin: 12, vidaMax: 14,
    orejas: "caidas", pelaje: "largo", cola: "enroscada", hocico: "mediano",
    colores: ["blanco"], numColores: 1, coloresTexto: "Blanco, a veces con tonos marfil.",
    cuidados: "Su pelo blanco y largo necesita cepillado diario y limpieza suave de los ojitos. Es dulce y faldero: su lugar favorito es junto a su familia.",
    foto: img_maltes,
    credito: "Foto: SheltieBoy (CC BY 2.0), vía Wikimedia Commons",
  },
  {
    slug: "shih-tzu", nombre: "Shih Tzu", tamano: "pequeno", origen: "China",
    estaturaMin: 20, estaturaMax: 28, pesoMin: 4, pesoMax: 7, vidaMin: 14, vidaMax: 16,
    orejas: "caidas", pelaje: "largo", cola: "enroscada", hocico: "corto",
    colores: ["blanco", "dorado", "negro", "cafe"], numColores: 3, coloresTexto: "Muchas combinaciones: blanco con dorado, negro, café o atigrado.",
    cuidados: "Su pelaje largo se cepilla a diario o se lleva corto para facilitar el cuidado. Es cariñoso y tranquilo; con paseos cortos y mucha compañía es feliz.",
    foto: img_shih_tzu,
    credito: "Foto: Wawri (Tomasz Wawak) (CC BY-SA 2.5), vía Wikimedia Commons",
  },
  {
    slug: "dachshund", nombre: "Dachshund (Salchicha)", tamano: "pequeno", origen: "Alemania",
    alias: ["teckel", "sabueso", "sabuesos", "perro salchicha"],
    estaturaMin: 20, estaturaMax: 23, pesoMin: 7, pesoMax: 15, vidaMin: 12, vidaMax: 15,
    orejas: "caidas", pelaje: "corto", cola: "larga", hocico: "largo",
    colores: ["rojo", "negro", "cafe", "crema"], numColores: 2, coloresTexto: "Rojo, negro con café, chocolate, crema o moteado (arlequín).",
    cuidados: "Por su espalda larga hay que cuidar su peso y evitar que salte desde muebles altos; las rampas ayudan. Es valiente, listo y muy apegado a su familia.",
    foto: img_dachshund,
    credito: "Foto: Katemil94 (CC BY-SA 4.0), vía Wikimedia Commons",
  },
  {
    slug: "bichon-frise", nombre: "Bichón Frisé", tamano: "pequeno", origen: "Francia",
    alias: ["bichon", "bichones"],
    estaturaMin: 23, estaturaMax: 30, pesoMin: 5, pesoMax: 8, vidaMin: 14, vidaMax: 16,
    orejas: "caidas", pelaje: "rizado", cola: "enroscada", hocico: "mediano",
    colores: ["blanco"], numColores: 1, coloresTexto: "Blanco, a veces con tonos crema o albaricoque.",
    cuidados: "Su pelo rizado y blanco necesita cepillado seguido y cortes regulares. Es alegre y sociable: necesita compañía y juegos todos los días.",
    foto: img_bichon_frise,
    credito: "Foto: Heike Andres (CC BY-SA 3.0 de), vía Wikimedia Commons",
  },
  {
    slug: "pug", nombre: "Pug (Carlino)", tamano: "pequeno", origen: "China",
    estaturaMin: 25, estaturaMax: 36, pesoMin: 6, pesoMax: 8, vidaMin: 12, vidaMax: 15,
    orejas: "dobladas", pelaje: "corto", cola: "enroscada", hocico: "corto",
    colores: ["dorado", "negro", "gris"], numColores: 1, coloresTexto: "Leonado (dorado) con máscara negra, negro o plateado.",
    cuidados: "Al ser de boquita chata respira mejor en lugares frescos: evita el calor y el ejercicio fuerte. Es payaso y cariñoso; adora estar pegado a su familia.",
    foto: img_pug,
    credito: "Foto: OxfordCommaNerd (CC BY-SA 4.0), vía Wikimedia Commons",
  },
  {
    slug: "bulldog-frances", nombre: "Bulldog Francés", tamano: "pequeno", origen: "Francia",
    alias: ["bulldog", "bulldogs", "frenchie"],
    estaturaMin: 24, estaturaMax: 35, pesoMin: 8, pesoMax: 14, vidaMin: 10, vidaMax: 12,
    orejas: "puntiagudas", pelaje: "corto", cola: "corta", hocico: "corto",
    colores: ["atigrado", "dorado", "blanco", "crema"], numColores: 2, coloresTexto: "Atigrado, leonado, blanco, crema o combinaciones.",
    cuidados: "También es de boquita chata: cuídalo del calor y de los esfuerzos grandes. Es juguetón y muy de casa; con paseos tranquilos y mucha compañía está feliz.",
    foto: img_bulldog_frances,
    credito: "Foto: Chraibi7886678 (CC BY-SA 4.0), vía Wikimedia Commons",
  },
  {
    slug: "cavalier", nombre: "Cavalier King Charles Spaniel", tamano: "pequeno", origen: "Reino Unido",
    alias: ["spaniel", "spaniels", "king charles"],
    estaturaMin: 30, estaturaMax: 33, pesoMin: 5, pesoMax: 8, vidaMin: 12, vidaMax: 15,
    orejas: "caidas", pelaje: "largo", cola: "larga", hocico: "mediano",
    colores: ["blanco", "cafe", "negro"], numColores: 3, coloresTexto: "Blenheim (blanco y castaño), tricolor, negro con café o rubí.",
    cuidados: "Su pelo sedoso se cepilla varias veces por semana. Es dulce y gentil como pocos: necesita estar cerca de su familia y paseos tranquilos a diario.",
    foto: img_cavalier,
    credito: "Foto: Greg Hume (CC BY-SA 3.0), vía Wikimedia Commons",
  },
  {
    slug: "beagle", nombre: "Beagle", tamano: "mediano", origen: "Inglaterra",
    alias: ["sabueso", "sabuesos"],
    estaturaMin: 33, estaturaMax: 38, pesoMin: 9, pesoMax: 14, vidaMin: 12, vidaMax: 15,
    orejas: "caidas", pelaje: "corto", cola: "larga", hocico: "mediano",
    colores: ["blanco", "negro", "cafe"], numColores: 3, coloresTexto: "Tricolor (blanco, negro y café) o bicolor como blanco con limón.",
    cuidados: "Su nariz manda: necesita paseos con tiempo para oler todo y juegos que usen su olfato. Es alegre y amigable; cuida su comida porque tiende a engordar.",
    foto: img_beagle,
    credito: "Foto: Claude Valroff, Original uploader was Julien Valroff at fr.wikipedia (CC BY-SA 2.0 fr), vía Wikimedia Commons",
  },
  {
    slug: "cocker-spaniel", nombre: "Cocker Spaniel", tamano: "mediano", origen: "Estados Unidos",
    alias: ["spaniel", "spaniels", "cocker"],
    estaturaMin: 34, estaturaMax: 39, pesoMin: 9, pesoMax: 15, vidaMin: 12, vidaMax: 15,
    orejas: "caidas", pelaje: "largo", cola: "corta", hocico: "mediano",
    colores: ["negro", "dorado", "cafe"], numColores: 1, coloresTexto: "Negro, dorado, café o combinaciones con blanco.",
    cuidados: "Su pelo largo y sus orejas largas necesitan cepillado seguido y oídos limpios y secos. Es dulce y juguetón; adora el agua y los paseos en familia.",
    foto: img_cocker_spaniel,
    credito: "Foto: Gergely Vass (CC BY-SA 3.0), vía Wikimedia Commons",
  },
  {
    slug: "bulldog-ingles", nombre: "Bulldog Inglés", tamano: "mediano", origen: "Inglaterra",
    alias: ["bulldog", "bulldogs", "mastin", "mastines", "moloso"],
    estaturaMin: 36, estaturaMax: 38, pesoMin: 18, pesoMax: 23, vidaMin: 8, vidaMax: 10,
    orejas: "dobladas", pelaje: "corto", cola: "corta", hocico: "corto",
    colores: ["blanco", "atigrado", "rojo", "dorado"], numColores: 2, coloresTexto: "Blanco, atigrado, rojo, leonado o combinaciones.",
    cuidados: "Es de boquita chata: cuídalo mucho del calor y dale paseos cortos y tranquilos. Hay que limpiarle las arruguitas de la cara. Es bonachón y muy hogareño.",
    foto: img_bulldog_ingles,
    credito: "Foto: https://pixabay.com/pt/users/kaz-19203/ (CC0), vía Wikimedia Commons",
  },
  {
    slug: "basset-hound", nombre: "Basset Hound", tamano: "mediano", origen: "Francia",
    alias: ["sabueso", "sabuesos", "hound"],
    estaturaMin: 28, estaturaMax: 38, pesoMin: 20, pesoMax: 29, vidaMin: 12, vidaMax: 14,
    orejas: "caidas", pelaje: "corto", cola: "larga", hocico: "largo",
    colores: ["blanco", "cafe", "negro"], numColores: 3, coloresTexto: "Tricolor o bicolor (blanco con café o limón), como buen sabueso.",
    cuidados: "Sus orejas larguísimas se ensucian fácil: revísalas y límpialas seguido. Es tranquilo y terco con cariño; necesita paseos diarios a su ritmo, siguiendo olores.",
    foto: img_basset_hound,
    credito: "Foto: Alexbassethound (CC BY-SA 4.0), vía Wikimedia Commons",
  },
  {
    slug: "chow-chow", nombre: "Chow Chow", tamano: "mediano", origen: "China",
    alias: ["spitz"],
    estaturaMin: 43, estaturaMax: 51, pesoMin: 20, pesoMax: 32, vidaMin: 12, vidaMax: 15,
    orejas: "puntiagudas", pelaje: "doble", cola: "enroscada", hocico: "mediano",
    colores: ["rojo", "negro", "crema", "cafe"], numColores: 1, coloresTexto: "Rojo, negro, crema, canela o azul; su lengua es azulada, única.",
    cuidados: "Su melena de león necesita cepillado seguido y cuidado con el calor. Es digno e independiente: con paciencia y respeto se gana su lealtad enorme.",
    foto: img_chow_chow,
    credito: "Foto: Luigi Borromeo (CC BY 2.0), vía Wikimedia Commons",
  },
  {
    slug: "border-collie", nombre: "Border Collie", tamano: "mediano", origen: "Reino Unido",
    alias: ["pastor", "pastores", "collie", "collies"],
    estaturaMin: 46, estaturaMax: 56, pesoMin: 12, pesoMax: 25, vidaMin: 12, vidaMax: 16,
    orejas: "dobladas", pelaje: "doble", cola: "larga", hocico: "mediano",
    colores: ["negro", "blanco", "rojo"], numColores: 2, coloresTexto: "Blanco y negro es el clásico; también merle, rojo o tricolor.",
    cuidados: "Es de los Wuawuas más inteligentes: necesita trabajo, retos y mucho ejercicio diario o se aburre. Con juegos de pensar y correr es el más feliz.",
    foto: img_border_collie,
    credito: "Foto: IketaniDaisei (CC BY-SA 4.0), vía Wikimedia Commons",
  },
  {
    slug: "pastor-australiano", nombre: "Pastor Australiano", tamano: "mediano", origen: "Estados Unidos",
    alias: ["pastor", "pastores", "aussie"],
    estaturaMin: 46, estaturaMax: 58, pesoMin: 17, pesoMax: 30, vidaMin: 12, vidaMax: 15,
    orejas: "dobladas", pelaje: "doble", cola: "corta", hocico: "mediano",
    colores: ["negro", "rojo", "blanco", "cafe"], numColores: 3, coloresTexto: "Negro, rojo o mirlo (moteado), con o sin marcas blancas y cobrizas.",
    cuidados: "Es un pastor nato: necesita ejercicio fuerte y tareas que lo hagan pensar. Su pelo se cepilla cada semana. Le encanta estar en todo con su familia.",
    foto: img_pastor_australiano,
    credito: "Foto: Ben Gwilliam from Fort Lauderdale, Florida, USA. Telephone: 954-309-1444. Email: BENGWILLIAM at GMAIL.COM (CC BY 2.0), vía Wikimedia Commons",
  },
  {
    slug: "husky-siberiano", nombre: "Husky Siberiano", tamano: "mediano", origen: "Rusia (Siberia)",
    alias: ["spitz", "husky"],
    estaturaMin: 51, estaturaMax: 60, pesoMin: 16, pesoMax: 27, vidaMin: 12, vidaMax: 14,
    orejas: "puntiagudas", pelaje: "doble", cola: "larga", hocico: "mediano",
    colores: ["gris", "blanco", "negro", "rojo"], numColores: 2, coloresTexto: "Gris, negro, rojo o blanco, casi siempre combinado con blanco.",
    cuidados: "Nació para correr: necesita mucho ejercicio diario y un patio seguro porque es escapista. Su pelo doble se cepilla seguido, sobre todo cuando muda. Es alegre y platicador.",
    foto: img_husky_siberiano,
    credito: "Foto: localpups (CC BY 2.0), vía Wikimedia Commons",
  },
  {
    slug: "american-staffordshire", nombre: "American Staffordshire Terrier", tamano: "mediano", origen: "Estados Unidos",
    alias: ["pitbull", "pitbulls", "pit bull", "amstaff", "american pit bull terrier", "pitbull terrier", "terrier", "terriers"],
    estaturaMin: 43, estaturaMax: 48, pesoMin: 18, pesoMax: 40, vidaMin: 12, vidaMax: 16,
    orejas: "dobladas", pelaje: "corto", cola: "larga", hocico: "mediano",
    colores: ["negro", "blanco", "atigrado", "cafe", "rojo"], numColores: 2, coloresTexto: "Cualquier color: negro, azul, atigrado, café, rojo, con blanco o sin él.",
    cuidados: "Es fuerte y musculoso: necesita ejercicio diario y juegos. Bien criado es dulce, leal y muy niñero. Su pelo corto casi no pide cuidados.",
    foto: img_american_staffordshire,
    credito: "Foto: State Farm (CC BY 2.0), vía Wikimedia Commons",
  },
  {
    slug: "dalmata", nombre: "Dálmata", tamano: "mediano", origen: "Croacia",
    estaturaMin: 54, estaturaMax: 62, pesoMin: 25, pesoMax: 32, vidaMin: 11, vidaMax: 13,
    orejas: "caidas", pelaje: "corto", cola: "larga", hocico: "mediano",
    colores: ["blanco", "negro"], numColores: 2, coloresTexto: "Blanco con manchas negras (o café hígado): ningún dálmata tiene las manchas iguales.",
    cuidados: "Es muy activo: necesita correr y jugar a diario. Su pelo corto suelta pelo todo el año, así que cepíllalo seguido. Es elegante y muy fiel.",
    foto: img_dalmata,
    credito: "Foto: Dalmatiner24.eu (Public domain), vía Wikimedia Commons",
  },
  {
    slug: "pastor-aleman", nombre: "Pastor Alemán", tamano: "grande", origen: "Alemania",
    alias: ["pastor", "pastores", "ovejero aleman", "ovejero"],
    estaturaMin: 55, estaturaMax: 65, pesoMin: 22, pesoMax: 40, vidaMin: 7, vidaMax: 10,
    orejas: "puntiagudas", pelaje: "doble", cola: "larga", hocico: "largo",
    colores: ["negro", "cafe", "gris"], numColores: 2, coloresTexto: "Negro con café es el clásico; también sable, negro total o bicolor.",
    cuidados: "Es leal e inteligentísimo: necesita ejercicio, entrenamiento y un trabajo que hacer. Su pelo doble se cepilla varias veces por semana. Protege y ama a su familia como nadie.",
    foto: img_pastor_aleman,
    credito: "Foto: Jakub Hałun (CC BY-SA 4.0), vía Wikimedia Commons",
  },
  {
    slug: "labrador", nombre: "Labrador Retriever", tamano: "grande", origen: "Reino Unido",
    alias: ["retriever", "retrievers", "cobrador", "cobradores", "lab"],
    estaturaMin: 55, estaturaMax: 62, pesoMin: 25, pesoMax: 36, vidaMin: 12, vidaMax: 14,
    orejas: "caidas", pelaje: "corto", cola: "larga", hocico: "mediano",
    colores: ["negro", "dorado", "cafe"], numColores: 1, coloresTexto: "Un solo color: negro, amarillo o chocolate.",
    cuidados: "Es el amigo de todos: necesita ejercicio diario y le fascina nadar. Cuida su comida porque engorda fácil. Su pelo corto repele el agua y se cepilla cada semana.",
    foto: img_labrador,
    credito: "Foto: IDS.photos from Tiverton, UK (CC BY-SA 2.0), vía Wikimedia Commons",
  },
  {
    slug: "golden-retriever", nombre: "Golden Retriever", tamano: "grande", origen: "Reino Unido",
    alias: ["retriever", "retrievers", "cobrador", "cobradores", "golden"],
    estaturaMin: 55, estaturaMax: 61, pesoMin: 25, pesoMax: 34, vidaMin: 10, vidaMax: 12,
    orejas: "caidas", pelaje: "largo", cola: "larga", hocico: "mediano",
    colores: ["dorado"], numColores: 1, coloresTexto: "Dorado, desde crema claro hasta dorado intenso.",
    cuidados: "Es dulce y paciente: el compañero ideal de la familia. Su pelo dorado se cepilla varias veces por semana y necesita paseos y juegos diarios.",
    foto: img_golden_retriever,
    credito: "Foto: Dukedestiny01.jpg: \"Janneke Vreugdenhil\" derivative work: Anka Friedrich ([[User talk:Ankaaswe Trix Friedrich|talk]]) (Public domain), vía Wikimedia Commons",
  },
  {
    slug: "rottweiler", nombre: "Rottweiler", tamano: "grande", origen: "Alemania",
    alias: ["mastin", "mastines", "moloso"],
    estaturaMin: 56, estaturaMax: 69, pesoMin: 36, pesoMax: 60, vidaMin: 8, vidaMax: 10,
    orejas: "caidas", pelaje: "corto", cola: "corta", hocico: "mediano",
    colores: ["negro", "cafe"], numColores: 2, coloresTexto: "Negro con marcas café rojizas bien definidas.",
    cuidados: "Es fuerte y seguro: necesita ejercicio diario y una educación firme pero con cariño. Bien socializado es un guardián noble y un osito con su familia.",
    foto: img_rottweiler,
    credito: "Foto: Phil Sangwell from United Kingdom (CC BY 2.0), vía Wikimedia Commons",
  },
  {
    slug: "doberman", nombre: "Dóberman", tamano: "grande", origen: "Alemania",
    alias: ["pinscher"],
    estaturaMin: 61, estaturaMax: 71, pesoMin: 25, pesoMax: 45, vidaMin: 10, vidaMax: 13,
    orejas: "caidas", pelaje: "corto", cola: "corta", hocico: "largo",
    colores: ["negro", "cafe", "rojo"], numColores: 2, coloresTexto: "Negro, rojo, azul o leonado, con marcas óxido.",
    cuidados: "Es elegante, veloz y muy listo: necesita correr a diario y retos mentales. Es sensible y se apega muchísimo a su familia; su pelo corto casi no pide cuidado.",
    foto: img_doberman,
    credito: "Foto: David Iannotti (CC BY-SA 3.0), vía Wikimedia Commons",
  },
  {
    slug: "boxer", nombre: "Bóxer", tamano: "grande", origen: "Alemania",
    alias: ["mastin", "mastines", "moloso"],
    estaturaMin: 55, estaturaMax: 64, pesoMin: 20, pesoMax: 32, vidaMin: 10, vidaMax: 12,
    orejas: "caidas", pelaje: "corto", cola: "corta", hocico: "corto",
    colores: ["dorado", "atigrado", "blanco"], numColores: 1, coloresTexto: "Leonado o atigrado, con o sin marcas blancas.",
    cuidados: "Es un payaso eterno: tiene energía de cachorro casi toda su vida y necesita jugar a diario. Por su boquita chata hay que cuidarlo del calor fuerte.",
    foto: img_boxer,
    credito: "Foto: Mood210 (CC BY-SA 3.0), vía Wikimedia Commons",
  },
  {
    slug: "gran-danes", nombre: "Gran Danés", tamano: "grande", origen: "Alemania",
    alias: ["dogo aleman", "dogo", "mastin", "mastines", "moloso"],
    estaturaMin: 71, estaturaMax: 86, pesoMin: 50, pesoMax: 79, vidaMin: 8, vidaMax: 10,
    orejas: "caidas", pelaje: "corto", cola: "larga", hocico: "largo",
    colores: ["dorado", "negro", "atigrado", "gris", "blanco"], numColores: 1, coloresTexto: "Leonado, atigrado, azul, negro, arlequín (blanco con manchas) o manto.",
    cuidados: "Es un gigante noble y tranquilo: a pesar de su tamaño vive bien en casa si pasea a diario. Come en porciones cuidadas y necesita una cama grande y suave.",
    foto: img_gran_danes,
    credito: "Foto: Melissa (CC BY 2.0), vía Wikimedia Commons",
  },
  {
    slug: "malamute", nombre: "Malamute de Alaska", tamano: "grande", origen: "Estados Unidos",
    alias: ["spitz"],
    estaturaMin: 56, estaturaMax: 66, pesoMin: 32, pesoMax: 39, vidaMin: 10, vidaMax: 14,
    orejas: "puntiagudas", pelaje: "doble", cola: "enroscada", hocico: "mediano",
    colores: ["gris", "blanco", "negro", "rojo"], numColores: 2, coloresTexto: "Gris, negro, sable o rojo, siempre combinado con blanco.",
    cuidados: "Es un Wuawua de trineo: fuerte y con muchísima energía, necesita ejercicio serio a diario. Su pelo grueso se cepilla seguido. Es amigable y muy platicador.",
    foto: img_malamute,
    credito: "Foto: SCMW (CC BY 3.0), vía Wikimedia Commons",
  },
  {
    slug: "boyero-de-berna", nombre: "Boyero de Berna", tamano: "grande", origen: "Suiza",
    alias: ["boyero", "boyeros"],
    estaturaMin: 58, estaturaMax: 70, pesoMin: 32, pesoMax: 52, vidaMin: 7, vidaMax: 10,
    orejas: "caidas", pelaje: "doble", cola: "larga", hocico: "mediano",
    colores: ["negro", "blanco", "cafe"], numColores: 3, coloresTexto: "Tricolor: negro con blanco y café rojizo, siempre con su cruz blanca en el pecho.",
    cuidados: "Es un gigante dulce de montaña: necesita paseos diarios y le va mejor el clima fresco. Su pelo largo se cepilla varias veces por semana. Ama estar con su familia.",
    foto: img_boyero_de_berna,
    credito: "Foto: Psinkeric (Public domain), vía Wikimedia Commons",
  },
  {
    slug: "caniche-grande", nombre: "Caniche Grande (Poodle)", tamano: "grande", origen: "Alemania",
    alias: ["poodle", "poodles", "caniche", "caniches"],
    estaturaMin: 45, estaturaMax: 62, pesoMin: 20, pesoMax: 30, vidaMin: 12, vidaMax: 15,
    orejas: "caidas", pelaje: "rizado", cola: "corta", hocico: "largo",
    colores: ["blanco", "negro", "cafe", "gris", "crema"], numColores: 1, coloresTexto: "Un solo color: blanco, negro, café, gris, crema o albaricoque.",
    cuidados: "Es de los más inteligentes y su pelo rizado casi no suelta pelo, pero necesita cortes y cepillado regulares. Le encanta el agua, aprender trucos y estar en familia.",
    foto: img_caniche_grande,
  },
  {
    slug: "red-nose-pitbull", nombre: "Red Nose Pitbull", tamano: "mediano", origen: "Irlanda (línea Old Family Red Nose)",
    alias: ["pitbull", "pitbulls", "pit bull", "american pitbull terrier", "american pit bull terrier", "pitbull terrier", "terrier", "terriers"],
    estaturaMin: 43, estaturaMax: 53, pesoMin: 14, pesoMax: 27, vidaMin: 12, vidaMax: 14,
    orejas: "dobladas", pelaje: "corto", cola: "larga", hocico: "mediano",
    colores: ["rojo", "cafe", "blanco"], numColores: 2, coloresTexto: "Café rojizo o rojo, a veces con blanco; su naricita es rosada o rojiza, su sello especial.",
    cuidados: "Es fuerte, atlético y muy cariñoso: necesita ejercicio diario y juegos. Su pelo corto es fácil de cuidar. Con amor y buena crianza es un compañero leal y dulce.",
    foto: img_rednose,
    credito: "Foto: Stacy (CC BY 2.0), vía Wikimedia Commons",
    nota: "Según Dogster, son una de las dos variaciones de color principales del American Pitbull Terrier. Vienen de la línea Old Family Red Nose de Irlanda, de principios de 1800s.",
  },
];

// El catálogo completo: primero las 31 tarjetas originales, en su orden de
// siempre (el Chihuahua sigue siendo la primera tarjeta), y después las
// razas agregadas, ordenadas por tamaño y por nombre dentro de cada tamaño.
const TAMANO_ORDEN: Record<Tamano, number> = { pequeno: 0, mediano: 1, grande: 2 };
const EXTRA_ORDENADAS = [...EXTRA_BREEDS].sort((a, b) =>
  TAMANO_ORDEN[a.tamano] !== TAMANO_ORDEN[b.tamano]
    ? TAMANO_ORDEN[a.tamano] - TAMANO_ORDEN[b.tamano]
    : a.nombre.localeCompare(b.nombre, "es"),
);
export const BREEDS: Breed[] = [...BASE_BREEDS, ...EXTRA_ORDENADAS];

export const MESTIZO: Breed = {
  slug: "mestizo", nombre: "Mestizo", tamano: "mediano", origen: "De todas partes, como el amor",
  estaturaMin: 0, estaturaMax: 0, pesoMin: 0, pesoMax: 0, vidaMin: 0, vidaMax: 0,
  orejas: "caidas", pelaje: "corto", cola: "larga", hocico: "mediano",
  colores: [], numColores: 3, coloresTexto: "¡Todos los colores y combinaciones! Cada mestizo es único.",
  cuidados: "Si tu Wuawua no es de una raza reconocida aún por las organizaciones, no pasa nada: es un ser vivo, con almita, y merece mucho amor, porque sí se lo merece. Es fiel y siempre te amó, te ama y te va a amar.",
  foto: img_mestizo,
};

export const breedBySlug = (slug: string | null | undefined): Breed | undefined =>
  slug === "mestizo" ? MESTIZO : BREEDS.find((b) => b.slug === slug);
