document.addEventListener('DOMContentLoaded', function () {
    (function () {
        let ul = document.querySelector('ul');
        //три главных типа node => text, comment, element
        let li1 = document.createElement('li');
        li1.innerHTML = 'first create element'; //объет созлдан но не встроен в DOM

        let comment = document.createComment('this is a comment'); //коментарии хранят вспомагательную информацию
        li1.appendChild(comment);
        //сначала добавляем потомок (li1), а потом его встраиваем в DOM,
        //чтоб не перерисовывать страницу повторно
        ul.appendChild(li1); //старый метод добавления элемента li1 в конец

        let li2 = document.createElement('li');
        let liText = document.createTextNode('this is text node'); //создание текстовой ноды
        li2.appendChild(liText); //вставка текстовой ноды в созданный элемент li2
        ul.appendChild(li2); //старый метод добавления элемента li2 в конец

        let li3 = document.createElement('li');
        let li3Text = document.createTextNode('this is text variable li3Text');
        li3.appendChild(li3Text);
        ul.insertBefore(li3, ul.firstChild); //старый метод добавления элемента li1 перед ul.firsChild

        //если мы не знаем родителя, его можно получить через parentNode
        let li4 = document.createElement('li');
        let li4Text = document.createTextNode('text variable li4');
        li4.append(li4Text); //новый метод вставки в li textNode
        ul.append(li4); //новый метод вставки вконец ul элемента li4

        let li5 = document.createElement('li');
        let li5Text = document.createTextNode('text variable li5');
        li5.append(li5Text);
        ul.prepend(li5); //новый метод вставки вначало ul элемента li5

        let li6 = document.createElement('li');
        li6.classList.add('clone');
        let li6Text = document.createTextNode('text variable li6');
        li6.append(li6Text);
        ul.children[3].after(li6); //новый метод, вставка перед третим элементом в списке ul элемента li6
        //ul.children[3].after(li6);
        setTimeout(() => ul.children[3].before(li6), 2000); //новый метод, вставка после третим элементом в списке ul элемента li6

        let li7 = li6.cloneNode(true); //клонирование элемента, с true клонируется вместе с содержимым текстом, без true только стили
        ul.children[7].after(li7);

        ul.append('<li>text</li>'); //доклеивает как текстовую ноду, как текст
        ul.prepend('<li>text</li>'); //доклеивает как текстовую ноду, как текст

        ul.append(ul.children[8].cloneNode());

        ul.insertAdjacentHTML('afterbegin', '<li>hello</li>'); //вставляет элемент
        //'beforebegin': до самого element (до открывающего тега).
        //'afterbegin': сразу после открывающего тега  element (перед первым потомком).
        //'beforeend': сразу перед закрывающим тегом element (после последнего потомка).
        //'afterend': после element (после закрывающего тега).

        /*
        //fragment добавляет одним фрагментом много вставок
        let fragment = document.createDocumentFragment(); //создание фрагмента
        fragment.appendChild(li1); //добавление в фрагмент li1
        fragment.appendChild(li2); //добавление в фрагмент li2
        ul.appendChild(fragment); //добавление в ul fragment
         */
        //так делают сейчас fragment
        let arr = [li1, li2];
        ul.append(...arr); //... - это спред оператор который распаковует масссив
        ul.append(li1, li2); //или если нет массива то можно так

        function  fv1 (...args) { //функция с бесконечным кол-вом элементов
            console.log(args);
        }
        function  fv2 () { //функция с бесконечным кол-вом элементов version 2б более старый подход
            console.log(arguments);
        }
        fv1(1, 2, 3); //уложит все результаты в массив
        fv2(1, 2, 3); //уложит все результаты в массив

        ul.removeChild(li5); //старый вариант удаления вставленого элемнта
        li4.remove(); //удаление из DOM по новому стандарту, впременой li4 элемент остался

        ul.replaceChild(li1, ul.firstChild); //старый вариант замены, ul1 вместо ul.firstChild
        ul.firstChild.replaceWith(li1); //новый стандарт замены, ul1 вместо ul.firstChild
    })();

    class Student {
        constructor(name, surname) {
            this.name = name;
            this.surname =surname;
            this.marks = [];
        }
        addMark (mark) {
            this.marks.add(mark);
        }
    }

    let students = [];
    let activeStudent = null;
    let studentList = document.querySelector('.leftBar');
    let studentForm = {
        name: document.querySelector('.name-input'),
        surname: document.querySelector('.surname-input'),
        addBtn: document.querySelector('.add-student-btn'),
    }
    let studentsInfo = {
        markList: document.querySelector('.mark-list'),
        avgMark: document.querySelector('.avg-mark'),
        addMarkForm: document.querySelector('.content .add'),
        input: document.querySelector('.content .input'),
        addMarkBtn: document.querySelector('.content button'),
    };

    function createStudentElement(student, i) {
        let studentElem = document.createElement('div');
        studentElem.classList.add('student');

        if(student === activeStudent) {
            studentElem.classList.add('active');
            studentElem.style.backgroundColor = '#963';
        }
        studentElem.dataset.index = i;
        studentElem.append(`${student.name} ${student.surname}`);
        return studentElem;
    };

    function showStudents(students) {
        studentList.innerHTML = '';
        let studentElems = students.map((e, i) => createStudentElement(e, i));
        studentList.append(...studentElems);
    }
    function addStudent () {
        let name = studentForm.name.value;
        let surname = studentForm.surname.value;
        if(name.trim() === '' || surname.trim === '') {
            alert('заполните поля');
            return;
        }
        students.push(new Student(name, surname));
        showStudents(students);
    };
    function showStudentInfo () {
        if (activeStudent === null) {
            studentsInfo.addMarkForm.style.display = 'none';
            studentsInfo.markList.style.display = 'none';
            studentsInfo.avgMark.style.display = 'none';
            return;
        }
        let markElems = activeStudent.marks
            .map(e=>createMarkElem(e));
        studentsInfo.markList.innerHTML = '';
        studentsInfo.markList.append(...markElems);
        studentsInfo.markList.style.display = 'block';

        studentsInfo.addMarkForm.style.display = 'block';

        if (activeStudent.marks.length > 0) {
            studentsInfo.avgMark.style.display = 'block';
            let sumMark = activeStudent.marks.reduce((a, b)=>a+b, 0);
            studentsInfo.avgMark.textContent = sumMark/activeStudent.marks.length;
        } else {
            studentsInfo.avgMark.style.display = 'none';
        }

    };
    function createMarkElem(mark) {
        let li = document.createElement('li');
        li.append(mark);
        return li;
    }

    studentForm.addBtn.addEventListener('click', () => addStudent());
    studentList.addEventListener('click',(e) => {
        if(!e.target.matches('.student')) return;
        //e.target.classList.add('active');
        let index = e.target.dataset.index;
        activeStudent = students[index];
        showStudents(students);
        showStudentInfo();
    });
    studentsInfo.addMarkBtn.addEventListener('click', ()=>{
       if(activeStudent===null) return;
       activeStudent.marks.push(
           parseFloat(studentsInfo.input.value)
       );
       showStudentInfo();
    });
    showStudentInfo();
    showStudents(students);
})