import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import request from "../../server";

const initialState = {
  skills: [],
  selected: null,
  isModalOpen: false,
  error: null,
  total: 0,
  loading: false,
  btnLoading: false,
};

export const getSkill = createAsyncThunk(
  "skill/getSkill",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await request.get("skills");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSkills = createAsyncThunk(
  "skill/getSkills",
  async (action, { rejectWithValue }) => {
    try {
      const { data } = await request.get(`skills/${action}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addSkill = createAsyncThunk(
  "skill/addSkill",
  async (action, { rejectWithValue }) => {
    try {
      await request.post("skills", action);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "skill/deleteSkill",
  async (action, { rejectWithValue }) => {
    try {
      await request.delete(`skills/${action}`);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const updateSkill = createAsyncThunk(
  "skill/putSkill",
  async (action, { rejectWithValue }) => {
    try {
      await request.put(`skills/${action.id}`, action.values);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    showModal(state, { payload }) {
      state.isModalOpen = true;
      state.selected = null;
      payload.resetFields();
    },

    controlModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },

    // addSkill: {
    //   reducer: (state, { payload }) => {
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
    //   prepare: (data) => {
    //     return {
    //       payload: {
    //         ...data,
    //         id: nanoid(),
    //       },
    //     };
    //   },
    // },

    // deleteSkill(state, { payload }) {
    //   state.skills = state.skills.filter((el) => el.id !== payload);
    // },

    editSkill(state, { payload }) {
      state.isModalOpen = true;
      state.selected = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkill.fulfilled, (state, { payload }) => {
        state.skills = payload.data;
        state.total = payload.pagination.total;
        state.loading = false;
      })
      .addCase(getSkill.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
      })
      .addCase(addSkill.pending, (state) => {
        state.btnLoading = true;
      })
      .addCase(addSkill.fulfilled, (state) => {
        state.btnLoading = false;
      })
      .addCase(addSkill.rejected, (state) => {
        state.btnLoading = false;
      }),
});

// const skillReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(showModal, (state, { payload }) => {
//       state.isModalOpen = true;
//       state.selected = null;
//       payload.resetFields();
//     })

//     .addCase(controlModal, (state) => {
//       state.isModalOpen = !state.isModalOpen;
//     })

//     .addCase(addSkill, (state, { payload }) => {
//       if (state.selected === null) {
//         state.skills.push(payload);
//       } else {
//         state.skills = state.skills.map((el) => {
//           if (el.id === state.selected) {
//             return payload;
//           } else {
//             return el;
//           }
//         });
//       }
//     })

//     .addCase(deleteSkill, (state, { payload }) => {
//       state.skills = state.skills.filter((el) => el.id !== payload);
//     })

//     .addCase(editSkill, (state, { payload: { id, form } }) => {
//       state.isModalOpen = true;
//       let skill = state.skills.find((el) => el.id === id);
//       state.selected = id;
//       form.setFieldsValue(skill);
//     });
// });

// export const { controlModal, showModal, deleteSkill, editSkill, addSkill } =
//   skillSlice.actions;

export const { controlModal, showModal, editSkill } = skillSlice.actions;

export default skillSlice.reducer;
