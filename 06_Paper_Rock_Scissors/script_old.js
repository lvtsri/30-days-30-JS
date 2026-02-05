const gameContainer = document.querySelector(".container"),
    userResult = document.querySelector(".user_result img"),
    cpuResult = document.querySelector(".cpu_result img"),
    result = document.querySelector(".result"),
    optionImages = document.querySelectorAll(".option")
;

optionImages.forEach(
    (image, index) => {            //bebas nama variabelnya btw
        image.addEventListener("click", (e) => {
            image.classList.add("active");              //pas di klik classnya ketambah "active"

            userResult.src = cpuResult.src = "css/img/rock-hand.png";
            result.textContent = "And the winner is..."

            optionImages.forEach(
                (image2, index2) => {
                    index !== index2 && image2.classList.remove("active");
                }
            );

            gameContainer.classList.add("start");

            let time = setTimeout(() => {
                gameContainer.classList.remove("start");
                let imageSrc = e.target.querySelector("img").src;
                userResult.src = imageSrc;

                let randomNumber = Math.floor(Math.random() * 3);
                let cpuImages = [
                    "css/img/rock-hand.png", 
                    "css/img/paper-hand.png", 
                    "css/img/scissors-hand.png"];

                cpuResult.src = cpuImages[randomNumber];

                let userValue = ["R", "P", "S"][index];
                let cpuValue = ["R", "P", "S"][randomNumber];

                let outcomes = {    //User | CPU
                    RR: "Draw",
                    RP: "CPU",
                    RS: "User",
                    PP: "Draw",
                    PR: "User",
                    PS: "CPU",
                    SS: "Draw",
                    SR: "CPU",
                    SP: "User",
                };

                let outComeValue = outcomes[userValue + cpuValue];

                result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!`;
            }, 2500)
        });
    }
);