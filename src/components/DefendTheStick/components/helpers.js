export const getDisplay = () => new Promise((resolve) => {
  navigator.getVRDisplays().then((displays) => {
    resolve(
      !!displays &&
      displays.length > 0 &&
      displays[0].capabilities &&
      displays[0].isConnected &&
      displays[0].capabilities.hasExternalDisplay
    )
  });
});

export default {};
