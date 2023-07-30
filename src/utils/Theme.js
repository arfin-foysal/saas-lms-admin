export let tableColor;
export let modalColor;
const colorHandler = (color) => {
    document.documentElement.style.setProperty('--theme-bg-color', color);
    tableColor = color;
    modalColor = color;
}
  
export default colorHandler;