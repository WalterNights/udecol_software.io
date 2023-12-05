//Import DataBase JSON
import database from './dataBase.json' assert { type: "json"};

//Global Variables
var programN;
var userField;
var courseUsers;
var downloadReady;
const getDataBase = Object.entries(database);
const getProgramName =  document.getElementById("getProgramName");
const exelInspectorModalButton = document.getElementById("exelInspectorModalButton");
const fileExcel = document.getElementById('docpicker');
const ExcelReady = document.getElementById('ExcelReady');
const findUser = document.getElementById('findUser');
const cardStudent = document.getElementById('cardStudent');
const userDB = [];
const userInCourseR = [];
const userInCourseT = [];
const fields = [
    "Usuario",
    "Nombre",
    "Apellidos",
    "Documento",
    "No. De Cédula de Ciudadania",
    "Tipo_Nivel",
    "Nivel",
    "Jornada",
    "Periodo",
    "Período",
    "Cantidad_asignturas",
    "Cantidad_asignturas",
    "cantidad_creditos",
    "promedioPeriodo",
    "promedioFinal",
    "INGLÉS 1",
    "INGLÉS 2",
    "INGLÉS 3",
    "INGLÉS 4",
    "INGLÉS 5",
    "INGLÉS 6"
];
const attributes = [
    ["class", "download-button"],
    ["onclick", "downloadExcel('userDB', 'downloadReady')"],
    ["title", "archivo listo para descargar"]
];
const udecolProgram = [
    "Administración Financiera",
    "Contaduría Pública",
    "Finanazas y Banca",
    "NIIF - NIC"
];

getProgramName.addEventListener("keydown", function (event){
    if(event.key === 'Enter'){
        programN = getProgramName.value;
        if(udecolProgram.includes(programN)){
            document.querySelector(".excel-inspector").style.display = "block";
        }else{
            document.querySelector(".excel-inspector-modal-container").style.display = "flex";
        };
    };
});

exelInspectorModalButton.addEventListener("click", function (){
    location.reload()
});

//Make an object USER according to fields and values obtained of the EXCEL 
function studentUser(Usuario, Documento, Tipo_Nivel, Nivel, Jornada, Periodo, Curso) {
    this.Usuario = Usuario;
    this.Documento = Documento;
    this.Tipo_Nivel = Tipo_Nivel;
    this.Nivel = Nivel
    this.Jornada = Jornada;
    this.Periodo = Periodo;
    for (let i in Curso) {
        this[Curso[i]] = "Aún no Cursado";
    };
};

//Make an object USERS IN CORUSE according to fields and values obtained of the EXCEL 
function courseUser(Curso, Nivel, Diurnos ,Nocturnos ,Sabatinos, Estudiantes, estudiante) {
    this.Curso = Curso;
    this.Nivel = Nivel;
    this.Diurnos = Diurnos;
    this.Nocturnos = Nocturnos;
    this.Sabatinos = Sabatinos;
    this.Estudiantes = Estudiantes;
    for (let i in estudiante) {
        this["Estudiante_" + i] = estudiante[i]
    };
};

//Triggered the user Inspector Program
fileExcel.addEventListener('change', importFile);
function importFile(evt) {
    const files = evt.target.files[0];
    if (files) {
        const r = new FileReader();
        r.onload = (e) => {
            processExcel(e.target.result);
        };
        r.readAsBinaryString(files);
    } else {
        console.log("Failed to load file");
    };
};

//Triggered the analyzer and make Excel functions
const processExcel = (data) => {
    const workbook = XLSX.read(data, { type: 'binary' });
    const jsonData = toJson(workbook);
    downloadReady = jsonData;
};

//Triggered the xlsx file convert to data JS
const toJson = (workbook) => {
    const result = {};
    const courseDB = {
        regular: {},
        transition: {}
    };
    let userExcel;
    //Check the Excel file upload
    workbook.SheetNames.forEach(sheetName => {
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        userExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        if (rows.length) result[sheetName] = rows;
    });
    makeUser(result, courseDB, userExcel);
    const getTheCoruse = makeCourse(courseDB);
    //Make the de consolidate object date Excel



    for(const key in getTheCoruse){
        for(const full in getTheCoruse[key]){ 
            const finalLevel = getTheCourseLevel(full);
            if(finalLevel !== undefined){
                const userJourney = getTheCoruse[key][full];         
                const journeyD = [];
                const journeyN = [];
                const journeyS = [];
                userJourney.forEach(item => {
                    if(item.match("Mañana")) journeyD.push(item);
                    if(item.match("Nocturna")) journeyN.push(item);
                    if(item.match("Sabatina")) journeyS.push(item);
                })
                const courseUsers = new courseUser(
                    full, 
                    finalLevel, 
                    journeyD.length, 
                    journeyN.length, 
                    journeyS.length, 
                    getTheCoruse[key][full].length, 
                    getTheCoruse[key][full]
                );
                if(key === "regular"){
                    userInCourseR.push(courseUsers);
                }else {
                    userInCourseT.push(courseUsers);
                };
            };
        };
    };


   /*  for(const full in getTheCoruse.transition){ 
        const finalLevel = getTheCourseLevel(full);
        if(finalLevel !== undefined){
            const courseUsers = new courseUser(
                full, 
                finalLevel,
                "Diurnos",
                "Nocturnos",
                "Sabatinos", 
                getTheCoruse.transition[full].length, getTheCoruse.transition[full]
            );
            userInCourseT.push(courseUsers);
        };
    }; */
    
    ExcelReady.classList.remove("download-disable");
    for(let i of attributes) ExcelReady.setAttribute(i[0], i[1]);
    return [userInCourseR, userInCourseT];
};

//Triggered the user profile maker
const makeUser = (result, courseDB, userExcel) => {
    for (let key in result) {
        //Get the cells names of EXCEL to convert in the object fields
        userField = result[key][0];
        userExcel.forEach(user => {
            const userCourses = [];
            let levelType;
            userField.forEach(field => {
                if (!fields.includes(field)) {
                    if (!(field in user)) {
                        userCourses.push(field);
                        courseDB.regular[field] = [];
                        courseDB.transition[field] = [];
                    };
                };
            });
            //Asign the level type
            if (user.Nivel.match("T")) {
                levelType = "Transición"
            } else {
                levelType = "Regular";
            };
            //Make the object user without success courses
            courseUsers = new studentUser(
                user["Nombre"] + " " + user["Apellidos"],
                user["No. De Cédula de Ciudadania"],
                levelType,
                user["Nivel"],
                user["Jornada"],
                user["Período"],
                userCourses
            );
            userDB.push(courseUsers);
        });
    };
    return userDB;
};

//Triggered the course object maker
const makeCourse = (courseDB) => {
    //Make the user profile in the sheet two on the Excel tho donwload
    userDB.forEach(userCourse => {
        Object.keys(userCourse).filter(date => {
            if (!fields.includes(date)) {
                if (userField.includes(date)) {
                    if (date in userCourse) {
                        if (userCourse.Nivel.match("T")) {
                            const courseLevelT = getTheCourseLevel(date, userCourse.Nivel);
                            if(courseLevelT !== undefined){
                                const nexLevelUser = Number(userCourse.Nivel.match(/(\d+)/)[0]) + 1;
                                const nexLevelCourse = courseLevelT.course_level.match(/(\d+)/)[0];
                                if(nexLevelCourse > nexLevelUser){
                                    //console.log("el estudiante ", userCourse.Usuario, " aun no puede ver este curso"); 
                                }else{
                                    courseDB.transition[date].push(
                                        userCourse.Usuario + 
                                        " - Documento: " + 
                                        userCourse.Documento + 
                                        " - Nivel: " + 
                                        nexLevelUser + "T" + 
                                        " - Jornada: " + 
                                        userCourse.Jornada
                                    );
                                };
                            };
                        }else {
                            const nexLevelUser = Number(userCourse.Nivel) + 1;
                            const courseLevelR = getTheCourseLevel(date);
                            if(courseLevelR !== undefined){
                                if(courseLevelR > nexLevelUser){
                                    //console.log("el estudiante ", userCourse.Usuario, " aun no puede ver este curso"); 
                                }else{
                                    //Add the user in the course array
                                    courseDB.regular[date].push(
                                        userCourse.Usuario + 
                                        " - Documento: " + 
                                        userCourse.Documento + 
                                        " - Nivel: " + 
                                        nexLevelUser + 
                                        " - Jornada: " + 
                                        userCourse.Jornada
                                    );
                                };
                            };
                        };
                    };
                };
            };
        });
    });
    document.getElementById("successMessage").innerHTML = "ARCHIVO LISTO PARA DESCARGAR"
    return courseDB;
};

//Triggered the course level checker
const getTheCourseLevel = (value, level) => {
    for(const [key_1, val_0] of Object.entries(getDataBase)) {
        for(const val_1 in val_0){
            const convertPMN = programN.toLocaleLowerCase().replace(/\s/g, '_');
            if(convertPMN.match(val_0[0])){
                for(const [key_2, val_2] of Object.entries(val_0[val_1])) {
                    if (typeof (val_2) === "object") {
                        for(const [key_3, val_3] of Object.entries(val_2)) {
                            for(const val_4 in val_3){
                                const cLevel = val_4.match(/(\d+)/);
                                if(level !== undefined) {
                                    if(val_4.match("T")){
                                        const uLevel = level.match(/(\d+)/);
                                        for(const val_5 of val_3[val_4]){
                                            if(val_5.toUpperCase().match((value))){
                                                if((((Number(uLevel[0])) + 1)) >= Number(cLevel[0])){
                                                    const UCl = {
                                                        course_level: val_4, 
                                                        user_level: level, 
                                                        course: value
                                                    }
                                                    return UCl;
                                                };
                                            };
                                        };
                                    };
                                }else{
                                    if(!val_4.match("T")){
                                        for(const val_5 of val_3[val_4]){
                                            if(val_5.toUpperCase().match((value))){
                                                return Number(cLevel[0]);
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};

//Triggered the download process
const downloadExcel = (data1, data2, filename = "consolidad estudiantes por asignaturas siguiente Periodo.xlsx") => {
    let dataSheet1;
    let dataSheet2;
    let dataSheet3;
    if (data1 === 'userDB') dataSheet1 = userDB;
    if (data2 === 'downloadReady') {
        dataSheet2 = downloadReady[0];
        dataSheet3 = downloadReady[1];
    };
    if (dataSheet1 === undefined && dataSheet2 === undefined) {
        alert("Aun no ha cargado un archivo xlsx");
    } else {
        const sheet1 = XLSX.utils.json_to_sheet(dataSheet1);
        const sheet2 = XLSX.utils.json_to_sheet(dataSheet2);
        const sheet3 = XLSX.utils.json_to_sheet(dataSheet3);
        const book = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(book, sheet1, 'Lista de Estudiantes');
        XLSX.utils.book_append_sheet(book, sheet2, 'Consolidado Regulares');
        XLSX.utils.book_append_sheet(book, sheet3, 'Consolidado Transición');
        XLSX.writeFile(book, filename);
    };
};

//Triggered the user in file checker
const checkUser = () => {
    userDB.forEach(item => {
        if (findUser.value !== '') {
            for (let val in item) {
                if (item[val].toString().match((findUser.value).toUpperCase())) {
                    const newCardStudent =
                            '<div class="card-student">' +
                                '<div>' +
                                    '<h2>Datos del Estudiante</h2>' +
                                '</div>' +
                                '<div class="card-student-name">' +
                                    '<p><b>Nombre: </b>' + item.Usuario + '</p>' +
                                    '<p><b>Documento: </b>' + item.Documento + '</p>' +
                                    '<p><b>Jornada: </b>' + item.Jornada + '</p>' +
                                    '<p><b>Nivel: </b>' + item.Nivel + '</p>' +
                                    '<p><b>Periodo: </b>' + item.Periodo + '</p>' +
                                '</div>' +
                                '<div>' +
                                    '<h2>Asignaturas Pendientes</h2>' +
                                '</div>' +
                                '<div id="cardStudentCourses" class="cardStudentCourses card-student-courses display-center">' +
                                '</div>' +
                            '</div>'
                        ;
                    cardStudent.innerHTML = newCardStudent;
                    Object.keys(item).forEach(itemCourse => {
                        if (!fields.includes(itemCourse)) {
                            const cardCourse =
                                '<div class="course-card display-center">' +
                                    '<p>' + itemCourse + '</p>' +
                                '</div>'
                                ;
                            document.querySelector(".cardStudentCourses").innerHTML += cardCourse;
                        };
                    });
                };
            };
        }
    });
};

//Export DOM fucntions
window.downloadExcel = downloadExcel;
window.checkUser = checkUser;