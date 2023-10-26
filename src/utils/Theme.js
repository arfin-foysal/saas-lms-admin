export let tableColor;
export let modalColor;
const colorHandler = (themeColor,sidebarColor,textColor,linkColor,activeColor,hoverColor,contentColor) => {
    document.documentElement.style.setProperty('--theme-bg-color', themeColor);
    document.documentElement.style.setProperty('--sidebar-bg-color', sidebarColor);
    document.documentElement.style.setProperty('--theme-link-color', linkColor);
    document.documentElement.style.setProperty('--theme-text-color', textColor);
    document.documentElement.style.setProperty('--theme-active-color', activeColor);
    document.documentElement.style.setProperty('--theme-hover-color', hoverColor);
    document.documentElement.style.setProperty('--theme-content-wrapper-color', contentColor);
    
    tableColor = themeColor;
    modalColor = themeColor;
}
  
export default colorHandler;