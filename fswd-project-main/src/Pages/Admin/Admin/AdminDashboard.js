import AdminHeader from "../../../components/AdminHeader/AdminHeader"
import CustomerOrders from "../../../components/CustomerOrders/CustomerOrders"
import Sidebar from "../../../components/Sidebar/Sidebar"

const AdminDashboard = () => {
	return (

		<div id="admin_dashboard" className="container px-16 mx-auto bg-blue-100">
			<div className="grid grid-cols-12 gap-x-12 gap-y-4">
				<AdminHeader username="Jakkrapat suwannoo" />
				<div className="col-span-3 bg-white p-4">
					<div class="pb-2 text-blue-500">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<div class="text-4xl pb-3"><p>1,250</p></div>
					<div>Item Sales</div>
				</div>
				<div className="col-span-3 bg-white p-4">
					<div class="pb-2 text-yellow-500">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
						</svg>
					</div>
					<div class="text-4xl pb-3"><p>1,250</p></div>
					<div>New Orders</div>
				</div>
				<div className="col-span-3 bg-white p-4">
					<div class="pb-2 text-yellow-300">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<div class="text-4xl pb-3"><p>1,250</p></div>
					<div>Total Products</div>
				</div>
				<div className="col-span-3 bg-white p-4">
					<div class="pb-2 text-green-500">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
						</svg>
					</div>
				</div>

		<Sidebar/>
			</div>
		</div>
	);
}
export default AdminDashboard;