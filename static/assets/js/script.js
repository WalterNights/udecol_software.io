const formUser = document.forms.namedItem("userFormData");

//USER DATA VARIABLES
var user_name;
var user_lastname;
var user_id;
var user_country;
var user_address;
var user_city;
var user_phone;
var user_cell;
var user_email;
var user_certificate;
//USER ACADEMIC STUDIES
var user_scholar1 = "No";
var user_scholar2 = "No";
var user_scholar3 = "No";
var user_specialization1 = "No";
var user_specialization2 = "No";
var user_specialization3 = "No";
var user_mastery1 = "No";
var user_mastery2 = "No";
var user_mastery3 = "No";
var user_doctorate = "No";
var user_universityA1 = "Aplica";
var user_universityA2 = "Aplica";
var user_universityA3 = "Aplica";
var user_universityB1 = "Aplica";
var user_universityB2 = "Aplica";
var user_universityB3 = "Aplica";
var user_universityC1 = "Aplica";
var user_universityC2 = "Aplica";
var user_universityC3 = "Aplica";
var user_universityD1 = "Aplica";

var user_english_lang = "Inglés";
var user_reed_e = "no";
var user_speack_e = "no";
var user_write_e = "no";
var user_french_lang = "Francés";
var user_reed_f = "no";
var user_speack_f = "no";
var user_write_f = "no";
var user_another_lang;
var user_reed_a = "no";
var user_speack_a = "no";
var user_write_a = "no";

const formFieldsOne = [
    "user_name",
    "user_lastname",
    "user_id",
    "user_country",
    "user_address",
    "user_city",
    "user_phone",
    "user_cell",
    "user_email",
    "user_certificate"
];

const formFieldsTwo = [
    "Pregrado",
    "Especialización",
    "Maestria",
    "Dcotorado"
];

var newTeacher;

function Teacher(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
    this.Nombre = a,
    this.Apellido = b,
    this.Documento_de_Identidad = c,
    this.Pais = d,
    this.Direccion = e,
    this.Ciudad = f,
    this.Telefono = g,
    this.Celular = h,
    this.Correo = i,
    this.Años_Certificados = j,
    this.Pregrado_1 = k,
    this.Pregrado_2 = l,
    this.Pregrado_3 = m,
    this.Especialización_1 = n,
    this.Especialización_2 = o,
    this.Especialización_3 = p,
    this.Maestria_1 = q,
    this.Maestria_2 = r,
    this.Maestria_3 = s,
    this.Doctorado = t,
    this.Idioma_Ingles = u,
    this.Idioma_Frances = v,
    this.Idioma_Otro = w
};

const createExcel = (value) => {
    // CREATE EXCEL WORKBOOK
    const workBook = XLSX.utils.book_new();
    // ADD WORKSHEET
    workBook.SheetNames.push("Postulación Doncente");
    workBook.Sheets["Postulación Doncente"] = XLSX.utils.json_to_sheet(value);
    // FORCE DOWNLOAD XLSX FILE
    XLSX.writeFile(workBook, user_name + "_" + user_lastname + ".xlsx");
};

var newParagraph_1;
var newParagraph_2;
var newParagraph_3;
var newParagraph_4;
var newParagraph_5;
var newParagraph_6;
var newParagraph_7;
var newParagraph_8;
var newParagraph_9;
var newParagraph_10;
var newLanguage_1;
var newLanguage_2;
var newLanguage_3;

const createWordFile = (value) => {
    let controlOne = 1;
    let controlTwo = 1;
    const {Document, Packer, Paragraph, TextRun} = docx;
    Object.entries(value).map(item => {
        let key = item[0];
        let val = item[1];
        if((key.match(/Pregrado/i) || key.match(/Especialización/i) || key.match(/Maestria/i) || key.match(/Doctorado/i)) && val != "No - Aplica"){
            window["newParagraph_" + controlOne] = new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        font: "Calibri",
                        text: "Título de " + key + ": ",
                        bold: true,
                        size: 24,
                        break: 1,
                    }),
                    new docx.TextRun({
                        font: "Calibri",
                        text: val,
                        size: 24,
                        break: 1,
                    }),
                ]
            });
            controlOne ++;
        };
        if((key.match(/Idioma_/i))){
            if(val != "undefined"){
                console.log(typeof(val))
                window["newLanguage_" + controlTwo] = new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Conocimientos en " + key + ": ",
                            bold: true,
                            size: 24,
                            break: 1,
                        }),
                        new docx.TextRun({
                            font: "Calibri",
                            text: val,
                            size: 24,
                            break: 1,
                        }),
                    ]
                });
                controlTwo ++;
            }
        };
    });
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: 'POSTULACIÓN DONCENTE ' + value.Nombre + "" + value.Apellido,
                            bold: true,
                            allCaps: true,
                            color: "#075299",
                            size: 30,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Datos del Docente",
                            bold: true,
                            size: 28,
                            break: 2,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Documento de Identidad: ",
                            bold: true,
                            size: 24,
                            break: 1,
                        }),
                        new docx.TextRun({
                            font: "Calibri",
                            text: value.Documento_de_Identidad,
                            size: 24,
                            break: 1,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Nacionalidad: ",
                            bold: true,
                            size: 24,
                            break: 1,
                        }),
                        new docx.TextRun({
                            font: "Calibri",
                            text: value.Pais,
                            size: 24,
                            break: 1,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Residencia y dirección: ",
                            bold: true,
                            size: 24,
                            break: 1,
                        }),
                        new docx.TextRun({
                            font: "Calibri",
                            text: value.Direccion + ", " + value.Ciudad,
                            size: 24,
                            break: 1,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Numero de Contacto: Teléfono: ",
                            bold: true,
                            size: 24,
                            break: 1,
                        }),
                        new docx.TextRun({
                            font: "Calibri",
                            text: value.Telefono,
                            size: 24,
                            break: 1,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Numero de Contacto: Celular: ",
                            bold: true,
                            size: 24,
                            break: 1,
                        }),
                        new docx.TextRun({
                            font: "Calibri",
                            text: value.Celular,
                            size: 24,
                            break: 1,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Correo Electrónico: ",
                            bold: true,
                            size: 24,
                            break: 1,
                        }),
                        new docx.TextRun({
                            font: "Calibri",
                            text: value.Correo,
                            size: 24,
                            break: 1,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Número de años CERTIFICADOS en EDUCACIÓN SUPERIOR: ",
                            bold: true,
                            size: 24,
                            break: 1,
                        }),
                        new docx.TextRun({
                            font: "Calibri",
                            text: value.Años_Certificados,
                            size: 24,
                            break: 1,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Información Académica",
                            bold: true,
                            size: 28,
                            break: 2,
                        }),
                    ],
                }),
                newParagraph_1,
                newParagraph_2,
                newParagraph_3,
                newParagraph_4,
                newParagraph_5,
                newParagraph_6,
                newParagraph_7,
                newParagraph_8,
                newParagraph_9,
                newParagraph_10,
                new docx.Paragraph({
                    children: [
                        new docx.TextRun({
                            font: "Calibri",
                            text: "Conocimiento en Idiomas",
                            bold: true,
                            size: 28,
                            break: 2,
                        }),
                    ],
                }),
                newLanguage_1,
                newLanguage_2,
                newLanguage_3
            ],
        }]
    });
    docx.Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Postulación Doncente.docx");
    });
};

const getFormData = () => {
    for (item of formUser) {
        if (item.localName === "input") {
            for (let x = 0; x < formFieldsOne.length; x++) {
                if (item.name === formFieldsOne[x]) {
                    if (item.value != "") {
                        window[item.name] = item.value;
                    };
                };
            };
            if (item.type != "checkbox") {
                if (item.value != "") {
                    if (!item.name.match(/user_university/i)) {
                        window[item.name] = item.value;
                    } else {
                        window[item.name] = item.value;
                    };
                };
            };
            if (item.type == "checkbox") {
                if (item.checked) {
                    window[item.name] = item.value
                    if(item.name.match(/_lang/i)){
                        if(item.checked){
                            window[item.name] = item.value;
                        };
                    }else {
                        if(item.checked){
                            window[item.name] = "si"
                        };
                    }
                };
            };
        };
    };
    newTeacher = new Teacher(
        user_name,
        user_lastname,
        user_id,
        user_country,
        user_address,
        user_city,
        user_phone,
        user_cell,
        user_email,
        user_certificate,
        user_scholar1 + " - " + user_universityA1,
        user_scholar2 + " - " + user_universityA2,
        user_scholar3 + " - " + user_universityA3,
        user_specialization1 + " - " + user_universityB1,
        user_specialization2 + " - " + user_universityB2,
        user_specialization3 + " - " + user_universityB3,
        user_mastery1 + " - " + user_universityC1,
        user_mastery2 + " - " + user_universityC2,
        user_mastery3 + " - " + user_universityC3,
        user_doctorate + " - " + user_universityD1,
        user_english_lang + ": " + "Lee: " + user_reed_e + ", " + "Habla: " + user_speack_e + ", " + "Escribe: " + user_write_e,
        user_french_lang + ": " + "Lee: "  + user_reed_f + ", " + "Habla: "  + user_speack_f + ", " + "Escribe: "  + user_write_f,
        user_another_lang + ": " + "Lee: "  + user_reed_a + ", " + "Habla: "  + user_speack_a + ", " + "Escribe: "  + user_write_a
    );
    createWordFile(newTeacher);
};

document.getElementById("sendButton").addEventListener("click", getFormData);