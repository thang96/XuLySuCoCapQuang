//Splash
import Splash from './Splash';
import ContinueScreen from './ContinueScreen';
//Login screen
import LoginScreen from './Login/LoginScreen';
import ForgotPassword from './Login/ForgotPassword';
import ConfirmSuccessfulPasswordChange from './Login/ConfirmSuccessfulPasswordChange';
//Home screen
import HomeScreen from './Home/HomeScreens/HomeScreen';
//-AreaManagement
import AreaManagement from './Home/HomeScreens/AreaManagement/AreaManagement';
import DetailArea from './Home/HomeScreens/AreaManagement/DetailArea/DetailArea';
import DetailAreaUser from './Home/HomeScreens/AreaManagement/DetailArea/DetailAreaUser/DetailAreaUser';
//-EmployeeManager
import EmployeeManager from './Home/HomeScreens/EmployeeManager/EmployeeManager';
import EmployeeDetails from './Home/HomeScreens/EmployeeManager/EmployeeDetails';
//-IncidentManagement
import IncidentManagement from './Home/HomeScreens/IncidentManagement/IncidentManagement';
import InformationListOfCableRoutes from './Home/HomeScreens/IncidentManagement/FiberOpticCableManagement/InformationListOfCableRoutes';
import CableRouteDetails from './Home/HomeScreens/IncidentManagement/FiberOpticCableManagement/CableRouteDetails/CableRouteDetails';
import IncidentHistory from './Home/HomeScreens/IncidentManagement/FiberOpticCableManagement/CableRouteDetails/IncidentHistory/IncidentHistory';
import IncidentList from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentList';
import IncidentDetail from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentDetail/IncidentDetail';
import DetailUserIncident from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentDetail/DetailInformation/DetailUserIncident';
import ReportIncident from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentDetail/ReportIncident/ReportIncident';
import DetailOpticCableIncident from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentDetail/DetailInformation/DetailOpticCableIncident';
import CreateCableRoute from './Home/HomeScreens/IncidentManagement/FiberOpticCableManagement/CreateCableRoute/CreateCableRoute';
//-AcceptRequests DetailUserIncident DetailOpticCableIncident
import AcceptRequests from './Home/HomeScreens/IncidentManagement/AcceptRequests/AcceptRequests';
import DetailRequest from './Home/HomeScreens/IncidentManagement/AcceptRequests/DetailRequest';
//-CreateNewRequest
import CreateNewRequest from './Home/HomeScreens/IncidentManagement/CreateNewRequest/CreateNewRequest';
import ProjectList from './Home/HomeScreens/IncidentManagement/CreateNewRequest/PersonnelList';
//-MaintenanceManagement
import MaintenanceManagement from './Home/HomeScreens/MaintenanceManagement/MaintenanceManagement';
import FiberOpticCableManagement from './Home/HomeScreens/MaintenanceManagement/FiberOpticCableManagement/FiberOpticCableManagement';
import MaintenanceList from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/MaintenanceList';
import FiberOpticCableDetail from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/FiberOpticCableDetail/FiberOpticCableDetail';
import DetailUser from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/FiberOpticCableDetail/DetailInformation/DetailUser';
import DetailOpticCable from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/FiberOpticCableDetail/DetailInformation/DetailOpticCable';
import CreateAMaintenanceRequest from './Home/HomeScreens/MaintenanceManagement/CreateAMaintenanceRequest/CreateAMaintenanceRequest';
import AcceptMaintenanceRequests from './Home/HomeScreens/MaintenanceManagement/AcceptMaintenanceRequests/AcceptMaintenanceRequests';
import DetailMaintenanceRequests from './Home/HomeScreens/MaintenanceManagement/AcceptMaintenanceRequests/DetailMaintenanceRequests';
import ReportMaintenance from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/FiberOpticCableDetail/ReportMaintenance/ReportMaintenance';
import CreateNewCableRoute from './Home/HomeScreens/MaintenanceManagement/FiberOpticCableManagement/CreateNewCableRoute/CreateNewCableRoute';
import FibelOpticCableDetail from './Home/HomeScreens/MaintenanceManagement/FiberOpticCableManagement/FibelOpticCableDetail/FibelOpticCableDetail';
//
import WarehouseManagement from './Home/HomeScreens/WarehouseManagement/WarehouseManagement';
import ListOfSupplies from './Home/HomeScreens/WarehouseManagement/ProjectManagement/ListOfSupplies';
import ProjectManagement from './Home/HomeScreens/WarehouseManagement/ProjectManagement/ProjectManagement';
import SuppliesInformation from './Home/HomeScreens/WarehouseManagement/ProjectManagement/SuppliesInformation';
import ImportAndExportManagementList from './Home/HomeScreens/WarehouseManagement/InventoryManagement/ImportAndExportManagementList';
import InventoryManagement from './Home/HomeScreens/WarehouseManagement/InventoryManagement/InventoryManagement';
import DocumentManagement from './Home/HomeScreens/DocumentManagement/DocumentManagement';
import News from './Home/HomeScreens/News/News';
import ListNews from './Home/HomeScreens/News/ListNews';
import RequirementAccepted from './Home/HomeScreens/IncidentManagement/RequirementAccepted/RequirementAccepted';
import Accepted from './Home/HomeScreens/IncidentManagement/RequirementAccepted/Accepted';
import WorkScreen from './Home/HomeScreens/IncidentManagement/RequirementAccepted/WorkScreen';
//Chat screen
import ChatScreen from './Home/ChatScreens/ChatScreen';
import DetailChat from './Home/ChatScreens/DetailChat';
//Notification screen
import Notification from './Home/NotificationScreens/Notification';
import SettingNotification from './Home/NotificationScreens/SettingNotification';
//Account screen
import AccountScreen from './Home/AccountScreens/AccountScreen';
import Personalinformation from './Home/AccountScreens/Personalinformation/Personalinformation';
import ChangeAddress from './Home/AccountScreens/Personalinformation/ChangeAddress';
import ChangeEmail from './Home/AccountScreens/Personalinformation/ChangeEmail';
import ChangeNumberPhone from './Home/AccountScreens/Personalinformation/ChangeNumberPhone';
import AppSetting from './Home/AccountScreens/Setting/AppSetting';
import ChangePassword from './Home/AccountScreens/Setting/ChangePassword';
//Work list
import WordList from './Home/WordList/WorkList';
import WorkDetails from './Home/WordList/WorkDetails/WorkDetails';
import ReportWork from './Home/WordList/WorkDetails/ReportWork';
export {
  Splash,
  ContinueScreen,
  LoginScreen,
  ForgotPassword,
  ConfirmSuccessfulPasswordChange,
  //Home screen
  HomeScreen,
  //-AreaManagement
  AreaManagement,
  DetailArea,
  DetailAreaUser,
  //-IncidentManagement
  IncidentManagement,
  CreateCableRoute,
  InformationListOfCableRoutes,
  CableRouteDetails,
  IncidentList,
  IncidentDetail,
  IncidentHistory,
  DetailUserIncident,
  DetailOpticCableIncident,
  ReportIncident,
  //-AcceptRequests
  AcceptRequests,
  DetailRequest,
  //-EmployeeManager
  EmployeeManager,
  EmployeeDetails,
  //-CreateNewRequest
  CreateNewRequest,
  //WordList
  WordList,
  WorkDetails,
  ReportWork,
  //-MaintenanceManagement
  MaintenanceManagement,
  FiberOpticCableManagement,
  MaintenanceList,
  FiberOpticCableDetail,
  DetailUser,
  DetailOpticCable,
  CreateAMaintenanceRequest,
  AcceptMaintenanceRequests,
  DetailMaintenanceRequests,
  ReportMaintenance,
  CreateNewCableRoute,
  FibelOpticCableDetail,
  //-
  WarehouseManagement,
  ListOfSupplies,
  ProjectList,
  ProjectManagement,
  SuppliesInformation,
  ImportAndExportManagementList,
  InventoryManagement,
  DocumentManagement,
  News,
  ListNews,
  RequirementAccepted,
  Accepted,
  WorkScreen,
  //Chat screen
  ChatScreen,
  DetailChat,
  //Notification screen
  Notification,
  SettingNotification,
  //Account screen
  AccountScreen,
  ChangeAddress,
  ChangeEmail,
  ChangeNumberPhone,
  Personalinformation,
  AppSetting,
  ChangePassword,
};
