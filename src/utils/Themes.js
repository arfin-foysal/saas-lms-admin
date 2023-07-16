export let tableColor;
const colorHandler = (color) => {
    document.documentElement.style.setProperty('--theme-bg-color', color);
    tableColor = color;
}
  
export default colorHandler;