import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ForgotPage from "./pages/auth/login/Forgotpass";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";

import { Toaster } from "react-hot-toast";
import { useMutationState, useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ResetPassword from "./pages/auth/login/ResetPassword";

function App() {
	// to connect backend and frontend we are using the React Query
	// in React Query for data Mutation (CRUD operations) => useMutation()
	// in React Query for data fetching (retrieving data) => useQuery()	

	 const { data: authUser, isLoading } = useQuery({
		// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				//By following it will return data to be null insted of undefined when the user is not authenticated
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				console.log("authUser is here:", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
	});

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	return (
		<div className='flex max-w-6xl mx-auto'>
			
			{/* if authUser is authenticated then only showSidebar */}
			{authUser && <Sidebar />}

			{/* Anything outside the <Routes>, will act as a common components for all pages */}
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
				{/* it is like if authUser is authenticated go to the home page else go to the login page */}
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/forgot' element={<ForgotPage />} />
				<Route path='/setpass' element={<ResetPassword />} />

				{/* if(authUser) is not authenticated go to the login page else go to the login page */}
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
				<Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
				<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
			</Routes>
			{/* if authUser is authenticated then only show RightPanel */}
			{authUser && <RightPanel />}
			{/* it is to show notifications [React toast] */}
			<Toaster />
		</div>
	);
}

export default App;
