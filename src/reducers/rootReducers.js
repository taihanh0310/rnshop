// "use strict"
// import { combineReducers } from 'redux';

// // rp connection
// import { rpAuthencationsReducers } from '../modules/rpConnections/rpAuthencation/reducers/login';
// import { rpDashboardReducers } from '../modules/rpConnections/rpDashboard/reducers/list';
// import { rpLibrariesReducers } from '../modules/rpConnections/rpLibraries/reducers/list';
// import { rpPresentationsReducers } from '../modules/rpConnections/rpPresentations/reducers/list';
// import { rpEmailManagementsReducers } from '../modules/rpConnections/rpEmailManagement/reducers/list';
// import { rpTrackingsReducers } from '../modules/rpConnections/rpTrackings/reducers/list';
// // end rp connection

// import { drchoicesReducers } from '../modules/drChoice/reducers/list';
// import { highlightProductReducers } from '../modules/highlightProducts/reducers/list';
// import { productsReducers } from '../modules/allProducts/reducers/list';
// import { vdwActionsReducers } from '../modules/actions/reducers/vdwActionsReducers';
// import { smilestonesReducers } from '../modules/smilestones/reducers/list';
// import { libStudiesReducers } from '../modules/libStudies/reducers/list';
// import { lib4StepTreatmentsReducers } from '../modules/lib4StepTreatment/reducers/list';

// //HERE COMBINE THE REDUCERS
// const appReducer = combineReducers({
//     drchoices: drchoicesReducers,
//     products: productsReducers,
//     highlightProducts:highlightProductReducers,
//     vdwActions: vdwActionsReducers,
//     smilestones: smilestonesReducers,
//     libStudies: libStudiesReducers,
//     lib4StepTreatments: lib4StepTreatmentsReducers,
//     rpAuthencations: rpAuthencationsReducers,
//     rpDashboard:rpDashboardReducers,
//     rpPresentations: rpPresentationsReducers,
//     rpLibraries: rpLibrariesReducers,
//     rpEmailManagements:rpEmailManagementsReducers,
//     rpTrackings: rpTrackingsReducers
// });

// const RootReducers = (state, action) => {
//     if (action.type === 'RP_LOGOUT') {
//       state = undefined
//     }
  
//     return appReducer(state, action);
//   };

// export default RootReducers;
  