import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

const initialState = {
  skills: [],
  selected: null,
  isModalOpen: false,
};

export const controlModal = createAction("skill/controlModal");
export const showModal = createAction("skill/showModal");
export const deleteSkill = createAction("skill/deleteSkill");
export const editSkill = createAction("skill/editSkill");
export const addSkill = createAction("skill/addSkill", ({ name, percent }) => {
  return {
    payload: {
      name,
      percent,
      id: nanoid(),
    },
  };
});

// const skillReducer = createReducer(initialState, {
//   [showModal]: (state, { payload }) => {
//     state.isModalOpen = true;
//     state.selected = null;
//     payload.resetFields();
//   },

//   [controlModal]: (state) => {
//     state.isModalOpen = !state.isModalOpen;
//   },

//   [addSkill]: (state, { payload }) => {
//     if (state.selected === null) {
//       state.skills.push(payload);
//     } else {
//       state.skills = state.skills.map((el) => {
//         if (el.id === state.selected) {
//           return payload;
//         } else {
//           return el;
//         }
//       });
//     }
//   },

//   [deleteSkill]: (state, { payload }) => {
//     state.skills = state.skills.filter((el) => el.id !== payload);
//   },

//   [editSkill]: (state, { payload: { id, form } }) => {
//     state.isModalOpen = true;
//     let skill = state.skills.find((el) => el.id === id);
//     state.selected = id;
//     form.setFieldsValue(skill);
//   },
// });

const skillReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showModal, (state, { payload }) => {
      state.isModalOpen = true;
      state.selected = null;
      payload.resetFields();
    })

    .addCase(controlModal, (state) => {
      state.isModalOpen = !state.isModalOpen;
    })

    .addCase(addSkill, (state, { payload }) => {
      const { name, percent, id } = payload;
      const newSkill = { name, percent, id, key: id };
      if (state.selected === null) {
        state.skills.push(newSkill);
      } else {
        state.skills = state.skills.map((el) => {
          if (el.id === state.selected) {
            return payload;
          } else {
            return el;
          }
        });
      }
    })

    .addCase(deleteSkill, (state, { payload }) => {
      state.skills = state.skills.filter((el) => el.id !== payload);
    })

    .addCase(editSkill, (state, { payload: { id, form } }) => {
      state.isModalOpen = true;
      let skill = state.skills.find((el) => el.id === id);
      state.selected = id;
      form.setFieldsValue(skill);
    });
});

export default skillReducer;
