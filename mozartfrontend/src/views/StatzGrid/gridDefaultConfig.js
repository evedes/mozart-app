export const defaultLayouts = {
  lg: [
    { i: 'StatzHeader', x: 0, y: 0, w: 3, h: 5, minH: 5 },
    { i: 'NetworkInterfacesWidget', x: 0, y: 5, w: 3, h: 8, minH: 8 },
    { i: 'SystemLoadAverageWidget', x: 0, y: 13, w: 3, h: 8, minH: 8 },
  ],
  md: [
    { i: 'StatzHeader', x: 0, y: 0, w: 2, h: 5, minH: 5 },
    { i: 'NetworkInterfacesWidget', x: 0, y: 5, w: 2, h: 8, minH: 8 },
    { i: 'SystemLoadAverageWidget', x: 0, y: 13, w: 2, h: 8, minH: 8 },
  ],
  sm: [
    { i: 'StatzHeader', x: 0, y: 0, w: 1, h: 5, minH: 5 },
    { i: 'NetworkInterfacesWidget', x: 0, y: 5, w: 1, h: 8, minH: 8 },
    { i: 'SystemLoadAverageWidget', x: 0, y: 13, w: 5, h: 8, minH: 8 },
  ],
};

export const rowHeight = 30;

export const defaultBreakpoints = {
  lg: 1600,
  md: 1280,
  sm: 980,
};

export const defaultCols = {
  lg: 3,
  md: 2,
  sm: 1,
};
