import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// Admin
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import SubAdminsPage from "./pages/admin/subadmin/SubAdminsPage";
import AddSubadminPage from "./pages/admin/subadmin/AddSubadminPage";
import HospitalPage from "./pages/admin/hospitals/HospitalPage";
import VaccineCenterPage from "./pages/admin/vaccine center/VaccineCenterPage";
import VaccinesPage from "./pages/admin/vaccines/VaccinesPage";
import AddVaccinePage from "./pages/admin/vaccines/AddVaccinePage";
import ChildrenPage from "./pages/admin/children/ChildrenPage";
import ChildDataPage from "./pages/admin/children/ChildDataPage";
import AssignVaccinePage from "./pages/admin/subadmin/AssignVaccinePage";
// Sub admin
import SubAdminDashboard from "./pages/subAdmin/dashboard/SubAdminDashboard";
import SubAdminHospitalPage from "./pages/subAdmin/hospitals/HospitalPage";
import SubAdminVaccineCenterPage from "./pages/subAdmin/vaccine center/VaccineCenterPage";
import SubAdminVaccinesPage from "./pages/subAdmin/vaccines/VaccinesPage";
import SubAdminAssignVaccinePage from "./pages/subAdmin/hospitals/AssignVaccinePage";
import SubAdminChildrenPage from "./pages/subAdmin/children/ChildrenPage";
import SubAdminChildDataPage from "./pages/subAdmin/children/ChildDataPage";
// Hospital
import HospitalDashboard from "./pages/hospital/dashboard/HospitalDashboard";
import HospitalChildrenPage from "./pages/hospital/children/ChildrenPage";
import HospitalChildDataPage from "./pages/hospital/children/ChildDataPage";
import HospitalVaccines from "./pages/hospital/vaccines/VaccinesPage";
import AddChildPage from "./pages/hospital/children/AddChildPage";
import HospitalRequestVaccinePage from "./pages/hospital/vaccines/RequestVaccinePage";
import VCChildVaccinationSchedulePage from "./pages/vaccineCenter/children/ChildVaccinationSchedulePage";

// Vaccine Center
import VCChildren from "./pages/vaccineCenter/children/ChildrenPage";
import VCChildData from "./pages/vaccineCenter/children/ChildDataPage";
import VCVaccines from "./pages/vaccineCenter/vaccines/VaccinesPage";
import VCRequestVaccinePage from "./pages/vaccineCenter/vaccines/RequestVaccinePage";
import VCSettingsPage from "./pages/vaccineCenter/settings/SettingsPage";

// Others
import Login from "./components/login/login";
import Signup from "./components/signup/Signup";
import Homepage from "./pages/Homepage";

import { useUserState } from "./context/userContext";
import CampaignsPage from "./pages/vaccineCenter/campaigns/CampaignsPage";
import AddCampaignPage from "./pages/vaccineCenter/campaigns/AddCampaignPage";
import WorkersPage from "./pages/vaccineCenter/polioWorker/WorkersPage";
import AddWorker from "./pages/vaccineCenter/polioWorker/AddWorker";
import AddWorkerPage from "./pages/vaccineCenter/polioWorker/AddWorkerPage";
import VaccineRequestsPage from "./pages/admin/vaccineRequests/VaccineRequestsPage";
import RequestVaccinePage from "./pages/subAdmin/vaccines/RequestVaccinePage";
import SAVaccineRequestsPage from "./pages/subAdmin/vaccineRequests/VaccineRequestsPage";
import BirthCertificate from "./pages/hospital/children/BirthCertificate";
import Reports from "./pages/hospital/Reports";
import ReportsPage from "./pages/hospital/ReportsPage";
import VCReportsPage from "./pages/vaccineCenter/reports/ReportsPage";
import SettingsPage from "./pages/hospital/settings/SettingsPage";
import ChildVaccinationSchedulePage from "./pages/hospital/children/ChildVaccinationSchedulePage";
import SubAdminDetailsPage from "./pages/admin/subadmin/SubadminDetailsPage";
import VaccineCenterDetails from "./pages/admin/vaccine center/VaccineCenterDetails";
import VaccineCenterDetailsPage from "./pages/admin/vaccine center/VaccineCenterDetailsPage";
import SubadminVaccineCenterDetailsPage from "./pages/subAdmin/vaccine center/VaccineCenterDetailsPage";
import HospitalDetailsPage from "./pages/admin/hospitals/HospitalDetailsPage";
import SubadminHospitalDetailsPage from "./pages/subAdmin/hospitals/HospitalDetailsPage";
import AdminChildVaccinationSchedulePage from "./pages/admin/children/ChildVaccinationSchedulePage";
import SubadminChildVaccinationSchedulePage from "./pages/subAdmin/children/ChildVaccinationSchedulePage";
import AdminSettingsPage from "./pages/admin/settings/SettingsPage";
import AdminReportsPage from "./pages/admin/reports/ReportsPage";
import SubadminSettingsPage from "./pages/subAdmin/settings/SettingsPage";
import SubadminReportsPage from "./pages/subAdmin/reports/ReportsPage";
import UserRequests from "./pages/subAdmin/userRequests/UserRequests";
import UserRequestsPage from "./pages/subAdmin/userRequests/UserRequestsPage";
import UserRequestsDetailsPage from "./pages/subAdmin/userRequests/UserRequestsDetailsPage";
import CampaignDetailsPage from "./pages/vaccineCenter/campaigns/CampaignDetailsPage";
import ReportDetailsPage from "./pages/subAdmin/reports/ReportDetailsPage";
import AdminReportDetailsPage from "./pages/admin/reports/ReportDetailsPage";

function App() {
	var { isAuthenticated } = useUserState();

	function PrivateRoute({ component, ...rest }) {
		return (
			<Route
				{...rest}
				render={(props) =>
					isAuthenticated ? (
						React.createElement(component, props)
					) : (
						<Redirect
							to={{
								pathname: "/login",
								state: {
									from: props.location,
								},
							}}
						/>
					)
				}
			/>
		);
	}

	function PublicRoute({ component, ...rest }) {
		const currentUser = JSON.parse(localStorage.getItem("user") || "login");
		console.log("Current user: ", currentUser);
		// const userType: string = JSON.parse(localStorage.getItem("user"));
		return (
			<Route
				{...rest}
				render={(props) =>
					isAuthenticated ? (
						<Redirect
							to={{
								pathname: "/" + currentUser.userType,
							}}
						/>
					) : (
						React.createElement(component, props)
					)
				}
			/>
		);
	}

	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Homepage} render={() => <Redirect to="/login" />} />
				<Route exact path="/login" component={Login} render={() => <Redirect to="/login" />} />
				<Route exact path="/signup" component={Signup} render={() => <Redirect to="/login" />} />
				{/* <PublicRoute path="/" exact component={Homepage} />
				<PublicRoute path="/login" exact component={Login} /> */}
				{/* <PublicRoute path="/signup" exact component={Signup} /> */}
				{/* <PrivateRoute path="/hospital" exact component={HospitalDashboard} /> */}
				{/* Admin */}
				<PrivateRoute path="/admin" exact component={AdminDashboard} />
				<PrivateRoute path="/admin/subadmins" exact component={SubAdminsPage} />
				<PrivateRoute path="/admin/subadmins/:id" exact component={AddSubadminPage} />
				<PrivateRoute path="/admin/subadmins/details/:id" exact component={SubAdminDetailsPage} />
				<PrivateRoute path="/admin/subadmins/assignvaccine/:id" exact component={AssignVaccinePage} />
				<PrivateRoute path="/admin/hospitals" exact component={HospitalPage} />
				<PrivateRoute path="/admin/hospitals/details/:id" exact component={HospitalDetailsPage} />
				<PrivateRoute path="/admin/vaccinecenters" exact component={VaccineCenterPage} />
				<PrivateRoute path="/admin/vaccinecenters/details/:id" exact component={VaccineCenterDetailsPage} />
				<PrivateRoute path="/admin/vaccines" exact component={VaccinesPage} />
				<PrivateRoute path="/admin/vaccines/:id" exact component={AddVaccinePage} />
				<PrivateRoute path="/admin/children" exact component={ChildrenPage} />
				<PrivateRoute path="/admin/children/:id" exact component={ChildDataPage} />
				<PrivateRoute path="/admin/vaccineschedule/:id" exact component={AdminChildVaccinationSchedulePage} />
				<PrivateRoute path="/admin/vaccinesrequests" exact component={VaccineRequestsPage} />
				<PrivateRoute path="/admin/settings" exact component={AdminSettingsPage} />
				<PrivateRoute path="/admin/reports" exact component={AdminReportsPage} />
				<PrivateRoute path="/admin/reports/:id" exact component={AdminReportDetailsPage} />

				{/* Sub admin */}
				<PrivateRoute path="/subadmin" exact component={SubAdminDashboard} />
				<PrivateRoute path="/subadmin/hospitals" exact component={SubAdminHospitalPage} />
				<PrivateRoute path="/subadmin/hospitals/details/:id" exact component={SubadminHospitalDetailsPage} />
				<PrivateRoute path="/subadmin/assignvaccine/:id" exact component={SubAdminAssignVaccinePage} />
				<PrivateRoute path="/subadmin/vaccinecenters" exact component={SubAdminVaccineCenterPage} />
				<PrivateRoute
					path="/subadmin/vaccinecenters/details/:id"
					exact
					component={SubadminVaccineCenterDetailsPage}
				/>
				<PrivateRoute path="/subadmin/vaccines" exact component={SubAdminVaccinesPage} />
				<PrivateRoute path="/subadmin/children" exact component={SubAdminChildrenPage} />
				<PrivateRoute path="/subadmin/children/:id" exact component={SubAdminChildDataPage} />
				<PrivateRoute path="/subadmin/requestvaccine" exact component={RequestVaccinePage} />
				<PrivateRoute path="/subadmin/vaccinerequests" exact component={SAVaccineRequestsPage} />
				<PrivateRoute path="/subadmin/userrequests" exact component={UserRequestsPage} />
				<PrivateRoute path="/subadmin/userrequests/:id" exact component={UserRequestsDetailsPage} />
				<PrivateRoute path="/subadmin/vaccineschedule/:id" exact component={SubadminChildVaccinationSchedulePage} />
				<PrivateRoute path="/subadmin/settings" exact component={SubadminSettingsPage} />
				<PrivateRoute path="/subadmin/reports" exact component={SubadminReportsPage} />
				<PrivateRoute path="/subadmin/reports/:id" exact component={ReportDetailsPage} />

				{/* Hospital */}
				<PrivateRoute path="/hospital" exact component={HospitalDashboard} />
				<PrivateRoute path="/hospital" exact component={HospitalChildrenPage} />
				<PrivateRoute path="/hospital/children" exact component={HospitalChildrenPage} />
				<PrivateRoute path="/hospital/children/printables" exact component={BirthCertificate} />
				<PrivateRoute path="/hospital/children/:id" exact component={HospitalChildDataPage} />
				<PrivateRoute path="/hospital/vaccines" exact component={HospitalVaccines} />
				<PrivateRoute path="/hospital/child/:id" exact component={AddChildPage} />
				<PrivateRoute path="/hospital/requestvaccine" exact component={HospitalRequestVaccinePage} />
				<PrivateRoute path="/hospital/reports" exact component={ReportsPage} />
				<PrivateRoute path="/hospital/settings" exact component={SettingsPage} />
				<PrivateRoute path="/hospital/vaccineschedule/:id" exact component={ChildVaccinationSchedulePage} />

				{/* Vaccine Center */}
				<PrivateRoute path="/vaccinecenter" exact component={VCChildren} />
				<PrivateRoute path="/vaccinecenter/children/:id" exact component={VCChildData} />
				<PrivateRoute path="/vaccinecenter/vaccineschedule/:id" exact component={VCChildVaccinationSchedulePage} />
				<PrivateRoute path="/vaccinecenter/campaigns" exact component={CampaignsPage} />
				<PrivateRoute path="/vaccinecenter/campaigns/details/:id" exact component={CampaignDetailsPage} />
				<PrivateRoute path="/vaccinecenter/campaigns/:id" exact component={AddCampaignPage} />
				<PrivateRoute path="/vaccinecenter/vaccines" exact component={VCVaccines} />
				<PrivateRoute path="/vaccinecenter/workers" exact component={WorkersPage} />
				<PrivateRoute path="/vaccinecenter/workers/:id" exact component={AddWorkerPage} />
				<PrivateRoute path="/vaccinecenter/requestvaccine" exact component={VCRequestVaccinePage} />
				<PrivateRoute path="/vaccinecenter/settings" exact component={VCSettingsPage} />
				<PrivateRoute path="/vaccinecenter/reports" exact component={VCReportsPage} />

				{/* <PrivateRoute path="/hospital/vaccines" exact component={HospitalVaccines} />
				<PrivateRoute path="/hospital/child/:id" exact component={AddChildPage} /> */}
			</Switch>
		</Router>
	);
}

export default App;
