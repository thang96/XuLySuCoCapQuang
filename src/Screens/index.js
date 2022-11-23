//Splash
import Splash from './Splash';
import ContinueScreen from './ContinueScreen';
import ShowImageScreen from './ShowImageScreen';
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
import IncidentList from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentList';
import IncidentDetail from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentDetail/IncidentDetail';
import EditIncident from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentDetail/EditIncident/EditIncident';
import DetailUserIncident from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentDetail/DetailInformation/DetailUserIncident';
import ReportIncident from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentDetail/ReportIncident/ReportIncident';
import DetailOpticCableIncident from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentDetail/DetailInformation/DetailOpticCableIncident';
import ReportIncidentDetail from './Home/HomeScreens/IncidentManagement/IncidentList/IncidentDetail/ReportIncident/ReportIncidentDetail';
//--CompilationOfCrashReports
import CableRouteReport from './Home/HomeScreens/IncidentManagement/CompilationOfCrashReports/CableRouteReport';
import CompilationOfCrashReports from './Home/HomeScreens/IncidentManagement/CompilationOfCrashReports/CompilationOfCrashReports';
import DetailOfCrashReports from './Home/HomeScreens/IncidentManagement/CompilationOfCrashReports/DetailOfCrashReports';
//-FiberOpticCableManagement
import FiberOpticCableManagement from './Home/HomeScreens/FiberOpticCableManagement/FiberOpticCableManagement';
import CreateNewCableRoute from './Home/HomeScreens/FiberOpticCableManagement/CreateNewCableRoute/CreateNewCableRoute';
import FibelOpticCableDetail from './Home/HomeScreens/FiberOpticCableManagement/FibelOpticCableDetail/FibelOpticCableDetail';
//-AcceptRequests DetailUserIncident DetailOpticCableIncident
import AcceptRequests from './Home/HomeScreens/IncidentManagement/AcceptRequests/AcceptRequests';
//-CreateNewRequest
import CreateNewRequest from './Home/HomeScreens/IncidentManagement/CreateNewRequest/CreateNewRequest';
//-MaintenanceManagement
import MaintenanceManagement from './Home/HomeScreens/MaintenanceManagement/MaintenanceManagement';
import MaintenanceList from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/MaintenanceList';
import MaintenanceDetail from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/MaintenanceDetail/MaintenanceDetail';
import DetailUser from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/MaintenanceDetail/DetailInformation/DetailUser';
import DetailOpticCable from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/MaintenanceDetail/DetailInformation/DetailOpticCable';
import CreateAMaintenanceRequest from './Home/HomeScreens/MaintenanceManagement/CreateAMaintenanceRequest/CreateAMaintenanceRequest';
import EditMaintenance from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/MaintenanceDetail/EditMaintenance/EditMaintenance';
import AcceptMaintenanceRequests from './Home/HomeScreens/MaintenanceManagement/AcceptMaintenanceRequests/AcceptMaintenanceRequests';
import ReportMaintenance from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/MaintenanceDetail/ReportMaintenance/ReportMaintenance';
import ReportMaintenanceDetail from './Home/HomeScreens/MaintenanceManagement/MaintenanceList/MaintenanceDetail/ReportMaintenance/ReportMaintenanceDetail';
//--GeneralMaintenanceReport
import MaintenanceCableRouteReport from './Home/HomeScreens/MaintenanceManagement/GeneralMaintenanceReport/MaintenanceCableRouteReport';
import GeneralMaintenanceReport from './Home/HomeScreens/MaintenanceManagement/GeneralMaintenanceReport/GeneralMaintenanceReport';
import DetailedMaintenanceReport from './Home/HomeScreens/MaintenanceManagement/GeneralMaintenanceReport/DetailedMaintenanceReport';
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
import NotificationScreens from './Home/NotificationScreens/NotificationScreens';
import SettingNotification from './Home/NotificationScreens/SettingNotification';
//Account screen
import AccountScreen from './Home/AccountScreens/AccountScreen';
import Personalinformation from './Home/AccountScreens/Personalinformation/Personalinformation';
import AppSetting from './Home/AccountScreens/Setting/AppSetting';
import ChangePassword from './Home/AccountScreens/ChangePassword/ChangePassword';
//Work list
import WordList from './Home/WordList/WorkList';
export {
  Splash,
  ContinueScreen,
  ShowImageScreen,
  //Login
  LoginScreen,
  ForgotPassword,
  ConfirmSuccessfulPasswordChange,
  //Home screen
  HomeScreen,
  //-AreaManagement
  AreaManagement,
  DetailArea,
  DetailAreaUser,
  //--IncidentManagement
  IncidentManagement,
  IncidentList,
  IncidentDetail,
  EditIncident,
  DetailUserIncident,
  DetailOpticCableIncident,
  ReportIncident,
  ReportIncidentDetail,
  //-FiberOpticCableManagement
  FiberOpticCableManagement,
  CreateNewCableRoute,
  FibelOpticCableDetail,
  //--CompilationOfCrashReports
  CableRouteReport,
  CompilationOfCrashReports,
  DetailOfCrashReports,
  //-AcceptRequests
  AcceptRequests,
  //-EmployeeManager
  EmployeeManager,
  EmployeeDetails,
  //-CreateNewRequest
  CreateNewRequest,
  //WordList
  WordList,
  //-MaintenanceManagement
  MaintenanceManagement,
  MaintenanceList,
  MaintenanceDetail,
  DetailUser,
  DetailOpticCable,
  CreateAMaintenanceRequest,
  EditMaintenance,
  AcceptMaintenanceRequests,
  ReportMaintenance,
  ReportMaintenanceDetail,
  //--GeneralMaintenanceReport
  GeneralMaintenanceReport,
  MaintenanceCableRouteReport,
  DetailedMaintenanceReport,
  //-
  WarehouseManagement,
  ListOfSupplies,
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
  NotificationScreens,
  SettingNotification,
  //Account screen
  AccountScreen,
  Personalinformation,
  AppSetting,
  ChangePassword,
};
