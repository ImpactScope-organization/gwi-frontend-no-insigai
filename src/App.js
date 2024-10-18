import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes, Outlet } from 'react-router-dom'
import Reports from './Pages/Reports'
import Header from './Components/Shared/Header'
import Settings from './Pages/Settings'
import { useStepsContext } from './Context/StateContext'
import { useEffect } from 'react'
import Login from './Components/Shared/Login'
import 'react-quill-new/dist/quill.snow.css'
import { ROUTES } from './routes'

function App() {
  const { openLoginModal, setOpenLoginModal } = useStepsContext()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')

    if (!userInfo) {
      setOpenLoginModal(!openLoginModal)
    }
  }, [])

  return (
    <div className="App">
      {openLoginModal && <Login />}
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path={ROUTES.reports} element={<Reports />} />
        <Route path={ROUTES.settings} element={<Settings />} />
        {/*<Route path="/settings" element={<Settings />}></Route>*/}
        {/*<Route path={ROUTES.reports} element={<AllReports />} />*/}
        {/*<Route path={ROUTES.create} element={<Create />} />*/}
        {/*<Route path={ROUTES.specificReport.index} element={<SpecificReport />} />*/}
        {/*<Route path={ROUTES.specificReport.edit} element={<EditSpecificReport />} />*/}
      </Routes>
    </div>
  )
}

export default App
