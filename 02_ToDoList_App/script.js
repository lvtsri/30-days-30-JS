const inputBox = document.getElementById("input-box");          //ambil elemen ber-id "input-box"
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){                  //kalo kolom input kosong
        alert("You must write something!");
    }else{
        let li = document.createElement("li");  //bikin <li> & disimpan ke li
        li.innerHTML = inputBox.value;          //manipulasi isi <li> yang telah disimpan di li sesuai value di kolom input(inputBox)
        listContainer.appendChild(li);          //menambahkan value li tsb ke list-container

        let span = document.createElement("span");  //bikin elemen <span>
        span.innerHTML = " ❌";                  
        li.appendChild(span);                       //tempelin ke li
    }

    inputBox.value = "";    // ngosongin input box
    inputBox.focus();       // Kursor balik ke input box
    saveData();
}

// fungsi biar pencet enter langsung ke add
inputBox.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function(e){    //pasang telinga ke listContainer kalo ada yang click. Dan kalo ada yang klik jalanin fungsi dibawah dgn parameter e
    if(e.target.tagName === "LI"){                      
        e.target.classList.toggle("checked");   // classList  menyimpan SEMUA class elemen, disini pilih toggle. Ada add, remove, dsb. Berfungsi untuk dijalankan ke class (menambah class, menghapus, toggle class, dll)
        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();    //mengakses li (si induk/parentElement) dengan perintah selanjutnya dihapus, menyebabkan si induk kehapus
        saveData();
    }
}, false);      //ada 2 jenis, true dan false. False berarti event naik dari bawah ke atas, sedangkan true sebaliknya. Disini case nya naik dari anak ke induk. Fyi defaultnya false, ga pake jg gpp

function saveData(){                                        //fungsi masukin data ke kulkas (localStorage)
    localStorage.setItem("data", listContainer.innerHTML);  //Nyimpan isi HTML dari listContainer ke dalam localStorage dengan nametag 'data'
}

function showTask(){                                        
    listContainer.innerHTML = localStorage.getItem("data"); //ambil data dari kulkas, tuang data ke listContainer oleh perintah innerHTMl
}

showTask();     //eksekusi hasil fungsi showTask. Hasil final dari fungsi showTask() adalah mengisi listContainer dengan data dari localStorage