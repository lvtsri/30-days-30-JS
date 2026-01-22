const questions = [
    {               //urutan mulai dari 0
        question: "Planet manakah yang dikenal sebagai Planet Merah?",
        answers: [
            { text: "Venus", status: false},
            { text: "Jupiter", status: false},
            { text: "Mars", status: true},
            { text: "Saturnus", status: false},
        ]
    },
    {
        question: "Ibu kota negara Jepang adalah...",
        answers: [
            { text: "Kyoto", status: false},
            { text: "Osaka", status: false},
            { text: "Tokyo", status: true},
            { text: "Seoul", status: false},
        ]
    },
    {
        question: "Siapakah penulis drama terkenal Romeo dan Juliet?",
        answers: [
            { text: "Charles Dickens", status: false},
            { text: "William Shakespeare", status: true},
            { text: "Jane Austen", status: false},
            { text: "Mark Twain", status: false},
        ]
    },
    {
        question: "Unsur kimia manakah yang memiliki simbol O?",
        answers: [
            { text: "Emas", status: false},
            { text: "Oksigen", status: true},
            { text: "Osmium", status: false},
            { text: "Perak", status: false},
        ]
    }
];

const questionsElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){           //dimulai dari awal
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next"; //menciptakan teks Next di page html next-btn
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];  //ex: questions[0] maka terambil soal/urutan pertama yg ada di array questions
    let questionNo = currentQuestionIndex + 1;              //buat nomer
    questionsElement.innerHTML = questionNo + ". " + currentQuestion.question;     //yang ini baru secara spesifik mengambil soal karena currentQuestion.question

    currentQuestion.answers.forEach(    //menjalankan tiap array pada answers
        answer => {                     //nama parameter bebas
            const button = document.createElement("button");    //bikin elemen <button>
            button.innerHTML = answer.text;                     //di dalem <button> diisi teks jawaban dari answer.text 
            button.classList.add("btn");                        //menambah class="btn" di <button>
            answerBtn.appendChild(button);                      //nempelin button ke answerBtn
            if(answer.status){
                button.dataset.status = answer.status;          //memberi data status(dataset)
            }
            button.addEventListener("click", selectAnswer);     //kalo ada yg klik, jalanin function selectAnswer
        });
}

function resetState(){                  //method buat ngehapus pilihan ganda biar ga numpuk di soal selanjutnya
    nextBtn.style.display = "none";     //menyembunyikan tombol next
    answerBtn.innerHTML = "";           //menghapus pilihan ganda (soal sebelumnya)
}

function selectAnswer(e){
    const selectedBtn = e.target;       //e.target utk secara spesifik menandai button apa yang diklik
    const isCorrect = selectedBtn.dataset.status === "true";    //membandingkan nilai data status(dataset) harus true
    if(isCorrect){
        selectedBtn.classList.add("benar");
        score++;
    }else{
        selectedBtn.classList.add("salah");
    }

    Array.from(answerBtn.children).forEach(         //ambil isi dari answerBtn, jadikan array oleh perintah Array.from, lalu cek satu2 dengan forEach
        button => {
            if(button.dataset.status === "true"){   
                button.classList.add("benar");
            }
            button.disabled = true;                 //btn dibuat disable
        });
    nextBtn.style.display = "block";                //tombol next muncul
}

function showScore(){
    resetState();                                   //hapus pilihan ganda
    questionsElement.innerHTML = `You scored ${score} out of ${questions.length}~!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton(){                //method untuk pindah soal
    currentQuestionIndex++;                 //+1 index urutan soal
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{     //pasang telinga kalo ada yg klik nextBtn, hanya bekerja jika ada yg klik
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();