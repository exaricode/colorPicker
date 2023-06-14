// Convert rgba to hsla
function rgbaToHsla(rgba: string) {
    const color = <string[]> rgba.substring(5).split(')')[0].split(',');

    let r = parseInt(color[0]) / 255;
    let g = parseInt(color[1]) / 255;
    let b = parseInt(color[2]) / 255;
    let a = parseInt(color[3]);

    let cmax = Math.max(r, g, b);
    let cmin = Math.min(r, g, b);
    let delta = cmax - cmin;
    let h = 0, s = 0, l = 0;

    if (delta == 0) {
        h = 0;
    } else if (cmax == r) {
        h = ((g - b) / delta) % 6;

    } else if (cmax == g) {
        h = (b - r) / delta + 2;
    } else {
        h = (b - r) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }

    l = (cmax + cmin) / 2;

    if (cmax == cmin) {
        s = 0;
    } else if (l <= 0.5) {
        s = (cmax - cmin) / (cmax + cmin);
    } else {
        s = (cmax - cmin) / (2.0 - cmax - cmin);
    }

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

// Convert hsla to rgba
function hslaToRgba(hsla: string) {
    const color = <string[]> hsla.substring(5).split(')')[0].split(',');

    let h = parseInt(color[0]);
    let s = parseInt(color[1].substring(0, color[1].length - 1)) / 100;
    let l = parseInt(color[2].substring(0, color[2].length - 1)) / 100;
    let a = parseInt(color[3]);

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
        r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export {rgbaToHsla, hslaToRgba}