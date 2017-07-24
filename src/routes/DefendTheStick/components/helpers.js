export const getDisplay = () => new Promise((resolve) => {
  navigator.getVRDisplays().then(displays => {
    const { capabilities } = displays[0];
    resolve(
      displays.length > 0 &&
      displays[0].isConnected &&
      capabilities.hasExternalDisplay
    )
  });
});
