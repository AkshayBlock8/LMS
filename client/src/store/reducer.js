const initialState = {
  data: [
    {
      id: 1,
      type: "Sick",
      from: "14 Feb 2020",
      to: "15 Feb 2020",
      days: 1,
      status: "pending"
    },
    {
      id: 2,
      type: "Casual",
      from: "14 Feb 2020",
      to: "15 Feb 2020",
      days: 2,
      status: "rejected"
    }
  ],
  leaves: [
    {
      type: "Sick",
      available: 8,
      taken: 1,
      total: 9
    },
    {
      type: "Casual",
      available: 10,
      taken: 0,
      total: 10
    },
    {
      type: "Paid",
      available: 15,
      taken: 0,
      total: 15
    }
  ]
};

const rootReducer = (state = initialState, action) => {
  console.log(state.data);
  switch (action.type) {
    case "ADD_LEAVE_REQUEST":
      let currData = state.data;
      let currLeaves = state.leaves;

      for (let index in state.leaves) {
        if (
          state.leaves[index].type === action.data.type &&
          state.leaves[index].available < action.data.days
        ) {
          return state;
        }
      }
      currData = currData.concat(action.data);
      return {
        data: currData,
        leaves: currLeaves.map((item, index) => {
          if (
            item.available >= action.data.days &&
            item.type === action.data.type
          ) {
            return {
              ...item,
              available: item.available - action.data.days,
              taken: item.taken + action.data.days
            };
          }
          return item;
        })
      };
    default:
      return state;
  }
};

export default rootReducer;
