const gameContainer = document.querySelector(".container"),
    userResult = document.querySelector(".user_result img"),
    cpuResult = document.querySelector(".cpu_result img"),
    result = document.querySelector(".result"),
    optionImages = document.querySelectorAll(".option")
;   //syntax shortcut. Sama dengan const a = 1; const b = 2;

function getCpuChoice() {                   //perbedaan function xx() dengan function xx(a, b) ialah function xx() tidak menerima input & selalu melakukan hasil yang sama. Cocok utk aksi tetap
    const choices = ["R", "P", "S"];        //array
    const images = {                        //object. diakses dgn key (R, P, S). Masing2 key punya value
        R: "css/img/rock-hand.png",
        P: "css/img/paper-hand.png",
        S: "css/img/scissors-hand.png",
    };
    const randomIndex = Math.floor(Math.random() * 3);

    return {
        value: choices[randomIndex],
        image: images[choices[randomIndex]],
    };
}

function getWinner(user, cpu) {         //Sementara function xx(a, b) menerima input, hasil tergantung a dan b tsb, sehingga lebih fleksibel
    if (user === cpu) return "Draw";    //kalo cuma 1 statement ga masalah gapake {}

    if (user === "R") {         //"kalo user pilih rock (kondisi 1)
        if (cpu === "S") {      //dan cpu pilih scissors (kondisi 2"    
            return "User";
        }else{
            return "CPU";       //Logika utk part ini adalah kalo user pilih Rock, dan cpu bukan pilih scissors (Yang berarti opsi yg tersisa adalah Paper, karena R === R udah di handle sama if sebelumnya), maka return yang diberi adalah "CPU".
        }
    }

    if (user === "P") {                 //ver gapake else (lebih ringkas)
        if (cpu === "R") return "User"; //lebih baik digunakan klo cm ada 2 kemungkinan jelas
        return "CPU";
    }

    if (user === "S") {
        if (cpu === "P") return "User";
        return "CPU";
    }
}
//forEach punya aturan default urutan parameter, yaitu currentItem, index, array (ga wajib diisi, kecuali kalo bakal dipake)
optionImages.forEach((option, index) => {       //option merujuk ke satu elemen dari optionImages, index ialah nomor urut elemen tsb(dimulai dari 0), dan forEach berfungsi utk mengiterasi seluruh optionImages
    option.addEventListener("click", () => {    //listener dipasang ke option

        optionImages.forEach(o => o.classList.remove("active"));    //buat variabel baru bernama o, o mewakili objek yg ada saat ini, yaitu option, lebih spesifiknya mewakili 1 elemen dari optionIMages
        option.classList.add("active");                             //logikanya itu semua option class "active"nya dihapus, lalu setelahnya option yang barusan di klik langsung ditambah class "active"
        
        userResult.src = cpuResult.src = "css/img/rock-hand.png";

        gameContainer.classList.add("start");
        result.textContent = "And the winner is...";        //mirip innerHTML, tapi gapake logika html. Contohnya kalo pake <b>, pake innerHTML teks bakal jadi bold, sementara pake textContent bakal muncul "<b>" biasa. 

        setTimeout(() => {          //sama aja setTimeout(function() {; 
                                    //fungsi bawaan JS disini yaitu setTimeout(function, delay)
        gameContainer.classList.remove("start");
        
        const userChoices = ["R", "P", "S"];
        const userImages = [
            "css/img/rock-hand.png",
            "css/img/paper-hand.png",
            "css/img/scissors-hand.png"
        ];

        const userValue = userChoices[index];
        userResult.src = userImages[index];         //fyi .src tu kayak innerHTML tapi versi ngubah img

        const cpu = getCpuChoice();
        cpuResult.src = cpu.image;

        const winner = getWinner(userValue, cpu.value);
        result.textContent =
            winner === "Draw" ? "Match Draw" : `${winner} Won!`;    //kondisi ? nilai_jika_true : nilai_jika_false. Jdi mirip if else
                //Klo dibedah: winner === "Draw"
                            // ? "Match Draw"
                            // : `${winner} Won!`;
        }, 2500);       //Delay. Kode dijalankan setelah delay 2.5 detik
    });    
});