import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./Reducers/BlogsReducer";
import servicesReducer from "./Reducers/ServicesReducer";
import contactsReducer from "./Reducers/ContactsReducer";
import portfoliosReducer from "./Reducers/PortfoliosReducer";
import testimonialsReducer from "./Reducers/TestimonialsReducer";
import teamsReducer from "./Reducers/TeamsReducer";
import commonReducer from "./Reducers/CommonReducer";

const store = configureStore({
  reducer: {
    blogsInfo: blogsReducer,
    servicesInfo: servicesReducer,
    contactsInfo: contactsReducer,
    portfoliosInfo: portfoliosReducer,
    testimonialsInfo: testimonialsReducer,
    teamMembersInfo: teamsReducer,
    commonInfo: commonReducer,
  },
});

export default store;
