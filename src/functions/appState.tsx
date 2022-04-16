export const openForm = (id: number, setState: (state: string) => void) => {
  setState(`FORM-${id}`);
};

export const closeForm = (setState: (state: string) => void) => {
  setState("LIST");
};

export const openAbout = (setState: (state: string) => void) => {
  setState("ABOUT");
};

export const openList = (setState: (state: string) => void) => {
  setState("LIST");
};

export const closeList = (setState: (state: string) => void) => {
  setState("HOME");
};

// module.exports = {
//   openForm: openForm,
//   closeForm: closeForm,
//   openAbout: openAbout,
//   openList: openList,
//   closeList: closeList,
// };
