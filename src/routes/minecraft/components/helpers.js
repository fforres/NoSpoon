export const getDisplay = () => new Promise((resolve) => {
  navigator.getVRDisplays().then(displays => {
    resolve(displays.length > 0 && displays[0].isConnected)
  });
});
