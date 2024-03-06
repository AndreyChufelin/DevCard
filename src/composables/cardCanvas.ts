import { ref } from "vue";
import { qrcanvas } from "qrcanvas";

import backgroundImage from "../assets/cardCanvas/background.png";
import backgroundImage2 from "../assets/cardCanvas/background2.png";
import backgroundImage3 from "../assets/cardCanvas/background3.png";
import canvasIcons from "../utils/canvasIcons";

export interface DrawOptions {
  size: string;
  info: {
    name: string;
    jobTitle: string;
    skills: string[];
    socials: Social[];
    qrcode: string;
  };
  colors: {
    primary: string;
    second: string;
    accent: string | Gradient;
  };
  background: string;
}

export interface Social {
  text: string;
  type: string;
}

export type Gradient = [string, string];

export const backgroundImages = [
  { name: "background", src: backgroundImage, width: 850, height: 500 },
  { name: "background2", src: backgroundImage2, width: 850, height: 500 },
  { name: "background3", src: backgroundImage3, width: 850, height: 500 },
];

export function useCardCanvas(onLoad: Function) {
  const resultURL = ref();
  const loading = ref(true);

  var canvas = document.createElement("canvas") as HTMLCanvasElement;
  var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = 850;
  canvas.height = 500;

  const imageURL = [...backgroundImages];
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

  function draw(options: DrawOptions) {
    if (loading.value) return;
    console.log("size", options.size);
    if (options.size === "large") {
      canvas.width = 850;
      canvas.height = 500;
    } else {

      canvas.width = 365;
      canvas.height = 500;
    }
    ctx.drawImage(images[options.background], 0, 0);

    //TG
    let iconsCount = 0;
    options.info.socials.forEach((social, index) => {
      if (index > 3 || social.text === "") {
        return;
      }

      ctx.fillStyle = options.colors.primary;
      let iconPath = new Path2D();
      const iconY = options.size==="large" ? (185 - 40 * iconsCount) : (125 - 25 * iconsCount)
      const iconScale = options.size==="large" ? 1 : 0.7

      var m = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix()
      m.scale(0.5)

      canvasIcons[social.type].forEach((icon) => {
        let path = new Path2D(icon);
        iconPath.addPath(path, {
          a: iconScale,
          d: iconScale,
          e: 35,
          f: canvas.height - iconY,
        });
      });

      ctx.fill(iconPath, "evenodd");

      ctx.font = `${options.size === "large" ? "24px" : "16px"} Montserrat`;
      ctx.fillStyle = options.colors.primary;
      const textY =
        options.size === "large"
          ? 165 - 40 * iconsCount
          : 110 - 25 * iconsCount;

      ctx.fillText(social.text, 35 + 30, canvas.height - textY);
      iconsCount++;
    });

    //Name
    if (options.size === "large") {
      ctx.textAlign = "left";
      ctx.font = "bold 48px Montserrat";
      ctx.fillStyle = options.colors.primary;

      ctx.fillText(options.info.name, 35, 35 + 48);
    } else {
      ctx.textAlign = "center";
      ctx.font = "bold 24px Montserrat";
      ctx.fillStyle = options.colors.primary;

      ctx.fillText(options.info.name, canvas.width / 2, 50);
    }

    //Job
    if (options.size === "large") {
      const jobTitle = options.info.jobTitle;
      ctx.fillStyle = getColor(
        options.colors.accent,
        ctx.measureText(jobTitle).width
      );

      ctx.fillText(jobTitle, 35, 135);
    } else {
      const jobTitle = options.info.jobTitle;
      ctx.fillStyle = getColor(options.colors.accent);

      ctx.fillText(jobTitle, canvas.width / 2, 80);
    }

    //Skills
    if (options.size === "large") {
      ctx.font = "16px Montserrat";
      ctx.fillStyle = options.colors.second;

      ctx.fillText(options.info.skills.join(" • "), 35, 170);
    } else {
      ctx.font = "14px Montserrat";
      ctx.fillStyle = options.colors.second;

      ctx.fillText(options.info.skills.join(" • "), canvas.width / 2, 105);
    }

    //QRcode
    if (options.size === "large") {
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
    } else {
      getQR(options.info.qrcode || "Hello, world!", options.colors.accent).then(
        (img) => {
          ctx.drawImage(
            img as HTMLImageElement,
            canvas.width - 115,
            canvas.height - 120,
            80,
            80
          );
          save();
        }
      );
    }
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
