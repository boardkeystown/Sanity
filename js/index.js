const slideShow_images = ["./../assets/gallery/1.png",
    "./../assets/gallery/2.png",
    "./../assets/gallery/3.png"];

var image_index = 0;

var imageContainer = "";


function loadSlideShow() {
    const leftButton = document.getElementsByClassName("btn-left");
    const rightButton = document.getElementsByClassName("btn-right");

    // requestImage();

    Promise.all([slideShow_images[image_index],
        document.getElementById("slideshow-image")
        ]).then(d=> {
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
        ]).then(d=> {
            imageContainer = d[1];
            imageContainer.src = d[0];
        })
        }
    );
    rightButton[0].addEventListener("click", function () {
        image_index = (image_index <= slideShow_images.length-1) ?
            (image_index + 1) % slideShow_images.length :
            0;
        // imageContainer.src = slideShow_images[image_index]
        Promise.all([slideShow_images[image_index],
            document.getElementById("slideshow-image")
        ]).then(d=> {
            imageContainer = d[1];
            imageContainer.src = d[0];
        })
        }
    );
}




