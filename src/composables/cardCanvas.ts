import { ref } from "vue";
import { qrcanvas } from "qrcanvas";

import backgroundImage from "../assets/cardCanvas/s.png";
import tgImage from "../assets/cardCanvas/tg.svg";
import githubImage from "../assets/cardCanvas/github.svg";
import emailImage from "../assets/cardCanvas/email.svg";
import { Gradient } from "../components/InputColorGradient.vue";

export interface EditorOptions {
  info: {
    name: string;
    jobTitle: string;
    skills: string[];
    socials: SocialItem[];
    qrcode: string;
  };
  colors: {
    primary: string;
    second: string;
    accent: string | Gradient;
  };
}

export interface SocialItem {
  text: string;
  type: string;
}

export function useCardCanvas(onLoad: Function) {
  const resultURL = ref();
  const loading = ref(true);

  var canvas = document.createElement("canvas") as HTMLCanvasElement;
  var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = 850;
  canvas.height = 500;

  const imageURL = [
    { name: "background", src: backgroundImage, width: 850, height: 500 },
    { name: "tg", src: tgImage, width: 25, height: 25 },
    { name: "github", src: githubImage, width: 25, height: 25 },
    { name: "email", src: emailImage, width: 25, height: 25 },
  ];
  const images: {
    [key: string]: HTMLImageElement;
  } = {};
  let imageCount = 0;

  imageURL.forEach((img) => {
    const image = new Image(img.width, img.height);
    image.src = img.src;

    image.addEventListener("load", () => {
      imageCount++;

      if (imageCount === imageURL.length) {
        loading.value = false;
        onLoad();
      }
    });
    images[img.name] = image;
  });

  function getColor(color: string | Gradient, width = canvas.width) {
    if (Array.isArray(color)) {
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      color.forEach((c, index, colors) => {
        gradient.addColorStop(index * (1 / (colors.length - 1)), c);
      });

      return gradient;
    }

    return color;
  }

  function draw(options: EditorOptions) {
    ctx.drawImage(images.background, 0, 0);

    //TG
    options.info.socials.forEach((social, index) => {
      if (index > 3) {
        return;
      }

      // ctx.fillStyle = options.colors.primary;
      // ctx.fillRect(35, canvas.height - (185 - 40 * index), 25, 25);
      // ctx.globalCompositeOperation = "destination-in";

      // ctx.drawImage(
      //   images[social.type],
      //   35,
      //   canvas.height - (185 - 40 * index),
      //   25,
      //   25
      // );
      // ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = options.colors.primary;
      let p = new Path2D(
        "M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z"
      );
      // ctx.translate(100, 100);
      let p2 = new Path2D();
      p2.addPath(p, { e: 35, f: canvas.height - (185 - 40 * index) });

      ctx.fill(p2);

      ctx.font = "24px Montserrat";
      ctx.fillStyle = options.colors.primary;
      ctx.fillText(social.text, 35 + 30, canvas.height - (165 - 40 * index));
    });

    getQR(options.info.qrcode || "Hello, world!", options.colors.accent).then(
      (img) => {
        ctx.drawImage(
          img as HTMLImageElement,
          canvas.width - 165,
          canvas.height - 183,
          130,
          130
        );
        save();
      }
    );

    //Name
    ctx.font = "bold 48px Montserrat";
    ctx.fillStyle = options.colors.primary;
    ctx.fillText(options.info.name || "Ваше имя", 35, 35 + 48);

    //Job
    const jobTitle = options.info.jobTitle || "Ваша должность";
    ctx.fillStyle = getColor(
      options.colors.accent,
      ctx.measureText(jobTitle).width
    );
    ctx.fillText(jobTitle, 35, 135);

    //Skills
    ctx.font = "16px Montserrat";
    ctx.fillStyle = options.colors.second;
    ctx.fillText(options.info.skills.join(" • "), 35, 170);

    save();
  }

  function save() {
    var url = canvas.toDataURL();

    resultURL.value = url;

    // var link = document.querySelector("a");
    // link.download = "devcard.png";
    // link.href = url;
    // var img = document.querySelector("img");
    // img.src = url;
  }

  function getQR(data: string, color: string | Gradient) {
    return new Promise((resolve) => {
      const fg = document.createElement("canvas");
      fg.width = 130;
      fg.height = 130;
      const ctxQR = fg.getContext("2d") as CanvasRenderingContext2D;

      ctxQR.fillStyle = getColor(color, fg.width);
      ctxQR.fillRect(0, 0, fg.width, fg.height);

      const QRCanvas = qrcanvas({
        size: fg.width,
        data: data,
        foreground: fg,
        effect: { type: "fusion" },
        background: "transparent",
      });
      const QR_URL = QRCanvas.toDataURL();
      const img = new Image(fg.width, fg.height);
      img.src = QR_URL;

      img.addEventListener("load", () => {
        resolve(img);
      });
    });
  }

  return {
    resultURL,
    loading,
    draw,
  };
}
