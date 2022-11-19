const slideShow_images = [
    "assets/home/1.png",
    "assets/home/2.png",
    "assets/home/3.png",
    "assets/home/4.png"];
let image_index = 0;
let imageContainer = "";

function loadSlideShow() {
    const leftButton = document.getElementsByClassName("btn-left");
    const rightButton = document.getElementsByClassName("btn-right");

    Promise.all([slideShow_images[image_index],
        document.getElementById("slideshow-image")
    ]).then(d => {
        imageContainer = d[1];
        imageContainer.src = d[0];
    })

    leftButton[0].addEventListener("click", function () {
            image_index = (image_index <= 0) ?
                slideShow_images.length - 1 :
                (image_index - 1) % slideShow_images.length;
            // imageContainer.src = slideShow_images[image_index]
            Promise.all([slideShow_images[image_index],
                document.getElementById("slideshow-image")
            ]).then(d => {
                imageContainer = d[1];
                imageContainer.src = d[0];
                imageContainer.alt = "example_image";
            })
        }
    );
    rightButton[0].addEventListener("click", function () {
            image_index = (image_index <= slideShow_images.length - 1) ?
                (image_index + 1) % slideShow_images.length :
                0;
            // imageContainer.src = slideShow_images[image_index]
            Promise.all([slideShow_images[image_index],
                document.getElementById("slideshow-image")
            ]).then(d => {
                imageContainer = d[1];
                imageContainer.src = d[0];
            })
        }
    );
}




