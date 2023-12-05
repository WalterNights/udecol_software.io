/* =====================================CARDS-SLIDER===================================== */

const cardContentPre = document.getElementById("cardContentPre");
const cardContentPos = document.getElementById("cardContentPos");

function handleScrollPrev(cards) {
    cards.scrollLeft = cards.scrollLeft -= window.innerWidth / 2 > 600 ? window.innerWidth / 1 : window.innerWidth - 100;
};

function handleScrollNext(cards) {
    cards.scrollLeft = cards.scrollLeft += window.innerWidth / 2 > 600 ? window.innerWidth / 1 : window.innerWidth - 100;
};

function newUniversityCareer(a, b, c, d, e){
    this.career = a,
    this.name = b,
    this.image = c,
    this.description = d,
    this.seeMore = e
};

const careerPreDB = [
    {
        career: "CPD",
        name: "Contaduría Pública a Distancia",
        image: "https://portalusa.udecolombia.edu.co/pluginfile.php/7576/mod_label/intro/estudiar-contaduria-publica.jpg",
        description: "¿Tu situación actual, hace que estudiar a distancia sea la mejor opción? ¿Te gusta el mundo de los negocios y el emprendimiento? ¿Sabías que la base fundamental para la toma de decisiones y proyección de una empresa o negocio está en los registros contables? Ser profesional en Contaduría Pública te brinda la oportunidad de garantizar la legalidad y transparencia de la información financiera de personas naturales y jurídicas, dando fe pública, con tu firma.",
        seeMore: "https://www.udecolombia.edu.co/contaduria-publica-distancia/"
    },
    {
        career: "SST",
        name: "Profesional en Seguridad y Salud en el Trabajo",
        image: "https://portalusa.udecolombia.edu.co/pluginfile.php/7576/mod_label/intro/seguridad-y-salud-en-el-trabajo.jpg",
        description: "El profesional en Seguridad y salud en el trabajo de U DE COLOMBIA es un profesional cuyos conocimientos, habilidades, capacidades y calidades humanas te hacen competente para desempeñarte de manera",
        seeMore: "https://www.udecolombia.edu.co/profesional-en-seguridad-y-salud-del-trabajo/"
    },
    {
        career: "PSIO",
        name: "Profesional en Sistemas de Información Organizacional",
        image: "https://portalusa.udecolombia.edu.co/pluginfile.php/7576/mod_label/intro/system_career.jpg",
        description: "El mundo digital tiene un impacto organizacional inimaginable. Hoy más que en cualquier momento de la historia, las organizaciones requieren sistematizarse, entender sus datos para obtener información de gran valor, hacer buen uso de la tecnología y buscar ser cada vez mejores. Automatiza procesos y contribuye a la toma de decisiones para aportar eficiencia al sector productivo. En U de Colombia te esperamos para guiarte y apoyarte en este camino de ser un profesional en Sistemas de Información",
       seeMore: "https://www.udecolombia.edu.co/profesional-en-sistemas-de-informacion-organizacional/"
    },
    {
        career: "DD",
        name: "Derecho a Distancia",
        image: "https://portalusa.udecolombia.edu.co/pluginfile.php/7576/mod_label/intro/lawyerAttorney-scaled-e1625179722460-1980x990.jpg",
        description: "El profesional en Derecho de U DE COLOMBIA es un apasionado por la justicia en todos los campos del quehacer humano, preparado para trabajar por el correcto orden social con un profundo sentido ético y humano. Es un jurista sólido e íntegro, asesor en temas legales y defensor de derechos y reclamos ante un tribunal de justicia con una formación humanista e interdisciplinaria cimentada en la honestidad, integridad y moralidad.",
        seeMore: "https://www.udecolombia.edu.co/derecho-a-distancia/"
    }
];

const careerPosDB = [
    {
        career: "EDD",
        name: "Especialización en Derecho de Daños",
        image: "https://portalusa.udecolombia.edu.co/pluginfile.php/7576/mod_label/intro/lawyer_career.jpg",
        description: "¿Sabías que un daño puede ser generado por una imprudencia, impericia o negligencia? Situaciones que son comunes en todas las profesiones, daños derivados de malas prácticas médicas, contables, accidentes viales entre otros. Aprende a prevenir y mitigar el daño, liquidar el daño, reclamaciones a las aseguradoras, responsabilidad civil contractual, extracontractual y del estado. La Corporación Universitaria U DE COLOMBIA te conduce a este logro en un año, con la ESPECIALIZACIÓN EN DERECHO DE DAÑO",
        seeMore: "https://www.udecolombia.edu.co/especializacion-en-derecho-de-danos/"
    },
    {
        career: "ECE",
        name: "Especialización en Contratación Estatal",
        image: "https://portalusa.udecolombia.edu.co/pluginfile.php/7576/mod_label/intro/contability_career.jpg",
        description: "El Especialista en Contratación Estatal de U DE COLOMBIA a distancia, demuestra experticia en los aspectos conceptuales, sustanciales, jurisprudenciales y procesales de la contratación pública. Es capaz de comprender los contratos públicos en los contextos local, nacional e internacional y competente para el análisis, valoración y argumentación de situaciones jurídicas en las que se involucre, propiciando el acuerdo colaborativo y autónomo de las partes con criterios de equidad, justicia, ética",
        seeMore: "https://www.udecolombia.edu.co/especializacion-en-contratacion-estatal/"
    },
    {
        career: "EDI",
        name: "Especialización en Derecho Informático",
        image: "https://portalusa.udecolombia.edu.co/pluginfile.php/7576/mod_label/intro/datisa-sistemas-de-gesti%C3%B3n.jpg",
        description: "Sé un especialista con experticia para el análisis, valoración y argumentación en asuntos relativos a los efectos jurídicos derivados de la informática en cohesión con los asuntos en derecho tales como ciberseguridad, régimen de jurídico de la privacidad y los datos, contratación, firmas electrónicas y otros elementos que se desprenden de la interacción entre las relaciones jurídicas entre particulares y el estado y las respectivas consecuencias procesales.",
      seeMore: "https://www.udecolombia.edu.co/especializacion-en-derecho-informatico/"
    },
    {
        career: "ELGT",
        name: "Especialización en Legislación y Gestión Tributaria",
        image: "https://portalusa.udecolombia.edu.co/pluginfile.php/7576/mod_label/intro/comercial_career_SSCh34h.jpg",
        description: "Nuestra Especialización en Legislación y Gestión Tributaria en modalidad a distancia aborda el estudio de la tributación en forma multidisciplinaria, considerando los componentes jurídico, contable, financiero, administrativo y ético; que mediante una sólida e integral formación en el ámbito tributario, tanto en los elementos y herramientas de gestión, como en las normas que la enmarcan, pretende disponerle al mundo un especialista que genere valor a la organización o negocio que represente.",
        seeMore: "https://www.udecolombia.edu.co/especializacion-en-legislacion-y-gestion-tributaria/"
    }
];

const makeCards = (careerData, careerCard)=> {
    for(let item of careerData) {
        const newCard =
            '<div class="card">' +
                '<div class="career_content">' +
                    '<div class="career_cards">' +
                    '<div class="career_img" style="background-image: url('+ item.image +');"></div>' +
                        '<div class="career_name d-flex flex-column justify-content-center align-items-center">' +
                            '<h3 class="col-11">'+ item.name +'</h3>' +
                        '</div>' +
                        '<div class="career_text d-flex justify-content-center">' +
                            '<p class="col-11">'+ item.description +'</p>' +
                        '</div>' +
                        '<div class="career_button d-flex justify-content-center align-items-center">' +
                            '<a href="'+ item.seeMore +'" target="_blank">' +
                                '<button class="d-flex justify-content-center align-items-center">' +
                                    '<span class="col-9">Saber más</span>' +
                                '</button>' +
                            '</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        ;
        careerCard.innerHTML += newCard;
    };
};

makeCards(careerPreDB, cardContentPre);
makeCards(careerPosDB, cardContentPos);

/* =======================================NEWS-SLIDER======================================= */

const newsSliderMain = document.getElementById("newsSliderMain");
const newsSliderNav = document.getElementById("newsSliderNav");

function newNewsSlider(a, b, c){
    this.id = a,
    this.image = b,
    this.description = c
};

const newsUdeCo = [
    {
        id: 1,
        image: "",
        description: ""
    },
    {
        id: 2,
        image: "",
        description: ""
    },
    {
        id: 3,
        image: "",
        description: ""
    },
    {
        id: 4,
        image: "",
        description: ""
    },
    {
        id: 5,
        image: "",
        description: ""
    },
    {
        id: 6,
        image: "",
        description: ""
    },
]

const makeNewSlider = ()=> {
    for(news of newsUdeCo){
        const newSliderMain = 
            '<div class="mySlides">' +
                '<img src="'+ news.image +'" alt="'+ news.description +'">' +
            '</div>'
        ;
        newSliderMain.innerHTML += newSlider;
        const newSliderNav = 
            '<div>' +
                '<img class="slider-type-two cursor" src="'+ news.image +'" onclick="currentSlide('+ news.id +')" alt="'+ news.description +'">' +
            '</div>'
        ;
        newSliderNav.innerHTML += newSlider;
    }; 
};

const faqSection = document.getElementsByClassName("faq-accordion");

for (let i = 0; i < faqSection.length; i++) {
  faqSection[i].addEventListener("click", function() {
    this.classList.toggle("faq-active");
    const panelFaq = this.nextElementSibling;
    if (panelFaq.style.maxHeight) {
      panelFaq.style.maxHeight = null;
    } else {
      panelFaq.style.maxHeight = panelFaq.scrollHeight + "px";
    } 
  });
};

/* =====================================end_NEWS-SLIDER===================================== */
/* ====================================end_CARDS-SLIDER==================================== */