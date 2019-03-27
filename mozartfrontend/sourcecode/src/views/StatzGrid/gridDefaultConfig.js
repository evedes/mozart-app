export const defaultLayouts = {
  lg: [
    { i: 'StatzHeader', x: 0, y: 0, w: 2, h: 4, minH: 4, static: true },
    {
      i: 'ProcessesStatzWidget',
      x: 2,
      y: 0,
      w: 1,
      h: 4,
      minH: 4,
      static: true,
    },
    { i: 'NetworkInterfacesWidget', x: 0, y: 4, w: 3, h: 8, minH: 8 },
    { i: 'SystemLoadAverageWidget', x: 0, y: 12, w: 3, h: 8, minH: 8 },
    { i: 'MemoryStatzWidget', x: 0, y: 20, w: 3, h: 8, minH: 8 },
  ],
  md: [
    { i: 'StatzHeader', x: 0, y: 0, w: 1, h: 4, minH: 4, static: true },
    {
      i: 'ProcessesStatzWidget',
      x: 1,
      y: 0,
      w: 1,
      h: 4,
      minH: 4,
      static: true,
    },
    { i: 'NetworkInterfacesWidget', x: 0, y: 4, w: 2, h: 8, minH: 8 },
    { i: 'SystemLoadAverageWidget', x: 0, y: 12, w: 2, h: 8, minH: 8 },
    { i: 'MemoryStatzWidget', x: 0, y: 20, w: 2, h: 8, minH: 8 },
  ],
  sm: [
    { i: 'StatzHeader', x: 0, y: 0, w: 1, h: 4, minH: 4, static: true },
    {
      i: 'ProcessesStatzWidget',
      x: 0,
      y: 4,
      w: 5,
      h: 3,
      minH: 3,
      static: true,
    },
    { i: 'NetworkInterfacesWidget', x: 0, y: 7, w: 1, h: 8, minH: 8 },
    { i: 'SystemLoadAverageWidget', x: 0, y: 15, w: 5, h: 8, minH: 8 },
    { i: 'MemoryStatzWidget', x: 0, y: 23, w: 5, h: 8, minH: 8 },
  ],
};

export const rowHeight = 30;
